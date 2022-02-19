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

const scrapCalendar = (startDate, endDate) => {
  /*
  const dateToInfosilFormat = (date) => {
    let dateElements = date?.split("-");
    return dateElements[2] + "/" + dateElements[1] + "/" + dateElements[0];
  };
  */

  const dateRangeTextToArray = (dates) => {
    let pageDateRange = document.querySelector(dates)?.innerText.split(" ");
    return pageDateRange.filter((element) => element.includes("/"));
  };

  const dateTextToIntsArray = (date) => {
    let someDate = date.split("/");
    return someDate.map((number) => parseInt(number));
  };

  let [pageStartDate, pageEndDate] = dateRangeTextToArray(
    "#sectionBody > div.con_cuer > div.tabla1 > div:nth-child(2) > div.tabder"
  );

  console.log(dateTextToIntsArray(pageStartDate));
  console.log(dateTextToIntsArray(pageEndDate));

  /*
  let goLastPageButton = document.querySelector(
    "#sectionBody > div.con_cuer > div.flechas_horario > div.izq"
  );
  let goNextPageButton = document.querySelector(
    "#sectionBody > div.con_cuer > div.flechas_horario > div.der"
  );*/

  /*
  let pageStartDate = intDatesArray(pageDateRange[1]);
  let pageEndDate = intDatesArray(pageDateRange[3]);

  console.log(pageStartDate);
  console.log(pageEndDate);

  let popupStartDate = dateToInfosilFormat(startDate);
  let popupEndDate = dateToInfosilFormat(endDate);

  */
};
