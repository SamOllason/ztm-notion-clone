import { useEffect, useRef } from "react"
import{ NodeData } from "../utils/types"
import styles from "./Title.module.css"
import { nanoid } from "nanoid"

type TitleProps = {
    title: string;
    changePageTitle(title: string): void;
    addNode(node: NodeData, index: number): void;
}

export const Title = ({title, changePageTitle, addNode} : TitleProps) => {

    // want this ref to be immutable, so pass null as initial valyue
    const headerRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const isFocussed = document.activeElement === headerRef.current
        // if its focussed this means the user ie currently editing it
        // if its not focussed, and the title changes, this must be on page load
        if(!isFocussed && headerRef.current){
            headerRef.current.textContent = title
        }
    },
     [title])

    return (<div className={styles.container}>
        <h1 className={styles.title}
            // we want users to be able to add a new node to the page
            // when they press enter while editing the header
            onKeyDown={(event) => {
                if(event.key === "Enter"){
                    event.preventDefault();
                    addNode({type: "text", id: nanoid(), value: ""},0)
                }
            }}
            contentEditable //this makes the h1 element editable like a text area
            suppressContentEditableWarning // allow browser to handle internal state

            // onInput is unidirectional, we also want to change the page's title on load (if set already)
            // do thsi with side effect
            onInput={(e) => changePageTitle(e.currentTarget.textContent || "")}
        >{title}</h1>

    </div>)
}