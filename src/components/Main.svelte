<script>
  import Intro from "./Intro.svelte";
  import FileInput from "./FileInput.svelte";
  import PreLoadedStudySelection from "./PreLoadedStudySelection.svelte";
  import Reflect from "./Reflect.svelte";
  import UnintendedConsequences from "./UnintendedConsequences.svelte";
  import Action from "./Action.svelte";
  import FinalOutcomeTable from "./FinalOutcomeTable.svelte";
  import ConsequenceOutline from "./ConsequenceOutline.svelte";
  import IntendedConsequences from "./IntendedConsequences.svelte";
  import UnintendedConsequenceSuggester from "./UnintendedConsequenceSuggester.svelte";
  import EvaluateUnintendedRisk from "./EvaluateUnintendedRisk.svelte";
  import {
    unintendedConsequenceSuggestions,
    intendedConsequenceSuggestions,
  } from "./store.js";

  import { activeSection } from './section.js';
  import { downloadProjectDataAsCSV } from "../utils/downloadCsv.js";
  import { downloadProjectDataAsJSON } from "../utils/downloadJson.js";
  import { downloadProjectDataAsHTML } from "../utils/downloadHtml.js";

  import caseStudy1 from "../data/caseStudy1";
  import caseStudy2 from "../data/caseStudy2";
  import caseStudy3 from "../data/caseStudy3";

   import { onMount } from 'svelte';
  // import IntendedConsequences from "./IntendedConsequences.svelte";

  let explainerIntro = true;
  let selectOption = false;
  let showPreLoadedOptions = false;
  let showQuestions = false;
  let showConsequences = false;
  let showIntendedConsequences = false;
  let showUnintendedConsequences = false;
  let showEvaluation = false;
  let isAssigningActions = false;
  let isViewingTable = false;
  let selectedFile = null;
  let currentSection = null;


  let preLoadedStudies = [
    { title: caseStudy1.title, data: caseStudy1 },
    { title: caseStudy2.title, data: caseStudy2 },
    { title: caseStudy3.title, data: caseStudy3 },
  ];
  console.log("preLoadedStudies:", preLoadedStudies);

  let projectData = {
    title: "",
    selectedFile: null,
    selectedStudy: null,
    objectives: "",
    stakeholders: [{ text: "", type: "" }],
    dataUsed: "",
    intendedConsequences: [{ description: "" }],
    unintendedConsequences: [{
      description: "",
      impact: ["H", "M", "L"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["H", "M", "L"],
      selectedLikelihood: "",
      action:{
        description: "",
        date : "",
        stakeholder: ""
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
    }],
    preLoadedStudies: ["Case Study 1", "Case Study 2", "Case Study 3"],
  };

function scrollToTop() {
  window.scrollTo(0, 0);
}

function handleIntro() {
   resetAllSections();
  explainerIntro = true
}
  function handleBegin(event) {
    resetAllSections(event);
    selectOption = true;
  }
  function onStartNewProject() {
     resetAllSections();
    showPreLoadedOptions = false;
    selectOption = false;
    showQuestions = true;
  }

  function handleProceedConsequencesOutline() {
     resetAllSections();
    showConsequences = true;
    showQuestions = false;
    scrollToTop();
  }

  function handleProceedToIntendedConsequences(event) {
    resetAllSections();
    showConsequences = false;
    showIntendedConsequences = true;
    scrollToTop();
  }
  function handleProceedToUnintendedConsequences(event) {
     resetAllSections(event);
    showIntendedConsequences = false
    showUnintendedConsequences = true;
    scrollToTop();
  }
  function handleProceedToPreLoadedOptions() {
     resetAllSections();
    selectOption = false;
    showPreLoadedOptions = true;
  }
  function handleEvaluateUnintendedRisk(event) {
    resetAllSections();
    showEvaluation = true;
    showUnintendedConsequences = false;
    scrollToTop();
  }
  function onAssignAction() {
    resetAllSections();
    isAssigningActions = true;
    showEvaluation = false;
    scrollToTop();
  }
  function viewTable() {
    resetAllSections();
    isViewingTable = true;
    isAssigningActions = false;
    scrollToTop();
  }

  function updateProjectData(event) {
    projectData.title = event.detail.title;
    projectData.objectives = event.detail.objectives;
    projectData.stakeholders = event.detail.stakeholders;
    projectData.dataUsed = event.detail.dataUsed;
    handleProceedConsequencesOutline();
  }
function resetAllSections(event) {
  if (event) event.preventDefault();
  explainerIntro = false;
  selectOption = false;
  showPreLoadedOptions = false;
  showQuestions = false;
  showConsequences = false;
  showIntendedConsequences = false;
  showUnintendedConsequences = false;
  showEvaluation = false;
  isAssigningActions = false;
  isViewingTable = false;
}
const sectionHandlers = {
  Intro: handleIntro,
  selectOption: handleBegin,
  PreLoadedOptions: handleProceedToPreLoadedOptions,
  Questions: onStartNewProject,
  Consequences: handleProceedConsequencesOutline,
  IntendedConsequences: handleProceedToIntendedConsequences,
  UnintendedConsequences: handleProceedToUnintendedConsequences,
  Evaluation: handleEvaluateUnintendedRisk,
  AssigningActions: onAssignAction,
  ViewingTable: viewTable,
};
onMount(() => {
  activeSection.subscribe(value => {
    console.log('Active section changed to:', value);
    currentSection = value;
    if (sectionHandlers[currentSection]) {
      sectionHandlers[currentSection]();
    } else {
      console.error('No handler found for section:', currentSection);
    }
  });
});

  function handleProceedExport(event) {
    const format = event.detail.format;
    if (format === "csv") {
      downloadProjectDataAsCSV(projectData);
    } else if (format === "json") {
      downloadProjectDataAsJSON(projectData);
    } else if (format === "pdf") {
      downloadProjectDataAsHTML();
    }
  }

  function setLikelihood(index, likelihoodChoice) {
    projectData.unintendedConsequences[index].selectedLikelihood =
      likelihoodChoice;
  }

  function setImpact(index, impactChoice) {
    projectData.unintendedConsequences[index].selectedImpact = impactChoice;
  }

  function setActionForUnintendedConsequence(index, action) {
    projectData.unintendedConsequences[index].action.description = action;
  }

  function setKPIForUnintendedConsequence(index, KPI) {
    projectData.unintendedConsequences[index].KPI = KPI;
  }

  function setDateForUnintendedConsequence(index, date) {
    projectData.unintendedConsequences[index].action.date = date;
  }

    function setStakeholderTimelineForUnintendedConsequence(index, stakeholder) {
    projectData.unintendedConsequences[index].action.stakeholder = stakeholder;
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
    console.log(event.detail.study);
    projectData = study;
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
        action:{
          description: "",
            date : "",
            stakeholder: ""
        },
        AIM: ["Act", "Influence", "Monitor"],
        selectedAIM: "",
      },
    ];
  }

  $: console.log("Current project title:", projectData.title);
