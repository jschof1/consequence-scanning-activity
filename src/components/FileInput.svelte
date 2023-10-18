<script>
  export let selectedFile;

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
<div class="card">
  <div class="choose-header header-btn">
    <h3>Import your progress or start a new risk analysis</h3>
  </div>

  <!-- File input and label -->
  <div class="btn-white-styled-container">
  <input type="file" bind:files={selectedFile} id="caseStudyFile" style="display:none;" on:change={handleFileChange} />
  <label for="caseStudyFile">
<button class="btn-white-styled" on:click|preventDefault={() => document.getElementById("caseStudyFile").click()}>Continue previous project</button>
  </label>
<button class="btn-white-styled" on:click={selectPreLoaded}>Select from example case studies</button>
<button class="btn-white-styled" on:click={onNewProject}>Start a new project</button>
</div>
</div>
