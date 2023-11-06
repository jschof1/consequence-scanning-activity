<script>
  import { unintendedConsequenceSuggestions } from "./store.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let consequences;
  export let onSetAction;
  export let onSetMeasure;
  export let onSetKPI;
  export let onSetTimeline;
  export let onSetStakeholderForTimeline;
  export let stakeholders;

  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }

function toYYYYMMDD(date) {
    if (typeof date === 'string' && date.includes('/')) {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }
    return date; // This should be the input if it doesn't match the format.
}

function toDDMMYYYY(date) {
    if (typeof date === 'string' && date.includes('-')) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }
    return date; // This should be the input if it doesn't match the format.
}
  function updateDateInOriginalFormat(i, value) {
    const newDate = toDDMMYYYY(value);
    consequences = consequences.map((conseq, index) => {
      if (index === i) {
        conseq.action.date = newDate;
      }
      return conseq;
    });
    onSetTimeline(i, newDate);
  }
  function onProceed() {
    dispatch("proceed");
  }

  function fillActionFromAI(index) {
    return // todo fix this function
    if ($unintendedConsequenceSuggestions[index]) {
      consequences[index].action.description =
        $unintendedConsequenceSuggestions[index].action.description;
    }
  }
function fillTimelineFromAI(index) {
  return // todo fix this function
    if ($unintendedConsequenceSuggestions[index]) {
        let suggestedDate = $unintendedConsequenceSuggestions[index].action.date;
        if (suggestedDate && suggestedDate.length === 8) { // if format is 'DD-MM-YY'
            const [day, month, shortYear] = suggestedDate.split('-');
            const fullYear = `20${shortYear}`;
            suggestedDate = `${day}/${month}/${fullYear}`;
        }
        consequences = consequences.map((conseq, idx) => {
            if (idx === index) {
                conseq.action.date = toDDMMYYYY(suggestedDate);
            }
            return conseq;
        });
    }
}
  function fillMeasureFromAI(index) {
    if ($unintendedConsequenceSuggestions[index]) {
      consequences[index].selectedAIM =
        $unintendedConsequenceSuggestions[index].AIM;
    }
  }
  function fillKPIFromAI(index) {
    return // todo fix this function
    if ($unintendedConsequenceSuggestions[index]) {
      consequences[index].KPI = $unintendedConsequenceSuggestions[index].KPI;
    }
  }
</script>

<div id="Actions" class="bg-blue-100 p-12">
  <div class="text-blue-800 font-bold text-xl md:text-3xl pb-5">
    Assign Actions to Consequences
  </div>
  <div class="mb-7 p-8 bg-white shadow-md">
    <div class="mb-4">
      For each unintended consequence, you will now assign specific actions to
      mitigate or manage the risk and add a Key Performance Indicator (KPI) to
      track the effectiveness of each action. You should:
    </div>
    <ul class="list-disc pl-5 mb-4">
      <li class="mb-2">
        <strong>Create the mitigation Action:</strong> Describe the specific action(s)
        that need to be taken to mitigate or manage the consequence effectively.
        Be as detailed as possible, specifying what needs to be done and who is responsible.
      </li>
      <li class="mb-2">
        <strong>Define the Key Performance Indicator (KPI):</strong> Define a KPI
        that will help measure the success or progress of the mitigation action.
        The KPI should be a measurable metric that indicates the desired outcome.
        It could be related to time, cost, performance, or any other relevant measure.
      </li>
      <li class="mb-2">
        For each action, you should also assign an estimated timescale (3
        months, 6 months, 1 year, etc).
      </li>
    </ul>
    <div class="mb-2">
      When creating your actions, you have the option of using the AI to
      generate a possible action and associated KPI. These should be reviewed
      and updated accordingly.
    </div>
  </div>
  {#each consequences as consequence, i}
    <div class="consequence-options">
      <span class="consequence-actions-container">
        <div class="text-blue-800 font-bold mb-10 text-lg md:text-xl uppercase">
          consequence {i + 1}:
        </div>
        <div class="text-blue-800 font-bold mb-10 text-lg md:text-xl">
          {consequence.description}
        </div>
      </span>
      <label for="action">
        <span class="text-blue-800 font-bold text-lg">Action</span>
        <textarea
          class="consequence-input"
          bind:value={consequence.action.description}
          placeholder="Enter action for this consequence"
          on:input={(event) => onSetAction(i, event.target.value)}
        />
      </label>
      <div>
        <button
          class="mb-9 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillActionFromAI(i)}>Suggest action using AI (coming soon)</button
        >
      </div>
      <label for="KPI">
        <span class="text-blue-800 font-bold text-lg"
          >Enter KPI for this consequence</span
        >
        <textarea
          class="consequence-input"
          bind:value={consequence.KPI}
          placeholder="Enter KPI for this consequence"
          on:input={(event) => onSetKPI(i, event.target.value)}
        />
      </label>
      <div>
        <button
          class="mb-9 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillKPIFromAI(i)}>Suggest KPI using AI (coming soon)</button
        >
      </div>
      <div class="input-row mb-5">
        <label for="datePicker">
          <span class="text-blue-800 font-bold text-lg">Date</span>
<input
    type="date"
    id="datePicker"

    value={consequence.action.date ? toYYYYMMDD(consequence.action.date) : ''}
    class="mt-3 border-2 border-blue-800 py-[22px]"
    on:change={(event) => updateDateInOriginalFormat(i, event.target.value)}
/>
        </label>
        <!-- label to select stakeholders -->
        <label for="stakeholders">
          <span class="text-blue-800 font-bold text-lg"> Assignee </span>
          <select
            bind:value={consequence.action.stakeholder}
            on:change={(event) =>
              onSetStakeholderForTimeline(i, event.target.value)}
          >
            <option disabled selected value>Select an assignee</option>
            {#each stakeholders as stakeholder}
              <option value={stakeholder.text}
                >{stakeholder.text} ({stakeholder.type})</option
              >
            {/each}
          </select></label
        >
        <label for="measure">
          <span class="text-blue-800 font-bold text-lg">
            Act, Influence, or Monitor</span
          >
          <select
            bind:value={consequence.selectedAIM}
            on:change={(event) => onSetMeasure(i, event.target.value)}
          >
            <option disabled selected value>Select an option</option>
            <option value="Act">Act</option>
            <option value="Influence">Influence</option>
            <option value="Monitor">Monitor</option>
          </select>
        </label>
      </div>
      <!-- <div class="mb-5">
        <button
          class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillTimelineFromAI(i)}>Suggest Timeline using AI</button
        >
        <button
          class="mr-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
          on:click={() => fillMeasureFromAI(i)}>Suggest Measure using AI</button
        >
      </div> -->
    </div>
  {/each}
  <button
    class="mr-5 mt-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
    on:click={onProceed}>Publish Risk Register</button
  >
</div>
