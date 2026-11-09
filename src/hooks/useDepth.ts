import { useSyncExternalStore } from 'react'
import { getDepthSnapshot, subscribeDepth } from '../utils/depth'

/** Current dive depth, zone and section; re-renders when the rounded depth changes. */
export const useDepth = () => useSyncExternalStore(subscribeDepth, getDepthSnapshot)
