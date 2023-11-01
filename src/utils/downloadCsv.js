import Papa from "papaparse";
  
  export function downloadProjectDataAsCSV(projectData) {
    const dataToDownload = [];

    // Helper function to handle array values within projectData
    function handleArrayValues(section, arr) {
      arr.forEach((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          dataToDownload.push({
            Section: `${section} ${index + 1}`,
            // Key: key,
            'User Input': value,
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