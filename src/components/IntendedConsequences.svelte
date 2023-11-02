<script>
  import AiSuggestions from './AiSuggestions.svelte'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let consequenceSuggestions
  export let consequences;
  export let ProjectData;
  export let onAdd;

    let customConsequences = false;
    let aiSuggest = null


    function onProceed() {
      const selectedSuggestions = $consequenceSuggestions ? $consequenceSuggestions.filter(
        (sug) => sug.isSelected
      ) : [];

      const newConsequences = selectedSuggestions.map((selectedSuggestion) => ({
        description: selectedSuggestion.description,
      }));

      const validNewConsequences = newConsequences.filter(consequence => consequence.description && consequence.description.trim() !== '');

      const updatedConsequences = [
        ...$consequenceSuggestions,
        ...consequences
      ];
      consequences = updatedConsequences;

      dispatch("proceed", { details: updatedConsequences });
    }

</script>
<div id="IntendedConsequences">
  <div class="bg-orange-100 p-12">
    <div class="text-blue-800 mb-4 font-bold text-xl md:text-2xl">
     Intended Consequences
    </div>
    <div class="mb-7 p-8 bg-white shadow-md">
    <div class="mb-4">
        Start by creating a clear list of intended consequences.
        These consequences enable your project to remain focused on its objectives and desired outcomes. Intended consequences serve as a guide for project evaluation and success measurement.
    </div>
    <div class="mb-4">
        Intended consequences are the positive impacts and benefits you expect to create with your data project. This could include improved decision-making, increased efficiency, cost savings, enhanced customer satisfaction, or any other favourable results.
    </div>
</div>
  </div>


<AiSuggestions ProjectData={ProjectData} consequences={consequences} onAdd={onAdd} onProceed={onProceed} consequenceSuggestions={consequenceSuggestions}/>

 </div>
