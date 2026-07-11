import { useEffect } from 'react';
import { C } from './theme';

// ── GLOBAL STYLES (injected into <head>) ─────────────────────
export function GlobalStyles() {
  useEffect(() => {
    const existing = document.getElementById('__tp-css');
    if (existing) existing.remove();
    const el = document.createElement('style');
    el.id = '__tp-css';
    el.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { height: 100%; }
      body { font-family: 'Inter', sans-serif; background: ${C.bg}; color: ${C.txt}; -webkit-font-smoothing: antialiased; }
      input, textarea, select, button { font-family: 'Inter', sans-serif; }
      h1, h2, h3, .tp-serif { font-family: 'Fraunces', Georgia, serif; }
      code, .mono { font-family: 'JetBrains Mono', monospace; }

      @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
      @keyframes riseIn  { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:translateY(0);} }
      @keyframes spin    { to { transform:rotate(360deg); } }
      @keyframes pulseDot{ 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      @keyframes gradientDrift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      @keyframes blobFloat    { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(14px,-18px) scale(1.08); } }
      @keyframes blobFloatRev { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-12px,14px) scale(1.06); } }

      .tp-page   { animation: fadeIn 0.25s ease both; }
      .tp-pop    { animation: riseIn 0.3s ease both; }
      .tp-spin   { animation: spin 0.9s linear infinite; }
      .tp-pulse  { animation: pulseDot 1.6s ease-in-out infinite; }

      .tp-hero        { background-size: 180% 180%; animation: gradientDrift 14s ease-in-out infinite; }
      .tp-hero-blob-a { animation: blobFloat 9s ease-in-out infinite; }
      .tp-hero-blob-b { animation: blobFloatRev 11s ease-in-out infinite; }

      .tp-sidebar { background-size: 160% 160%; animation: gradientDrift 20s ease-in-out infinite; }

      .tp-tool-card { transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease; }
      .tp-tool-card:hover { border-color: ${C.p400} !important; box-shadow: 0 8px 24px rgba(124,58,237,0.14); transform: translateY(-2px); }
      .tp-tool-icon { transition: transform 0.2s ease; }
      .tp-tool-card:hover .tp-tool-icon { transform: scale(1.08) rotate(-4deg); }

      .tp-nav-item { transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease; border-left: 2px solid transparent; }
      .tp-nav-item:hover  { background: rgba(255,255,255,0.08) !important; color: #fff !important; }
      .tp-nav-item.active { background: rgba(255,255,255,0.1) !important; color: #fff !important; border-left: 2px solid #c4b5fd !important; }

      .tp-card { transition: border-color 0.15s ease, box-shadow 0.15s ease; }
      .tp-card:hover { border-color: ${C.p300} !important; box-shadow: 0 3px 14px rgba(36,33,25,0.08); }

      .tp-btn-pri { transition: filter 0.12s ease, box-shadow 0.12s ease; }
      .tp-btn-pri:hover:not(:disabled) { filter: brightness(1.08); }
      .tp-btn-pri:active:not(:disabled) { filter: brightness(0.96); }
      .tp-btn-pri:disabled { opacity: 0.5; cursor: not-allowed; }

      .tp-btn-ghost { transition: background 0.12s ease, border-color 0.12s ease; }
      .tp-btn-ghost:hover { background: ${C.p50} !important; border-color: ${C.p200} !important; }

      .tp-input { transition: border-color 0.12s ease, background 0.12s ease; }
      .tp-input:focus { border-color: ${C.p400} !important; outline: none; background: #fff !important; }
      .tp-input.error { border-color: #9c3f2c !important; }

      ::-webkit-scrollbar       { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${C.p200}; border-radius: 6px; }
    `;
    document.head.appendChild(el);
    return () => { const s = document.getElementById('__tp-css'); if (s) s.remove(); };
  }, []);
  return null;
}
