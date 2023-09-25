chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        const robots = Array.from(document.querySelectorAll('meta[name="robots"]'))
        const isNoai = robots.some((node) => node.getAttribute("content").toLowerCase().includes("noai"))
        const isNoimageai = robots.some((node) => node.getAttribute("content").toLowerCase().includes("noimageai"))

        sendResponse({ isNoai: isNoai, isNoimageai: isNoimageai })
    }
);