export {};
declare global {
    interface Text {
        closest(selector: String): Element | null;
    }
    interface Element {
        msMatchesSelector: any;
    }
  }
  