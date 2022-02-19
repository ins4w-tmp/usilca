const startDate = document.getElementById("start-date")?.value;
const endDate = document.getElementById("end-date");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async (startDate, endDate) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [startDate],
    function: scrapCalendar,
  });
});

function scrapCalendar(startDate) {
  let pageDateRange = document
    .querySelector(
      "#sectionBody > div.con_cuer > div.tabla1 > div:nth-child(2) > div.tabder"
    )
    ?.innerText.split(" ");
  /*
  let goLastPageButton = document.querySelector(
    "#sectionBody > div.con_cuer > div.flechas_horario > div.izq"
  );
  let goNextPageButton = document.querySelector(
    "#sectionBody > div.con_cuer > div.flechas_horario > div.der"
  );*/
  let pageStartDate = pageDateRange[1];
  let pageEndDate = pageDateRange[3];
  console.log(startDate);
  console.log(pageStartDate + " - " + pageEndDate);
}
