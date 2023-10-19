<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { aiSuggestions } from './store.js';
  const dispatch = createEventDispatcher();
  
  export let consequences;  
  export let onAdd;
  // export let aiSuggestions;
  
  let showModal = null
  let aiSuggest = null;
  let customConsequences = null

  
  function addOwnConsequences() {
        customConsequences = true;
        aiSuggest = false;
    }

    function selectSuggestion(selectedSuggestion) {
    let wasSelected = selectedSuggestion.isSelected; // Check the previous isSelected value

    let updatedSuggestions = $aiSuggestions.map(sug => {
        if (sug.description === selectedSuggestion.description) {
            return {
                ...sug,
                isSelected: !sug.isSelected
            };
        }
        return sug;
    });

    aiSuggestions.set(updatedSuggestions);

    // Now use the old value to determine if you need to add or remove from the consequences
    if (!wasSelected) { // if it was not selected before, add it now
        consequences.push({
            description: selectedSuggestion.description,
            outcome: selectedSuggestion.selectedOutcome,
            impact: ["High", "Medium", "Low"],
            selectedImpact: "",
            likelihood: ["High", "Medium", "Low"],
            selectedLikelihood: "",
            action: "",
            AIM: ['Act', 'Influence', 'Monitor'],
            selectedAIM: "",
            timeline: ["3 months", "6 months", "1 year", "2 years"], 
            selectedTimeline: "",
        });
    } else {
        // Remove the unselected suggestion from the consequences array
        const index = consequences.findIndex(consequence => consequence.description === selectedSuggestion.description);
        if (index > -1) {
            consequences.splice(index, 1);
        }
    }
    dispatch('updateConsequences', consequences);
    console.log(consequences);
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
  <div class="btn-white-styled-container consequence-options">
<ul>
  {#each $aiSuggestions as suggestion}
  <li>
    <button 
    class="suggestion-button btn-white-styled {suggestion.isSelected ? 'selected-suggestion' : ''}" 
    on:click={() => selectSuggestion(suggestion)}
    >
    {suggestion.description} (Outcome: {suggestion.outcome})
  </button>
    {#if suggestion.isSelected}
      ✅
    {/if}
    </li>
    {/each}
  </ul>
  </div>
  <div class="btn-white-styled-container" style="display: {customConsequences !== null ? 'none' : ''}">
    <button class="btn-white-styled" on:click={onProceed}>Continue with these consequences</button>
    <button class="btn-white-styled" on:click={addOwnConsequences}>Add in your own consequences</button>
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
      <select bind:value={consequence.selectedOutcome}>
        <option disabled value>Outcome</option>
        <option selected={consequence.selectedOutcome === "Positive"} value="Positive">Positive</option>
        <option selected={consequence.selectedOutcome === "Negative"} value="Negative">Negative</option>
      </select>
    </label>
    </div>
  </div>
  {/each}
  <div class="btn-white-styled-container">
    <button class="btn-white-styled" on:click={onAdd}>Add More</button>
    <button class="btn-white-styled"on:click={onProceed}>Proceed to Evalute Risk</button>
  </div>
</div>
  {/if}
  <style>
.selected-suggestion {
  background-color: green;
  color: white;
}
</style>