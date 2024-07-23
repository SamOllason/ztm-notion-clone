import { useEffect, useRef, FormEventHandler, KeyboardEventHandler} from "react"
import { NodeData } from "../utils/types"
import { nanoid } from "nanoid";
import styles from "./Node.module.css"

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
            // then update the value to the changed value automatically (e.g. when page loads)
            nodeRef.current.textContent = node.value
        }
    } , [node])

    const handleInput: FormEventHandler<HTMLDivElement> = ({currentTarget}) => {
        const { textContent } = currentTarget;
        changeNodeValue(index, textContent || '')
    }

    // focus the current node if it has been clicked
    const handleClick = () => {
        updateFocussedIndex(index)
    }

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        const target = event.target as HTMLDivElement; // need this as type information from event

        if(event.key === "Enter"){
            event.preventDefault();
            if(target.textContent?.[0] === "/") {
                // in this case user is selecting the node type from a list
                // so dont do anything else
                return;
            }
            // if user is entering a new line, then we add node of the *current* node type
            // e.g. if user adding bullet points would add another bullet point below
            addNode({ type: node.type, value: "", id: nanoid()}, index+1)
            // we want to focus on this new node, so that after user has pressed enter
            // their cursor and focus is at the end of the new line
            updateFocussedIndex(index+1)
        }

        if(event.key === "Backspace"){
            if(target.textContent?.length ===0) {
                // if there is no content left, then remove the node
                event.preventDefault();
                removeNodeByIndex(index);
                updateFocussedIndex(index -1); // now focus on the previous node in line above
                return;
            } else if(window?.getSelection()?.anchorOffset === 0) {
                // if the node is not empty, but we are at the beginning of the line
                // then delete the node above
                event.preventDefault();
                removeNodeByIndex(index-1); // remove previous node
                updateFocussedIndex(index-1) // add focus to the one before the previous node
            }
        }
    }

    return (
        <div
            onInput={handleInput}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            contentEditable
            // we will let the browser control the state of this component
            // and we will use refs to update the data
            suppressContentEditableWarning
            ref={nodeRef} // use this to keep track of focussed state and access DOM-managed state
            className={styles.node}
        />
    )
}