chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  const location = new URL(url);
  console.log('==> url', location);
  if (location.host === 'www.youtube.com') {
    chrome.browserAction.setIcon({ path: '/assets/tick.png' });
  }
  // use `url` here inside the callback because it's asynchronous!
});
