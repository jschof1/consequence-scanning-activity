<script>
  import { onMount } from "svelte";
  import { DataHandler, check } from '@vincjo/datatables'
  import Th from './Th.svelte';
  let consequences = [{description: 'dfasdfsfasdfsadd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Monitor'}, {description: 'dfdfasdfsdasdfsd', type: 'Unintended', priority: 'Low', outcome: 'Influence', AIM: 'Act'}, {description: 'dfdfasdfasdfsd', type: 'Unintended', priority: 'Low', outcome: 'Negative', AIM: 'Act'}, {description: 'dfadfasdsdfsd', type: 'Unintended', priority: 'Low', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Intended', priority: 'Medium', outcome: 'Negative', AIM: 'Act'}]
  
  const handler = new DataHandler(consequences);
  const filter = handler.createAdvancedFilter('AIM')
  const selected = filter.getSelected()
  const rows = handler.getRows();
    // console.log("actRows", actRows);

let sections = [
{id:"Questions", visible: false},
{id:"Consequences", visible: false},
{id:"Review", visible: false},
{id:"Hypothesis", visible: false},
{id:"Categorization", visible: false}
]

  let selectedFile;
  let showPreLoadedOptions = false;
  let showQuestions = false;
  let showConsequences = false;
  let showReview = false;
  let showHypothesis = false;
  let showCategorization = false;
  let isAssigningActions = false; // Track whether we're in the action assignment phase
  let isViewingTable = false; // This will control the visibility of the table

  function viewTable() {
    isViewingTable = true;
  }
  function isChecked(index) {
    return selectedConsequencesIndices.includes(index);
  }

  function assignActions() {
    isAssigningActions = true;
  }

  function setActionForHypothesis(index, action) {
    hypotheses[index].action = action;
    console.log(`Action for hypothesis ${index}:`, action);
  }
  function setTimelineForHypothesis(index, timeline) {
    hypotheses[index].timeline = timeline;
    console.log(`timeline for hypothesis ${index}:`, timeline);
  }
  function setMeasureForHypothesis(index, measure) {
    hypotheses[index].measure = measure;
    console.log(`measure for hypothesis ${index}:`, measure);
  }

  let questionsSection;
  let consequencesSection;
  let reviewSection;

  // let consequences = [
  //   {
  //     description: "",
  //     type: "I/U", // Intended/Unintended
  //     priority: "H/M/L", // High/Medium/Low
  //     outcome: "+/-", // Positive/Negative
  //     AIM: "Act/Influence/Monitor", // Act/Influence/Monitor
  //   },
  // ];

  // const consequencesTest = [{description: 'dfasdfsfasdfsadd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfdfasdfsdasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfdfasdfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfadfasdsdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}, {description: 'dfasdfsd', type: 'Unintended', priority: 'High', outcome: 'Negative', AIM: 'Act'}]
  let hypotheses = [];
  let hypothesisText = "";
  let currentHypothesisIndex = null;
  let selectedConsequencesIndices = [];
  function updateHypothesisConsequences() {
    const currentHypothesis = hypotheses[currentHypothesisIndex];
    currentHypothesis.consequences = selectedConsequencesIndices.map(
      (index) => consequences[index]
    );
    console.log("Updated hypothesis consequences:", currentHypothesis);
  }

  function attachConsequences() {
    // Add logic to link specific consequences to the hypothesis
    // For now, it simply saves the hypothesis and clears the text
    hypotheses.push({ text: hypothesisText, consequences: [] });
    currentHypothesisIndex = hypotheses.length - 1;

    selectedConsequencesIndices = [];
  }

  function addAnotherHypothesis() {
    hypothesisText = "";
    currentHypothesisIndex = null;

    // Clear selectedConsequencesIndices for a new hypothesis
    selectedConsequencesIndices = [];
  }

  //   function isConsequenceSelected(consequence) {
  //     console.log(hypotheses[currentHypothesisIndex])
  //       return hypotheses[currentHypothesisIndex].consequences.some(c => c.description === consequence.description);
  // }
  function saveConsequences() {
    localStorage.setItem("consequences", JSON.stringify(consequences));
    showCategorization = true;
  }

  function saveCategorization() {
    localStorage.setItem("consequences", JSON.stringify(consequences));
    alert("Categorizations saved!");
  }

  const preLoadedStudies = ["Case Study 1", "Case Study 2", "Case Study 3"];
  let selectedStudy;

  let objectives = "";
  let stakeholders = "";
  let dataUsed = "";

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
  function addConsequence() {
    consequences = [
      ...consequences,
      { description: "", type: "", outcome: "", priority: "", AIM: "" },
    ];
  }

  function toggleConsequence(index) {
    // Check if the index is already in selectedConsequencesIndices
    const idx = selectedConsequencesIndices.indexOf(index);

    if (idx === -1) {
      // If it's not in the array, push the index
      selectedConsequencesIndices.push(index);
    } else {
      // If it's already in the array, remove it
      selectedConsequencesIndices.splice(idx, 1);
    }
    // Update the consequences attached to the current hypothesis
    updateHypothesisConsequences();
  }

  function done() {
    // showReview = true;
    console.log(" Consequences:", consequences);
    localStorage.setItem("objectives", objectives);
    localStorage.setItem("stakeholders", stakeholders);
    localStorage.setItem("dataUsed", dataUsed);
    localStorage.setItem("Consequences", JSON.stringify(consequences));
    localStorage.setItem("categorized", JSON.stringify(categorized));
    reviewSection.scrollIntoView({ behavior: "smooth" });
  }
</script>

<!-- File Input for uploading a case study -->
<input
  type="file"
  bind:files={selectedFile}
  id="caseStudyFile"
  style="display:none;"
/>
<label for="caseStudyFile">
  <button
    on:click|preventDefault={() =>
      document.getElementById("caseStudyFile").click()}
    >Choose File to Upload</button
  >
</label>
{#if selectedFile}
  <p>Selected file: {selectedFile.name}</p>
  <button on:click={uploadCaseStudy}>Upload your case study</button>
{/if}

<!-- Button to select a pre-loaded case study -->
<button on:click={selectPreLoaded}
  >Choose from our pre-loaded case studies</button
>

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
  <div id="Questions" class="questions-section card" bind:this={questionsSection}>
    <h3>Reflect on your project</h3>

    <div class="question">
      <p>What are the objectives of your project?</p>
      <textarea bind:value={objectives} />
    </div>

    <div class="question">
      <p>Who are the stakeholders?</p>
      <textarea bind:value={stakeholders} />
    </div>

    <div class="question">
      <p>What data will you be using?</p>
      <textarea bind:value={dataUsed} />
    </div>
    <button on:click={() => (showCategorization = true)}
      >Proceed to Consequences</button
    >
    <!-- You can add a submit button here to handle the answers -->
  </div>
{/if}
<!-- Dual-pane for consequences -->
<!-- {#if showConsequences}
    <div class="pane">
      <h3>Consequences</h3>
      {#each consequences as consequences, i}
        <input type="text" bind:value={consequences[i]} />
      {/each}
      <button on:click={add}>Add More</button>
    </div>
  <div class="category-save-proceed">
    <button on:click={saveConsequences}>Proceed to Categorization</button>
  </div>
{/if} -->

<!-- Categorization -->
{#if showCategorization}
  <div class="card" id="Consequences">
    <h3>Consequences</h3>
    {#each consequences as consequence, i}
      <div class="consequence-options">
        <label for="description"
          >Consequence
          <input
            class="consequence-input"
            type="text"
            bind:value={consequence.description}
            placeholder="Description"
          />
        </label>
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
    {/each}
    <button on:click={addConsequence}>Add More</button>
    <div class="category-save-proceed">
      <button
        on:click={() => {
          saveCategorization();
          showReview = true;
        }}>Proceed to Review</button
      >
    </div>
  </div>
{/if}

{#if showReview}
  <div id="Review" class="card" bind:this={reviewSection}>
    <h1>Review</h1>
    <div class="long-text-review">
      <h2>Case Study: {selectedStudy}</h2>
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
    <button 
    on:click={() => filter.set('Act', check.isEqualTo)}
    class:active={$selected.includes('Act')}
>
    Act
</button>
<button 
on:click={() => filter.set('Monitor', check.isEqualTo)}
class:active={$selected.includes('Monitor')}
>
Monitor
</button>
<button 
on:click={() => filter.set('Influence', check.isEqualTo)}
class:active={$selected.includes('Influence')}
>
Influence
</button>
</div>
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
  <!-- Button to print -->
  <button onclick="window.print()">Print this page</button>
  <button on:click={() => (showHypothesis = true)}>Proceed to hypothesis</button
  >
{/if}

{#if showHypothesis}
  <div class="card" id="Hypothesis">
    <h2>Input Hypothesis:</h2>
    <textarea bind:value={hypothesisText} />
    <button on:click={attachConsequences}>Attach Consequences</button>
  </div>
  <div class="card attach-hypothesis">
    {#if currentHypothesisIndex !== null}
      <!-- Displaying consequences to attach -->
      <h3>Consequences:</h3>
      <div class="consequences-checkbox">
        {#each consequences as consequence, i}
          <label class="checkbox-item">
            <input
              type="checkbox"
              checked={isChecked(i)}
              on:change={() => toggleConsequence(i)}
            />
            {consequence.description}
          </label>
        {/each}
      </div>
      <button on:click={addAnotherHypothesis}>Add another Hypothesis</button>
      <button on:click={assignActions}>Assign Actions</button>
    {/if}
  </div>
{/if}
{#if isAssigningActions}
  <div class="card">
    <h3>Assign Actions to Hypotheses:</h3>

    {#each hypotheses as hypothesis, i}
      <div class="long-text-review">
        <span class="hypothesis-actions-container"
          ><h4>Hypothesis"{i}"</h4>
          <p>{hypothesis.text}</p></span
        >
      </div>
      <div class="consequence-options">
        <label for="action">
          Action
          <input
            class="consequence-input"
            type="text"
            bind:value={hypothesis.action}
            placeholder="Enter action for this hypothesis"
            on:input={(event) => setActionForHypothesis(i, event.target.value)}
          />
        </label>
        <label for="measure">
          Measure
          <input
            class="consequence-input"
            type="text"
            bind:value={hypothesis.measure}
            placeholder="Enter measure for this hypothesis"
            on:input={(event) => setMeasureForHypothesis(i, event.target.value)}
          />
        </label>
        <label for="timescale"
          >Timescale
          <select bind:value={hypothesis.timescale}>
            <option disabled selected value>Timescale</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
          </select>
        </label>
      </div>
    {/each}
  </div>
  <button on:click={viewTable}>View Data in Table Format</button>
{/if}

{#if isViewingTable}
  <table class="data-table">
    <thead>
      <tr>
        <th>Hypothesis</th>
        <th>Consequences</th>
        <th>Action</th>
        <th>Measure</th>
        <th>Timescale</th>
      </tr>
    </thead>
    <tbody>
      {#each hypotheses as hypothesis}
        <tr>
          <td>{hypothesis.text}</td>
          <td>
            {#each hypothesis.consequences as consequence}
              <div>{consequence.description}</div>
            {/each}
          </td>
          <td>{hypothesis.action}</td>
          <td>{hypothesis.measure}</td>
          <td>{hypothesis.timescale}</td>
        </tr>
      {/each}
    </tbody>
  </table>
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
  }
  .categorization-section {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }

  /* .intended {
    background-color: lightgreen;
  }

  . {
    background-color: lightcoral;
  } */

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    background-color: white;
  }

  th,
  td {
    border: 2px solid black;
    text-align: left;
    padding: 8px;
  }
  button {
    margin: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }

  textarea,
  input {
    border: none;
    outline: none;
    -webkit-appearance: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
    font-family: "Helvetica Neue", sans-serif;
    margin-top: 10px;
    margin-left: 5px;
  }
  li {
    list-style-type: none;
    display: inline-block;
  }
  .consequence-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* opacity background */
    background-color: rgba(255, 255, 255, 0.5);
    padding: 20px;
  }
  .consequence-input {
    font-size: 15px;
    margin-top: 10px;
    padding: 3px;
  }

  .long-text-review {
    text-align: left;
    background-color: rgba(255, 255, 255, 0.693);
    padding: 15px;
    margin-top: 10px;
  }

  /* .selected {
        background-color: green;
        color: white;
    } */

  .consequences-checkbox {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* This creates two columns */
    gap: 10px; /* This sets the space between rows and columns */
    align-items: start; /* Aligns items to the top */
    cursor: pointer;
    margin: 10px;
  }

  .consequences-checkbox {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* This creates two columns */
    gap: 10px; /* This sets the space between rows and columns */
    align-items: start; /* Aligns items to the top */
    cursor: pointer;
    margin: 10px;
  }

  .checkbox-item {
    background-color: white;
    padding: 10px;
    margin: 0; /* Reset default margin */
    display: flex; /* Use flex for aligning checkbox and its text */
    align-items: center;
  }

  input[type="checkbox"] {
    appearance: none;
    background-color: #fff;
    margin: 0 10px 0 0; /* No left margin and 10px right margin */
    padding: 0; /* Ensure no padding */
    color: black;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    position: relative;
  }

  input[type="checkbox"]:checked::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    top: 2px;
    left: 6px;
    transform: rotate(45deg);
  }

  .hypothesis-actions-container {
    background-color: white;
  }
  .filter-buttons {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .filter-buttons button {
    background-color: white;
    border-radius:none;
    padding-block: 5px;
    align-items: baseline;
  }

</style>
