import unWrap from "./unwrap";
import getCleanText from "./getCleanText";
const mergedTags = ["SPAN","B","STRONG","BOLD","U","EM","I","ITALIC","S","SUB","SUP","STRIKE","DEL","SUB","SUP","FONT","SPAN","B","STRONG","BOLD","U","EM","I","ITALIC","S","SUB","SUP","STRIKE","DEL","SUB","SUP","FONT"];
const mergeSiblings = (node: Node) => {
    if (!node) return;
    let child: Node | null = node;
    while (child) {
        const next = child.nextSibling;
        if (child.nodeType === Node.TEXT_NODE && typeof child.textContent === "string" && !getCleanText(child.textContent)) {
            const removedChild = child;
            child = child.previousSibling;
            removedChild.parentElement?.removeChild(removedChild);
        } else if (next && child.nodeType === Node.ELEMENT_NODE && next.nodeType === Node.ELEMENT_NODE && next.nodeName === child.nodeName && mergedTags.includes(child.nodeName)) {
            child.appendChild(next);
            unWrap(next);
            child = child.nextSibling;
        } else if (next && next.nodeType === 1 && typeof next.textContent === "string" && !getCleanText(next.textContent) && !(next as HTMLElement).getAttribute("data-selection-flag")) {
            const tempElHolder: Node = next;
            child = tempElHolder.nextSibling;
            tempElHolder.parentNode?.removeChild(tempElHolder);
        } else if (next && next.nodeType === 1) {
            const tempElHolder: Node = next;
            mergeSiblings(next);
            child = tempElHolder.nextSibling;
        } else {
            child = child.nextSibling;
        }

    }

}
// const dirs: string[] = ["nextSibling", "previousSibling"];
// dirs.forEach(dir => {
//     let currect: any = child;
//     let nextSibling = currect[dir];
//     while (nextSibling) {
//         if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE && !getCleanText(nextSibling.textContent)) {
//             let temp = nextSibling;
//             nextSibling = nextSibling[dir];
//             temp.parentElement.removeChild(temp);
//         } else {
//             nextSibling = nextSibling[dir];
//         }
//     }
//     nextSibling = currect[dir];
//     while (nextSibling) {
//         if (nextSibling && nextSibling[dir] && nextSibling[dir].nodeType === Node.ELEMENT_NODE && nextSibling.nodeType === Node.ELEMENT_NODE && (nextSibling as Element).tagName === nextSibling[dir].tagName && !nextSibling[dir].getAttribute("data-selection-flag")) {
//             let temp: Element = nextSibling;
//             nextSibling = nextSibling[dir];

//             if (nextSibling === "nextSibling") {
//                 debugger

//                 temp.prepend(nextSibling);
//             } else {
//                 debugger

//                 temp.appendChild(nextSibling);
//             }
//             unWrap(nextSibling);

//             currect.normalize();

//         } else {
//             nextSibling = nextSibling[dir];
//             if (nextSibling && nextSibling.nodeType === Node.ELEMENT_NODE && nextSibling.getAttribute("data-selection-flag")) {
//                 if(dir === "nextSibling"){
//                     nextSibling.previousSibling.appendChild(nextSibling)
//             }else {
//                 nextSibling.nextSibling.prepend(nextSibling)

//             }
//         }
//         }

//     }
// })

//})
//}
export default mergeSiblings;