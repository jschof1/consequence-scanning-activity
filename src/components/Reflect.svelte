<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import insert from "../../public/icons_insert.svg";

  import Textarea from '../utils/Textarea.svelte';

  export let objectives;
  export let title;
  export let stakeholders;
  export let dataUsed;
  export let onAdd;
  export let intendedConsequences;
  // export let onAddIntendedConsequence;
  // let aiSuggestions = [];
  // let showLoader = false;

  let selectedSuggestions = [];

  // async function onAddIntendedConsequenceAiSuggestion() {
  //   showLoader = true;
  //   const textAreaContent = localObjectives; // The objectives text
  //   const projectTitle = localTitle; // The title

  //   const promptContext = `Given the project titled "${projectTitle}" with objectives "${textAreaContent}", please provide suggestions to anticipate any intended consequences. Your response should be in the format of an undeclared javascript array of strings`;

  //   try {
  //     const review = await fetch("http://localhost:3000/openai-completion", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         messages: [{ role: "user", content: promptContext }],
  //         model: "gpt-3.5-turbo",
  //       }),
  //     });

  //     if (!review.ok) {
  //       throw new Error(
  //         `Network response was not ok, status: ${review.status}, statusText: ${review.statusText}`
  //       );
  //     }

  //     const data = await review.json();
  //     console.log(data.choices[0].message.content);
  //     aiSuggestions = JSON.parse(data.choices[0].message.content); // Assuming the API returns an array of strings
  //     //  WHEN PROMISE RESOLVES THEN SET LOADER TO FALSE
  //     showLoader = false;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  function addAiSuggestionToList(suggestion) {
    intendedConsequences = [
      ...intendedConsequences,
      { description: suggestion },
    ];
    selectedSuggestions.push(suggestion); // mark the suggestion as selected
  }
  let localTitle = title;
  let localObjectives = objectives;
  let showModal = false;
  let editingTitle = true;

  function handleTitleKeyPress(event) {
    if (event.key === "Enter") {
      editingTitle = false;
    }
  }

  function toggleModal() {
    showModal = !showModal;
  }

  function onProceed() {
    const data = {
      title: localTitle,
      objectives: localObjectives,
      stakeholders,
      dataUsed,
    };
    dispatch("proceed", data);
  }

  // function addStakeholder() {
  //     stakeholders = [...stakeholders, { text: "", type: "" }];
  // }
  $: console.log("In Reflect.svelte, received title:", title);
</script>

