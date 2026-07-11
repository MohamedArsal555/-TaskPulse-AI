import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Field, Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { C } from '../../styles/theme';

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    setError(ok ? '' : 'Incorrect username or password.');
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
      <Card hover={false} className="tp-pop" style={{ width: 380 }} padding={32}>
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
          Welcome back
        </h2>
        <p style={{ fontSize: 13.5, color: C.txtSub, marginTop: 6, lineHeight: 1.5 }}>
          Sign in to reach the TaskPulse AI prediction console.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          <Field label="Username">
            <Input placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          </Field>
          <Field label="Password">
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 9, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
              {error}
            </div>
          )}

          <Button type="submit" style={{ marginTop: 4 }}>Sign in</Button>
        </form>
      </Card>
    </div>
  );
}
