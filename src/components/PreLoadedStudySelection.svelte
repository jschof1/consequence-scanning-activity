<script>
  import { fade } from 'svelte/transition';
  export let preLoadedStudies;
  import caseStudy from "../../public/icons_case-study.svg"

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
  <div class="bg-blue-100 p-12">
    <div class="flex">
      <img class="h-10 w-9 mr-5 filter-blue"  src={caseStudy}/>
    <div class="text-2xl font-bold text-blue-800">Pick your case study</div>
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
<ul>
  {#each preLoadedStudies as study}
    <li>
<button class="my-5 mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click={()=>selectStudy(study)}>{study}</button>
</li>
  {/each}
</ul>
</div>