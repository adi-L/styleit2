 const querySelectorUnderSelection = (querySelector: string) => {
    let selection: Selection | null = window.getSelection();
    let range = selection?.getRangeAt(0);
    const allSelected: HTMLElement[] = [];

    let commonAncestorContainer: HTMLElement | undefined = range?.commonAncestorContainer as HTMLElement;

    if (commonAncestorContainer?.nodeType === 3) {
        commonAncestorContainer = (commonAncestorContainer.parentElement as HTMLElement);
    }
    if (!commonAncestorContainer) {
        return allSelected;
    }
    if(commonAncestorContainer.matches(querySelector)) {
        allSelected.push(commonAncestorContainer);
    }
    const elements = Array.from(commonAncestorContainer.querySelectorAll(querySelector));
    let el;

    for (let i = 0; i < elements.length; i++) {
        el = elements[i];
        // The second parameter says to include the element
        // even if it's not fully selected
        if (selection?.containsNode(el, true)) {
            allSelected.push(el as HTMLElement);
        }
    }
    return allSelected;
};
export default querySelectorUnderSelection;