
import { NodeType, NodeData } from "../utils/types";
import { BasicNode } from "./BasicNode";
import { PageNode } from "./PageNode"
// to begin with, at least, same props as BasicNode
type NodeTypeSwitcherProps = {
    node: NodeData;
    updateFocussedIndex(index:number): void //update the focussed node's index so we know what node is currently focussed
    isFocussed: boolean;
    index: number;
}

const TEXT_NODE_TYPES: NodeType[] = [ "text", "list", "heading1", "heading2", "heading3" ]

export const NodeTypeSwitcher = ({
    node,
    isFocussed,
    index,
    updateFocussedIndex
}: NodeTypeSwitcherProps) => {
    // for nodes that can be considered like a regular text node
    if(TEXT_NODE_TYPES.includes(node.type)) {
        // just render the basic node component
        return <BasicNode
            node={node}
            index={index}
            isFocussed={isFocussed}
            updateFocussedIndex={updateFocussedIndex}
        />  
    } 

    if(node.type === "page"){
        return <PageNode node={node} index={index} isFocussed={isFocussed}/>
    }

    return null
}