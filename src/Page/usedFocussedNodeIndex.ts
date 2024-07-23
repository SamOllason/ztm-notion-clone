import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { NodeData } from "../utils/types";

type UseFocussedNodeIndexProps = {
    nodes: NodeData[];
}

// this hook keeps track of the focussed node based on users pressing arrow up/down keys
export const useFocussedNodeIndex = ({nodes}: UseFocussedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
    const [ focussedNodeIndex, setFocussedNodeIndex ] =  useState(0);

    // inside the hook define a useEffect to keep track of the nodes and
    // subscribe to keydown event listeners to detect when user has pressed arrow up
    useEffect(() => {

        const onKeyDown = (event: KeyboardEvent) => {
            if(event.key === "ArrowUp") {
                // make sure index doesnt go below 0
                setFocussedNodeIndex(index => Math.max(index - 1,0))
            }

            if(event.key === "ArrowDown") {
                // make sure index doesnt become larger than length of the array
                setFocussedNodeIndex(index => Math.min(index + 1,nodes.length -1))
            }
        } 

        document.addEventListener("keydown", onKeyDown)

        // this function is called when the component is unmounted for cleanup
        return () => document.removeEventListener("keydown", onKeyDown)

    }, [ nodes ])

    // we return a tuple so the consumer of this hook can specify
    // the names of the fields that are returned by the hook
    return [focussedNodeIndex, setFocussedNodeIndex]

}
