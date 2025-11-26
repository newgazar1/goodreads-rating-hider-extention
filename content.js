const DEFAULT_ENABLED = true;
const STORAGE_KEY = "grHideRatingsEnabled";

function applyState(enabled) {
  const html = document.documentElement;
  if (!html) return;

  if (enabled) {
    html.classList.add("gr-hide-ratings");
  } else {
    html.classList.remove("gr-hide-ratings");
  }
}

// On first load, apply stored state
chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_ENABLED }, (data) => {
  const enabled = data[STORAGE_KEY];
  applyState(enabled);
});

// Listen for changes from the popup
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") return;
  if (!changes[STORAGE_KEY]) return;

  const newValue = changes[STORAGE_KEY].newValue;
  applyState(newValue);
});
