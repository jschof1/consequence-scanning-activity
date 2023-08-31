<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition'
  export let message = "";
  export let onAppear = () => {};
  
  onMount(() => {
    setTimeout(onAppear, 1000); // Trigger after 1 second
  });
</script>

<div transition:fade="{{duration: 500}}">
  <div class="chat-bubble">
    {message}
  </div>
</div>

<style>
  .chat-bubble {
    background-color: #f1f1f1;
    padding: 30px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
</style>
