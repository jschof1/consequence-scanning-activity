<script>
  import Papa from 'papaparse';  
  import Intro from './Intro.svelte';
  import FileInput from './FileInput.svelte';
  import PreLoadedStudySelection from './PreLoadedStudySelection.svelte';
  import Reflect from './Reflect.svelte';
  import UnintendedConsequences from './UnintendedConsequences.svelte';
  import Action from './Action.svelte';
  import FinalOutcomeTable from './FinalOutcomeTable.svelte';
  import IntendedConsequences from './IntendedConsequences.svelte';
  import EvaluateUnintendedRisk from './EvaluateUnintendedRisk.svelte';

  // Navigation flags
  let explainerIntro = true;
  let selectOption = false;
  let showPreLoadedOptions = false;
  let showQuestions = false;
  let showIntendedConsequences = false;
  let showUnintendedConsequences = false;
  let showEvaluation = false;
  let isAssigningActions = false;
  let isViewingTable = false;
  let selectedFile = null;

  // Project Data Structure
  let projectData = {
    title : "",
    selectedFile: null,
    selectedStudy: null,
    objectives: "",
    stakeholders: [{ text: "", type: "" }],
    dataUsed: "",
    intendedConsequences: [{ description: "" }],
    unintendedConsequences: [{
      description: "",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: "",
      AIM: ['Act', 'Influence', 'Monitor'],
      selectedAIM: "",
      timeline: ["3 months", "6 months", "1 year", "2 years"], 
      selectedTimeline: ""
    }],
    preLoadedStudies: [
      "Case Study 1",
      "Case Study 2",
      "Case Study 3",
    ],
  };

  function hanldeBegin() {
    selectOption = true;
    explainerIntro = false
  }

  function handleProceedToIntendedConsequences() {
    console.log(projectData)
    showQuestions = false;
    showIntendedConsequences = true
  } 
  function updateProjectData(event) {
    // Update projectData.title with the dispatched value
    projectData.title = event.detail.title;
    projectData.objectives = event.detail.objectives;
    projectData.stakeholders = event.detail.stakeholders;
    projectData.dataUsed = event.detail.dataUsed;
    
    // Call your existing function to handle the proceed logic
    handleProceedToUnintendedConsequences();
  }
  function handleProceedToUnintendedConsequences() {
    // showIntendedConsequences = false;
    showQuestions = false;
    showUnintendedConsequences = true;
  }
  function handleProceedToPreLoadedOptions() {
    selectOption = false;
    showPreLoadedOptions = true;
  }


  function handleEvaluateUnintendedRisk() {
    showUnintendedConsequences = false;
    showEvaluation = true;
  }



  function viewTable() {
    isViewingTable = true;
  }
  function downloadProjectDataAsCSV() {
    const dataToDownload = [];

    // Helper function to handle array values within projectData
    function handleArrayValues(section, arr) {
        arr.forEach((item, index) => {
            for (const [key, value] of Object.entries(item)) {
                dataToDownload.push({
                    Section: `${section} ${index + 1}`,
                    Key: key,
                    Value: value
                });
            }
        });
    }

    // Iterate over every key and value in the projectData object
    for (const [section, value] of Object.entries(projectData)) {
        if (Array.isArray(value)) {
            if (typeof value[0] === 'object') {
                handleArrayValues(section, value);
            } else {
                // Handle simple arrays like preLoadedStudies
                value.forEach((item, index) => {
                    dataToDownload.push({
                        Section: section,
                        Key: index,
                        Value: item
                    });
                });
            }
        } else if (typeof value === 'string' || typeof value === 'number') {
            dataToDownload.push({
                Section: section,
                Key: '',
                Value: value
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
    htmlContent = htmlContent.replace('<button>Get full report</button>', '');
    htmlContent = htmlContent.replace('<button>Download the data</button>', '');

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

    let blob = new Blob([fullHTML], { type: 'text/html' });
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


function handleProceedExport(event) {
  const format = event.detail.format;
  if (format === 'csv') {
    downloadProjectDataAsCSV()
  } else if (format === 'json') {
    downloadProjectDataAsJSON()
  }
  else if (format === 'html') {
    downloadProjectDataAsHTML()
  }
}

function setLkelihood(index, likelihoodChoice){
  projectData.unintendedConsequences[index].selectedLikelihood = likelihoodChoice;
}

function setImpact(index, impactChoice){
  projectData.unintendedConsequences[index].selectedImpact = impactChoice;
}

  function onAssignAction () {
    isAssigningActions = true;
  }

  function setActionForUnintendedConsequence(index, action) {
        projectData.unintendedConsequences[index].action = action;
    }

    function setTimelineForUnintendedConsequence(index, timeline) {
        projectData.unintendedConsequences[index].selectedTimeline = timeline;
    }

    function setMeasureForUnintendedConsequence(index, aim) {
        projectData.unintendedConsequences[index].selectedAIM = aim;
    }

    function handleFileData(event) {
    const uploadedData = event.detail;
    // Now you can update your projectData with the uploadedData
    projectData = uploadedData
    selectOption = false;
    showPreLoadedOptions = false;
    showQuestions = true;
    showIntendedConsequences = true;
    showUnintendedConsequences = true;
    showEvaluation = true;
    isAssigningActions = true;
    isViewingTable = true;
  }

  function uploadCaseStudy() {
    if (!projectData.selectedFile) {
      alert("No file selected!");
      return;
    }
    console.log(`Uploading ${projectData.selectedFile.name}...`);
    setTimeout(() => {
      console.log(`Successfully uploaded ${projectData.selectedFile.name}`);
      alert(`Successfully uploaded ${projectData.selectedFile.name}`);
    }, 2000);
    showQuestions = true;
  }

  function onStartNewProject() {
    showPreLoadedOptions = false;
    selectOption = false;
    showQuestions = true;
  }


  function confirmSelection(event) {
    const study = event.detail.study;
    projectData.selectedStudy = study;
    alert(`You have selected ${projectData.selectedStudy}`);
    showPreLoadedOptions = false;
    showQuestions = true;
  }

  function addStakeholder() {
    projectData.stakeholders = [
      ...projectData.stakeholders,
      { text: "", type: "" }
    ];
  }

  function addTitle () {
    projectData.title = "";
  }
  function addIntendedConsequence() {
    projectData.intendedConsequences = [
        ...projectData.intendedConsequences,
        { description: "" }
    ];
}
  function addUnintendedConsequence() {
    projectData.unintendedConsequences = [
      ...projectData.unintendedConsequences,
      { description: "", impact: ["H", "M", "L"], selectedImpact: "", outcome: ["Positive", "Negative"], selectedOutcome: "", likelihood: ["H", "M", "L"], selectedLikelihood: "", action: "", AIM: ['Act', 'Influence', 'Monitor'], selectedAIM: "", timeline: "" }
    ];
  }
  
  $: console.log("Current project title:", projectData.title);
</script>
{#if explainerIntro}
<Intro on:proceed={hanldeBegin} />
{/if}
{#if selectOption}
<FileInput on:fileData={handleFileData} bind:selectedFile={selectedFile} on:newProject={onStartNewProject} on:proceed={uploadCaseStudy} on:preLoadedSelection={handleProceedToPreLoadedOptions} />
{/if}
{#if showPreLoadedOptions}
<PreLoadedStudySelection preLoadedStudies={projectData.preLoadedStudies} on:proceed={confirmSelection} />
{/if}
{#if showQuestions}
<Reflect objectives={projectData.objectives} title={projectData.title} stakeholders={projectData.stakeholders} dataUsed={projectData.dataUsed} intendedConsequences={projectData.intendedConsequences} onAddIntendedConsequence={addIntendedConsequence} onAdd={addStakeholder} on:proceed={updateProjectData}/>
{/if}
<!-- {#if showIntendedConsequences}
<IntendedConsequences on:proceed={handleProceedToUnintendedConsequences} intendedConsequences={projectData.intendedConsequences} onAdd={addIntendedConsequence} />
{/if} -->
{#if showUnintendedConsequences}
<UnintendedConsequences on:proceed={handleEvaluateUnintendedRisk} consequences={projectData.unintendedConsequences} onAdd={addUnintendedConsequence} />
{/if}
{#if showEvaluation}
<EvaluateUnintendedRisk unintendedConsequences={projectData.unintendedConsequences} on:proceed={onAssignAction} onSetImpact={setImpact} onSetLikelihood={setLkelihood}  />
{/if}
{#if isAssigningActions}
<Action 
on:proceed={viewTable} 
consequences={projectData.unintendedConsequences} 
onSetTimeline={setTimelineForUnintendedConsequence} 
onSetAction={setActionForUnintendedConsequence} 
onSetMeasure={setMeasureForUnintendedConsequence} 
/>
{/if}
{#if isViewingTable}
<FinalOutcomeTable 
  projectTitle={projectData.title}
  unintendedConsequences={projectData.unintendedConsequences} 
  objectives={projectData.objectives}
  stakeholders={projectData.stakeholders}
  showModal={false}
  intendedConsequences={projectData.intendedConsequences}
  on:proceed={handleProceedExport}
/>
{/if}
