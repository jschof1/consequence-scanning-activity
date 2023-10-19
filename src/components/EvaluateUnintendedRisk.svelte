<script>
    import { fade } from 'svelte/transition';
    import { aiSuggestions } from './store.js';
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
    function fillConsequencesFromAI(index) {
        if ($aiSuggestions[index]) {
            unintendedConsequences[index].selectedImpact = $aiSuggestions[index].selectedImpact;
            unintendedConsequences[index].selectedLikelihood = $aiSuggestions[index].selectedLikelihood;
        }
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
     <button class="btn-white-styled" on:click={() => fillConsequencesFromAI(i)}>Fill impact and likelihood using AI</button>
      <div class="input-row">
      <label for="impact"
        >impact
        <select bind:value={consequence.selectedImpact} on:input={(event) => onSetImpact(i, event.target.value)}>
          <option disabled selected value>impact</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </label>
      <label for="likelihood"
        >Likelihood
        <select bind:value={consequence.selectedLikelihood} on:input={(event) => onSetLikelihood(i, event.target.value)}>
          <option disabled selected value>likelihood</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
      </label>
      </div>
    </div>
    {/each}
      <button class="btn-white-styled"on:click={onProceed}>Proceed to Attach Actions</button>
  </div>
  