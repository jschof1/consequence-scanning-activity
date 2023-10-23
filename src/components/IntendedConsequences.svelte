<script>
    import { fade } from 'svelte/transition';
    export let intendedConsequences;
    export let onAdd;
  
    let showModal = false;
  
    import { createEventDispatcher } from 'svelte';
      const dispatch = createEventDispatcher();
  
      function onProceed() {
          dispatch('proceed');
      }
      function toggleModal() {
          showModal = !showModal;
    }
  
  </script>
  
  <div class="card" id="IntendedConsequences">
    <div class="header-btn">
    <div class="text-blue-800 font-bold text-xl md:text-2xl">Intended Consequences</div>
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
    {#each intendedConsequences as ic, i}
    <div class="consequence-options">
      <label for="description"
        >Intended consequence {i+1}
        <textarea
          class="consequence-input"
          bind:value={ic.description}
          placeholder="Description"
        />
      </label>
      </div>
       {/each}
      <button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click={onAdd}>Add More</button>
      <button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"on:click={onProceed}>Enter Unintended Consequences</button>
  </div>
  