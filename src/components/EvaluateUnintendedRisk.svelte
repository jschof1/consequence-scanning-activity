<script>
  import { onMount } from 'svelte';
  import { unintendedConsequenceSuggestions } from "./store.js";
  export let unintendedConsequences;
  export let onSetImpact;
  export let onSetLikelihood;

  console.log(unintendedConsequences);
  console.log($unintendedConsequenceSuggestions);

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function onProceed() {
    dispatch("proceed");
  }


  onMount(() => {
    unintendedConsequences = unintendedConsequences.filter(consequence => 
      consequence.description && consequence.description.trim() !== ''
    );
  });

  function fillConsequencesFromAI(index) {
    // todo fix this function
    return;
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
    <div class="mb-7 p-8 bg-white shadow-md">
    <div class="mb-4">
        To evaluate the risks associated with your data project, we are going to further examine the unintended consequences.
    </div>
    <div class="mb-4">
        For each unintended consequence, please assess both its impact and likelihood on a scale of low, medium, and high. This evaluation will help prioritise and manage risks effectively.
    </div>
    <div class="mb-4">
        Would you like the AI to assess the consequences for the potential impact and likelihood? The AI will provide a low, medium or high score for each consequence. You can review and update these before continuing.
    </div>
</div>
{#each unintendedConsequences as consequence, i}
  <div class="consequence-options">
    <div class="text-blue-800 font-bold p-5 text-xl md:text-md">
      {consequence.description}
    </div>
    <button
      class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
      on:click={() => fillConsequencesFromAI(i)}
      >Suggest impact and likelihood using AI (coming soon)</button
    >
    <div class="input-row">
      <label for="impact"
        >         <span class="text-blue-800 font-bold text-lg">Impact</span>
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