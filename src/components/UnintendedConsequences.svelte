<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  export let consequences;  
  export let onAdd;
  
  let showModal = null
  let aiSuggest = null;
  let customConsequences = null

  
  function addOwnConsequences() {
        customConsequences = true;
        aiSuggest = false;
    }
  // Predefined AI suggestions with outcomes
 let aiSuggestions = [
    { description: "Potential impact on the environment due to waste.", outcome: "Negative" , isSelected: false},
    { description: "Possible misuse of the product by end-users.", outcome: "Negative" , isSelected: false},
    { description: "Might lead to job losses due to automation.", outcome: "Negative" , isSelected: false},
    { description: "Could be used unethically in certain situations.", outcome: "Negative" , isSelected: false},
    { description: "Improves accessibility for differently-abled individuals.", outcome: "Positive", isSelected: false }
    // ... add more suggestions as needed
  ];
  function selectSuggestion(selectedSuggestion) {
    // Toggle the isSelected property of the clicked suggestion
    selectedSuggestion.isSelected = !selectedSuggestion.isSelected;
    
    if (selectedSuggestion.isSelected) {
      consequences.push(selectedSuggestion);
    } else {
      // Remove the unselected suggestion from the consequences array
      const index = consequences.indexOf(selectedSuggestion);
      if (index > -1) {
        consequences.splice(index, 1);
      }
    }
    aiSuggestions = aiSuggestions
  }


    function onProceed() {
        dispatch('proceed');
    }
    function toggleModal() {
        showModal = !showModal;
  }

</script>
{#if customConsequences === null}
<div class="card">
<h3>Do you want AI to suggest consequences?</h3>
<div class="btn-white-styled-container" style="display:{aiSuggest === true || false ? 'none' : ''}">
<button class="btn-white-styled" style="display" on:click={() => aiSuggest = true}>Yes</button>
<button class="btn-white-styled" on:click={() => aiSuggest = false}>No</button>
</div>
</div>
{/if}
{#if aiSuggest === true}
<div class="card">
  <div class="btn-white-styled-container">
<ul>
  {#each aiSuggestions as suggestion}
  <li>
    <button 
    class="suggestion-button {suggestion.isSelected ? 'selected-suggestion' : ''}" 
    on:click={() => selectSuggestion(suggestion)}
    >
    {suggestion.description} (Outcome: {suggestion.outcome})
    {#if suggestion.isSelected}
      ✅
    {/if}
      </button>
    </li>
    {/each}
  </ul>
  </div>
  <div class="btn-white-styled-container" style="display: {customConsequences !== null ? 'none' : ''}">
    <button class="btn-white-styled" on:click={() => customConsequences = false}>Continue with these consequences</button>
    <button class="btn-white-styled" on:click={addOwnConsequences}>Add in your own</button>
</div>
</div>

  {/if}
{#if aiSuggest === false && customConsequences === true}
<div class="card" id="UnintendedConsequences">
  <div class="header-btn">
  <h2>Unintended Consequences</h2>
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
  {#each consequences as consequence, i}
  <div class="consequence-options">
    <label for="description"
      >Unintended Consequence {i+1}
      <textarea
        class="consequence-input"
        bind:value={consequence.description}
        placeholder="Description"
      />
    </label>
    <div class="input-row">
    <label for="outcome"
      >Outcome
      <select bind:value={consequence.outcome}>
        <option disabled selected value>Outcome</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
      </select>
    </label>
    </div>
  </div>
  {/each}
    <div class="btn-white-styled-container"></div>
<button class="btn-white-styled" on:click={onAdd}>Add More</button>
<button class="btn-white-styled"on:click={onProceed}>Proceed to Evalute Risk</button>
</div>
{/if}
<style>
.selected-suggestion {
  background-color: green;
  color: white;
}
</style>