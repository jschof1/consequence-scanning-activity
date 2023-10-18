<script>
  import { fade } from 'svelte/transition';
  export let unintendedConsequences;
  export let onSetImpact;
  export let onSetLikelihood;

  let showModal = false;

  import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function onProceed() {
        dispatch('proceed');
    }
    function toggleModal() {
        showModal = !showModal;
  }

// funciton to add all the inputs for you
function addAiSuggestionForCurrent(i) {
  onSetImpact(i, "Low");
  onSetLikelihood(i, "High");
  console.log("adding ai suggestion for current", i);
  console.log("unintendedConsequences", unintendedConsequences);
  }
</script>
<div class="card" id="Consequences">
  <div class="header-btn">
  <h2>Evaluate Risks of Unintended Consequences</h2>
  <button class="info-button" title="Information" on:click={toggleModal}>
    ℹ
  </button>
  {#if showModal}
  <div class="modal" in:fade={{duration: 300}}>
    <div class="modal-content">
      <span class="close" on:click={toggleModal}>&times;</span>
      <p>Input some text explaining this section</p>
    </div>
  </div>
  {/if}
  </div>
  {#each unintendedConsequences as consequence, i}
  <div class="consequence-options">
   <h3>{consequence.description}</h3>
    <div class="input-row">
    <label for="impact"
      >impact
      <select on:input={(event) => onSetImpact(i, event.target.value)}>
        <option disabled selected value>impact</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </label>
    <label for="likelihood"
      >Likelihood
      <select on:input={(event) => onSetLikelihood(i, event.target.value)}>
        <option disabled selected value>likelihood</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </label>
    </div>
    <button class="btn-white-styled" on:click={() => addAiSuggestionForCurrent(i)}>Get help from AI</button>
  </div>
  {/each}
    <div class="btn-white-styled-container">
    <button class="btn-white-styled"on:click={onProceed}>Attach Actions</button>
    </div>
</div>
