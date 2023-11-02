<script>
  import "../app.css";
  import { fade } from "svelte/transition";
  let src = "./odi-logo.png";
  let arrow = "./icons_arrow.svg";
  import Glossary from "./Glossary.svelte";
  import Disclaimer from "./Disclaimer.svelte";
  let showModal = false;
  let showDisclaimer = false;
  import {activeSection} from "./section.js";
function toggleModal() {
  showModal = !showModal;
  if (showModal) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the background when modal is shown
  } else {
    document.body.style.overflow = ''; // Restore scrolling when modal is closed
  }
}

function toggleDisclaimer() {
  showDisclaimer = !showDisclaimer;
  if (showDisclaimer) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the background when modal is shown
  } else {
    document.body.style.overflow = ''; // Restore scrolling when modal is closed
  }
}

  let sections = [
    {id:"Intro", name: "Homepage", visible: false},
    {id: "Glossary", name: "Glossary", visible: false},
    {id:"Questions", name: "Project Details", visible: false},
    {id:"IntendedConsequences", name: "Intended Consequences", visible: false},
    {id:"UnintendedConsequences", name: "Unintended Consequences", visible: false},
    {id:"Evaluation", name: "Evaluation", visible: false},
    {id:"AssigningActions", name: "Assigning Actions", visible: false},
    {id:"ViewingTable", name: "Final Risk Score", visible: false},
  ];

    function changeSection(event, sectionId) {
    activeSection.set(sectionId);
    event.preventDefault();
  }
</script>

<div
  class="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar"
>
  <div
    class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow"
  >
    <ul
      class="list-style-image-arrow flex flex-col py-4 space-y-6 text-m text-black"
    >
      <li class="pl-12 py-5 mb-7"><img alt="odi-logo" {src} class="h-9" /></li>
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
      {#each sections as section}
        {#if section.name === "Glossary"}
          <li class="flex hover:text-blue-800 cursor-pointer" on:click={toggleModal}>
            <img class="h-7 ml-3 pr-2 pb-1 filter-yellow" src={arrow} />
          Glossary
          </li>
        {/if}
        {#if section.name != "Glossary"}
        <li class="flex" on:click={() => changeSection(event, section.id)}>
          <img class="h-7 ml-3 pb-1 filter-yellow" src={arrow} />
          <a
            href={`#${section.id}`}
            class="ml-2 mb-2 {section.visible ? 'visible' : ''}"
          >
            {section.name}
          </a>
        </li>
        {/if}
      {/each}
          <li class="flex hover:text-blue-800 cursor-pointer" on:click={toggleDisclaimer}>
            <img class="h-7 ml-3 pr-2 pb-1 filter-yellow" src={arrow} />
          Disclaimer
          </li>
    </ul>
  </div>
</div>
 {#if showDisclaimer}
  <div class="fixed inset-0 bg-slate-100 bg-opacity-20 z-20" in:fade={{ duration: 300 }}>
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-full p-4">
        <div class="relative bg-white border w-[70%] max-h-[90vh] overflow-y-auto p-12 border-solid border-gray-400 shadow-2xl">
          <button
            class="absolute top-0 right-0 p-2 text-2xl font-semibold text-black"
            on:click={toggleDisclaimer}
          >
            &times;
          </button>
          <Disclaimer />
        </div>
      </div>
    </div>
  </div>
{/if}
<style>

</style>