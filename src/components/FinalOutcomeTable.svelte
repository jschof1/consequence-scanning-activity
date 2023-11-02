<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import arrow from "../../public/icons_arrow.svg";
  const dispatch = createEventDispatcher();

  export let showModal;
  export let projectTitle;
  export let unintendedConsequences;
  export let intendedConsequences;
  export let objectives;
  export let stakeholders;


  let surveyModal = false;

  function toggleSurveyModal() {
    surveyModal = !surveyModal;
  }
  function printDiv() {
     var printContents = document.getElementById('Review').innerHTML;
     var originalContents = document.body.innerHTML;

var styledPrintContents = '<div style="color: black; !important">' + printContents + '</div>';

    document.body.innerHTML = styledPrintContents;

    window.print();

    document.body.innerHTML = originalContents;
}

  function handleDownloadAsCsv() {
    dispatch("proceed", { format: "csv" });
  }

  function handleDownloadAsJson() {
    dispatch("proceed", { format: "json" });
  }

  function handleDownloadAsHTML() {
    dispatch("proceed", { format: "pdf" });
  }
  function calculateRiskScore() {
    let score = 0;
    unintendedConsequences.forEach((uc) => {
      if (uc.selectedImpact === "High" && uc.selectedLikelihood === "High") {
        score += 1;
      }
    });
    return score;
  }
</script>

<div id="Review" class="p-12 bg-blue-800 print:text-black">
  <div id="explanation">
    <div class="text-3xl text-white font-bold mb-4">Risk Register</div>
    <div class="mb-7 p-8 bg-white bg-opacity-70 shadow-md">
      <div class="mb-4">
        The Risk Register is a valuable tool that helps project teams to
        understand the project's context, its associated risks and potential
        outcomes, and the strategies in place to manage and mitigate these
        risks.
      </div>
      <div class="mb-4">
        It serves as a reference point throughout the project's lifecycle to
        ensure that risk assessment and mitigation efforts remain aligned with
        project objectives and priorities.
      </div>
      <div class="mb-4" id="download-text">
        Here, you can review your risk register, as well as download the full
        report (PDF) and the raw data (CSV).
      </div>
      <div class="w-full overflow-hidden shadow-md mt-6">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th
                class="w-1/3 py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-600 uppercase font-bold"
                >Risk Score = Likelihood x Impact</th
              >
              <th
                class="w-1/3 py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-gray-600 uppercase font-bold"
                >Risk Level</th
              >
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300">1 - 3</td>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300">Low Risk</td>
            </tr>
            <tr>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300">4 - 5</td>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300"
                >Low/Medium Risk</td
              >
            </tr>
            <tr>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300">6 - 7</td>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300"
                >Medium/High Risk</td
              >
            </tr>
            <tr>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300">8 - 10</td>
              <td class="w-1/3 py-2 px-4 border-b border-gray-300">High Risk</td
              >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div id="overview">
    <div class="text-white py-5 font-bold text-3xl border-b md:text-4xl">
      {projectTitle}
    </div>
    <div class="text-white py-5 font-bold text-2xl md:text-3xl">
      Project Overview
    </div>
    <div class="text-xl text-white mb-4 font-bold md:text-2xl">Objectives:</div>
    <div class="text-base text-white italic leading-8 p-5">{objectives}</div>
    {#if stakeholders}
      <div class="text-2xl py-5 text-white font-bold md:text-2xl">
        Stakeholders:
      </div>
      <ul class="list-disc">
        {#each stakeholders as stakeholder, i}
          <li class="text-lg flex mb-5 text-white md:text-xl">
            <img class="h-7 ml-2 pr-3 filter-yellow" src={arrow} />
            {stakeholder.text} -<em class="pl-2">{stakeholder.type}</em>
          </li>
        {/each}
      </ul>
    {/if}
    <div class="text-xl pt-5 text-white mb-4 font-bold md:text-2xl">
      Intended/Positive Consequences
    </div>
    <ul class="text-white text-lg md:text-xl">
      {#each intendedConsequences as ic}
        <li class="text-lg flex mb-5 text-white md:text-xl">
          <img
            class="h-7 ml-2 pr-3 filter-yellow"
            src={arrow}
          />{ic.description}
        </li>
      {/each}
    </ul>
  </div>
  <div>
  <div
    class="text-white my-5 font-bold text-3xl md:text-2xl"
  >
    Risk Management Table
  </div>
  <table class="data-table" id="risk-management-table">
    <thead>
      <tr>
        <th>Unintended Consequences</th>
        <th>Likelihood</th>
        <th>Impact</th>
        <th>AIM</th>
        <th>Action</th>
        <th>Outcome</th>
        <th>Timescale</th>
        <th>Assignee</th>
        <th>KPI</th>
      </tr>
    </thead>
    <tbody>
      {#each unintendedConsequences as uc}
        <tr>
          <td>{uc.description}</td>
          <td>{uc.selectedLikelihood}</td>
          <td>{uc.selectedImpact}</td>
          <td>{uc.selectedAIM}</td>
          <td>{uc.action.description}</td>
          <td>{uc.selectedOutcome}</td>
          <td>{uc.action.date}</td>
          <td>{uc.action.stakeholder}</td>
          <td>{uc.KPI}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="text-white my-4 font-bold text-3xl md:text-2xl">
    Risk Score: {calculateRiskScore()}
  </div>
</div>
</div>
<!-- The Modal -->
<div class="flex justify-center">
  <button
    id="download-button"
    class="mr-5 bg-transparent text-white font-bold text-base border-white border-2 py-2 px-3 mb-8"
    on:click={() => {
      showModal = true;
    }}>Download the data</button
  >
</div>
{#if showModal}
<div class="modal" id="outcome-modal">
  <div class="modal-content">
      <div
        class="close"
        on:click={(event) => {
          event.stopPropagation();
          showModal = false;
        }}>&times;</div
      >
      <button
        class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={handleDownloadAsCsv}>Download as CSV</button
      >
      <button
        class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={handleDownloadAsJson}>Download data as JSON</button
      >
      <button
        class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={printDiv}>Get full PDF report</button
      >
    </div>
  </div>
{/if}


<footer class="bg-white shadow dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
 <button on:click={toggleSurveyModal}> <strong>Click here</strong> to give us your feedback </button>
    <div class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">The Open Data Institute</a>.
    </span>
    </div>
</footer>

{#if surveyModal}
<div class="flex items-center justify-center fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
  <div class="flex justify-center items-center p-4 w-full h-full">
        <button
      class="absolute top-0 right-0 m-4 bg-white p-2 leading-none text-black z-50"
      on:click={toggleSurveyModal}  
    >
    Close Survey
    </button>
    <div class="shadow-2xl overflow-auto border border-solid">
      <iframe
        class="w-full h-full"
        style="aspect-ratio: 210 / 297; min-width: 500px; min-height: 800px;"
        src="https://share.hsforms.com/12mmdJzImSxaudoZFlhypxgg1jy"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</div>

{/if}

