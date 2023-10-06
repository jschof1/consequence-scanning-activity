<script>
  import CaseStudies from "./CaseStudies.svelte";
  import ChatBubble from "./ChatBubble.svelte";
  let src = 'src/assets/odi-logo.png';
  
  // import { afterUpdate } from 'svelte';
  let showOptions = false;
  
  

  let sections = [
{id:"Questions", name: "Questions", visible: false},
{id:"Consequences", name: "Consequences", visible: false},
{id:"Review", name: "Review", visible: false},
{id:"Hypothesis", name: "Hypothesis", visible: false},
{id:"Categorization", name: "Categorization", visible: false}
]

// let observer;


// function observeSection(node, id) {
//     if (!observer) {
//       observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//           let section = sections.find(s => s.id === entry.target.dataset.id);
//           section.visible = entry.isIntersecting;
//         });
//       }, { threshold: 0.1 });
//     }

//     if (node) {
//       node.dataset.id = id; // Store id in dataset to retrieve during callback
//       observer.observe(node);
//     }

//     return {
//       destroy() {
//         if (node) observer.unobserve(node);
//       }
//     };
//   }

  let isSection1Visible = false;
  let isSection2Visible = true; // Example values, you will set this dynamically
  let isSection3Visible = true;
  function showCaseStudyOptions() {
    showOptions = true;
  }
</script>
<div class="navbar">
  {#each sections as section}
    <a 
      href={`#${section.id}`} 
      class="section-link {section.visible ? 'visible' : ''}"
    >
      {section.name}
    </a>
  {/each}
  <div class="logo"><img alt="hi" src={src}/></div>
</div>
<div id="chat-window">
  <h1 id="title">Interactive consequence scanning</h1>
  <ChatBubble
    message="Would you like to upload your case study or choose from our pre-loaded case studies?"
    onAppear={showCaseStudyOptions}
  />
  {#if showOptions}
    <CaseStudies />
  {/if}
</div>

<style>
  #chat-window {
    max-height: 600px;
    overflow-y: auto;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 10rem;
    background-color: #0f47ad;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    /* border-radius: 10px; */
  }

  #title {
    color: white;
    background-color: #0f47ad;
    margin-top: -2em
  }

  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    background-color:white;
    padding: 10px;
    z-index: 10;
  }

  .logo {
    position: absolute;
    left: 20px;
  }
  img {
    width: 130px;
  }

  .section-link {
    margin: 0 20px;
    color: black;
  }

  .section-link.visible {
    opacity: 1;
  }

</style>
