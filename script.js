const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  const startDate = document.querySelector("#start-date")?.value;
  const endDate = document.querySelector("#end-date")?.value;
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [startDate, endDate],
    func: scrapCalendar,
  });
});

const scrapCalendar = (popupStartDate, popupEndDate) => {
  const dateTextToInfosilFormat = (date) => {
    let dateElements = date?.split("-");
    return dateElements[2] + "/" + dateElements[1] + "/" + dateElements[0];
  };

  const dateRangeTextToArray = (dates) => {
    let pageDateRange = document.querySelector(dates)?.innerText.split(" ");
    return pageDateRange.filter((element) => element.includes("/"));
  };

  const dateTextToDate = (date) => {
    let dateNumbers = date.split("/").map((number) => parseInt(number));
    return new Date(dateNumbers[2], dateNumbers[1] - 1, dateNumbers[0]);
  };

  let [pageStartDate, pageEndDate] = dateRangeTextToArray(
    "#sectionBody > div.con_cuer > div.tabla1 > div:nth-child(2) > div.tabder"
  );

  popupStartDate = dateTextToInfosilFormat(popupStartDate);
  popupEndDate = dateTextToInfosilFormat(popupEndDate);

  let normalizedPageStartDate = dateTextToDate(pageStartDate);
  let normalizedPageEndDate = dateTextToDate(pageEndDate);
  let normalizedPopupStartDate = dateTextToDate(popupStartDate);
  let normalizedPopupEndDate = dateTextToDate(popupEndDate);

  console.log(normalizedPageEndDate > normalizedPageStartDate);

  /*
  console.log(normalizedPageStartDate);
  console.log(normalizedPageEndDate);
  console.log(normalizedPopupStartDate);
  console.log(normalizedPopupEndDate);
  */

  /*
  let goLastPageButton = document.querySelector(
    "#sectionBody > div.con_cuer > div.flechas_horario > div.izq"
  );
  let goNextPageButton = document.querySelector(
    "#sectionBody > div.con_cuer > div.flechas_horario > div.der"
  );
  */
};
