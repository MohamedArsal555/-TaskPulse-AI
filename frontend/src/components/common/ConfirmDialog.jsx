import { createPortal } from 'react-dom';
import { Card } from './Card';
import { Button } from './Button';
import { C } from '../../styles/theme';

// Rendered via portal to <body> so it always paints above every other layer,
// regardless of stacking contexts created by ancestors (e.g. the fixed sidebar).
export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel }) {
  if (!open) return null;
  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,15,56,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onCancel}
    >
      <Card hover={false} className="tp-pop" onClick={(e) => e.stopPropagation()} style={{ width: 340 }} padding={24}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.txt }}>{title}</h3>
        <p style={{ fontSize: 13.5, color: C.txtSub, marginTop: 8, lineHeight: 1.55 }}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
          <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant="primary" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </Card>
    </div>,
    document.body
  );
}
