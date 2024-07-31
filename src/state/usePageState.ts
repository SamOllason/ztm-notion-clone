import { NodeData, NodeType, Page } from "../utils/types"
import { arrayMove } from "@dnd-kit/sortable"
import { useSyncedState } from "./useSyncedState"
import { updatePage } from "../utils/updatePage"

export const usePageState = (initialState: Page) => {
    // useImmer is similar to useState but makes it working with
    // complex objects in state a bit easier

    // const [ page, setPage ] = useImmer<Page>(initialState) // note: replaced this with useSyncedState
    const [ page, setPage ] = useSyncedState<Page>(initialState, updatePage)

    const addNode = (node: NodeData, index: number) => {
        // we can mutate this 'draft' variable (representing state) and edit it 'in place',
        // this is where immer is helpful - instead of having to worry about creating an immutable object etc
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

    const reorderNodes = (id1: string, id2: string) => {
        setPage((draft) => {
            // get index of each node that are being re-ordered

            const index1 = draft.nodes.findIndex(node => node.id === id1)
            const index2 = draft.nodes.findIndex(node => node.id === id2)

            draft.nodes = arrayMove(draft.nodes, index1, index2)

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
        setCoverImage,
        reorderNodes
    }
}
