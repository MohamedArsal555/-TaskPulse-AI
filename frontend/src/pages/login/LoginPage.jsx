import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Field, Input, Select, PasswordField } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { C } from '../../styles/theme';
import { ROLES } from '../../utils/roles';

const ERROR_BOX = {
  padding: '10px 14px',
  borderRadius: 9,
  background: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#dc2626',
  fontSize: 13,
};

export function LoginPage({ onLogin, onRegister }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'

  // --- sign in ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    const matched = onLogin(username, password);
    setError(matched ? '' : 'Incorrect username or password.');
  };

  // --- sign up ---
  const [suUsername, setSuUsername] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suRoleId, setSuRoleId] = useState(ROLES[0].id);
  const [suError, setSuError] = useState('');

  const goToSignUp = () => {
    setMode('signup');
    setError('');
  };

  const goToSignIn = () => {
    setMode('signin');
    setSuError('');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const uname = suUsername.trim();
    const mail = suEmail.trim();

    if (!uname || !mail || !suPassword) {
      setSuError('Username, email and password are all required.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      setSuError('Enter a valid email address.');
      return;
    }

    const result = onRegister({ username: uname, email: mail, password: suPassword, roleId: suRoleId });
    if (!result.ok) {
      setSuError(result.error);
      return;
    }

    const matched = onLogin(uname, suPassword);
    if (!matched) {
      // Shouldn't happen, but fall back to a manual sign-in rather than a dead end.
      setUsername(uname);
      setPassword(suPassword);
      setMode('signin');
    }
  };

  return (
    <div
      className="tp-hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.heroGrad,
        padding: 24,
      }}
    >
      <Card hover={false} className="tp-pop" style={{ width: 460 }} padding={32}>
        <div
          className="tp-serif"
          style={{
            width: 40,
            height: 40,
            borderRadius: 9,
            background: C.heroGrad,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          TP
        </div>
        <h2 className="tp-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 16, color: C.txt }}>
          TaskPulse AI
        </h2>

        {mode === 'signin' ? (
          <>
            <p style={{ fontSize: 13.5, color: C.txtSub, marginTop: 6, lineHeight: 1.5 }}>
              Sign in to reach the TaskPulse AI prediction console.
            </p>

            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
              <Field label="Username">
                <Input value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
              </Field>
              <PasswordField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <div style={ERROR_BOX}>{error}</div>}

              <Button type="submit" style={{ marginTop: 4 }}>Sign in</Button>
              <Button type="button" variant="ghost" onClick={goToSignUp}>Create an account</Button>
            </form>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13.5, color: C.txtSub, marginTop: 6, lineHeight: 1.5 }}>
              Register a new account and choose the role it signs in as.
            </p>

            <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              <Field label="Username">
                <Input value={suUsername} onChange={(e) => setSuUsername(e.target.value)} autoFocus />
              </Field>
              <Field label="Email">
                <Input type="email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} placeholder="you@company.com" />
              </Field>
              <PasswordField
                label="Password"
                value={suPassword}
                onChange={(e) => setSuPassword(e.target.value)}
              />
              <Field label="Role">
                <Select value={suRoleId} onChange={(e) => setSuRoleId(e.target.value)}>
                  {ROLES.map((role) => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </Select>
              </Field>

              {suError && <div style={ERROR_BOX}>{suError}</div>}

              <Button type="submit" style={{ marginTop: 4 }}>Create account</Button>
              <Button type="button" variant="ghost" onClick={goToSignIn}>Back to sign in</Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
