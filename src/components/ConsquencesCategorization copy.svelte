<script>
  import { fade } from 'svelte/transition';
  export let consequences;
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

<div class="card" id="Consequences">
  <div class="header-btn">
  <h3>Consequences</h3>
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
  {#each consequences as consequence, i}
  <div class="consequence-options">
    <label for="description"
      >Consequence
      <textarea
        class="consequence-input"
        bind:value={consequence.description}
        placeholder="Description"
      />
    </label>
    <div class="input-row">
    <label for="type"
      >Intended/Unintended
      <select bind:value={consequence.type}>
        <option disabled selected value>Intended/Unintended</option>
        <option value="Intended">Intended</option>
        <option value="Unintended">Unintended</option>
      </select>
    </label>
    <label for="outcome"
      >Outcome
      <select bind:value={consequence.outcome}>
        <option disabled selected value>Outcome</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
      </select>
    </label>
    <label for="priority"
      >Priority
      <select bind:value={consequence.priority}>
        <option disabled selected value>Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </label>
    <label for="AIM"
      >Act/Influence/Monitor
      <select bind:value={consequence.AIM}>
        <option disabled selected value>Act, Influence, Monitor</option>
        <option value="Act">Act</option>
        <option value="Influence">Influence</option>
        <option value="Monitor">Monitor</option>
      </select>
    </label>
    </div>
  </div>
  {/each}
    <div class="btn-white-styled-container">
<button class="btn-white-styled" on:click={onAdd}>Add More</button>
<button class="btn-white-styled"on:click={onProceed}>Proceed to Review</button>
</div>
</div>
