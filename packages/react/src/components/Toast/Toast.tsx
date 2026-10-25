import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import './Toast.css';

export type ToastTone = 'info' | 'success' | 'error';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Durée d'affichage en ms ; 0 pour un toast persistant. Défaut : 5000, 8000 pour une erreur. */
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Fournit `useToast()` et affiche la pile de notifications en bas à droite. */
export function ToastProvider({
  children,
  closeLabel = 'Fermer',
}: {
  children: ReactNode;
  closeLabel?: string;
}) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback(
    (id: number) => setToasts((list) => list.filter((t) => t.id !== id)),
    [],
  );
  const show = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((list) => [...list, { ...options, id }]);
    return id;
  }, []);
  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ol className="ny-toast-region" aria-live="polite" aria-relevant="additions">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} closeLabel={closeLabel} />
        ))}
      </ol>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onDismiss,
  closeLabel,
}: {
  toast: ToastEntry;
  onDismiss: (id: number) => void;
  closeLabel: string;
}) {
  const tone = toast.tone ?? 'info';
  const duration = toast.duration ?? (tone === 'error' ? 8000 : 5000);
  useEffect(() => {
    if (!duration) return;
    const timer = window.setTimeout(() => onDismiss(toast.id), duration);
    return () => window.clearTimeout(timer);
  }, [duration, onDismiss, toast.id]);

  return (
    <li className="ny-toast-item">
      <div className={`ny-toast ny-toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
        <span className="ny-toast__dot" aria-hidden="true" />
        <div className="ny-toast__body">
          <span className="ny-toast__title">{toast.title}</span>
          {toast.description != null ? <span>{toast.description}</span> : null}
        </div>
        <button
          type="button"
          className="ny-toast__close ny-focusable"
          aria-label={closeLabel}
          onClick={() => onDismiss(toast.id)}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </li>
  );
}

/** Affiche une notification : `const toast = useToast(); toast.show({ title: 'Enregistré.' })`. */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast doit être utilisé sous <ToastProvider>.');
  return context;
}
