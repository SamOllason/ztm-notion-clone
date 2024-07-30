import { useState, useEffect } from "react";
import { NodeType } from "../utils/types";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import styles from "./CommandPanel.module.css"
import cx from "classnames";

type CommandPanelProps = {
    nodeText: string;
    selectItem: (nodeType: NodeType) => void;
}

type SupportedNodeType = {
    value: NodeType;
    name: string;
}

const supportedNodeTypes: SupportedNodeType[] = [
    { value: "text", name: "Text"},
    { value: "list", name: "List"},
    { value: "page", name: "Page"},
    { value: "heading1", name: "Heading 1"},
    { value: "heading2", name: "Heading 2"},
    { value: "heading3", name: "Heading 3"},
]

export const CommandPanel = ({selectItem, nodeText}: CommandPanelProps) => {

    // need to keep track of what element is currently selected
    const [ selectedItemIndex, setSelectedItemIndex ] = useState(0)

    // once panel is rendered we want to check if it overflows the bottom of the screen
    // and if it does then flip it and render above the node so it fits on screen
    const { overflows, ref } = useOverflowsScreenBottom()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if(event.key === "Enter") {
                // we only know the index of the selected item, so need a map
                selectItem(supportedNodeTypes[selectedItemIndex].value)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        // make sure to remove event listener inside of cleanup
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }

    }, [ selectedItemIndex, selectItem ])

    // whenever nodetext changes we want to update the selected item index
    // so that when user wants to add new node we are make it easier to add new node of the same type
    // that is currently selected
    useEffect(() => {
        // normalise value and remove the slash that the user has entered (which triggers the panel)
        const normalisedValue = nodeText.toLowerCase().replace(/\//, "")
        // need index of the value that matches the normalised value
        setSelectedItemIndex(
            supportedNodeTypes.findIndex(item => item.value.match(normalisedValue))
        )
        
    }, [nodeText])

    return (
        <div 
            ref={ref}
            className= {
                // use styles to control whether panel appears above or below node
                cx(styles.panel, {
                    [styles.reverse] : overflows,
                })
            }
            >
            <div className={styles.title}>Blocks</div>
            <ul>
                {supportedNodeTypes.map((type, index)=>{
                    // if node is selected then we want to highlight it
                    const selected = selectedItemIndex === index;

                    return (
                        <li
                            key={type.value}
                            onClick={() => selectItem(type.value)}
                            className={
                                cx({
                                    [styles.selected]: selected
                                })
                            }
                        >{type.name}</li>
                    )
                })}
            </ul>

        </div>
    )

}