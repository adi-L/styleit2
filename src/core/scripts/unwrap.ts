import replaceNode from "./replaceNode";
export default function unWrap(element:Node) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const extraContents = range.extractContents();
    replaceNode(element,extraContents);
    return extraContents;
}