import { NodeData, NodeType, Page } from "../utils/types"
import { useImmer } from "use-immer"

export const usePageState = (initialState: Page) => {
    // useImmer is similar to useState but makes it working with
    // complex objects in state a bit easier
    const [ page, setPage ] = useImmer<Page>(initialState)

    const addNode = (node: NodeData, index: number) => {
        // we can mutate this 'draft' variable (representing state) and edit it 'in place',
        // this is where immer is helpful - instead of having to 
        // worry about creating an immutable object etc
        setPage((draft) => {
            draft.nodes.splice(index, 0, node)
        });
    }

    const removeNodeByIndex = (nodeIndex: number) => {
        setPage(draft => {
            draft.nodes.splice(nodeIndex, 1)
        })
    }

    const changeNodeValue = (nodeIndex: number, value: string) => {
        setPage(draft => {
            draft.nodes[nodeIndex].value = value
        })  
    }

    const changeNodeType = (nodeIndex: number, type: NodeType) => {
        setPage(draft => {
            draft.nodes[nodeIndex].type = type
            // if the type is now different it is very likely that the value is no longer valid
            draft.nodes[nodeIndex].value = ""
        })
    }

    const setNodes = (nodes: NodeData[]) => {
        setPage(draft => {
            draft.nodes = nodes
        })
    }

    const setTitle = (title: string) => {
        setPage(draft => {
            draft.title = title
        })
    }

    const setCoverImage = (coverImage: string) => {
        setPage(draft => {
            draft.cover = coverImage
        })
    }

    return {
        nodes: page.nodes,
        title: page.title,
        cover: page.cover,
        changeNodeType,
        changeNodeValue,
        addNode,
        removeNodeByIndex,
        setNodes,
        setTitle,
        setCoverImage
    }
}
