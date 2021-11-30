import unWrap from "./unwrap";
import getCleanText from "./getCleanText";
const mergeSiblings = (node: Element) => {
    if(!node) return;
    let child = node.childNodes.length > 0 ? node.childNodes[0] : null;
    while(child) {
        debugger
        const next = child.nextSibling;
        if (child.nodeType === Node.TEXT_NODE && typeof child.textContent ==="string" && !getCleanText(child.textContent)) {
            const removedChild = child;
            child = child.previousSibling;
            removedChild.remove();
        } else if (next && child.nodeType === Node.ELEMENT_NODE && next.nodeType === Node.ELEMENT_NODE && next.nodeName === child.nodeName) {
            child.appendChild(next);
            unWrap(next);
            child = child.nextSibling;
        }else {
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