const button = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    button.style.backgroundColor = color;
})

button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
        active: true, currentWindow: true
    });
    
    if (tab.url.includes('chrome://')) {
        console.log('can`t run on start page')
    } else {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: setPageBackgroundColor,
        });
    }
});

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    })
}