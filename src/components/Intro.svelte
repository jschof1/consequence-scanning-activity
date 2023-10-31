<script>
  export let explainerIntro = true;
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Glossary from "./Glossary.svelte";
  import tool from "../../public/icons_tool.svg";
  import ai from "../../public/icons_ai.svg";
  import arrow from "../../public/icons_arrow-blue.svg";

    let showModal = false;

  function toggleModal() {
  showModal = !showModal;
  if (showModal) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the background when modal is shown
  } else {
    document.body.style.overflow = ''; // Restore scrolling when modal is closed
  }
}
  
  const dispatch = createEventDispatcher();
  
  function onProceed() {
    explainerIntro = false;
    dispatch("proceed", event);
  }

</script>
{#if explainerIntro}
  <div class="text-white px-28 pb-12" id="Intro">
    <div class="grid-two-by-two">
      <div class="card-long-text">
        <p class="text-sm md:text-xl">
          Consequence Scanning is a way for organisations to think about the
          potential impact of their product or service on people and society.
          With Consequence Scanning, organisations will be able to anticipate
          and address concerns they might have early on in the development
          cycle, before the final product is shipped.&nbsp;
        </p>
        <p class="text-sm md:text-xl">
          Through Consequence Scanning, you consider the potential consequences
          of what you&rsquo;re building and document the potential outcomes in
          order to provide you with the opportunity to mitigate or address
          potential harms or disasters before they happen.&nbsp;
        </p>
        <p class="text-sm md:text-xl">This interactive tool provides a framework to carry out a Consequence Scanning activity and generate a risk register that can be downloaded and incorporated into your project planning and governance. 
</p>
      </div>
      <div class="card-long-text">
        <!-- ifrmae -->
        <div class="video-container pt-3">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/2Xc9gXyf2G4"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  </div>
  <div class="card-long-text bg-blue-200 px-28 p-12">
    <div class="flex">
      <img class="h-10 w-9 mr-5 filter-blue" alt="tool-icon" src={tool} />
      <div class="text-blue-800 font-bold text-xl md:text-2xl pt-1">
        How to use the tool
      </div>
    </div>
    <div class="text-sm pb-10 md:text-base">
      There are two routes through the tool:
    </div>
    <div class="grid gap-28 grid-cols-2 pb-5">
      <div>
        <div class="flex">
          <img class="h-7 mr-2 pb-1" src={arrow} />
          <div class="font-bold text-blue-800 text-lg mb-2">
            Select from example case studies:
          </div>
        </div>
        <div>
        Learn how to conduct a Consequence Scan by working through one of our example case studies and identify consequences, determine risk and plan actions. <br><span class="underline font-semibold cursor-pointer" on:click={toggleModal}>Click here </span> to view a glossary of the key terms.
        </div>
         {#if showModal}
        <div
          class="block fixed bg-slate-100 bg-opacity-20 left-20 bottom-20 w-full h-full overflow-hidden"
          in:fade={{ duration: 300 }}
        >
          <div class="modal-content shadow-2xl">
            <span class="close" on:click={() => toggleModal()}>&times;</span>
            <Glossary />
          </div>
        </div>
      {/if}
      </div>
      <div>
        <div class="flex">
          <img class="h-7 mr-2 pb-1" src={arrow} />
          <div class="font-bold text-blue-800 text-lg mb-2">
            Start a new project:
          </div>
        </div>
        <div>
         Follow the steps in the interactive tool to carry out a review of your own project and generate  a project overview and accompanying risk register .
        </div>
      </div>
    </div>
  </div>
  <div class="p-12 text-white px-28">
    <div class="flex">
      <img class="h-10 w-9 mr-5 filter-white" src={ai} />
      <div class="text-2xl font-bold pb-3">Supported by AI</div>
    </div>
    <div>
<div>The tool uses a ChatGPT plugin to assist you in the process of Consequence Scanning. Throughout the tool you will have the option to generate suggestions and ideas for your project in order to help you identify consequences and plan risk mitigation.</div>
<div class="mt-5 font-bold  text-lg">The tool will:</div>
<ul class="list-disc mt-1 ml-5">
<li><strong>Analyse data:</strong> The AI reads and analyses the content you input, including project descriptions, data details, and stakeholder information.</li>
<li><strong>Suggest consequences:</strong> Based on this analysis, the AI suggests potential consequences, both positive and negative, that might arise from your data project.</li>
<li><strong>Assess risk:</strong> The tool will assess the impact and likelihood of these consequences to help you prioritise and manage risks effectively.</li>
<li><strong>Create actions:</strong> The AI will generate specific actions to mitigate and manage identified consequences.</li>
<li><strong>Recommend KPIs: </strong>&nbsp;The tool will also recommend Key Performance Indicators (KPIs) for your actions in order to track the effectiveness of your risk mitigation actions.</li>
</ul>

      <!-- add disclaimer -->
      <div class="italic pt-5 font-bold">
        Please note: Suggestions from the AI assistant are provided for
        consideration and should be taken as presented.
      </div>
    </div>
    <div
      class="bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container"
    >
      <button
        class="bg-transparent highlight border border-2 border-white hover:border-white text-white font-bold text-lg border-white px-8 py-2 mt-4"
        on:click={onProceed}>Begin</button
      >
    </div>
  </div>
{/if}

<style>
  .grid-two-by-two {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
</style>
