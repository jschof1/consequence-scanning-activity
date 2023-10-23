export function downloadProjectDataAsJSON(projectData) {
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