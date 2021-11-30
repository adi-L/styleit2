function insertAfter(newNode:Node, existingNode:Node) {
    if(existingNode.parentElement)
    existingNode.parentElement.insertBefore(newNode, existingNode.nextSibling);
}
export default insertAfter