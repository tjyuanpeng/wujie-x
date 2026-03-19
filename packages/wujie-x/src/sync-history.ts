import { getWujieById, idToSandboxCacheMap } from "./common";

let timer = null;
export function syncHistoryToMain(appWindow: Window): void {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const sandbox = appWindow.__WUJIE
    let subFullPath = appWindow.location.pathname + appWindow.location.search + appWindow.location.hash
    const result = sandbox.syncHistory === true ? subFullPath : sandbox.syncHistory.toMain?.(sandbox.id, subFullPath) ?? subFullPath
    const mainFullPath = window.location.pathname + window.location.search + window.location.hash;
    if (result === false || result === mainFullPath) {
      return
    }
    window.history.replaceState(window.history.state, "", result);
    window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
  });
}

let timer2 = null;
export function syncHistoryToSub(): void {
  clearTimeout(timer2);
  timer2 = setTimeout(() => {
    const mainFullPath = window.location.pathname + window.location.search + window.location.hash;
    for (const item of idToSandboxCacheMap.values()) {
      const sandbox = item.wujie
      if (!sandbox || !sandbox.syncHistory) {
        continue
      }
      const appWindow = sandbox.iframe.contentWindow;
      const result = sandbox.syncHistory === true ? mainFullPath : sandbox.syncHistory.toSub?.(sandbox.id, mainFullPath) ?? mainFullPath
      let subFullPath = appWindow.location.pathname + appWindow.location.search + appWindow.location.hash;
      if (result === false || result === subFullPath) {
        continue
      }
      appWindow.history.replaceState(appWindow.history.state, "", result);
      appWindow.dispatchEvent(new PopStateEvent("popstate", { state: appWindow.history.state }));
    }
  });
}

let listened = false;
export function listenMainHistoryChange(): void {
  if (listened) {
    return;
  }
  listened = true;

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    syncHistoryToSub();
  };
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    originalPushState.apply(this, args);
    syncHistoryToSub();
  };
  window.addEventListener("popstate", () => {
    syncHistoryToSub();
  });
}
