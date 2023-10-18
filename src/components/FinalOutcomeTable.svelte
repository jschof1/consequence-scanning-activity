<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let showModal;
  export let projectTitle;
  export let unintendedConsequences;
  export let intendedConsequences
  export let objectives
  export let stakeholders

  function handleDownloadAsCsv() {
    dispatch('proceed', { format: 'csv' });
  }

  function handleDownloadAsJson() {
    dispatch('proceed', { format: 'json' });
  }

  function handleDownloadAsHTML() {
    dispatch('proceed', { format: 'html' });
  }
  function calculateRiskScore() {
    let score = 0;
    unintendedConsequences.forEach(uc => {
      if (uc.selectedImpact === 'High' && uc.selectedLikelihood === 'High') {
        score += 10;
      }
    });
    return score;
  }

</script>
      <div id="Review" class="card project-overview">
        <h1>{projectTitle}</h1>
        <h2>Project Overview</h2>
        <p><strong>Objectives:</strong> {objectives}</p>
        {#if stakeholders}
        <p><strong>Stakeholders:</strong> </p> 
        {#each stakeholders as stakeholder, i}
        <p>{stakeholder.text} <em>({stakeholder.type})</em></p>
        {/each}
        {/if}
        <h2>Intended/Positive Consequences</h2>
        <ul>
          {#each intendedConsequences as ic}
            <li>{ic.description}</li>
          {/each}
        </ul>
      
        <h2>Risk Management Table</h2>
        <table class=data-table>
          <thead>
            <tr>
              <th>Unintended Consequences </th>
              <th>Likelihood</th>
              <th>Impact</th>
              <th>AIM</th>
              <th>Action</th>
              <th>Timescale</th>
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
                <td>{uc.selectedTimeline}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      
        <p><strong>Risk Score:</strong> {calculateRiskScore()}</p>
      
        <button on:click={handleDownloadAsHTML}>Get full report</button>
  <!-- The Modal -->
  <button on:click={() => { showModal = true; }}>Download the data</button>
  

{#if showModal}
  <div class="modal" in:fade={{duration: 300}}>
    <div class="modal-content">
      <span class="close" on:click={() => { showModal = false; }}>&times;</span>
      <p>Download the data as a CSV file</p>
      <button on:click={handleDownloadAsCsv}>Download as CSV</button>
      <p>Download the data as a CSV file</p>
      <button on:click={handleDownloadAsJson}>Download data as JSON</button>
    </div>
  </div>
{/if}
</div>