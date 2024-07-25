import { useRef, useState, useEffect } from "react"

// create a book to determine whether we should render the command panel (for selecting a node)
// from list) above or below the component, depending how near the bottom of the screen
// the cursor is

export const useOverflowsScreenBottom = () => {
    // check if some element, stored in the ref, will overflow the bottom of the screen

    const ref = useRef<HTMLDivElement>(null)

    const [ overflows, setOverflows ] = useState(false)

    // we want to calculate the overflow once the panel component has mounted
    useEffect(() => {
        if(ref.current){
            // destructing assignment to get relevant vars
            const { bottom } = ref.current.getBoundingClientRect()
            const { innerHeight } = window;

            setOverflows(bottom > innerHeight)
        }
    }, [])

    return { overflows, ref }
}