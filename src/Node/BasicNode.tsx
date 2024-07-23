import { useEffect, useRef, FormEventHandler } from "react"
import { NodeData } from "../utils/types"
// import styes from "./Node.module.css"

type BasicNodeProps = {
    node: NodeData;
    updateFocussedIndex(index:number): void //update the focussed node's index so we know what node is currently focussed
    isFocussed: boolean;
    index: number;
    addNode(node: NodeData, index: number): void;
    removeNodeByIndex(index: number): void;
    changeNodeValue(index: number, value: string): void;
}

export const BasicNode = ({
    node,
    updateFocussedIndex,
    isFocussed,
    index,
    addNode,
    removeNodeByIndex,
    changeNodeValue
}: BasicNodeProps) => {

    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isFocussed){
            nodeRef.current?.focus()
        } else {
            nodeRef.current?.blur()
        }
    }, [isFocussed])

    // if the node content changes we want to update the content of the div
    // so that the view shown to user is kept in sync with the data

    useEffect(()=> {
        if(nodeRef.current && !isFocussed){
            // whenever the node value changes, and if we are not editing the node,
            // then update the value to the changed value (e.g. when page loads)
            nodeRef.current.textContent = node.value
        }
    } , [node])

    // 10.23
    // const handleInput: FormEventHandler<HTMLDivElement> = ({currentTarget})

    return (
        <div
            // onInput={handleInput}
            contentEditable
            // we will let the browser control the state of this component
            // and we will use refs to update the data
            suppressContentEditableWarning

            />
    )
}