<div id="ProjectBrief" class="bg-blue-100 p-12">
  <div class="flex">
    <img class="h-10 w-9 mr-5 filter-blue" src={insert} />
    <div class="text-blue-800 font-bold text-xl md:text-2xl">
      Enter the details of your project
    </div>
  </div>
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
  <div class="text-xl pb-4 pt-6 font-bold text-blue-800">Project Title:</div>
  {#if editingTitle}
    <input
      type="text"
      bind:value={localTitle}
      placeholder="Enter the title of project"
      on:keypress={handleTitleKeyPress}
    />
  {:else}
    <h1>{localTitle}</h1>
  {/if}
</div>
<div class="bg-white p-12">
  <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">
    Project Overview:
  </div>
  <div class="mb-7 p-8 bg-orange-100 bg-opacity-50 shadow-md">
  <p class="mb-2">Please provide a detailed description of your data project including its general goals and overall purpose. You may wish to include details on the following:</p>
  <ul class="list-decimal list-inside pl-5 mb-4">
    <li class="mb-2">Explain how data will be used, processed, stored, and protected throughout the project.</li>
    <li class="mb-2">Provide an estimated project timeline, including key milestones, and important deadlines.</li>
    <li class="mb-2">Mention any relevant data privacy regulations, industry standards, or compliance requirements that the project must adhere to.</li>
    <li class="mb-2">Explain how risks will be monitored throughout the project and the process for reporting and addressing them as they occur.</li>
  </ul>
  <p class="mb-2">Please be as specific as possible. If you choose to use the Assistant AI then the information you provide here will help identify potential risks and generate potential actions for your data project.</p>
</div>
  <textarea class="textarea-padding" bind:value={localObjectives} placeholder="Enter Objectives" />
</div>
<div class="bg-blue-100 p-12">
  <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">
    What data will you be using?
  </div>
  <div class="mb-7 p-8 bg-white bg-opacity-50 shadow-md">
    <div class="mb-4 font-bold">Provide details on the data that is being utilised within the project. You may wish to include details on the following:</div>
    <ul class="list-disc pl-5 mb-4">
        <li class="mb-2">What type of data is being used? (e.g., customer info, sales data, etc.)</li>
        <li class="mb-2">Where you get the data from? (sources and providers)</li>
        <li class="mb-2">How the data looks? (format, quality)</li>
        <li class="mb-2">How much data there is? (volume)</li>
        <li class="mb-2">Whether there is any sensitive or private information in the data?</li>
        <li class="mb-2">How you keep the data secure?</li>
        <li class="mb-2">Who has access to the data? (team members, external parties)</li>
        <li class="mb-2">Any legal or compliance rules you follow?</li>
        <li class="mb-2">How long you keep the data and how you get rid of it when done?</li>
    </ul>
</div>

  <textarea
    class="textarea-padding"
    placeholder="Description of data"
    bind:value={dataUsed}
  />
</div>
<div class="bg-orange-100 p-12">
  <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">
    Who are the stakeholders?
  </div>
  <div class="mb-7 p-8 bg-white bg-opacity-50 shadow-md">
    <div class="mb-4">Please list the names or titles of individuals, teams, or organisations that are involved in your data project. Include anyone who may be affected by or can affect the project's outcome.</div>
    <div class="mb-2">For each stakeholder, indicate whether they are an "internal" stakeholder (part of your organisation or project team) or an "external" stakeholder (outside the organisation or project team).</div>
</div>

  {#each stakeholders as stakeholder, index}
    <div class="text-blue-800 mb-4 font-bold text-lg md:text-md">
    Stakeholder {index+1}
  </div>
    <div class="flex flex-col">
      <Textarea bind:value={stakeholder.text} 
      placeholder="Enter a stakeholder here"/>
      <select bind:value={stakeholder.type}>
        <option disabled selected value>Internal/External</option>
        <option value="Internal">Internal</option>
        <option value="External">External</option>
      </select>
    </div>
    <div class="border my-6 border-blue-800"></div>
  {/each}
  <button
    class="mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
    on:click={onAdd}>Add another stakeholder</button
  >
</div>

<!-- <div class="bg-blue-100 p-12">
  <div class="text-blue-800 mb-6 font-bold text-xl md:text-3xl">
    Intended Consequences
  </div>
  <div class="mb-7 p-8 bg-white shadow-md">
    <div class="mb-4">Start by creating a clear list of intended consequences. These consequences enable your project to remain focused on its objectives and desired outcomes. Intended consequences serve as a guide for project evaluation and success measurement.</div>
    <div class="mb-2">Intended consequences are the positive impacts and benefits you expect to create with your data project. This could include improved decision-making, increased efficiency, cost savings, enhanced customer satisfaction, or any other favourable results.</div>
</div> -->
  <!-- {#each intendedConsequences as ic, i}
       <div class="text-blue-800 mb-4 font-bold text-lg md:text-md">
      Intended consequence {i + 1}
    </div>
    <div class="flex flex-col">
      <label for="description">
        <Textarea
          bind:value={ic.description}
          placeholder="Description of intended consequence"
        />
      </label>
    </div>
     <div class="border my-6 border-blue-800"></div>
  {/each}
  <div class="flex gap-4">
    <button
      class="mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
      on:click={onAddIntendedConsequence}
      >Add another Intended Consequence</button
    >
    <button
      class="mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
      on:click={onAddIntendedConsequenceAiSuggestion}>Get AI suggestions</button
>
    {#if showLoader}
      <div class="loading h-1 mt-2" transition:fade={{ duration: 600 }}>
        <img alt="loading-icon" src={loading} />
      </div>
    {/if}
  </div>

  {#if aiSuggestions.length > 0}
    <hr />
    <div class="text-blue-800 mt-5 font-bold text-xl md:text-2xl">
      AI Suggested Consequences:
    </div>
    <div class="text-blue-800 italic mt-1 mb-4 font-bold text-sm md:text-sm">
      Click on the suggestion to add it to your list of Intended Consequences
    </div>
    {#each aiSuggestions as suggestion}
      {#if !selectedSuggestions.includes(suggestion)}
        <div in:fade={{ duration: 300 }}>
          <button
            class="m-2 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
            on:click={() => addAiSuggestionToList(suggestion)}
            >{suggestion}</button
          >
        </div>
      {:else}
        <div class="flex flex-col">
          <textarea
            class="textarea-padding"
            readonly={true}
            value={suggestion}
          />
        </div>
      {/if}
    {/each}
  {/if} -->
<!-- </div> -->

<div class="bg-blue-800 p-12">
        <button
          class="bg-transparent text-white font-bold text-base border-white border-2 py-2 px-3"
          on:click={onProceed}>Proceed to Consequences</button
        >
</div>

<style>
  .reflect-title {
    padding-bottom: 10px;
    border-bottom: 2px solid #2a45a0;
  }

  .add-more-large {
    display: flex;
    flex-direction: column;
  }
  .stakeholder-select {
    margin-bottom: 10px;
  }
</style>
