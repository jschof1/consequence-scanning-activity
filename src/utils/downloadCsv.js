import Papa from "papaparse";
  
  export function downloadProjectDataAsCSV(projectData) {
    const dataToDownload = [];

    // Helper function to handle array values within projectData
    function handleArrayValues(section, arr) {
      arr.forEach((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          dataToDownload.push({
            Section: `${section} ${index + 1}`,
            Key: key,
            Value: value,
          });
        }
      });
    }

    // Iterate over every key and value in the projectData object
    for (const [section, value] of Object.entries(projectData)) {
      if (Array.isArray(value)) {
        if (typeof value[0] === "object") {
          handleArrayValues(section, value);
        } else {
          // Handle simple arrays like preLoadedStudies
          value.forEach((item, index) => {
            dataToDownload.push({
              Section: section,
              Key: index,
              Value: item,
            });
          });
        }
      } else if (typeof value === "string" || typeof value === "number") {
        dataToDownload.push({
          Section: section,
          Key: "",
          Value: value,
        });
      }
    }

    const csv = Papa.unparse(dataToDownload);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "project_data.csv";

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  function downloadProjectDataAsJSON() {
    const cleanedProjectData = JSON.parse(JSON.stringify(projectData)); // Deep copy
    cleanedProjectData.unintendedConsequences.forEach((item) => {
      // Replace selectedImpact with impact
      item.impact = item.selectedImpact;
      // Replace selectedOutcome with outcome
      item.outcome = item.selectedOutcome;
      // Replace selectedLikelihood with likelihood
      item.likelihood = item.selectedLikelihood;
      // Replace selectedTimeline with timeline
      item.timeline = item.selectedTimeline;
      // Replace selectedAIM with AIM
      item.AIM = item.selectedAIM;

      // Now, delete the original arrays and the selected fields
      delete item.selectedImpact;
      delete item.selectedOutcome;
      delete item.selectedLikelihood;
      delete item.selectedAIM;
      delete item.selectedTimeline;
      delete item.impact;
      delete item.outcome;
      delete item.likelihood;
      delete item.AIM;
    });

    // Convert the projectData object to a JSON string with indentation for readability
    const jsonString = JSON.stringify(cleanedProjectData, null, 2);

    // Create a blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    // Create a download link and click it
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "project_data.json";

    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  function downloadProjectDataAsHTML() {
    // Convert the project data into an HTML string
    let htmlContent = document.querySelector(".project-overview").outerHTML;
    // remove get full report button link
    htmlContent = htmlContent.replace("<button>Get full report</button>", "");
    htmlContent = htmlContent.replace("<button>Download the data</button>", "");

    // Wrap the content with a basic HTML structure and include the Water.css stylesheet
    let fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Data</title>
        <!-- Include Water.css (light theme) -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
    </head>
    <body>
        ${htmlContent}
    </body>
    </html>
    `;

    let blob = new Blob([fullHTML], { type: "text/html" });
    let url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "project_data.html";

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }