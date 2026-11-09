import { useSyncExternalStore } from 'react'
import { DepthSnapshot, getDepthSnapshot, subscribeDepth } from '../utils/depth'

/** Current dive depth, zone and section; re-renders when the rounded depth changes. */
export const useDepth = () => useSyncExternalStore(subscribeDepth, getDepthSnapshot)

/**
 * One derived value from the depth store; re-renders only when that value changes.
 * The selector must return a primitive (or a stable reference such as `marks`).
 */
export const useDepthValue = <T,>(selector: (snapshot: DepthSnapshot) => T): T =>
    useSyncExternalStore(subscribeDepth, () => selector(getDepthSnapshot()))
