document.getElementById("updateButton").addEventListener("click", function() {
  chrome.runtime.sendMessage({ action: "updateCounts", data: {} }, function(response) {
      console.log(response.message);
      alert(response.message);
  });
});
