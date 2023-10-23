<script>
  import Intro from "./Intro.svelte";
  import FileInput from "./FileInput.svelte";
  import PreLoadedStudySelection from "./PreLoadedStudySelection.svelte";
  import Reflect from "./Reflect.svelte";
  import UnintendedConsequences from "./UnintendedConsequences.svelte";
  import Action from "./Action.svelte";
  import FinalOutcomeTable from "./FinalOutcomeTable.svelte";
  import ReviewComponent from "./ReviewComponent.svelte";
  import EvaluateUnintendedRisk from "./EvaluateUnintendedRisk.svelte";

  import { downloadProjectDataAsCSV } from "../utils/downloadCsv.js";
  import { downloadProjectDataAsJSON } from "../utils/downloadJson.js";
  import { downloadProjectDataAsHTML } from "../utils/downloadHtml.js";

  import { fade, fly } from "svelte/transition";

  let explainerIntro = true;
  let selectOption = false;
  let showPreLoadedOptions = false;
  let showQuestions = false;
  let showUnintendedConsequences = false;
  let showEvaluation = false;
  let isAssigningActions = false;
  let isViewingTable = false;
  let selectedFile = null;

  let projectData = {
    title: "",
    selectedFile: null,
    selectedStudy: null,
    objectives: "",
    stakeholders: [{ text: "", type: "" }],
    dataUsed: "",
    intendedConsequences: [{ description: "" }],
    unintendedConsequences: [
      {
        description: "",
        impact: ["High", "Medium", "Low"],
        selectedImpact: "",
        outcome: ["Positive", "Negative"],
        selectedOutcome: "",
        likelihood: ["High", "Medium", "Low"],
        selectedLikelihood: "",
        action: "",
        AIM: ["Act", "Influence", "Monitor"],
        selectedAIM: "",
        timeline: ["3 months", "6 months", "1 year", "2 years"],
        selectedTimeline: "",
        KPI: "",
      },
    ],
    preLoadedStudies: ["Case Study 1", "Case Study 2", "Case Study 3"],
  };

  function handleBegin() {
    explainerIntro = !explainerIntro;
    selectOption = true;
  }
  function onStartNewProject() {
    showPreLoadedOptions = false;
    selectOption = false;
    showQuestions = true;
  }

  function handleProceedToUnintendedConsequences() {
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

  function onAssignAction() {
    showEvaluation = false;
    showUnintendedConsequences = false;
    isAssigningActions = true;
  }
  function viewTable() {
    isViewingTable = true;
  }

  function updateProjectData(event) {
    projectData.title = event.detail.title;
    projectData.objectives = event.detail.objectives;
    projectData.stakeholders = event.detail.stakeholders;
    projectData.dataUsed = event.detail.dataUsed;
    handleProceedToUnintendedConsequences();
  }

  function handleProceedExport(event) {
    const format = event.detail.format;
    if (format === "csv") {
      downloadProjectDataAsCSV(projectData);
    } else if (format === "json") {
      downloadProjectDataAsJSON(projectData);
    } else if (format === "html") {
      downloadProjectDataAsHTML();
    }
  }

  function setLkelihood(index, likelihoodChoice) {
    projectData.unintendedConsequences[index].selectedLikelihood =
      likelihoodChoice;
  }

  function setImpact(index, impactChoice) {
    projectData.unintendedConsequences[index].selectedImpact = impactChoice;
  }

  function setActionForUnintendedConsequence(index, action) {
    projectData.unintendedConsequences[index].action = action;
  }

  function setKPIForUnintendedConsequence(index, KPI) {
    projectData.unintendedConsequences[index].KPI = KPI;
  }

  function setTimelineForUnintendedConsequence(index, timeline) {
    projectData.unintendedConsequences[index].selectedTimeline = timeline;
  }

  function setMeasureForUnintendedConsequence(index, aim) {
    projectData.unintendedConsequences[index].selectedAIM = aim;
  }

  function handleFileData(event) {
    const uploadedData = event.detail;
    projectData = uploadedData;
    selectOption = false;
    showPreLoadedOptions = false;
    showQuestions = true;
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
      { text: "", type: "" },
    ];
  }
  function addIntendedConsequence() {
    projectData.intendedConsequences = [
      ...projectData.intendedConsequences,
      { description: "" },
    ];
  }
  function addUnintendedConsequence() {
    projectData.unintendedConsequences = [
      ...projectData.unintendedConsequences,
      {
        description: "",
        impact: ["H", "M", "L"],
        selectedImpact: "",
        outcome: ["Positive", "Negative"],
        selectedOutcome: "",
        likelihood: ["H", "M", "L"],
        selectedLikelihood: "",
        action: "",
        AIM: ["Act", "Influence", "Monitor"],
        selectedAIM: "",
        timeline: "",
      },
    ];
  }

  $: console.log("Current project title:", projectData.title);
</script>

<Intro {explainerIntro} on:proceed={handleBegin} />
{#if selectOption}
  <FileInput
    on:fileData={handleFileData}
    bind:selectedFile
    on:newProject={onStartNewProject}
    on:proceed={uploadCaseStudy}
    on:preLoadedSelection={handleProceedToPreLoadedOptions}
  />
{/if}
{#if showPreLoadedOptions}
  <PreLoadedStudySelection
    preLoadedStudies={projectData.preLoadedStudies}
    on:proceed={confirmSelection}
  />
{/if}
{#if showQuestions}
  <Reflect
    objectives={projectData.objectives}
    title={projectData.title}
    stakeholders={projectData.stakeholders}
    dataUsed={projectData.dataUsed}
    intendedConsequences={projectData.intendedConsequences}
    onAddIntendedConsequence={addIntendedConsequence}
    onAdd={addStakeholder}
    on:proceed={updateProjectData}
  />
{/if}
<!-- {#if showIntendedConsequences}
<IntendedConsequences on:proceed={handleProceedToUnintendedConsequences} intendedConsequences={projectData.intendedConsequences} onAdd={addIntendedConsequence} />
{/if} -->
{#if showUnintendedConsequences}
  <ReviewComponent {projectData} />
  <UnintendedConsequences
    on:proceed={handleEvaluateUnintendedRisk}
    consequences={projectData.unintendedConsequences}
    onAdd={addUnintendedConsequence}
  />
{/if}
{#if showEvaluation}
  <EvaluateUnintendedRisk
    unintendedConsequences={projectData.unintendedConsequences}
    on:proceed={onAssignAction}
    onSetImpact={setImpact}
    onSetLikelihood={setLkelihood}
  />
{/if}
{#if isAssigningActions}
  <Action
    on:proceed={viewTable}
    consequences={projectData.unintendedConsequences}
    onSetTimeline={setTimelineForUnintendedConsequence}
    onSetAction={setActionForUnintendedConsequence}
    onSetMeasure={setMeasureForUnintendedConsequence}
    onSetKPI={setKPIForUnintendedConsequence}
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
