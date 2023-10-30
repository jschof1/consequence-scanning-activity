<!-- src/components/Textarea.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  export let value = '';
  export let placeholder = '';

  function autoResize(node) {
    function resize() {
      node.style.height = '42px';
      node.style.height = node.scrollHeight + 'px';
    }
  
    node.addEventListener('input', resize);
    resize();
  
    return {
      destroy() {
        node.removeEventListener('input', resize);
      }
    };
  }

  function handleChange(event) {
    value = event.target.value;
    dispatch('input', value);  // Dispatch the input event with the new value
  }
</script>

<style>
  textarea {
    @apply block w-full px-3 p-2 mb-4;
    overflow: hidden;
    resize: none;
  }
</style>

<textarea
  use:autoResize
  {placeholder}
  {value}
  on:input="{handleChange}"
></textarea>
