chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.sendMessage(activeInfo.tabId, { from: "activated" }).then((response) => setIcon(response)).catch((e) => handleError(e))
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.tabs.sendMessage(tabId, { from: "updated" }).then((response) => setIcon(response)).catch((e) => handleError(e))
});

/**
 * set action icon from meta tag status.
 * @param {object} response 
 */
function setIcon(response) {
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