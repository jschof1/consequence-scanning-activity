// // import <script src="https://unpkg.com/tw-to-css@0.0.10/dist/cdn.min.js"></script>
// import arrow from "../../public/icons_arrow.svg";
// export function downloadProjectDataAsHTML() {
//     // Convert the project data into an HTML string
//     let htmlContent = document.querySelector("#Review").outerHTML;
//     // remove get full report button link
//     htmlContent = htmlContent.replace("<button>Get full report</button>", "");
//     htmlContent = htmlContent.replace("<button>Download the data</button>", "");
//     // remove all img tag src and replace with arrow svg
//     htmlContent = htmlContent.replace(/<img[^>]*>/g, '- ');
//     // add table styling
//     let fullHTML = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Project Data</title>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
//         <!-- Include Water.css (light theme) -->
//         <script src="https://cdn.tailwindcss.com"></script>
//         <style>
//         width: 100%;
//         /* Ensure table tries to fit its container */
//         max-width: 100%;
//         /* Make sure table doesn't expand beyond its container */
//         border-collapse: collapse;
//         background-color: white;
//         overflow: hidden;
//         /* This will ensure the border-radius is applied properly */
//       }

//       th,
//       td {
//         border: 2px solid black;
//         text-align: left;
//         padding: 8px;
//       }
// </style>
//     </head>
//     <body>
//         ${htmlContent}
//     </body>
//     </html>
//     `;

//     let blob = new Blob([fullHTML], { type: "text/html" });
//     let url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.style.display = "none";
//     a.href = url;
//     a.download = "project_data.html";

//     document.body.appendChild(a);
//     a.click();

//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   }

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function downloadProjectDataAsHTML() {
  const modal = document.getElementById("outcome-modal");
  const downloadButton = document.getElementById("download-button");
  const downloadText = document.getElementById("download-text");

  const wasModalDisplayed = window.getComputedStyle(modal).display !== "none";
  const wasDownloadButtonDisplayed =
    window.getComputedStyle(downloadButton).display !== "none";
  const wasDownloadTextDisplayed =
    window.getComputedStyle(downloadText).display !== "none";
  if (wasModalDisplayed) {
    modal.style.display = "none";
  }
  if (wasDownloadButtonDisplayed) {
    downloadButton.style.display = "none";
  }
  if (wasDownloadTextDisplayed) {
    downloadButton.style.display = "none";
  }
  const sectionToPrint = document.getElementById("Review");
  const outline = document.getElementById("explanation");
  const overview = document.getElementById("overview");
  const riskManagementTable = document.getElementById("risk-management-table");


  // Capture the main content
  html2canvas(sectionToPrint).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4", true);
    pdf.setFontSize(14);
    pdf.setDrawColor(0, 0, 0);
    pdf.text(testText, 30, 30, { maxWidth: 200, align: "justify" });
    pdf.internal.write(0, "Tw"); // <- add this
  
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = pdfWidth;
    const imgHeight = (pdfWidth * canvas.height) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Capture the risk management table and add to a new page
    html2canvas(riskManagementTable).then((canvas) => {
      pdf.addPage();
      const tableImgData = canvas.toDataURL("image/png");
      const tableImgHeight = (pdfWidth * canvas.height) / canvas.width;
      pdf.addImage(tableImgData, "PNG", 0, 0, pdfWidth, tableImgHeight);

      pdf.save("odi-risk-register.pdf");

      if (wasModalDisplayed) {
        modal.style.display = "";
      }
      if (wasDownloadButtonDisplayed) {
        downloadButton.style.display = "";
      }
      if (wasDownloadTextDisplayed) {
        downloadText.style.display = "";
      }
    });
  });
}
