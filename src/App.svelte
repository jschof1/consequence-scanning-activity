<script>
  import "./app.css";
  import Main from "./components/Main.svelte";
  let src = './odi-logo.png';
  let arrow = './icons_arrow.svg';
  


  let sections = [
{id:"ProjectBrief", name: "Project Brief", visible: false},
{id:"IntendedConsequences", name: "Intended Consequences", visible: false},
{id:"UnintendedConsequences", name: "Unintended Consequences", visible: false},
{id:"Review", name: "Review", visible: false},
]

</script>
<div class="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar">
  <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
    <ul class="list-style-image-arrow flex flex-col py-4 space-y-6">
    <li class="pl-12 py-5"> <img alt="odi-logo" src={src}/></li>
  {#each sections as section}
  <li>
    <a 
      href={`#${section.id}`} 
      class="section-link {section.visible ? 'visible' : ''}"
    >
    <span class="rect"></span>
    <span class="circle"></span>
      {section.name}
    </a>
    </li>
  {/each}
  </ul>
</div>
</div>
<div class="ml-64 bg-blue-800">
<div class="text-5xl font-bold py-16 text-center"><span class="text-yellow-400">Interactive Tool:</span> <span class="text-white">Consequence Scanning</span></div>
   <Main />
</div>

