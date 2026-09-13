import { useState, useEffect, useCallback } from 'react';
import {
  Download,
  Search,
  Calendar,
  Mail,
  Phone,
  User,
  LogOut,
  X,
  StickyNote,
  Plus,
  ChevronRight,
} from 'lucide-react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';

interface GuideDownload {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  downloaded_at: string;
  created_at: string;
}

interface ClaritySessionLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_contact_method: string | null;
  preferred_session_date: string | null;
  wedding_date: string | null;
  planned_budget: string | null;
  guest_size: string | null;
  status: string | null;
  source: string | null;
  created_at: string;
  updated_at: string | null;
}

interface LeadNote {
  id: string;
  lead_id: string;
  note: string;
  created_by: string | null;
  created_at: string;
}

type TabKey = 'clarity' | 'guide';

const STATUS_OPTIONS = ['new', 'contacted', 'booked', 'lost'] as const;
type LeadStatus = (typeof STATUS_OPTIONS)[number];

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-amber-100 text-amber-700 border-amber-200',
  booked: 'bg-green-100 text-green-700 border-green-200',
  lost: 'bg-gray-200 text-gray-600 border-gray-300',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  booked: 'Booked',
  lost: 'Lost',
};

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKey>('clarity');
  const [clarityLeads, setClarityLeads] = useState<ClaritySessionLead[]>([]);
  const [guideDownloads, setGuideDownloads] = useState<GuideDownload[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedLead, setSelectedLead] = useState<ClaritySessionLead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [noteSaving, setNoteSaving] = useState(false);

  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // ── Auth: check existing session on mount ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (!newSession) {
        setClarityLeads([]);
        setGuideDownloads([]);
        setSelectedLead(null);
        setNotes([]);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ── Load data when session becomes available ──
  useEffect(() => {
    if (session) {
      loadClarityLeads();
      loadGuideDownloads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // ── Auth handlers ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (signInError) {
      setLoginError(signInError.message || 'Invalid login credentials');
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoginEmail('');
    setLoginPassword('');
  };

  // ── Data loaders ──
  const loadClarityLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: queryError } = await supabase
        .from('clarity_session_leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setClarityLeads((data as ClaritySessionLead[]) || []);
    } catch (err) {
      console.error('Error loading clarity leads:', err);
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const loadGuideDownloads = async () => {
    try {
      const { data, error: queryError } = await supabase
        .from('guide_downloads')
        .select('*')
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setGuideDownloads((data as GuideDownload[]) || []);
    } catch (err) {
      console.error('Error loading guide downloads:', err);
    }
  };

  // ── Status update ──
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setUpdatingStatusId(leadId);
    const prevLeads = clarityLeads;
    setClarityLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : prev));
    }
    try {
      const { error: updateError } = await supabase
        .from('clarity_session_leads')
        .update({ status: newStatus })
        .eq('id', leadId);
      if (updateError) throw updateError;
    } catch (err) {
      console.error('Error updating status:', err);
      setClarityLeads(prevLeads);
      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) =>
          prev ? { ...prev, status: prevLeads.find((l) => l.id === leadId)?.status ?? prev.status } : prev,
        );
      }
      setError('Failed to update status');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // ── Notes ──
  const loadNotes = useCallback(async (leadId: string) => {
    setNotesLoading(true);
    try {
      const { data, error: queryError } = await supabase
        .from('clarity_session_lead_notes')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setNotes((data as LeadNote[]) || []);
    } catch (err) {
      console.error('Error loading notes:', err);
      setNotes([]);
    } finally {
      setNotesLoading(false);
    }
  }, []);

  const handleAddNote = async () => {
    if (!selectedLead || !noteText.trim()) return;
    setNoteSaving(true);
    try {
      const { error: insertError } = await supabase
        .from('clarity_session_lead_notes')
        .insert([{ lead_id: selectedLead.id, note: noteText.trim() }]);
      if (insertError) throw insertError;
      setNoteText('');
      await loadNotes(selectedLead.id);
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setNoteSaving(false);
    }
  };

  const openLeadDetail = (lead: ClaritySessionLead) => {
    setSelectedLead(lead);
    setNoteText('');
    loadNotes(lead.id);
  };

  const closeLeadDetail = () => {
    setSelectedLead(null);
    setNotes([]);
    setNoteText('');
  };

  // ── Filtering ──
  const filteredClarityLeads = clarityLeads.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      (lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (lead.phone?.includes(searchTerm) ?? false) ||
      (lead.status?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus =
      statusFilter === 'all' || (lead.status ?? 'new') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredGuideDownloads = guideDownloads.filter((lead) => {
    if (!searchTerm) return true;
    return (
      lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm)
    );
  });

  // ── CSV export ──
  const exportToCSV = () => {
    if (activeTab === 'clarity') {
      const headers = [
        'Name',
        'Email',
        'Phone',
        'Preferred Contact Method',
        'Preferred Session Date',
        'Wedding Date',
        'Planned Budget',
        'Guest Size',
        'Status',
        'Created Date',
      ];
      const csvData = filteredClarityLeads.map((lead) => [
        lead.name || '',
        lead.email || '',
        lead.phone || '',
        lead.preferred_contact_method || '',
        lead.preferred_session_date ? formatDate(lead.preferred_session_date) : '',
        lead.wedding_date ? formatDate(lead.wedding_date) : '',
        lead.planned_budget || '',
        lead.guest_size || '',
        lead.status || '',
        formatDate(lead.created_at),
      ]);
      const csvContent = [headers.join(','), ...csvData.map((row) => row.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
      downloadCSV(csvContent, `ashiwaju-clarity-leads-${new Date().toISOString().split('T')[0]}.csv`);
    } else {
      const headers = ['Name', 'Email', 'Phone', 'Downloaded At'];
      const csvData = filteredGuideDownloads.map((lead) => [
        lead.full_name,
        lead.email,
        lead.phone,
        new Date(lead.downloaded_at).toLocaleString(),
      ]);
      const csvContent = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n');
      downloadCSV(csvContent, `ashiwaju-leads-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ── Utilities ──
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDateOnly = (dateString: string | null) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const displayStatus = (status: string | null): string => {
    return STATUS_LABELS[status ?? 'new'] ?? 'New';
  };

  const statusBadgeClass = (status: string | null): string => {
    return STATUS_STYLES[status ?? 'new'] ?? STATUS_STYLES['new'];
  };

  // ── Render: loading before auth check ──
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // ── Render: login screen ──
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Sign in to access the CRM</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                placeholder="admin@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loginLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Render: dashboard ──
  const activeLeads = activeTab === 'clarity' ? filteredClarityLeads : filteredGuideDownloads;
  const totalCount = activeTab === 'clarity' ? clarityLeads.length : guideDownloads.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-600 to-amber-600 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin CRM</h1>
                <p className="text-rose-100">
                  {user?.email ? `Signed in as ${user.email}` : 'Manage your leads'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('clarity')}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
                activeTab === 'clarity'
                  ? 'bg-rose-50 text-rose-700 border-b-2 border-rose-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Clarity Session Leads
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors ${
                activeTab === 'guide'
                  ? 'bg-rose-50 text-rose-700 border-b-2 border-rose-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Guide Downloads
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {/* Search + filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'clarity'
                      ? 'Search by name, email, phone, or status...'
                      : 'Search by name, email, or phone...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                />
              </div>

              {activeTab === 'clarity' && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none bg-white text-gray-700"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="booked">Booked</option>
                  <option value="lost">Lost</option>
                </select>
              )}

              <button
                onClick={exportToCSV}
                disabled={activeLeads.length === 0}
                className="flex items-center justify-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Count bar */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="text-gray-700">
                <span className="font-semibold text-2xl text-rose-600">{activeLeads.length}</span>
                <span className="ml-2 text-gray-600">
                  {activeLeads.length === 1 ? 'lead' : 'leads'}
                  {searchTerm && ' (filtered)'}
                  {activeTab === 'clarity' && statusFilter !== 'all' && ' (filtered)'}
                </span>
              </div>
              {loading && <div className="text-gray-500 text-sm">Loading...</div>}
            </div>

            {/* Clarity Session Leads table */}
            {activeTab === 'clarity' && (
              <>
                {filteredClarityLeads.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm || statusFilter !== 'all'
                      ? 'No leads match your filters'
                      : 'No leads yet'}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Phone</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Contact Method</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Session Date</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Wedding Date</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Created</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClarityLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{lead.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-rose-600 transition-colors">
                                <Phone className="w-4 h-4" />
                                {lead.phone}
                              </a>
                            </td>
                            <td className="py-4 px-4 text-gray-600 text-sm">
                              {lead.preferred_contact_method || '—'}
                            </td>
                            <td className="py-4 px-4 text-gray-600 text-sm">
                              {formatDateOnly(lead.preferred_session_date)}
                            </td>
                            <td className="py-4 px-4 text-gray-600 text-sm">
                              {formatDateOnly(lead.wedding_date)}
                            </td>
                            <td className="py-4 px-4">
                              <div className="relative inline-block">
                                <select
                                  value={lead.status ?? 'new'}
                                  onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                  disabled={updatingStatusId === lead.id}
                                  className={`appearance-none pl-2 pr-6 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-colors disabled:opacity-50 ${statusBadgeClass(lead.status)}`}
                                  style={{ backgroundImage: 'none' }}
                                >
                                  {STATUS_OPTIONS.map((s) => (
                                    <option key={s} value={s}>
                                      {STATUS_LABELS[s]}
                                    </option>
                                  ))}
                                </select>
                                <ChevronRight className="w-3 h-3 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <Calendar className="w-4 h-4" />
                                {formatDate(lead.created_at)}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => openLeadDetail(lead)}
                                className="text-rose-600 hover:text-rose-700 text-sm font-semibold transition-colors"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Guide Downloads table */}
            {activeTab === 'guide' && (
              <>
                {filteredGuideDownloads.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    {searchTerm ? 'No leads match your search' : 'No guide downloads yet'}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Phone</th>
                          <th className="text-left py-4 px-4 font-semibold text-gray-700">Downloaded</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGuideDownloads.map((lead) => (
                          <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="font-medium text-gray-900">{lead.full_name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors">
                                <Mail className="w-4 h-4" />
                                {lead.email}
                              </a>
                            </td>
                            <td className="py-4 px-4">
                              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-rose-600 transition-colors">
                                <Phone className="w-4 h-4" />
                                {lead.phone}
                              </a>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <Calendar className="w-4 h-4" />
                                {formatDate(lead.downloaded_at)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Lead Detail Modal ── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-rose-600 to-amber-600 p-5 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedLead.name}</h2>
                <p className="text-rose-100 text-sm">Lead Details</p>
              </div>
              <button
                onClick={closeLeadDetail}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailField icon={<Mail className="w-4 h-4 text-gray-400" />} label="Email" value={selectedLead.email} />
                <DetailField icon={<Phone className="w-4 h-4 text-gray-400" />} label="Phone" value={selectedLead.phone} />
                <DetailField label="Preferred Contact Method" value={selectedLead.preferred_contact_method || 'Not provided'} />
                <DetailField label="Preferred Session Date" value={formatDateOnly(selectedLead.preferred_session_date)} />
                <DetailField label="Wedding Date" value={formatDateOnly(selectedLead.wedding_date)} />
                <DetailField label="Planned Budget" value={selectedLead.planned_budget || 'Not provided'} />
                <DetailField label="Guest Size" value={selectedLead.guest_size || 'Not provided'} />
                <DetailField label="Source" value={selectedLead.source || 'Not provided'} />
                <DetailField label="Created Date" value={formatDate(selectedLead.created_at)} />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="relative inline-block">
                  <select
                    value={selectedLead.status ?? 'new'}
                    onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                    disabled={updatingStatusId === selectedLead.id}
                    className={`appearance-none pl-3 pr-8 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-colors disabled:opacity-50 ${statusBadgeClass(selectedLead.status)}`}
                    style={{ backgroundImage: 'none' }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Notes section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <StickyNote className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
                </div>

                {/* Add note */}
                <div className="mb-4">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Type a note..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none text-sm"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!noteText.trim() || noteSaving}
                    className="mt-2 flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    {noteSaving ? 'Saving...' : 'Add Note'}
                  </button>
                </div>

                {/* Notes list */}
                {notesLoading ? (
                  <div className="text-gray-500 text-sm py-4">Loading notes...</div>
                ) : notes.length === 0 ? (
                  <div className="text-gray-400 text-sm py-4 text-center">No notes yet</div>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <div key={note.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">{note.note}</p>
                        <p className="text-gray-400 text-xs mt-2">{formatDate(note.created_at)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      <div className="flex items-center gap-2 text-gray-800 text-sm">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
