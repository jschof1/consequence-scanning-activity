<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let columns = [
      { label: "Hypothesis", selected: true },
      { label: "Consequences", selected: true },
      { label: "Action", selected: true },
      { label: "Measure", selected: true },
      { label: "Timescale", selected: true }
    ];
  
    function exportData() {
      const selectedColumns = columns.filter(col => col.selected).map(col => col.label);
      dispatch('export', selectedColumns);
    }
  </script>
  
  <div class="modal">
    <div class="text-blue-800 font-bold text-xl md:text-2xl">Select columns to export:</div>
    {#each columns as column}
      <label>
        <input type="checkbox" bind:checked={column.selected} />
        {column.label}
      </label>
    {/each}
    <button on:click={exportData}>Export Selected Columns</button>
  </div>
  
  <style>
    /* Add your modal styling here */
    .modal {
      /* Example Styling */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background: white;
      border: 1px solid #ccc;
      z-index: 1000;
    }
  </style>
  