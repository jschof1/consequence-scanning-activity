<script>
  import { DataHandler, check } from '@vincjo/datatables'
  import Th from '../Th.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  let showModal = false;
  
    function toggleModal() {
        showModal = !showModal;
  }
  
  export let consequences;
  export let selectedStudy;
  export let objectives;
  export let stakeholders;
  export let dataUsed;


  const dispatch = createEventDispatcher();
  function onProceed() {
    dispatch('proceed');
  }

  
  let handler;
  let filter;
  let selected;
  let rows;

  $: {
    handler = new DataHandler(consequences);
    filter = handler.createAdvancedFilter('AIM');
    selected = filter.getSelected();
    rows = handler.getRows();
  }
</script>

<div class="card">
  <div class="review-header header-btn">
    <div class="text-blue-800 font-bold text-xl md:text-2xl">Reflect on your project</div>
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
    <div class="long-text-review">
      <h2>Project: {selectedStudy}</h2>
      <hr />
      <div class="text-blue-800 font-bold text-xl md:text-2xl">Objectives:</div>
      <p>{objectives}</p>
      <div class="text-blue-800 font-bold text-xl md:text-2xl">Stakeholders:</div>
      <p>{stakeholders}</p>
      <div class="text-blue-800 font-bold text-xl md:text-2xl">Data used:</div>
      <p>{dataUsed}</p>
      <div class="text-blue-800 font-bold text-xl md:text-2xl">Consequences</div>
    </div>
    <!-- Act table -->
  <div class="filter-buttons">
    <div class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container">
<button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"  
    on:click={() => filter.set('Act', check.isEqualTo)}
    class:active={$selected.includes('Act')}
>
    Act
</button>
<div class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container">
<button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" 
on:click={() => filter.set('Monitor', check.isEqualTo)}
class:active={$selected.includes('Monitor')}
>
Monitor
</button>
<div class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container">
<button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" 
on:click={() => filter.set('Influence', check.isEqualTo)}
class:active={$selected.includes('Influence')}
>
Influence
</button>
    <table>
      <thead>
        <tr>
          <Th {handler} orderBy="description">Consequence</Th>
          <Th {handler} orderBy="priority">Priority</Th>
          <Th {handler} orderBy="type">Type</Th>
          <Th {handler} orderBy="outcome">Outcome</Th>
          <Th {handler} orderBy="AIM">AIM</Th>
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
            <tr>
              <td>{row.description}</td>
              <td>{row.priority}</td>
              <td>{row.type}</td>
              <td>{row.outcome}</td>
              <td>{row.AIM}</td>
            </tr>
        {/each}
      </tbody>
    </table>
  </div>
  </div>
  <!-- Button to print -->
  <div class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container">
<button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" onclick="window.print()">Print this page</button>
  <div class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container">
<button class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"on:click={onProceed}>Proceed to hypothesis</button>
  