<script>
  import { fade } from "svelte/transition";
  import { aiSuggestions } from "./store.js";

  export let consequences;
  export let onSetAction;
  export let onSetTimeline;
  export let onSetMeasure;
  export let onSetKPI;

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function onProceed() {
    dispatch("proceed");
  }

  function fillActionFromAI(index) {
    if ($aiSuggestions[index]) {
      consequences[index].action = $aiSuggestions[index].action;
    }
  }
  function fillTimelineFromAI(index) {
    if ($aiSuggestions[index]) {
      consequences[index].timescale = $aiSuggestions[index].selectedTimeline;
    }
  }
  function fillMeasureFromAI(index) {
    if ($aiSuggestions[index]) {
      consequences[index].selectedAIM = $aiSuggestions[index].selectedAIM;
    }
  }
  function fillKPIFromAI(index) {
    if ($aiSuggestions[index]) {
      consequences[index].KPI = $aiSuggestions[index].KPI;
    }
  }
</script>

<div id="Actions" class="bg-blue-100 p-12">
    <div class="text-blue-800 font-bold text-xl md:text-2xl pb-5">
      Assign Actions to Consequences
    </div>
    <button class="info-button" title="Information" on:click={toggleModal}>
      ℹ
    </button>
    {#if showModal}
      <div class="modal" in:fade={{ duration: 300 }}>
        <div class="modal-content">
          <span class="close" on:click={toggleModal} role="button" tabindex="0"
            >&times;</span
          >
          <p>Input some text explaining this section</p>
        </div>
      </div>
    {/if}
  {#each consequences as consequence, i}
  <div class="consequence-options">
      <span class="consequence-actions-container">
        <div class="text-blue-800 font-bold mb-10 text-lg md:text-2xl">
          consequence {i + 1}:
        </div>
        <h2>{consequence.description}</h2>
      </span>
      <label for="action">
        <span class="text-blue-800 font-bold text-lg">Action</span>
        <textarea
          class="consequence-input"
          bind:value={consequence.action}
          placeholder="Enter action for this consequence"
          on:input={(event) => onSetAction(i, event.target.value)}
        />
      </label>
      <div>
        <button
          class="mb-9 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillActionFromAI(i)}>Fill action using AI</button
        >
      </div>
      <label for="KPI">
        <span class="text-blue-800 font-bold text-lg"
          >Enter KPI for this consequence</span
        >
        <textarea
          class="consequence-input"
          bind:value={consequence.KPI}
          placeholder="Enter KPI for this consequence"
          on:input={(event) => onSetKPI(i, event.target.value)}
        />
      </label>
      <div>
        <button
          class="mb-9 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillKPIFromAI(i)}>Fill KPI using AI</button
        >
      </div>
      <div class="input-row mb-5">
        <label for="timescale">
          <span class="text-blue-800 font-bold text-lg"> Timescale </span>
          <select
            bind:value={consequence.timescale}
            on:change={(event) => onSetTimeline(i, event.target.value)}
          >
            <option disabled selected value>Timescale</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
          </select>
        </label>
        <label for="measure">
          <span class="text-blue-800 font-bold text-lg">
            Act, Influence, or Monitor</span
          >
          <select
            bind:value={consequence.selectedAIM}
            on:change={(event) => onSetMeasure(i, event.target.value)}
          >
            <option disabled selected value>Select an option</option>
            <option value="Act">Act</option>
            <option value="Influence">Influence</option>
            <option value="Monitor">Monitor</option>
          </select>
        </label>
      </div>
      <div class="mb-5">
        <button
          class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillTimelineFromAI(i)}>Fill Timeline using AI</button
        >
        <button
          class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillMeasureFromAI(i)}>Fill Measure using AI</button
        >
      </div>
    </div>
  {/each}
  <button
    class="mr-5 mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
    on:click={onProceed}>View Data in Table Format</button
  >
</div>


<style>
  h4 {
    padding-left: 5px;
  }
</style>
