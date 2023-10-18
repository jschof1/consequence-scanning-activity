<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    export let consequences;
  
    const aiSuggestions = [
      { 
        description: "Potential impact on the environment due to waste.",
        outcome: ["Negative"],
        selectedOutcome: "Negative",
        impact: ["High", "Medium", "Low"],
        selectedImpact: "",
        likelihood: ["High", "Medium", "Low"],
        selectedLikelihood: "",
        action: "",
        AIM: ['Act', 'Influence', 'Monitor'],
        selectedAIM: "",
        timeline: ["3 months", "6 months", "1 year", "2 years"], 
        selectedTimeline: ""
      },
      // ... Add the other suggestions in the same format
    ];
  
    function selectSuggestion(selectedSuggestion) {
      selectedSuggestion.isSelected = !selectedSuggestion.isSelected;
      if (selectedSuggestion.isSelected) {
        consequences.push(selectedSuggestion);
      } else {
        const index = consequences.indexOf(selectedSuggestion);
        if (index > -1) {
          consequences.splice(index, 1);
        }
      }
    }
  
    function proceed() {
      dispatch('proceed');
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
  