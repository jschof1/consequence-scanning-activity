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
    <h3>Reflect on your project</h3>
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
      <h3>Objectives:</h3>
      <p>{objectives}</p>
      <h3>Stakeholders:</h3>
      <p>{stakeholders}</p>
      <h3>Data used:</h3>
      <p>{dataUsed}</p>
      <h3>Consequences</h3>
    </div>
    <!-- Act table -->
  <div class="filter-buttons">
    <div class="btn-white-styled-container">
<button class="btn-white-styled"  
    on:click={() => filter.set('Act', check.isEqualTo)}
    class:active={$selected.includes('Act')}
>
    Act
</button>
<div class="btn-white-styled-container">
<button class="btn-white-styled" 
on:click={() => filter.set('Monitor', check.isEqualTo)}
class:active={$selected.includes('Monitor')}
>
Monitor
</button>
<div class="btn-white-styled-container">
<button class="btn-white-styled" 
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
  <div class="btn-white-styled-container">
<button class="btn-white-styled" onclick="window.print()">Print this page</button>
  <div class="btn-white-styled-container">
<button class="btn-white-styled"on:click={onProceed}>Proceed to hypothesis</button>
  