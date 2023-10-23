<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import insert from "../../public/icons_insert.svg"

  export let objectives;
  export let title;
  export let stakeholders;
  export let dataUsed;
  export let onAdd;
  export let intendedConsequences;
  export let onAddIntendedConsequence;
  
  let localTitle = title // Use a local variable to track changes
  let localObjectives = objectives;
  let showModal = false;
  let editingTitle = true;  

function handleTitleKeyPress(event) {
    if (event.key === 'Enter') {
        editingTitle = false; 
    }
}

  function toggleModal() {
      showModal = !showModal;
    }
    
    function onProceed() {
    // Use localTitle instead of title for dispatch
    console.log("title:", localTitle);
    const data = {
      title: localTitle,
      objectives: localObjectives,
      stakeholders,
      dataUsed
    };
    dispatch('proceed', data);
  }

  // function addStakeholder() {
  //     stakeholders = [...stakeholders, { text: "", type: "" }];
  // }
  $: console.log("In Reflect.svelte, received title:", title);
</script>

<div id="ProjectBrief" class="bg-blue-100 p-12">
  <div class="flex">
    <img class="h-10 w-9 mr-5 filter-blue"  src={insert}/>
      <div class="text-blue-800 font-bold text-xl md:text-2xl">Enter the details of your project</div>
      </div>
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
        <div class="text-xl pb-4 pt-6 font-bold text-blue-800">Project Title:</div>
        {#if editingTitle}
        <input 
        type="text" 

        bind:value={localTitle} 
        placeholder="Enter title of project" 
        on:keypress={handleTitleKeyPress}
    />
        {:else}
            <h1>{localTitle}</h1>

        {/if}
        </div>
      <div class="bg-white p-12">
          <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">What are the objectives of your project?</div>
          <textarea class="textarea-padding" bind:value={localObjectives} />
      </div>
      <div class="bg-orange-100 p-12">
      {#each intendedConsequences as ic, i}
      <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">Intended consequences {i+1}</div>
      <div class="add-more-large">
        <label for="description"
          >
          <textarea
            class= "textarea-padding"
            bind:value={ic.description}
            placeholder="Description of intended consequence"
          />
        </label>
        </div>
         {/each}
<button class="mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click={onAddIntendedConsequence}>Add another Intended Consequence</button>
</div>
  <div class="bg-blue-100 p-12">
      <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">Who are the stakeholders?</div>
      {#each stakeholders as stakeholder, index}
          <div class="add-more-large">
              <textarea class="textarea-padding" bind:value={stakeholder.text}></textarea>
              <select class="stakeholder-select" bind:value={stakeholder.type}>
                  <option disabled selected value>Internal/External</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
              </select>
          </div>
      {/each}
      <button class="mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click={onAdd}>Add another stakholder</button>
  </div>

  <div class="bg-white p-12">
      <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">What data will you be using?</div>
      <textarea class="textarea-padding" placeholder="Description of data" bind:value={dataUsed}></textarea>
  </div>

  <div class="bg-blue-800 px-12 pb-72 pt-8">
<button class="m-5 bg-transparent text-white font-bold text-base border-white border-2 py-2 px-3" on:click={onProceed}>Proceed to Consequences</button>
</div> 

<style>
  .reflect-title {
    padding-bottom: 10px;
    border-bottom: 2px solid #2a45a0
  }

  .add-more-large {
    display: flex;
    flex-direction: column;
  }
  .stakeholder-select {
    margin-bottom: 10px;
  }
</style>