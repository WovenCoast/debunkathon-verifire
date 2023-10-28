console.log("Hello from extract_text.js");

function sendToServer(selection) {
  console.log("Sending response");
  console.log(selection);
  // $.ajax({
  //   type: "POST",
  //   url: "http://localhost:5000/query",
  //   data: JSON.stringify({ text: selection }),
  //   contentType: "application/json",
  //   dataType: "json",
  //   success: function (data) {
  //     console.log(data);
  //     // chrome.storage.sync.set({ data: data }, function () {
  //     //   console.log("Value is set to " + data);
  //     // });
  //   },
  // });
  // send the request using xhr instead of ajax
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://localhost:5000/query");
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify({ text: selection }));
  // xhr.onload = function () {
  //   console.log("Loaded");
  //   console.log(xhr.response);
  // };
  // xhr.onerror = function () {
  //   console.log("Error");
  //   console.log(xhr.response);
  // };
  chrome.storage.session.set({ selection }, function () {
    console.log("Value is set to " + selection);
    chrome.runtime.sendMessage(
      { message: "fact-check-process" },
      function (response) {
        console.log(response);
      }
    );
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received!");
  console.log(request);
  console.log(sender);
  console.log(sendResponse);
  if (request.message === "fact-check") {
    let selection = window.getSelection().toString();
    console.log(selection);
    // sendToServer(selection);
    sendResponse({ selection: selection });
  }
});

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    console.log("DOM fully loaded and parsed");
    //   chrome.runtime.sendMessage(
    //     { message: "clicked_browser_action" },
    //     function (response) {
    //       console.log(response);
    //     }
    //   );
  }
});
