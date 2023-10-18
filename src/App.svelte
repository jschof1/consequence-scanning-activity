<script>
  import Main from "./components/Main.svelte";
  let src = './odi-logo.png';
  


  let sections = [
{id:"ProjectBrief", name: "Project Brief", visible: false},
{id:"IntendedConsequences", name: "Intended Consequences", visible: false},
{id:"UnintendedConsequences", name: "Unintended Consequences", visible: false},
{id:"Review", name: "Review", visible: false},
]

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
<h1 id="title">Interactive Tool:<br> Consequence Scanning</h1>
<div id="main-container">
   <Main />
</div>
