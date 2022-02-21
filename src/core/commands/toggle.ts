import Command from "../interfaces/Command";
import unWrap from "../scripts/unwrap";
import createWrapperFunction from "../scripts/createWrapperFunction";
import mergeSiblings from "../scripts/mergeSiblings";
import { splitHtml } from "../scripts/splitHtml";
import querySelectorUnderSelection from "../scripts/querySelectorUnderSelection";

export default function toggle(command: Command): void {
    const { nodeName, splitDom } = command;
    const selection: Selection | null = window.getSelection();
    if (!selection) return;
    const range: Range = selection.getRangeAt(0);
    if (range.collapsed) {
        return;
    }
    const wrapperEl: Element = document.createElement(nodeName as any);
    if (!splitDom) return;
    const toggled = querySelectorUnderSelection(splitDom.join(","));
    const nodes: Node[] = createWrapperFunction(wrapperEl, range);
    if (toggled.length > 0) {
        nodes.forEach(node => {
            splitDom?.forEach(querySelector => {
                let closestNode = node?.parentElement?.closest(querySelector);
                while (closestNode) {
                    const result = splitHtml(node, closestNode);
                    if (result) {
                        Array.from(result.center.querySelectorAll(querySelector)).forEach(child => {
                            unWrap(child as Node);
                        })
                        unWrap(result.center);
                    }
                    closestNode = closestNode?.parentElement?.closest(querySelector);
                }

            })
        });
        nodes.forEach(node => {
            unWrap(node);
        });
    }
    if (range.commonAncestorContainer) {
        Array.from(range.commonAncestorContainer.childNodes).forEach((node: Node) => {
            mergeSiblings(node);
        });
    }
}