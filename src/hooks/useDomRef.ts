import { useCallback, useRef } from 'react'
import { Nullable } from '../types'

export function useDomRef<T extends HTMLElement>() {
  const ref = useRef<Nullable<T>>(null)

  const setRef = useCallback((e:T) => {
    ref.current = e
  }, [])

  return { ref, setRef }
}
