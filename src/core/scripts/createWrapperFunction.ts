import unWrap from "./unwrap";
import { getTextNodes } from "./getRangeTextNodes";
import { rangeIntersectsNode } from "./rangeIntersectsNode";
export default function createWrapperFunction(wrapperEl: Element, range: Range, onWrapNode?: Function): Node[] {
    const nodesAtSelection: Node[] = [];
    let startNode = range.startContainer,
        endNode = range.endContainer,
        startOffset = range.startOffset,
        endOffset = range.endOffset;
    let container = range.commonAncestorContainer,
        nodes = getTextNodes(container.parentNode || container);
    let index = 0;
    nodes.map((node) => {
        if (rangeIntersectsNode(range, node) && typeof node.textContent === "string" && node.textContent.length > 0) {
            const wrappedNode = wrapNode(node);
            if (typeof onWrapNode === "function") {
                onWrapNode(wrappedNode, index);
            }
            if (range.intersectsNode(wrappedNode)) {
                nodesAtSelection.push(wrappedNode)
            }
            index++;
        }
    })
    function wrapNode(node: Node): Node {
        let currentRange: Range = document.createRange(),
            currentWrapper: Node = wrapperEl.cloneNode();

        currentRange.selectNodeContents(node);
        if (node === startNode && startNode.nodeType === 3) {
            currentRange.setStart(node, startOffset);
            startNode = currentWrapper;
            startOffset = 0;
        }
        if (node === endNode && endNode.nodeType === 3) {
            currentRange.setEnd(node, endOffset);
            endNode = currentWrapper;
            endOffset = 1;
        }
        currentRange.surroundContents(currentWrapper);
        let parentEl = currentWrapper;
        while (parentEl && parentEl.parentElement && parentEl.textContent === parentEl.parentElement.textContent && parentEl.nodeName === parentEl.parentElement.nodeName) {
            const elementToUnwrap = parentEl;
            parentEl = parentEl.parentElement;
            unWrap(elementToUnwrap);
        }
        return parentEl;
    };
    return nodesAtSelection;
}