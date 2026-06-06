type Listener = () => void;

let authFailed = false;
const listeners = new Set<Listener>();

/** Called by Google when the Maps/Places key is rejected (referrer, billing, etc.). */
export function markGoogleMapsAuthFailure() {
  if (authFailed) return;
  authFailed = true;
  listeners.forEach((listener) => listener());
}

export function isGoogleMapsAuthFailed() {
  return authFailed;
}

export function subscribeGoogleMapsAuthFailure(listener: Listener) {
  if (authFailed) listener();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Register once before the Maps script loads. */
export function ensureGoogleMapsAuthFailureHook() {
  if (typeof window === "undefined") return;
  const win = window as Window & { gm_authFailure?: () => void };
  if (win.gm_authFailure) return;
  win.gm_authFailure = () => markGoogleMapsAuthFailure();
}

ensureGoogleMapsAuthFailureHook();
