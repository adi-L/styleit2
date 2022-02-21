
import setSelectionFlags from '../scripts/setSelectionFlags';
import createSelectionBetweenTwoNodes from '../scripts/createSelectionBetweenTwoNodes';
import Command from '../interfaces/command';
import toggle from '../commands/toggle';
import override from '../commands/override';
const wrapNodes = (target: Element, command: Command): Element[] | undefined => {

    const fromSelection = setSelectionFlags();
    let startFlag, endFlag;
    if (!fromSelection) {
        return;
    }
    startFlag = fromSelection.startFlag;
    endFlag = fromSelection.endFlag;

    const modes = {
        toggle,
        override
    }
    if (command.scheme === "toggle") {
        modes.toggle(command)
    }
    while (startFlag && startFlag.nextSibling && startFlag.nextSibling.nodeType === 3 && typeof startFlag.nextSibling.textContent === "string" && !startFlag.nextSibling.textContent.trim()) {
        startFlag.nextSibling.remove();
    }
    if (startFlag.nextSibling && startFlag.nextSibling.nodeType === 1) {
        (startFlag as any).nextSibling.prepend(startFlag);
    }
    while (endFlag && endFlag.previousSibling && endFlag.previousSibling.nodeType === 3 && typeof endFlag.previousSibling.textContent === "string" && !endFlag.previousSibling.textContent.trim()) {
        endFlag.previousSibling.remove();
    }
    if (endFlag.previousSibling && endFlag.previousSibling.nodeType === 1) {
        (endFlag as any).previousSibling.appendChild(endFlag);
    }
  
    createSelectionBetweenTwoNodes(startFlag, endFlag);
    startFlag.parentNode && startFlag.parentNode.removeChild(startFlag);
    endFlag.parentNode && endFlag.parentNode.removeChild(endFlag);
}

export default wrapNodes;
