
import setSelectionFlags from '../scripts/setSelectionFlags';
import createSelectionBetweenTwoNodes from '../scripts/createSelectionBetweenTwoNodes';
import createWrapperFunction from '../scripts/createWrapperFunction';
import { splitHtml } from '../scripts/splitHtml';
import Command from '../interfaces/command';
import unWrap from '../scripts/unwrap';
import mergeSiblings from '../scripts/mergeSiblings';
import insertAfter from '../scripts/insertAfter';
// function isSelectionInTag(selector: String) {
//     // Get the current node
//     let currentNode = window.getSelection().focusNode;
//     // While the node is not the editor division
//     if (currentNode.nodeType === 1 && (currentNode as any).closest(selector)) {
//         return true;
//     }
//     return false;
// }
const wrapNodes = (target: Element, command: Command): Element[] | undefined => {
    const { nodeName, splitDom = [] } = command;

    const fromSelection = setSelectionFlags();
    let startFlag, endFlag;
    if (!fromSelection) {
        return;
    }
    startFlag = fromSelection.startFlag;
    endFlag = fromSelection.endFlag;
    const selection: Selection | null = window.getSelection();
    if (!selection) return;
    const range: Range = selection.getRangeAt(0);
    if (range.collapsed) {
        return [];
    }
    const wrapperEl: Element = document.createElement(nodeName as any);
    let isToggle: Boolean;
    const onBeforeWrappNode = (node: Element, index: Number) => {
        if (index === 0) {
            isToggle = !!getClosestSameNode(node, splitDom);
        }
    }
    const onWrapNode = (node: Element) => {
        let parent = getClosestSameNode(node, splitDom);
        while (parent) {
            const toElement = parent;
            parent = getClosestSameNode(node, splitDom);
            if (toElement) {
                const splits = splitHtml(node, toElement);
                if (splits) {
                    const nodes: Node[] = Array.from(splits.center.querySelectorAll(splitDom.join(",")));
                    nodes.forEach((el: Node) => {
                        unWrap(el);
                    });
                    unWrap(splits.center);
                } else {
                    unWrap(toElement);
                }
            }
        }
        if (isToggle) {
            node.setAttribute("data-remove", "true");
        }
    }
    const nodes: Node[] = createWrapperFunction(wrapperEl, range, onWrapNode, onBeforeWrappNode);
    Array.from(target.querySelectorAll("[data-remove]")).forEach(el => unWrap(el));
    if (startFlag && startFlag.nextSibling && startFlag.nextSibling.nodeType === 3 && typeof startFlag.nextSibling.textContent === "string" && !startFlag.nextSibling.textContent.trim()) {
        startFlag.nextSibling.remove();
    }
    if (startFlag.nextSibling && startFlag.nextSibling.nodeType === 1) {
        (startFlag as any).nextSibling.prepend(startFlag);
    }
    if (endFlag && endFlag.previousSibling && endFlag.previousSibling.nodeType === 3 && typeof endFlag.previousSibling.textContent === "string" && !endFlag.previousSibling.textContent.trim()) {
        endFlag.previousSibling.remove();
    }
    if (endFlag.previousSibling && endFlag.previousSibling.nodeType === 1) {
        (endFlag as any).previousSibling.appendChild(endFlag);
    }
    nodes.forEach((node: Node) => {
        if (node && node.parentElement) {
            mergeSiblings(node.parentElement);
        }
    });
    createSelectionBetweenTwoNodes(startFlag, endFlag);
    startFlag.parentNode && startFlag.parentNode.removeChild(startFlag);
    endFlag.parentNode && endFlag.parentNode.removeChild(endFlag);
}

export default wrapNodes;

function getClosestSameNode(node: Element, splitDom: String[]) {
    return node.parentElement?.closest(splitDom.join(","));
}
