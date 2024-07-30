import { NodeData } from "../utils/types"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react" 
import { useAppState } from "../state/AppStateContext"
import { supabase } from "../supabaseClient"
import cx from "classnames"
import styles from "./Node.module.css"

type PageNodeProps = {
    node: NodeData;
    isFocussed: boolean;
    index: number
}

export const PageNode = ({ node, isFocussed, index }: PageNodeProps) => {
    // this component will navigate to the page url when it is clicked on
    const navigate = useNavigate()

    // we want the node to show the title of the underlying page
    const [ pageTitle, setPageTitle ] = useState("")

    const { removeNodeByIndex } = useAppState()
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
           event.preventDefault()
           
           if(event.key === "Backspace"){
            removeNodeByIndex(index)
           }

           if(event.key === "Backspace"){
            navigate(`/${node.value}`)
           }
        }

        if(isFocussed){
            window.addEventListener("keydown", handleKeyDown)
        } else {
            window.removeEventListener("keydown", handleKeyDown)
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isFocussed, removeNodeByIndex, index, navigate, node])

    useEffect(() => {
        const fetchPageTitle = async () => {
            const { data } = await supabase.from("page").select("title").eq("slug", node.value).single()

        }

        if(node.type === "page" && node.value){
            fetchPageTitle()
        }

    }, [node.type, node.value])

    const navigateToPage = () => {
        navigate(`/${node.value}`)
    }

    return(
        <div 
            onClick={navigateToPage}
            className={
                cx(styles.node, styles.page, {
                    [styles.focused] : isFocussed
                })
            }
            >
            📄 { pageTitle }  
            </div>
    )
}