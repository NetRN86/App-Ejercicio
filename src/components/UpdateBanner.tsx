import { RefreshCw, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  function dismiss() {
    setNeedRefresh(false);
  }

  return (
    <div className="install-banner" role="status" aria-label="Actualización disponible">
      <RefreshCw size={20} aria-hidden />
      <p>Hay una versión nueva de la app lista. Actualiza para ver los últimos cambios.</p>
      <button type="button" className="primary-small" onClick={() => updateServiceWorker(true)}>Actualizar</button>
      <button type="button" className="icon-button" onClick={dismiss} aria-label="Cerrar aviso de actualización">
        <X size={18} />
      </button>
    </div>
  );
}
