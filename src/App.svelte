<script>
  import "./app.css";
  import { fade } from "svelte/transition";
  import Main from "./components/Main.svelte";
  import Navbar from "./components/Navbar.svelte";

  let src = "./odi-logo.png";
  let arrow = "./icons_arrow.svg";

  </script>
<Navbar />
  <div class="absolute right-0 top-0 h-16 w-16">
    <div
      class="absolute transform rotate-45 bg-white text-center text-black font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
      DEMO
    </div>
  </div>
<div class="ml-64 bg-blue-800">
  <div class="text-5xl font-bold py-16 text-center">
    <span class="text-white">Consequence and Risk Evaluation (CARE)</span>
  </div>
  <Main />
</div>
