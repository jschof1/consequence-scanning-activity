<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();


    function onProceed(){
        dispatch("proceed");
    }
</script>

<div class="p-12 bg-white">
  <div class="text-blue-800 mb-6 font-bold text-xl md:text-4xl">
   Consequences
  </div>
    <div class="mb-7 p-8 bg-white shadow-md" in:fade={{duration: 2000, delay: 400}}>
    <div class="mb-4">
        A consequence refers to an outcome or result, whether positive or negative, that is expected or may occur as a direct or indirect effect of the project's actions, decisions, or activities.
    </div>
    <div class="mb-4">
        These consequences can impact various aspects of the project, including its goals, stakeholders, data assets, and overall success.
    </div>
    <div class="font-bold mb-2 text-blue-800 md:text-lg">Intended Consequences:</div>
    <div class="mb-4 pl-4">
        These are the outcomes that the project aims to achieve. They are the desired results, such as improved data analysis, enhanced decision-making, increased efficiency, and other benefits that align with the project's objectives.
    </div>
    <div class="font-bold mb-2 text-blue-800 md:text-lg">Unintended Consequences:</div>
    <div class="mb-4 pl-4">
        These are the unexpected or unforeseen results, which can be either positive or negative. Unintended consequences can include side effects, unexpected challenges, or unanticipated opportunities that may arise during the project's execution.
    </div>
</div>
  <button
    class="bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
    on:click={onProceed}>Proceed to Intended Consequences</button
  >
</div>
