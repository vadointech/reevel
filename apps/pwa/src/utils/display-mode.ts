export function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches ||
    (("standalone" in window.navigator) && (!!window.navigator["standalone"]));
}

export function standaloneDocumentChecker() {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (("standalone" in window.navigator) && (!!window.navigator["standalone"]));

    if(isStandalone) {
        document.documentElement.classList.replace("display-browser", "display-standalone");
    }
}