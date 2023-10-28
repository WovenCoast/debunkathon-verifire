function onFactCheckButtonClick() {
  document.querySelector("#status").textContent = "Loading...";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // chrome.tabs.sendMessage(tabs[0].id, { message: "fact-check" });
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(
      activeTab.id,
      { message: "fact-check" },
      (response) => {
        console.log(response);
        document.querySelector("#selection-text").textContent =
          response.selection;

        chrome.runtime.sendMessage(
          {
            message: "fact-check-process",
            data: response.selection,
          },
          (response) => {
            console.log(response);
            document.querySelector("#status").textContent = response.fact
              ? "✅ Fact"
              : "❌ False";
            if (!response.fact) {
              document.querySelector("#status").style.color = "red";
            } else {
              document.querySelector("#status").style.color = "green";
            }
            if (response.confidence < 200) {
              document.querySelector("#status").style.color = "white";
              document.querySelector("#status").textContent = "❓ Unsure";
            }
            document.querySelector("#links-list").innerHTML =
              response.articles
                .map(
                  (a) =>
                    `<p><a href="${a[0][0]}" target="_blank">${a[0][1]}</a></p>`
                )
                .join("") + "<br><br>";
          }
        );
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fact-check-button")
    .addEventListener("click", onFactCheckButtonClick);
});
