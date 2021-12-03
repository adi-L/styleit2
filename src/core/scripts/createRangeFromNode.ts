export function createRangeFromNode(node: Node) {
    let range = node.ownerDocument?.createRange();
    if (!range) {
        return;
    }
    try {
        range.selectNode(node);
    } catch (e) {
        range.selectNodeContents(node);
    }
    return range;
}
