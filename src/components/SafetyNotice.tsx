import { AlertTriangle } from 'lucide-react';

export function SafetyNotice() {
  return (
    <aside className="safety-notice" aria-label="Avisos de seguridad">
      <AlertTriangle aria-hidden="true" />
      <div>
        <strong>Entrena con control.</strong>
        <p>Detén el ejercicio si aparece dolor agudo. No balancees el cuerpo, respira durante el movimiento y distingue esfuerzo muscular de dolor articular.</p>
      </div>
    </aside>
  );
}
