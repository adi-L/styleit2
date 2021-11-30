import unWrap from "./unwrap";
import { getTextNodes } from "./getRangeTextNodes";
function createRangeFromNode(node: Node) {
    let range = node.ownerDocument?.createRange();
    if(!range) {
        return;
    }
    try {
        range.selectNode(node);
    } catch (e) {
        range.selectNodeContents(node);
    }
    return range;
}
function rangeIntersectsNode(range: Range, node: Node) {

    if (range.intersectsNode) {
        return range.intersectsNode(node);
    } else {
        const rangeFromNode = createRangeFromNode(node);
        if(!rangeFromNode) return;
        return range.compareBoundaryPoints(Range.END_TO_START,rangeFromNode ) === -1 &&
            range.compareBoundaryPoints(Range.START_TO_END, rangeFromNode) === 1;
    }
}


export default function createWrapperFunction(wrapperEl: Element, range: Range, onWrapNode: Function, onBeforeWrapNode:Function):Node[] {
    const nodesAtSelection:Node[] = [];
    let startNode = range.startContainer,
        endNode = range.endContainer,
        startOffset = range.startOffset,
        endOffset = range.endOffset;
    let container = range.commonAncestorContainer,
        nodes = getTextNodes(container.parentNode || container);
    let index = 0;
    nodes.map((node) => {
        if (rangeIntersectsNode(range, node) && typeof node.textContent === "string" && node.textContent.length > 0) {
            if(typeof onBeforeWrapNode === "function"){
                onBeforeWrapNode(node, index);
            }
            const wrappedNode = wrapNode(node);
            onWrapNode(wrappedNode, index);
            nodesAtSelection.push(wrappedNode)
            index++;
        }
    })
    function wrapNode(node: Node) {
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
        let nextSibling = (parentEl as Element).nextSibling;
        while(nextSibling && nextSibling.nodeType === 1) {
            console.log(nextSibling);
            nextSibling = nextSibling.nextSibling;
        }
        return parentEl;
    };
    return nodesAtSelection;
}