import { useSyncExternalStore } from 'react'
import { DepthSnapshot, getDepthSnapshot, subscribeDepth } from '../utils/depth'

/** The whole depth snapshot; re-renders on every change. Prefer `useDepthValue`. */
export const useDepth = () => useSyncExternalStore(subscribeDepth, getDepthSnapshot)

/** Re-renders only when the selected value changes; return a primitive or a stable reference. */
export const useDepthValue = <T,>(selector: (snapshot: DepthSnapshot) => T): T =>
    useSyncExternalStore(subscribeDepth, () => selector(getDepthSnapshot()))
