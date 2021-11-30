interface ReturnResult {
    startFlag: Element;
    endFlag: Element;
}
export default function setSelectionFlags(): ReturnResult | null {
    const selection: Selection | null = window.getSelection();
    if (!selection) return null;
    const selectedRange: Range = selection.getRangeAt(0);
    const startFlag: Element = document.createElement("span");
    startFlag.setAttribute("data-selection-flag", "true");
    selectedRange.insertNode(startFlag);
    selectedRange.collapse(false);
    selection.removeAllRanges();
    const endFlag: Element = document.createElement("span");
    endFlag.setAttribute("data-selection-flag", "true");
    selectedRange.insertNode(endFlag);
    const range: Range = new Range();
    range.setStartBefore(startFlag);
    range.setEndAfter(endFlag);
    selection.addRange(range);
    return { startFlag, endFlag };
}