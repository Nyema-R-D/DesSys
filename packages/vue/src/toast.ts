import { inject, type InjectionKey, type Ref } from 'vue';

export type ToastTone = 'info' | 'success' | 'error';
export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Durée en ms ; 0 pour un toast persistant. Défaut : 5000, 8000 pour une erreur. */
  duration?: number;
}
export interface ToastEntry extends ToastOptions {
  id: number;
}
export interface ToastApi {
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
  toasts: Ref<ToastEntry[]>;
}

export const toastKey: InjectionKey<ToastApi> = Symbol('nyema-toast');

/** Affiche une notification : `const toast = useToast(); toast.show({ title: 'Enregistré.' })`. */
export function useToast(): ToastApi {
  const api = inject(toastKey, null);
  if (!api) throw new Error('useToast doit être utilisé sous <ToastProvider>.');
  return api;
}
