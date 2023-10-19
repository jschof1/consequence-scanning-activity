<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

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

<div id="ProjectBrief" class="questions-section card">
    <div class="questions-header header-btn">
      <h3>Enter the details of your project</h3>
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
      <div class="question reflect-title">
        <p>Project Title:</p>
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
      <div class="question">
          <h3>What are the objectives of your project?</h3>
          <textarea class="textarea-padding" bind:value={localObjectives} />
      </div>
      <div class="question">
      {#each intendedConsequences as ic, i}
      <h3>Intended consequences {i+1}</h3>
      <div class="add-more-large">
        <label for="description"
          >
          <textarea
            class= "textarea-padding"
            bind:value={ic.description}
            placeholder="Description"
          />
        </label>
        </div>
         {/each}
<button class="btn-white-styled" on:click={onAddIntendedConsequence}>Add another Intended Consequence</button>
</div>
  <div class="question">
      <h3>Who are the stakeholders?</h3>
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
      <button on:click={onAdd}>Add another stakholder</button>
  </div>

  <div class="question">
      <h3>What data will you be using?</h3>
      <textarea class="textarea-padding" bind:value={dataUsed}></textarea>
  </div>

  <div class="btn-white-styled-container">
<button class="btn-white-styled" on:click={onProceed}>Proceed to Consequences</button>
</div>
</div>  

<style>
  .reflect-title {
    padding-bottom: 10px;
    border-bottom: 2px solid #2a45a0
  }

  .add-more-large {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .stakeholder-select {
    margin-bottom: 10px;
  }
</style>