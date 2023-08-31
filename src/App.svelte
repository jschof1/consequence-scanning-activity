<script>
  import ChatBubble from './ChatBubble.svelte';
  import CaseStudies from './CaseStudies.svelte';
  let showOptions = false;
  
  function showCaseStudyOptions() {
    showOptions = true;
  }
</script>

<div id="chat-window">
<h1 id="title"> Interactive consequence scanning </h1>
  <ChatBubble message="Would you like to upload your case study or choose from our pre-loaded case studies?" onAppear={showCaseStudyOptions} />
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
background: rgb(34,152,195);
background: linear-gradient(0deg, rgba(34,152,195,0.6125043767507004) 0%, rgba(60,16,226,0.5214679621848739) 64%);
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
border-radius: 10px;
  }

  #title {
    color: white;
  }
</style>
