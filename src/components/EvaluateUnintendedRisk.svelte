<script>
  import { fade } from "svelte/transition";
  import { unintendedConsequenceSuggestions } from "./store.js";
  export let unintendedConsequences;
  export let onSetImpact;
  export let onSetLikelihood;

  let showModal = false;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function onProceed() {
    dispatch("proceed");
  }
  function toggleModal() {
    showModal = !showModal;
  }
  function fillConsequencesFromAI(index) {
    if ($unintendedConsequenceSuggestions[index]) {
      unintendedConsequences[index].selectedImpact =
        $unintendedConsequenceSuggestions[index].impact;
      unintendedConsequences[index].selectedLikelihood =
        $unintendedConsequenceSuggestions[index].likelihood;
    }
  }
</script>

<div class="bg-orange-100 p-12" id="Consequences">
  <div class="text-blue-800 mb-6 font-bold text-xl md:text-3xl">
    Evaluate Risks of Unintended Consequences
  </div>
{#each unintendedConsequences as consequence, i}
  <div class="consequence-options">
    <div class="text-blue-800 font-bold p-5 text-xl md:text-md">
      {consequence.description}
    </div>
    <button
      class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
      on:click={() => fillConsequencesFromAI(i)}
      >Fill impact and likelihood using AI</button
    >
    <div class="input-row">
      <label for="impact"
        >         <span class="text-blue-800 font-bold text-lg">impact</span>
        <select
          bind:value={consequence.selectedImpact}
          on:input={(event) => onSetImpact(i, event.target.value)}
        >
          <option disabled selected value>impact</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
      <label for="likelihood"
        >         <span class="text-blue-800 font-bold text-lg">Likelihood</span>
        <select
          bind:value={consequence.selectedLikelihood}
          on:input={(event) => onSetLikelihood(i, event.target.value)}
        >
          <option disabled selected value>likelihood</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </label>
    </div>
  </div>
{/each}
<button
  class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
  on:click={onProceed}>Proceed to Attach Actions</button
>
</div>