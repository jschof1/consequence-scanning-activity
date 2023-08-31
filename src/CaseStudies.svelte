<script>
  let selectedFile;
  let showPreLoadedOptions = false;
  let showQuestions = false;
   let showConsequences = false;
   let showReview = false;
  let showCategorization = false;

    let questionsSection;
  let consequencesSection;
  let reviewSection;

  function saveConsequences() {
    localStorage.setItem('intendedConsequences', JSON.stringify(intendedConsequences));
    localStorage.setItem('unintendedConsequences', JSON.stringify(unintendedConsequences));
    showCategorization = true;
  }

  function saveCategorization() {
    localStorage.setItem('categorizedIntended', JSON.stringify(categorizedIntended));
    localStorage.setItem('categorizedUnintended', JSON.stringify(categorizedUnintended));
    alert("Categorizations saved!");
  }

  const preLoadedStudies = ['Case Study 1', 'Case Study 2', 'Case Study 3'];
  let selectedStudy;

  let objectives = '';
  let stakeholders = '';
  let dataUsed = '';

  let intendedConsequences = [''];
  let unintendedConsequences = [''];
 let categorizedIntended = {0: ''};
  let categorizedUnintended = {0: ''};
  

  function uploadCaseStudy() {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }
    // Simulate upload logic. Replace with actual upload code.
    console.log(`Uploading ${selectedFile.name}...`);
    setTimeout(() => {
      console.log(`Successfully uploaded ${selectedFile.name}`);
      alert(`Successfully uploaded ${selectedFile.name}`);
    }, 2000);
    showQuestions = true;
  }

  function selectPreLoaded() {
    showPreLoadedOptions = true;
  }

  function confirmSelection(study) {
    selectedStudy = study;
    alert(`You have selected ${selectedStudy}`);
    showPreLoadedOptions = false;
    showQuestions = true;
  }
   function addIntended() {
        intendedConsequences = [...intendedConsequences, ''];
    let newIndex = intendedConsequences.length - 1;
    categorizedIntended[newIndex] = '';
  }

  function addUnintended() {
     unintendedConsequences = [...unintendedConsequences, ''];
    let newIndex = unintendedConsequences.length - 1;
    categorizedUnintended[newIndex] = '';
  }

  function done() {
    showReview = true;
    console.log("Intended Consequences:", intendedConsequences);
    console.log("Unintended Consequences:", unintendedConsequences);
     localStorage.setItem('objectives', objectives);
    localStorage.setItem('stakeholders', stakeholders);
    localStorage.setItem('dataUsed', dataUsed);
    localStorage.setItem('intendedConsequences', JSON.stringify(intendedConsequences));
    localStorage.setItem('unintendedConsequences', JSON.stringify(unintendedConsequences));
    localStorage.setItem('categorizedIntended', JSON.stringify(categorizedIntended));
    localStorage.setItem('categorizedUnintended', JSON.stringify(categorizedUnintended));
    reviewSection.scrollIntoView({ behavior: 'smooth' });
  }

</script>

<!-- File Input for uploading a case study -->
<input type="file" bind:files={selectedFile} id="caseStudyFile" style="display:none;" />
<label for="caseStudyFile">
  <button on:click|preventDefault={() => document.getElementById('caseStudyFile').click()}>Choose File to Upload</button>
