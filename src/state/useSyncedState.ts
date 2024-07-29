import { ImmerHook, useImmer } from "use-immer"
import { useRef, useEffect } from "react"

export const useSyncedState = <TState>(
    initialState: TState,
    syncCallBack: (state: TState) => void
): ImmerHook<TState> => {
    const [state, setState] = useImmer(initialState)

    // use a ref to determine whether or not we need to call the callback
    const didMountRef = useRef(false)

    useEffect(() => {
        if(didMountRef.current){
            // only sync state after the component using this hook
            // mounts for the first time
            syncCallBack(state)
        }

        didMountRef.current = true

    }, [state, setState])

    return [ state, setState ]
}