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

<div id="Review" class="p-12 bg-blue-800">
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
  <div  id="risk-management-table">
  <div
    class="text-white my-5 font-bold text-3xl md:text-2xl"
  >
    Risk Management Table
  </div>
  <table class="data-table">
    <thead>
      <tr>
        <th>Unintended Consequences</th>
        <th>Likelihood</th>
        <th>Impact</th>
        <th>AIM</th>
        <th>Action</th>
        <th>Outcome</th>
        <th>Timescale</th>
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
          <td>{uc.action}</td>
          <td>{uc.selectedOutcome}</td>
          <td>{uc.timeline.date} - {uc.timeline.stakeholder}</td>
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
  <div class="modal" id="outcome-modal" in:fade={{ duration: 300 }}>
    <div class="modal-content">
      <span
        class="close"
        on:click={() => {
          showModal = false;
        }}>&times;</span
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
        on:click={handleDownloadAsHTML}>Get full PDF report</button
      >
    </div>
  </div>
{/if}
