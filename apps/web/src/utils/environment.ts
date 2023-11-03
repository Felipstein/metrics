export function environment(): 'server' | 'client' {
  return typeof window === 'undefined' ? 'server' : 'client';
}
