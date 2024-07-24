console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background script:", request);

    if (request.action === "updateCounts") {
        updateCounts(request.data)
            .then(response => {
                sendResponse(response);
            })
            .catch(error => {
                console.error("Error updating counts:", error);
                sendResponse({ success: false, error: error.message });
            });
        return true;
    }
});

function updateCounts(data) {
    return new Promise((resolve, reject) => {
        console.log("Updating counts with data:", data);
        setTimeout(() => {
            resolve({ success: true, message: "Counts updated successfully" });
        }, 1000);
    });
}
