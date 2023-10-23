<script>
  export let selectedFile;
  import { fade } from 'svelte/transition';
  export let selectOption = true;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function onPreLoadedSelection() {
      dispatch('preLoadedSelection');
  }
  function selectPreLoaded() {
    onPreLoadedSelection();
}
  function onNewProject() {
      dispatch('newProject');
  };

  function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              try {
                  const jsonData = JSON.parse(e.target.result);
                  console.log("jsonData:", jsonData)
                  dispatch('fileData', jsonData); // dispatch the parsed data
              } catch(error) {
                  console.error("Error parsing JSON:", error);
              }
          };
          reader.readAsText(file);
      }
  }
</script>
{#if selectOption}
<div transition:fade class="bg-blue-100 p-12">
    <div class="mb-5 text-2xl font-bold text-blue-800">Import your progress or start a new risk analysis</div>

  <!-- File input and label -->
  <div>
  <input type="file" bind:files={selectedFile} id="caseStudyFile" style="display:none;" on:change={handleFileChange} />
  <label for="caseStudyFile">
<button class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click|preventDefault={() => document.getElementById("caseStudyFile").click()}>Continue previous project</button>
  </label>
<button class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click={selectPreLoaded}>Select from example case studies</button>
<button class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3" on:click={onNewProject}>Start a new project</button>
</div>
</div>
{/if}

