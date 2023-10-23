<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { aiSuggestions } from "./store.js";
  const dispatch = createEventDispatcher();
  import ai from "../../public/icons_ai.svg";

  export let consequences;
  export let onAdd;

  let showModal = null;
  let aiSuggest = null;
  let customConsequences = null;

  function checkAIConsequences() {
    console.log($aiSuggestions);
  }

  checkAIConsequences();
  function addOwnConsequences() {
    customConsequences = true;
    aiSuggest = false;
  }

  function selectSuggestion(selectedSuggestion) {
    let wasSelected = selectedSuggestion.isSelected; // Check the previous isSelected value

    let updatedSuggestions = $aiSuggestions.map((sug) => {
      if (sug.description === selectedSuggestion.description) {
        return {
          ...sug,
          isSelected: !sug.isSelected,
        };
      }
      return sug;
    });

    aiSuggestions.set(updatedSuggestions);

    // Now use the old value to determine if you need to add or remove from the consequences
    if (!wasSelected) {
      // if it was not selected before, add it now
      consequences.push({
        description: selectedSuggestion.description,
        outcome: selectedSuggestion.selectedOutcome,
        impact: ["High", "Medium", "Low"],
        selectedImpact: "",
        likelihood: ["High", "Medium", "Low"],
        selectedLikelihood: "",
        action: "",
        AIM: ["Act", "Influence", "Monitor"],
        selectedAIM: "",
        timeline: ["3 months", "6 months", "1 year", "2 years"],
        selectedTimeline: "",
      });
    } else {
      // Remove the unselected suggestion from the consequences array
      const index = consequences.findIndex(
        (consequence) =>
          consequence.description === selectedSuggestion.description
      );
      if (index > -1) {
        consequences.splice(index, 1);
      }
    }
    dispatch("updateConsequences", consequences);
    console.log(consequences);
  }

  function onProceed() {
    dispatch("proceed");
  }
  function toggleModal() {
    showModal = !showModal;
  }
</script>

{#if customConsequences === null}
  <div id="unintendedConsequences" class="bg-orange-100 p-12">
    <div class="flex">
      <img class="h-10 w-9 mr-5 filter-blue" src={ai} />
      <div class="text-blue-800 font-bold text-xl md:text-2xl">
        Do you want AI to suggest consequences?
      </div>
    </div>
    <div class="" style="display:{aiSuggest === true || false ? 'none' : ''}">
      <button
        class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
        style="display"
        on:click={() => (aiSuggest = true)}>Yes</button
      >
      <button
        class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
        on:click={() => (aiSuggest = false)}>No</button
      >
    </div>
  </div>
{/if}
{#if aiSuggest === true}
  <div class="bg-orange-100">
    <ul class="flex flex-col w-full justify-center">
      {#each $aiSuggestions as suggestion}
        <li>
          <button
            class="m-5 bg-transparent text-blue-800 bg-white font-bold text-base py-2 px-3 {suggestion.isSelected
              ? 'selected-suggestion'
              : ''}"
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
  <div style="display: {customConsequences !== null ? 'none' : ''}">
    <button
      class="m-5 bg-transparent text-white font-bold text-base border-white border-2 py-2 px-3"
      on:click={onProceed}>Continue with these consequences</button
    >
    <button
      class="m-5 bg-transparent text-white font-bold text-base border-white border-2 py-2 px-3"
      on:click={addOwnConsequences}>Add in your own consequences</button
    >
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
        <div class="modal" in:fade={{ duration: 300 }}>
          <div class="modal-content">
            <span class="close" on:click={toggleModal}>&times;</span>
            <p>Input some text explaining this section</p>
          </div>
        </div>
      {/if}
    </div>
    {#each consequences as consequence, i}
      <div class="consequence-options">
        <label for="description">
          <span class="text-blue-800 font-bold text-lg"
            >Unintended Consequence {i + 1}</span
          >
          <textarea
            class="consequence-input"
            bind:value={consequence.description}
            placeholder="Description"
          />
        </label>
        <div class="input-row">
          <label for="outcome">
            <span class="text-blue-800 font-bold text-lg">Outcome</span>
            <select bind:value={consequence.selectedOutcome}>
              <option disabled value>Outcome</option>
              <option
                selected={consequence.selectedOutcome === "Positive"}
                value="Positive">Positive</option
              >
              <option
                selected={consequence.selectedOutcome === "Negative"}
                value="Negative">Negative</option
              >
            </select>
          </label>
        </div>
      </div>
    {/each}
    <div>
      <button
        class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={onAdd}>Add More</button
      >
      <button
        class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={onProceed}>Proceed to Evalute Risk</button
      >
    </div>
  </div>
{/if}

<style>
  .selected-suggestion {
    background-color: #e7f1f4;
    color: #2146a7;
  }
</style>
