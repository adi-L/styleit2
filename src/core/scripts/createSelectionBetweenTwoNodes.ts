export default function createSelectionBetweenTwoNodes(firstNode:Node,secondNode:Node):Range | undefined {
    const selection:Selection | null = window.getSelection();
    if(!selection) return;
    const selectedRange: Range = selection.getRangeAt(0);
    selectedRange.collapse(false);
    selection.removeAllRanges();    
    const selectionRange = new Range(); 
    selectionRange.setStartBefore(firstNode);
    selectionRange.setEndAfter(secondNode);
    selection.addRange(selectionRange);
    return selectionRange
}