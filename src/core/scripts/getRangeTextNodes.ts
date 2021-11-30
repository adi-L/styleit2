import getCleanText from "./getCleanText";
export function getTextNodes(el:Node) {
    el = el || document.body;
  
    let doc = el.ownerDocument || document,
      walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, null),
      textNodes = [],
      node = walker.nextNode();
  
    while (node) {
      if (typeof node.textContent === "string" && getCleanText(node.textContent)) {textNodes.push(node);}
      node = walker.nextNode();
    }
    return textNodes;
  }
 