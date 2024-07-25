import { useFocussedNodeIndex } from "./usedFocussedNodeIndex";
import { Cover } from "./Cover";
import { Spacer } from "./Spacer";
import { Title } from "./Title";
import { nanoid } from "nanoid"
import { useAppState } from "../state/AppStateContext";
import { NodeTypeSwitcher } from "../Node/NodeTypeSwitcher";

export const Page = () => {

    const { title, nodes, addNode, setTitle } = useAppState()
   
    const [ focussedNodeIndex, setFocussedNodeIndex ] = useFocussedNodeIndex({nodes});

    // *** NOTE: we get these values from the UseAppState hook instead now: ***
    // const [ nodes, setNodes ] = useState<NodeData[]>([]);
    // const [ title, setTitle ] =  useState("Default Title")
    // const addNode = (node: NodeData, index: number) => {
    //     // this function updates the state, so doesnt return anything
    //      // create new array using spread operator from node state
    //      // so that we can easily mutate it
    //     const newNodes = [...nodes]
    //     newNodes.splice(index, 0, node)
    //     setNodes(newNodes)
    // } 
    // const removeNodeByIndex = (index: number) => {
    //     const newNodes = [...nodes]
    //     newNodes.splice(index, 1)
    //     setNodes(newNodes)
    // }
    // const changeNodeValue = (index: number, newValue: string) => {
    //     const newNodes = [...nodes]
    //     newNodes[index].value = newValue
    //     setNodes(newNodes)
    // }

    return (
        <>
            <Cover/>
            <div>
                {/* pass in addNode function as we want to add nodes as user finished editing title */}
                <Title addNode={addNode} title={title} changePageTitle={setTitle}/>
                {nodes.map((node, index) => (
                    <NodeTypeSwitcher
                        key={node.id}
                        node={node}
                        isFocussed={focussedNodeIndex === index}
                        updateFocussedIndex={setFocussedNodeIndex}
                        index={index}

                        // note: we removed these as they now come from the AppStateContext
                        // addNode={addNode}
                        // removeNodeByIndex={removeNodeByIndex}
                        // changeNodeValue={changeNodeValue}
                        />
                ))}
                <Spacer
                    handleClick={() => {
                        // want to add this element as the last in the list, at bottom of page
                        addNode({ type: "text", value: "", id: nanoid()}, nodes.length)
                    }}
                    showHint={!nodes.length}
                />
            </div>
        </>
    )
}