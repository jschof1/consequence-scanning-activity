<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { unintendedConsequenceSuggestions } from "./store.js";
  import { derived } from "svelte/store";
  import loading from "../../public/loading.gif";
  const dispatch = createEventDispatcher();
  import ai from "../../public/icons_ai.svg";
  import Textarea from "../utils/Textarea.svelte";
  import bin from "../../public/icons_bin.svg";


  const isLoading = derived(
    unintendedConsequenceSuggestions,
    ($unintendedConsequenceSuggestions) =>
      !$unintendedConsequenceSuggestions ||
      $unintendedConsequenceSuggestions.length === 0
  );

  export let consequences;
  export let onAdd;

  let aiSuggest = null;
  let customConsequences = null;


  function checkAIConsequences() {
    console.log($unintendedConsequenceSuggestions);
  }

  checkAIConsequences();


 function addOwnConsequences() {
  customConsequences = true;
  aiSuggest = false;

  // You might want to add the already selected suggestions to your `consequences` array
  let selected = $unintendedConsequenceSuggestions.filter(s => s.isSelected);
  selected.forEach(s => {
    consequences.push({
      description: s.description,
      outcome: s.selectedOutcome
    });
  });
  $unintendedConsequenceSuggestions = $unintendedConsequenceSuggestions.map(a => ({ ...a, isSelected: false }));


  unintendedConsequenceSuggestions.set($unintendedConsequenceSuggestions);
}

  function handleBinClick(selectedDescription) {
    const updatedSuggestions = $unintendedConsequenceSuggestions.map((sug) => {
      if (sug.description === selectedDescription) {
        return {
          ...sug,
          isSelected: false,
        };
      }
      return sug;
    });

    unintendedConsequenceSuggestions.set(updatedSuggestions);
  }
  function onProceed() {
    const selectedSuggestions = $unintendedConsequenceSuggestions ? $unintendedConsequenceSuggestions.filter(
        (sug) => sug.isSelected
    ) : [];

    consequences = [
       ...selectedSuggestions.map((selectedSuggestion) => ({
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
           })),
        ...consequences
    ];

    consequences = consequences.filter(consequence => consequence.description && consequence.description.trim() !== '');
    dispatch("proceed",  { details: consequences });
  }
</script>

<div id="UnintendedConsequences">
  <div class="bg-orange-100 p-12">
    <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">
      Unintended Consequences
    </div>
    <div class="mb-7 p-8 bg-white shadow-md">
      <div class="mb-4">
        To ensure a comprehensive risk assessment for your data project, you
        should try to identify any potential unintended consequences that may
        occur. These unintended consequences can have both positive and negative
        impacts. Consider the following:
      </div>
      <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">
          <strong class="text-blue-500"
            >Positive Unintended Consequences:</strong
          > Think about unexpected benefits or positive outcomes that might result
          from your project. For example, improved processes, increased efficiency,
          or unforeseen uses or users of the product or service.
        </li>
        <li class="mb-2">
          <strong class="text-red-500">Negative Unintended Consequences:</strong
          > Consider any adverse effects or unexpected problems that might occur.
          This could involve privacy breaches, data misuse, or potential bias in
          the data.
        </li>
        <li class="mb-2">
          <strong>Secondary Effects:</strong> Think about ripple effects that your
          project might have on other processes, systems, or stakeholders, even if
          they are not directly involved.
        </li>
        <li class="mb-2">
          <strong>External Factors:</strong> Take into account external factors or
          events that your project might interact with or influence. These could
          include changes in regulations, market conditions, or technological advancements.
        </li>
      </ul>
      <div class="mb-2">
        Add a brief description of the unintended consequence that may occur
        during your data project and indicate whether the outcome is positive or
        negative.
      </div>
    </div>
  </div>
  {#if customConsequences === null && aiSuggest === null}
    <div class="bg-blue-100 p-12">
      <div class="flex">
        <img class="h-10 w-9 mr-5 filter-blue" src={ai} />
        <div class="text-blue-800 font-bold text-xl md:text-2xl">
          Do you want AI to suggest unintended consequences?
        </div>
      </div>
      <div class="mt-7 p-8 bg-white shadow-md bg-opacity-70">
        The AI will review the details of the project and make suggestions for
        what the possible intended and unintended consequences might be. The
        generated consequences should be treated as a guide that supports your
        project planning.
      </div>
      <div class="" style="display:{aiSuggest === true || false ? 'none' : ''}">
        <button
          class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
          style="display"
          on:click={() => (aiSuggest = true)}>Yes</button
        >
        <button
          class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
          on:click={addOwnConsequences}>No</button
        >
      </div>
    </div>
  {/if}
  {#if aiSuggest === true}
    <div class="bg-orange-100 p-12">
      {#if $isLoading}
        <div class="loading h-2 ml-10" transition:fade={{ duration: 300 }}>
          <img alt="loading-icon ml-8 mt-1" src={loading} />
        </div>
      {/if}
      {#if !$isLoading}
      <div class="mb-7 p-8 bg-white opacity-80 shadow-md">
        These consequences have been generated by the AI. Each generated
        consequence has also been identified as having either a positive or
        negative outcome. Review the consequences and edit or remove any that
        require amendments. You can also create your own consequences and add
        them to the list.
      </div>
    {/if}
      <div class="flex flex-col w-full justify-center">
        {#each $unintendedConsequenceSuggestions as suggestion}
          <div class="relative">
              {#if suggestion.isSelected}
              <Textarea bind:value={suggestion.description} />
              <img
                src={bin}
                alt="bin icon"
                class="filter-blue absolute top-2 right-2 mt-1 pb-1 mr-4 cursor-pointer h-5"
                on:click={() => handleBinClick(suggestion.description)}
              />
              {/if}
          </div>
        {/each}
      </div>
    </div>
    <div
      class="bg-orange-100 p-12"
      style="display: {customConsequences !== null ? 'none' : ''}"
    >
      <button
        class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
        on:click={onProceed}>Continue with these consequences</button
      >
      <button
        class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
        on:click={addOwnConsequences}>Add in your own consequences</button
      >
    </div>
  {/if}
  {#if aiSuggest === false && customConsequences === true}
    <div id="UnintendedConsequences" class="bg-blue-100 p-12">
          <div class="text-blue-800 mb-4 font-bold text-xl md:text-3xl">
          Unintended Consequences
      </div>
      {#each consequences as consequence, i}
        <div class="consequence-options">
          <label for="description">
            <div class="text-blue-800 mb-4 font-bold text-lg md:text-md">
              Unintended Consequence {i + 1}
            </div>
            <Textarea
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
</div>

<style>
  .selected-suggestion {
    background-color: #e7f1f4;
    color: #2146a7;
  }
</style>
