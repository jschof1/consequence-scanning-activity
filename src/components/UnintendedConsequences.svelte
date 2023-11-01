<script>
  const dispatch = createEventDispatcher();
  
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { unintendedConsequenceSuggestions } from "./store.js";
  import { derived } from "svelte/store";
  import loading from "../../public/loading.gif";
  import ai from "../../public/icons_ai.svg";
  import Textarea from "../utils/Textarea.svelte";
  import bin from "../../public/icons_bin.svg";

  const isLoading = derived(
    unintendedConsequenceSuggestions,
    ($unintendedConsequenceSuggestions) =>
      !$unintendedConsequenceSuggestions ||
      $unintendedConsequenceSuggestions.length === 0
  );

    let showModal = false;
  function toggleModal() {
    showModal = !showModal;
  }
  export let consequences;
  export let onAdd;
  export let ProjectData;

  let aiSuggest = null;
  let customConsequences = null;


  function checkAIConsequences() {
    console.log($unintendedConsequenceSuggestions);
  }

  checkAIConsequences();
  function addOwnConsequences() {
    customConsequences = true;
    aiSuggest = false;
    $unintendedConsequenceSuggestions.map((a) =>{
      a.isSelected = false
    })
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
    // Filter out the unselected suggestions
    const selectedSuggestions = $unintendedConsequenceSuggestions.filter(
      (sug) => sug.isSelected
    );

    // Add the selected suggestions to the consequences array
    selectedSuggestions.forEach((selectedSuggestion) => {
      consequences.unshift({
        description: selectedSuggestion.description,
        outcome: selectedSuggestion.selectedOutcome,
        impact: ["High", "Medium", "Low"],
        selectedImpact: "",
        likelihood: ["High", "Medium", "Low"],
        selectedLikelihood: "",
        action : { description: "", stakeholder: "", date: "" },
        AIM: ["Act", "Influence", "Monitor"],
        selectedAIM: "",
      });
    });

    dispatch("proceed", event);
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
     <br><br>
    <span class="underline font-semibold cursor-pointer" on:click={toggleModal}>Click here</span> to see what data the AI will be using.
      {#if showModal}
        <div
          class="block z-10 fixed bg-slate-100 bg-opacity-20 left-20 bottom-20 w-full h-full overflow-hidden"
          in:fade={{ duration: 300 }}
        >
          <div class="modal-content shadow-2xl">
            <div class="close" on:click={() => toggleModal()}>&times;</div>
         <div class="space-y-4">
    <div class="text-lg font-semibold text-gray-700">The Project Title:</div>
    <div class="bg-gray-100 p-3 rounded text-gray-800">{ProjectData.title}</div>
    
    <div class="text-lg font-semibold text-gray-700">The Project Objectives:</div>
    <div class="bg-gray-100 p-3 rounded text-gray-800">{ProjectData.objectives}</div>
    
    <div class="text-lg font-semibold text-gray-700">The Project Stakeholders:</div>
    {#each ProjectData.stakeholders as stakeholder}
    <div class="bg-gray-100 p-3 rounded text-gray-800">{stakeholder.text} - ({stakeholder.type})</div>
    {/each}

    <div class="text-lg font-semibold text-gray-700">The data you will be using in your project:</div>
    <div class="bg-gray-100 p-3 rounded text-gray-800">{ProjectData.dataUsed}</div>
</div>

          </div>
        </div>
      {/if}
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
      <div class="mb-7 p-8 bg-white opacity-80 shadow-md">
        These consequences have been generated by the AI. Each generated
        consequence has also been identified as having either a positive or
        negative outcome. Review the consequences and edit or remove any that
        require amendments. You can also create your own consequences and add
        them to the list.
      </div>
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
