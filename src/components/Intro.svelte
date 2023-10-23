<script>
  export let explainerIntro = true;
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import tool from "../../public/icons_tool.svg"
  import ai from "../../public/icons_ai.svg"

  function onProceed() {
    explainerIntro = false;
    dispatch("proceed");
  }
</script>

{#if explainerIntro}
  <div class="text-white px-10 pb-12" transition:fade>
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
  <div class="card-long-text bg-blue-200 p-12">
    <div class="flex">
    <img class="h-10 w-9 mr-5 filter-blue"  src={tool}/>
    <div class="text-blue-800 font-bold text-xl md:text-2xl pt-1"> How to use the tool
    </div>
    </div>
    <div class="text-sm pb-10 md:text-base">
      There are two routes through the tool:
    </div>
    <div class="grid gap-28 grid-cols-2 pb-5">
      <div>
        <div class="font-bold text-blue-800">
          Select from example case studies:
        </div>
        <div>
          learn more about Consequence Scanning by selecting one of our example
          case studies and carry out a hypothetical Consequence Scanning
          activity to learn more about the process and how it can support your
          professional practice.
        </div>
      </div>
      <div>
        <div class="font-bold text-blue-800">Start a new project:</div>
        <div>
          follow the steps in the interactive tool to carry review your own
          project and work toward outputting a project overview and accompanying
          risk log that can be used within your own project processes as you
          plan your backlog and upcoming actions.
        </div>
      </div>
    </div>
  </div>
  <div class="p-12 text-white">
    <div class="flex">
        <img class="h-10 w-9 mr-5 filter-white"  src={ai}/>
    <div class="text-2xl font-bold pb-3">Supported by AI</div>
    </div>
    <div>
        The tool uses a ChatGPT plugin to assist you in the process of
        Consequence Scanning. At several steps throughout the tool you will have
        the option to generate suggestions and ideas for your project in order
        to help you capture the potential consequences and suggest appropriate
        actions.
    </div>
    <div class="bg-transparent text-blue-800 font-bold text-base border-blue-800 border-2 py-2 px-3-container">
        <button class="bg-transparent highlight border border-2 border-white hover:border-white text-white font-bold text-lg border-white px-8 py-2 mt-4" on:click={onProceed}>Begin</button>
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
