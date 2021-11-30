import '../declares'
Text.prototype.closest = function(selector:string):Element | null { 
    if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector;
      }
      
      if (!Element.prototype.closest) {
        Element.prototype.closest = function(s:string) {
          var el = this;
      
          do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement as Element || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
        };
      }
      return null;
}