</label>
{#if selectedFile}
  <p>Selected file: {selectedFile.name}</p>
  <button on:click={uploadCaseStudy}>Upload your case study</button>
{/if}

<!-- Button to select a pre-loaded case study -->
<button on:click={selectPreLoaded}>Choose from our pre-loaded case studies</button>

<!-- Display pre-loaded case studies for selection -->
{#if showPreLoadedOptions}
  <ul>
    {#each preLoadedStudies as study}
      <li>
        <button on:click={() => confirmSelection(study)}>{study}</button>
      </li>
    {/each}
  </ul>
{/if}

<!-- Initial Questions -->
{#if showQuestions}
  <div class="questions-section card" bind:this={questionsSection}>
    <h3>Reflect on your project</h3>

    <div class="question">
      <p>What are the objectives of your project?</p>
      <textarea bind:value={objectives}></textarea>
    </div>

    <div class="question">
      <p>Who are the stakeholders?</p>
      <textarea bind:value={stakeholders}></textarea>
    </div>

    <div class="question">
      <p>What data will you be using?</p>
      <textarea bind:value={dataUsed}></textarea>
    </div>
 <button on:click={() => showConsequences = true}>Proceed to Consequences</button>
    <!-- You can add a submit button here to handle the answers -->
  </div>
{/if}
<!-- Dual-pane for consequences -->
{#if showConsequences}
  <div class="consequences-section card" bind:this={consequencesSection}>
    <div class="pane">
      <h3>Intended Consequences</h3>
      {#each intendedConsequences as intended, i}
        <input type="text" bind:value={intendedConsequences[i]} />
      {/each}
      <button on:click={addIntended}>Add More</button>
    </div>

    <div class="pane">
      <h3>Unintended Consequences</h3>
      {#each unintendedConsequences as unintended, i}
        <input type="text" bind:value={unintendedConsequences[i]} />
      {/each}
      <button on:click={addUnintended}>Add More</button>
    </div>
       </div>
      <div class="category-save-proceed">
       <button on:click={saveConsequences}>Proceed to Categorization</button>
  </div>
{/if}

<!-- Categorization -->
{#if showCategorization}
  <div class="categorization-section card">
    <h3>Categorization</h3>
    <div>
      <h4>Intended Consequences</h4>
      {#each intendedConsequences as consequence, i}
        <div>
          {consequence}
          <select bind:value={categorizedIntended[i]}>
            <option disabled selected value> -- select an option -- </option>
            <option value="Act">Act</option>
            <option value="Influence">Influence</option>
            <option value="Monitor">Monitor</option>
          </select>
        </div>
      {/each}
    </div>

    <div>
      <h4>Unintended Consequences</h4>
      {#each unintendedConsequences as consequence, i}
        <div>
          {consequence}
          <select bind:value={categorizedUnintended[i]}>
            <option disabled selected value> -- select an option -- </option>
            <option value="Act">Act</option>
            <option value="Influence">Influence</option>
            <option value="Monitor">Monitor</option>
          </select>
        </div>
      {/each}
    </div>    
  </div>
             <button on:click={() => { done(); showReview = true; }}>Review</button>
    <button on:click={saveCategorization}>Save your work</button>
{/if}

{#if showReview}
   <div id="review" class="card" bind:this={reviewSection}>
    <h1>Review</h1>
    <h2>Case Study: {selectedStudy}</h2>
    <h3>Objectives: </h3>
    <p>{objectives}</p>
    <h3>Stakeholders: </h3>
    <p>{stakeholders}</p>
    <h3>Data used: </h3>
    <p>{dataUsed}</p>
    <h3>Consequences</h3>
    <table>
      <thead>
        <tr>
          <th>Act</th>
          <th>Influence</th>
          <th>Monitor</th>
        </tr>
      </thead>
    <tbody>
        <!-- For 'Act' -->
        {#each intendedConsequences as intended, i}
          {#if categorizedIntended[i] === 'Act'}
            <tr>
              <td class="intended">{intended}</td>
              <td></td>
              <td></td>
            </tr>
          {/if}
        {/each}
        {#each unintendedConsequences as unintended, i}
          {#if categorizedUnintended[i] === 'Act'}
            <tr>
              <td class="unintended">{unintended}</td>
              <td></td>
              <td></td>
            </tr>
          {/if}
        {/each}

        <!-- For 'Influence' -->
        {#each intendedConsequences as intended, i}
          {#if categorizedIntended[i] === 'Influence'}
            <tr>
              <td></td>
              <td class="intended">{intended}</td>
              <td></td>
            </tr>
          {/if}
        {/each}
        {#each unintendedConsequences as unintended, i}
          {#if categorizedUnintended[i] === 'Influence'}
            <tr>
              <td></td>
              <td class="unintended">{unintended}</td>
              <td></td>
            </tr>
          {/if}
        {/each}

        <!-- For 'Monitor' -->
        {#each intendedConsequences as intended, i}
          {#if categorizedIntended[i] === 'Monitor'}
            <tr>
              <td></td>
              <td></td>
              <td class="intended">{intended}</td>
            </tr>
          {/if}
        {/each}
        {#each unintendedConsequences as unintended, i}
          {#if categorizedUnintended[i] === 'Monitor'}
            <tr>
              <td></td>
              <td></td>
              <td class="unintended">{unintended}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>

    <!-- Button to print -->
    <button onclick="window.print()">Print this page</button>
    </div>
{/if}
<style>
  .questions-section,
  .consequences-section {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }
  

  .consequences-section {
    display: flex;
    justify-content: space-between;
  }

  .pane {
    flex: 1;
    margin: 0 10px;
  }

  .pane h3 {
    margin-top: 0;
  }
p {
  font-size: 15px;
}
  input[type="text"] {
    display: block;
    margin-bottom: 10px;
  }
    .categorization-section {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }

.intended {
  background-color: lightgreen;
}

.unintended {
  background-color: lightcoral;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
}

th, td {
  border: 1px solid black;
  text-align: left;
  padding: 8px;
   border-radius: 10px;
}
button {
  margin: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

textarea, input {
  border: none;
  outline: none;
  -webkit-appearance: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 5px;
}
input {
  height: 30px;
  padding-inline: 4px;
  font-size: 20px;
}
textarea {
width: 100%;
  height: 100px;
    padding: 5px;
    box-sizing: border-box;
}

.category-save-proceed {
  display: flex;
  flex-direction: row;
}
select {
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 10px;
    font-family: 'Helvetica Neue', sans-serif;
                                        
}
li {
  list-style-type: none;
  display: inline-block;
}

</style>