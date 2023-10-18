<script>
  import { fade } from 'svelte/transition';
  export let consequences;
  export let onSetAction;
  export let onSetTimeline;
  export let onSetMeasure;
  
  let showModal = false;
  
  function toggleModal() {
      showModal = !showModal;
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  function onProceed() {
      dispatch('proceed');
  }
  </script>
  
  <div class="card">
      <div class="actions-header header-btn">
          <h3>Assign Actions to Consequences</h3>
          <button class="info-button" title="Information" on:click={toggleModal}>
              ℹ
          </button>
          {#if showModal}
          <div class="modal" in:fade={{duration: 300}}>
              <div class="modal-content">
                  <span class="close" on:click={toggleModal} role="button" tabindex="0">&times;</span>
                  <p>Input some text explaining this section</p>
              </div>
          </div>
          {/if}
      </div>
  
      {#each consequences as consequence, i}
      <div class="long-text-review">
          <span class="consequence-actions-container">
              <h4>consequence {i}</h4>
              <p>{consequence.description}</p>
          </span>
      </div>
      <div class="consequence-options">
          <label for="action">
              Action
              <textarea
                  class="consequence-input"
                  bind:value={consequence.action}
                  placeholder="Enter action for this consequence"
                  on:input={(event) => onSetAction(i, event.target.value)}
              />
          </label>
          <div class="input-row">
              <label for="timescale">Timescale
                  <select bind:value={consequence.timescale} on:change={(event) => onSetTimeline(i, event.target.value)}>
                      <option disabled selected value>Timescale</option>
                      <option value="3 months">3 months</option>
                      <option value="6 months">6 months</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                  </select>
              </label>
              <label for="measure">
                  Act, Influence, or Monitor
                  <select bind:value={consequence.selectedAIM} on:change={(event) => onSetMeasure(i, event.target.value)}>
                      <option disabled selected value>Select an option</option>
                      <option value="Act">Act</option>
                      <option value="Influence">Influence</option>
                      <option value="Monitor">Monitor</option>
                  </select>
              </label>
          </div>
      </div>
      {/each}
  </div>
  <div class="btn-white-styled-container">
<button class="btn-white-styled" on:click={onProceed}>View Data in Table Format</button>
</div>
  