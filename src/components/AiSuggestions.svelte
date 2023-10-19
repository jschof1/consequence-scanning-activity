<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    export let consequences = []
  
    const aiSuggestions = [
  { 
    description: "Potential impact on the environment due to waste.",
    outcome: ["Negative"],
    selectedOutcome: "Negative",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"], 
    selectedTimeline: "",
    isSelected: false
  },
  {
    description: "Possible misuse of the product by end-users.",
    outcome: ["Negative"],
    selectedOutcome: "Positive",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"],
    selectedTimeline: "",
    isSelected: false
  },
  {
    description: "Might lead to job losses due to automation.",
    outcome: ["Negative"],
    selectedOutcome: "Positive",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"],
    selectedTimeline: "",
    isSelected: false
  },
  {
    description: "Could be used unethically in certain situations.",
    outcome: ["Negative"],
    selectedOutcome: "Positive",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"],
    selectedTimeline: "",
    isSelected: false
  },
  {
    description: "Improves accessibility for differently-abled individuals.",
    outcome: ["Positive"],
    selectedOutcome: "Positive",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"],
    selectedTimeline: "",
    isSelected: false
  }
];

  
function selectSuggestion(selectedSuggestion) {
    selectedSuggestion.isSelected = !selectedSuggestion.isSelected;
    dispatch('selectSuggestion', selectedSuggestion); // dispatch the event
}
    function proceed() {
    dispatch('proceed', consequences);  // passing the consequences data with the event
}
  </script>
  
  <ul>
    {#each aiSuggestions as suggestion}
    <li>
      <button 
        class="suggestion-button {suggestion.isSelected ? 'selected-suggestion' : ''}" 
        on:click={() => selectSuggestion(suggestion)}
      >
        {suggestion.description} (Outcome: {suggestion.selectedOutcome})
        {#if suggestion.isSelected}
          ✅
        {/if}
      </button>
    </li>
    {/each}
  </ul>
  <button on:click={proceed}>Proceed</button>
  
  <style>
  .selected-suggestion {
    background-color: green;
    color: white;
  }
  </style>
  