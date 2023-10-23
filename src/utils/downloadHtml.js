export function downloadProjectDataAsHTML() {
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