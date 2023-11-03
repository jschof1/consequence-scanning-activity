<script>
  import Textarea from "../utils/Textarea.svelte";
  import { fade } from "svelte/transition";

  export let ProjectData;
  export let onProceed;
  let errorMessage = {message: null, status: false}

  import loading from "../../public/loading.gif";
  import bin from "../../public/icons_bin.svg";
  import ai from "../../public/icons_ai.svg";

  let fetchAttempts = 0;
  let isLoading = true;


  const HOST_NAME = import.meta.env.VITE_HOST_NAME

  let HOST = HOST_NAME || "http://localhost:3000/";
  HOST += "openai-completion"

  let showModal = false;
  function toggleModal() {
    showModal = !showModal;
  }

  export let customConsequences = null;

function addOwnConsequences() {
  errorMessage.status = false;
  customConsequences = true;
  aiSuggest = false;

  let selected = $consequenceSuggestions.filter(s => s.isSelected);
  selected.forEach(s => {
    consequences.push({
      description: s.description,
      outcome: s.selectedOutcome
    });
  });
  $consequenceSuggestions = $consequenceSuggestions.map(a => ({ ...a, isSelected: false }));
  consequenceSuggestions.set($consequenceSuggestions);
}

  let aiSuggest = null;
  export let consequenceSuggestions;
  export let consequences;

  export let onAdd;

  async function convertProjectDataToString() {
    const { objectives, title, stakeholders, dataUsed } = ProjectData;

    return `
        Project Title: ${title}
        Objectives: ${objectives}
        Stakeholders: ${stakeholders.map((s) => s.text)}
        Data Used: ${dataUsed}
        `;
  }

  async function reviewWithAI(content) {
    let promptContext = `
      Anticipate and address the potential impacts of a product or service on society. I need insights and suggestions based on the following project data:

  ${content}

  Based on the information provided, please provide me with a list of 5 potential intended consequences. Your response should be in the format of an undeclared javascript array of strings`;
    try {
      const review = await fetch(HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: promptContext }],
          model: "gpt-3.5-turbo",
        }),
      });
      if (!review.ok) {
        throw new Error(
          `Network response was not ok, status: ${review.status}, statusText: ${review.statusText}`
        );
      }
      const data = await review.json();

      const suggestions = await data.choices[0].message.content;

      function convertArray(arr) {
        return arr.map((item) => ({
          description: item.replace("Intended consequences:", ""),
          isSelected: "true",
        }));
      }

 return convertArray(JSON.parse(suggestions));
      } catch (error) {
        fetchAttempts++;
        console.error("Fetch attempt failed:", error);
        if (fetchAttempts >= 2) {
          errorMessage.message = 'There was an error fetching the AI suggestions. You can add your own consequences.';
          errorMessage.status = true;
          return null;
        }
      }
    }


async function suggestConsequences() {
  aiSuggest = true;
  isLoading = true;
  
  const projectDataString = await convertProjectDataToString();
  let dataFromAI = await reviewWithAI(projectDataString);
  
  fetchAttempts++;

  if (!dataFromAI && fetchAttempts < 2) {
    console.log("No data returned from AI, retrying...");
    dataFromAI = await reviewWithAI(projectDataString);
    fetchAttempts++;
  }
  if (!dataFromAI && fetchAttempts >= 2) {
    console.log("No data returned from AI after two attempts.");
    errorMessage.message = "Failed to fetch AI suggestions. Please try again later or add your own consequences.";
    errorMessage.status = true;
  }
  if (dataFromAI) {
    isLoading = false;
    aiSuggest = true;
    consequenceSuggestions.update(() => dataFromAI);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 200);
  } else {
    isLoading = false;
  }
}
 
  function handleBinClick(selectedDescription) {
    const updatedSuggestions = $consequenceSuggestions.map((sug) => {
      if (sug.description === selectedDescription) {
        return {
          ...sug,
          isSelected: false,
        };
      }
      return sug;
    });
    consequenceSuggestions.set(updatedSuggestions);
  }

</script>

