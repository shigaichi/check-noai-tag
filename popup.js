chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url

    if (!url.startsWith("http") || url.startsWith("https://chrome.google.com/webstore")) {
        document.getElementById("status").textContent = "This extension doesn't work on Chrome Web Store or browser settings pages."
        return
    }

    chrome.tabs.sendMessage(tabs[0].id, { from: "popup" }).then((response) => updateIconAndStatus(response)).catch((e) => handleError(e))
});
/**
 * set action icon from meta tag status.
 * @param {object} response noai checking result from service worker
 */
function updateIconAndStatus(response) {
    if (response.isNoai || response.isNoimageai) {
        document.getElementById('status').innerText = 'This page refuses AI usage.'
        document.getElementById('status').classList.add('noai')
    } else {
        document.getElementById('status').innerText = 'This page allows AI usage.'
        document.getElementById('status').classList.add('allowed')
    }

    const iconName = response.isNoai || response.isNoimageai ? "noai" : "search"
    chrome.action.setIcon({ path: { 16: `images/${iconName}16.png`, 32: `images/${iconName}32.png`, 48: `images/${iconName}48.png`, 128: `images/${iconName}128.png` } })
}

/**
 * ignore not establish connection error and log other errors.
 * @param {Error} e error thrown by sendMessage
 */
function handleError(e) {
    if (e.message.includes("Could not establish connection")) {
        console.log(e)
    } else {
        console.error(e)
    }
}