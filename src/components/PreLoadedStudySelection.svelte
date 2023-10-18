<script>
  import { fade } from 'svelte/transition';
  export let preLoadedStudies;

  import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    function selectStudy(study) {
      dispatch('proceed', { study });
  }


  let showModal = false;

    function toggleModal() {
        showModal = !showModal;
  }

</script>
<div class="card" id="Preloaded-studies">
  <div class="questions-header header-btn">
    <h3>Pick your case study</h3>
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
<ul>
  {#each preLoadedStudies as study}
  <div class="btn-white-styled-container">
    <li>
<button class="btn-white-styled" on:click={()=>selectStudy(study)}>{study}</button>
</li>
</div>
  {/each}
</ul>
</div>
