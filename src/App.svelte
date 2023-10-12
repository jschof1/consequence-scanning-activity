<script>
  import Main from "./components/Main.svelte";
  let src = '/odi-logo.png';
  


  let sections = [
{id:"Questions", name: "Questions", visible: false},
{id:"Consequences", name: "Consequences", visible: false},
{id:"Review", name: "Review", visible: false},
{id:"Hypothesis", name: "Hypothesis", visible: false},
{id:"Categorization", name: "Categorization", visible: false}
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
<h1 id="title">Interactive consequence scanning</h1>
<div id="main-container">
   <Main />
</div>
