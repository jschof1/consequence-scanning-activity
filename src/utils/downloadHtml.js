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

  const outline = document.getElementById("explanation");
  const overview = document.getElementById("overview")
  const riskManagementTable = document.getElementById("risk-management-table");

   const pdf = new jsPDF();

  // Capture the main content
    const addSectionToPDF = (sectionElement, rotate = false) => {
      return html2canvas(sectionElement).then((canvas) => {
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm

        let imgWidth = pdfWidth;
        let imgHeight = (pdfWidth * canvas.height) / canvas.width;

        if (rotate) {
          const temp = imgWidth;
          imgWidth = imgHeight;
          imgHeight = temp;
        }

        if (imgHeight > pdfHeight) {
          imgWidth *= pdfHeight / imgHeight;
          imgHeight = pdfHeight;
        }

        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        if (rotate) {
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            y,
            x,
            imgHeight,
            imgWidth
          );
        } else {
          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            x,
            y,
            imgWidth,
            imgHeight
          );
        }
        pdf.addPage();
      });
    };

    overview.style.color = "black";

    addSectionToPDF(outline)
      .then(() => addSectionToPDF(overview))
      .then(() => {
        // Revert the text color of the overview section
        overview.style.color = "";
        return addSectionToPDF(riskManagementTable, true); // Rotate the table
      })
      .then(() => {
        pdf.deletePage(pdf.internal.getNumberOfPages()); // Remove the extra page added at the end
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
}
