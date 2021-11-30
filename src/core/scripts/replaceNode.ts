export default function replaceNode (element:Node,replacementNode:Node) {
    if (element.parentNode) {
        element.parentNode.insertBefore(replacementNode, element);
        element.parentNode.removeChild(element);
      return replacementNode;
    }
  };