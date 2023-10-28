function submitText(query) {
  // $.ajax({
  //   type: "POST",
  //   url: "http://localhost:5000/query",
  //   data: JSON.stringify({ text: MediaQueryListEvent }),
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
  // xhr.send(JSON.stringify({ text: query }));
  // xhr.onload = function () {
  //   console.log("Loaded");
  //   console.log(xhr.response);
  // };
  // xhr.onerror = function () {
  //   console.log("Error");
  //   console.log(xhr.response);
  // };
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
  // send the request using the browser's built in fetch api
}

// // chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// //   // chrome.console.log(changeInfo, tab, chrome);
// //   console.log(changeInfo, tab, chrome);
// //   if (changeInfo?.status != null) {
// //   }
// // });

// // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// //   console.log(message);
// //   console.log(sender);
// //   console.log(sendResponse);
// //   // if (message === "copy-that-text") {
// //   //   let selection = window.getSelection().toString();
// //   //   console.log(selection);
// //   //   sendResponse({ selection: selection });
// //   // }
// // });

// chrome.runtime.onInstalled.addListener(() => {
//   // if (chrome.action.isEnabled == true) {
//   //   chrome.action.disable();
//   // } else {
//   //   chrome.action.enable();
//   // }

//   // chrome.tabs.executeScript(
//   //   {
//   //     code: "window.getSelection().toString();",
//   //   },
//   //   (selection) => {
//   //     console.log(selection);
//   //     // document.getElementById("output").value = selection[0];
//   //     submitText(selection[0]);
//   //   }
//   // );
//   chrome.runtime.sendMessage(
//     { message: "clicked_browser_action" },
//     function (response) {
//       console.log(response);
//     }
//   );
// });

chrome.action.onClicked.addListener((tab) => {
  console.log("Clicked");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: "window.getSelection().toString();",
  });
  console.log("Sending message");
  chrome.runtime.sendMessage({ message: "copy-that-text" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received a message");
  console.log(request, sender, sendResponse);
  if (request.message === "fact-check-process") {
    submitText(request.data).then((result) => {
      console.log(result);
      sendResponse(result);
    });
    return true;
  }
});
