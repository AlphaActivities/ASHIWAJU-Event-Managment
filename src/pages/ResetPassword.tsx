import { useState, useEffect, useRef } from 'react';
import { Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabaseAdmin, adminConfigAvailable } from '../utils/supabaseAdmin';

const supabase = supabaseAdmin as NonNullable<typeof supabaseAdmin>;

type Stage = 'verifying' | 'ready' | 'submitting' | 'success' | 'error';

export default function ResetPassword() {
  if (!adminConfigAvailable || !supabase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Admin Configuration Required</h1>
          <p className="text-gray-600">
            The password reset page requires dedicated environment configuration that is not
            available in this preview environment. The production admin dashboard remains
            fully operational.
          </p>
        </div>
      </div>
    );
  }
  return <ResetPasswordInner />;
}

function ResetPasswordInner() {
  const [stage, setStage] = useState<Stage>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const recoveryConfirmed = useRef(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' && session && !recoveryConfirmed.current) {
        recoveryConfirmed.current = true;
        setStage('ready');
      }
    });

    // Also check if we already have a valid session (Supabase may have
    // processed the recovery token before the listener was attached)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && !recoveryConfirmed.current) {
        // Session exists — but we need to confirm it's a recovery session.
        // The onAuthStateChange handler above will fire PASSWORD_RECOVERY
        // if that's the case. If not, we show a generic error after a brief wait.
        setTimeout(() => {
          if (!recoveryConfirmed.current) {
            setStage('error');
            setErrorMsg(
              'This reset link is invalid or has expired. Please request a new password reset email.',
            );
          }
        }, 2000);
      } else if (!data.session) {
        // No session at all — the URL hash may not contain a valid recovery token
        setTimeout(() => {
          if (!recoveryConfirmed.current) {
            setStage('error');
            setErrorMsg(
              'This reset link is invalid or has expired. Please request a new password reset email.',
            );
          }
        }, 2000);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 8) {
      setStage('error');
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStage('error');
      setErrorMsg('Passwords do not match.');
      return;
    }

    setStage('submitting');

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setStage('error');
      setErrorMsg(
        updateError.message ||
          'Failed to update password. The reset link may have expired. Please request a new one.',
      );
      return;
    }

    setStage('success');
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors';

  // ── Verifying stage ──
  if (stage === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
          <p className="text-gray-600">Verifying your reset link…</p>
        </div>
      </div>
    );
  }

  // ── Error stage ──
  if (stage === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-14 h-14 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Reset Link Invalid</h1>
          <p className="text-gray-600 mb-8">{errorMsg}</p>
          <a
            href="/admin"
            className="inline-flex items-center gap-2 text-rose-600 font-semibold hover:text-rose-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Login
          </a>
        </div>
      </div>
    );
  }

  // ── Success stage ──
  if (stage === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-14 h-14 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Password Updated</h1>
          <p className="text-gray-600 mb-8">
            Your password has been updated successfully. You can now log in to the admin dashboard
            with your new password.
          </p>
          <a
            href="/admin"
            className="inline-block w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            Go to Admin Login
          </a>
        </div>
      </div>
    );
  }

  // ── Ready / Submitting stage — password form ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 bg-rose-50 rounded-full flex items-center justify-center">
            <Lock className="w-7 h-7 text-rose-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
          <p className="text-gray-600">Enter a new password for your admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (stage === 'error') setStage('ready');
              }}
              className={inputClass}
              placeholder="At least 8 characters"
              required
              autoComplete="new-password"
              minLength={8}
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (stage === 'error') setStage('ready');
              }}
              className={inputClass}
              placeholder="Re-enter your new password"
              required
              autoComplete="new-password"
              minLength={8}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
            />
            Show passwords
          </label>

          {stage === 'error' && errorMsg && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={stage === 'submitting'}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {stage === 'submitting' ? 'Updating…' : 'Update Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}
