const ytDL = require('ytdl-core');
const downloadFile = (url) => {
  console.log('==> downloadFile', url);
  const isValidUrl = ytDL.validateURL(url);
  console.log('==> isValid', isValidUrl);
  console.log('==> id', ytDL.getURLVideoID(url));
  ytDL.getInfo(url).then((res) => console.log('res', res));
};

export class App {
  public render() {
    window.addEventListener('DOMContentLoaded', () => {
      console.log('==> DOMContentLoaded');
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const url = tabs[0].url;
        const location = new URL(url);
        console.log('==> location', location);
        if (location.host === 'www.youtube.com') {
          const downloaderSection = document.getElementById('download-section');
          downloaderSection.innerHTML = '<button id="download-button">Download</button>';
          const downloadButton = document.getElementById('download-button');
          downloadButton.onclick = () => {
            const file = downloadFile(location.href);
          };
        }
      });
    });
  }
}