{#if customConsequences === null}
  <div class="bg-blue-100 p-12">
    <div class="flex">
      <img class="h-10 w-9 mr-5 filter-blue" src={ai} />
      <div
        class="text-blue-800 font-bold text-xl md:text-2xl"
        in:fade={{ duration: 2000, delay: 400 }}
      >
        Do you want AI to suggest intended consequences?
      </div>
    </div>
    <div class="mt-7 p-8 bg-white shadow-md bg-opacity-70">
      The AI will review the details of the project and make suggestions for
      what the possible intended and unintended consequences might be. The
      generated consequences should be treated as a guide that supports your
      project planning.<br /><br />
      <span
        class="underline font-semibold cursor-pointer"
        on:click={toggleModal}>Click here</span
      >
      to see what data the AI will be using.
      {#if showModal}
        <div
          class="block z-10 fixed bg-slate-100 bg-opacity-20 left-20 bottom-20 w-full h-full overflow-hidden"
          in:fade={{ duration: 300 }}
        >
          <div class="modal-content shadow-2xl">
            <div class="close" on:click={() => toggleModal()}>&times;</div>
            <div class="space-y-4">
              <div class="text-lg font-semibold text-gray-700">
                The Project Title:
              </div>
              <div class="bg-gray-100 p-3 rounded text-gray-800">
                {ProjectData.title}
              </div>

              <div class="text-lg font-semibold text-gray-700">
                The Project Objectives:
              </div>
              <div class="bg-gray-100 p-3 rounded text-gray-800">
                {ProjectData.objectives}
              </div>

              <div class="text-lg font-semibold text-gray-700">
                The Project Stakeholders:
              </div>
              {#each ProjectData.stakeholders as stakeholder}
                <div class="bg-gray-100 p-3 rounded text-gray-800">
                  {stakeholder.text} - ({stakeholder.type})
                </div>
              {/each}

              <div class="text-lg font-semibold text-gray-700">
                The data you will be using in your project:
              </div>
              <div class="bg-gray-100 p-3 rounded text-gray-800">
                {ProjectData.dataUsed}
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <div class="" style="display:{aiSuggest === true || false ? 'none' : ''}">
      <button
        class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
        style="display"
        on:click={suggestConsequences}>Yes</button
      >
      <button
        class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
        on:click={addOwnConsequences}>No</button
      >
    </div>
  </div>
{/if}
{#if aiSuggest === true}
  <div class="bg-orange-100 p-12">
    <div class="mb-7 p-8 bg-white opacity-80 shadow-md">
      These consequences have been generated by the AI. Each generated
      consequence has also been identified as having either a positive or
      negative outcome. Review the consequences and edit or remove any that
      require amendments. You can also create your own consequences and add them
      to the list.
    </div>
      {#if isLoading}
        <div class="loading h-2">
          <span class="text-lg p-4">Loading...</span>
          <img alt="loading-icon ml-8 mt-1" src={loading} />
        </div>
      {/if}
    <div class="flex flex-col w-full justify-center" in:fade={{ delay: 100, duration: 700 }}>
      {#each $consequenceSuggestions as suggestion}
        <div class="relative">
          {#if suggestion.isSelected}
            <Textarea bind:value={suggestion.description} />
            <img
              src={bin}
              alt="bin icon"
              class="filter-blue absolute top-2 right-2 mt-1 pb-1 mr-4 cursor-pointer h-5"
              on:click={() => handleBinClick(suggestion.description)}
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <div>
  {#if errorMessage.status}
    <div class="bg-orange-100 px-10 text-lg font-bold">{errorMessage.message}</div>
  {/if}
  </div>
  <div
    class="bg-orange-100 p-12"
    style="display: {customConsequences !== null ? 'none' : ''}"
  >
    <button
      class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
      on:click={onProceed}>Continue with these consequences</button
    >
    <button
      class="my-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-6"
      on:click={addOwnConsequences}>Add in your own consequences</button
    >
  </div>
{/if}
{#if aiSuggest === false && customConsequences === true}
  <div id="consequences" class="bg-blue-100 p-12">
    <div class="text-blue-800 mb-4 font-bold text-xl md:text-3xl">
      Intended Consequences
    </div>
    {#each consequences as consequence, i}
      <div class="consequence-options">
        <label for="description">
          <div class="text-blue-800 mb-4 font-bold text-lg md:text-md">
            Intended Consequence {i + 1}
          </div>
          <Textarea
            bind:value={consequence.description}
            placeholder="Description"
          />
        </label>
      </div>
    {/each}
    <div>
      <button
        class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={onAdd}>Add More</button
      >
      <button
        class="m-5 bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3"
        on:click={onProceed}>Proceed to Unintended Consequences</button
      >
    </div>
  </div>
{/if}