</script>
{#if explainerIntro}
<Intro {explainerIntro} on:proceed={handleBegin} />
{/if}
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
  <PreLoadedStudySelection {preLoadedStudies} on:proceed={confirmSelection} />
{/if}
{#if showQuestions}
  <Reflect
    objectives={projectData.objectives}
    title={projectData.title}
    stakeholders={projectData.stakeholders}
    dataUsed={projectData.dataUsed}
    intendedConsequences={projectData.intendedConsequences}
    onAdd={addStakeholder}
    on:proceed={updateProjectData}
  />
{/if}
{#if showConsequences}
  <ConsequenceOutline on:proceed={handleProceedToIntendedConsequences} />
{/if}
{#if showIntendedConsequences}
  <IntendedConsequences
    onAdd={addIntendedConsequence}
    projectData={projectData}
    consequences={projectData.intendedConsequences}
    consequenceSuggestions={intendedConsequenceSuggestions}
    on:proceed={handleProceedToUnintendedConsequences}
  />
{/if}
{#if showUnintendedConsequences}
  <UnintendedConsequences
    projectData={projectData}
    consequences={projectData.unintendedConsequences}
    consequenceSuggestions={unintendedConsequenceSuggestions}
    onAdd={addUnintendedConsequence}
    on:proceed={handleEvaluateUnintendedRisk}
  />
{/if}
{#if showEvaluation}
  <EvaluateUnintendedRisk
    unintendedConsequences={projectData.unintendedConsequences}
    on:proceed={onAssignAction}
    onSetImpact={setImpact}
    onSetLikelihood={setLikelihood}
  />
{/if}
{#if isAssigningActions}
  <Action
    on:proceed={viewTable}
    stakeholders={projectData.stakeholders}
    consequences={projectData.unintendedConsequences}
    onSetTimeline={setDateForUnintendedConsequence}
    onSetAction={setActionForUnintendedConsequence}
    onSetMeasure={setMeasureForUnintendedConsequence}
    onSetKPI={setKPIForUnintendedConsequence}
    onSetStakeholderForTimeline={setStakeholderTimelineForUnintendedConsequence}
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
