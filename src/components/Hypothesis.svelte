<script>
  import { fade } from 'svelte/transition';
  export let hypothesisText;
  export let currentHypothesisIndex;
  export let consequences;
  export let isChecked;
  export let onToggle;
  export let onAttach
  export let onAddAnother;
  let showConsequences = false;

  function attachConsequences() {
    showConsequences = true;
  }
  function handleAttach() {
  attachConsequences();
  onAttach();  // I'm assuming onAttach is passed from the parent and it has some logic you want to execute.
}

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function onProceed() {
      dispatch('proceed');
  }

  let showModal = false;
  function toggleModal() {
      showModal = !showModal;
  }
</script>

<div class="card" id="Hypothesis">
  <div class="questions-header header-btn">
      <h3>Hypotheses</h3>
      <button class="info-button" title="Information" on:click={toggleModal}>
          ℹ
      </button>
      {#if showModal}
      <div class="modal" in:fade={{duration: 300}}>
          <div class="modal-content">
              <span class="close" role="button" on:click={toggleModal}>&times;</span>
              <p>Input some text explaining this section</p>
          </div>
      </div>
      {/if}
  </div>
  <textarea class="textarea-padding"bind:value={hypothesisText} />
  <div class="btn-white-styled-container">
<button class="btn-white-styled" on:click={onAddAnother}>Add another Hypothesis</button>
<button class="btn-white-styled" on:click={handleAttach}>Attach Consequences</button>
</div>
</div>

{#if showConsequences}
<div class="card attach-hypothesis">
  {#if currentHypothesisIndex !== null}
  <!-- Displaying consequences to attach -->
  <div class="questions-header header-btn">
      <h3>Attach consequences</h3>
      <button class="info-button" title="Information" on:click={toggleModal}>
          ℹ
      </button>
      {#if showModal}
      <div class="modal" in:fade={{duration: 300}}>
          <div class="modal-content">
              <span class="close" role="button" on:click={toggleModal}>&times;</span>
              <p>Input some text explaining this section</p>
          </div>
      </div>
      {/if}
  </div>
  <div class="consequences-checkbox">
      {#each consequences as consequence, i}
      <label class="checkbox-item">
          <input
              type="checkbox"
              checked={isChecked(i)}
              on:change={() => onToggle(i)}
          />
          {consequence.description}
      </label>
      {/each}
  </div>
  <div class="btn-white-styled-container">
<button class="btn-white-styled" on:click={onAddAnother}>Add another Hypothesis</button>
<button class="btn-white-styled" on:click={onProceed}>Assign Actions</button>
</div>
  {/if}
</div>
{/if}