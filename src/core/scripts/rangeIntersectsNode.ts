import { createRangeFromNode } from "./createRangeFromNode";

export function rangeIntersectsNode(range: Range, node: Node) {
    if (range.intersectsNode) {
        return range.intersectsNode(node);
    } else {
        const rangeFromNode = createRangeFromNode(node);
        if (!rangeFromNode)
            return;
        return range.compareBoundaryPoints(Range.END_TO_START, rangeFromNode) === -1 &&
            range.compareBoundaryPoints(Range.START_TO_END, rangeFromNode) === 1;
    }
}
