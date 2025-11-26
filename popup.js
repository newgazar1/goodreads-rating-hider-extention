const STORAGE_KEY = "grHideRatingsEnabled";
const DEFAULT_ENABLED = true;

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const statusText = document.getElementById("statusText");

  function updateStatus(enabled) {
    statusText.textContent = enabled
      ? "Ratings are hidden on Goodreads."
      : "Ratings are visible on Goodreads.";
  }

  // Load current state
  chrome.storage.sync.get({ [STORAGE_KEY]: DEFAULT_ENABLED }, (data) => {
    const enabled = data[STORAGE_KEY];
    toggle.checked = enabled;
    updateStatus(enabled);
  });

  // When user toggles switch
  toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ [STORAGE_KEY]: enabled }, () => {
      updateStatus(enabled);
      // content.js listens to this change and updates the page
    });
  });
});
