<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

function onProceed() {
    dispatch('proceed');
}
</script>
<div class="card card-long-text">
    <p>Consequence Scanning is a way for organisations to think about the potential impact of their product or service on people and society. With Consequence Scanning, organisations will be able to anticipate and address concerns they might have early on in the development cycle, before the final product is shipped.&nbsp;</p>
    <p>Through Consequence Scanning, you consider the potential consequences of what you&rsquo;re building and document the potential outcomes in order to provide you with the opportunity to mitigate or address potential harms or disasters before they happen.&nbsp;</p>
    <p><strong>[Video Overview]</strong></p>
    </div>
    <div class="card card-long-text">
    <h2>How to use the tool</h2>
    <p>There are two routes through the tool:</p>
    <ul>
    <li><strong>Select from example case studies:</strong><p> learn more about Consequence Scanning by selecting one of our example case studies and carry out a hypothetical Consequence Scanning activity to learn more about the process and how it can support your professional practice.</p></li>
    <li><strong>Start a new project: </strong><p>follow the steps in the interactive tool to carry review your own project and work toward outputting a project overview and accompanying risk log that can be used within your own project processes as you plan your backlog and upcoming actions.</p></li>
    </ul>
    </div>
    <div class="card card-long-text">
    <h2>Supported by AI</h2>
    <p>The tool uses a ChatGPT plugin to assist you in the process of Consequence Scanning. At several steps throughout the tool you will have the option to generate suggestions and ideas for your project in order to help you capture the potential consequences and suggest appropriate actions.</p>
    </div>
    <div class="btn-white-styled-container">
<button class="btn-white-styled" on:click={onProceed}>Begin</button>
</div>