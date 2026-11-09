import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
}

export const prefersReducedMotion = () => window.matchMedia(query).matches

export const useReducedMotion = () => useSyncExternalStore(subscribe, prefersReducedMotion)
