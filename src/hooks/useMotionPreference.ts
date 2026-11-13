import { useSyncExternalStore, useCallback } from 'react';

type MotionOverride = 'auto' | 'reduce' | 'allow';

let currentOverride: MotionOverride = 'auto';
const listeners = new Set<() => void>();

function getSystemReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function computeEffectiveReducedMotion(): boolean {
  if (currentOverride === 'reduce') return true;
  if (currentOverride === 'allow') return false;
  return getSystemReducedMotion();
}

function syncDocumentAttribute() {
  if (typeof document === 'undefined') return;
  const reduced = computeEffectiveReducedMotion();
  document.documentElement.dataset.reducedMotion = reduced ? 'true' : 'false';
}

function notifyListeners() {
  syncDocumentAttribute();
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  syncDocumentAttribute();
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', () => {
    notifyListeners();
  });
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): boolean {
  return computeEffectiveReducedMotion();
}

function getServerSnapshot(): boolean {
  return false;
}

export function useMotionPreference() {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleReducedMotion = useCallback(() => {
    const currentlyReduced = computeEffectiveReducedMotion();
    currentOverride = currentlyReduced ? 'allow' : 'reduce';
    notifyListeners();
  }, []);

  return {
    reducedMotion,
    toggleReducedMotion,
  };
}
