<script>
  import "./app.css";
  import { fade } from "svelte/transition";
  import Main from "./components/Main.svelte";
  import Navbar from "./components/Navbar.svelte";

  let src = "./odi-logo.png";
  let arrow = "./icons_arrow.svg";

  let showModal = false;
  function toggleModal() {
    showModal = !showModal;
  }
  </script>
<Navbar />
<div class="ml-64 bg-blue-800">
  <div class="text-5xl font-bold py-16 text-center">
    <span class="text-white">Consequence and Risk Evaluation (CARE)</span>
  </div>
  <Main />
</div>
