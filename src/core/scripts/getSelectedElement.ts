export default function getSelectedElement():Element | undefined {
    let selection:Selection | null = document?.getSelection();
    if (selection) {
      let ancNode:Node | null = selection.focusNode;
      if (ancNode !== null) {
        while (ancNode && ancNode.nodeType === 3) {
          ancNode = ancNode.parentNode;
        }
        return ancNode as Element || undefined;
      }
      return;
    }
  }