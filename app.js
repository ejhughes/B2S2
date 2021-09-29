console.log("Hello from B2S");

let viz;

const exportToPDF = document.getElementById("exportToPDF");

const exportToPPT = document.getElementById("exportToPPT");

// 1. Create a varialbe to store a dashbaord url

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-US&:display_count=n&:origin=viz_share_link";

// 2. Create a list of options to send to the JS API (device, width and height of the dashbboard)

const options = {
  device: "desktop",
  Category: ["Technology", "Office Supplies"],
};

// 3. Grab the container from the body of the page (vizContainer)

const vizContainer = document.getElementById("vizContainer");

// 4. Create a function that will create the viz on the page

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

function exportPDF() {
  console.log("Going to export a PDF");
  viz.showExportPDFDialog();
}

function exportPPT() {
  console.log("Going to export a PPT");
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  // get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log({ minValue, maxValue });

  // 1. get the workbook object
  const workbook = viz.getWorkbook();

  // 2. get the active sheet (dashboard, worksheet or story)
  const activeSheet = workbook.getActiveSheet();
  console.log(activeSheet);

  // 3. from the dashboard get the worksheets
  const sheets = activeSheet.getWorksheets();

  // Alternative for 3 steps in 1: viz.getWorkbook().getActiveSheet().getWorksheets()

  // 4.worksheet that we want to filter
  const sheetToFilter = sheets[1];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
}

exportToPDF.addEventListener("click", exportPDF);

exportToPPT.addEventListener("click", exportPPT);

document.addEventListener("DOMContentLoaded", initViz);

document.getElementById("filterButton").addEventListener("click", () => {
  getRangeValues();
});
