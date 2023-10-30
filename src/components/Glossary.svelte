<script>
  import { glossaryItems } from "../data/glossary.js";

  let glossarySearchInput = "";
  let activeNav = null;

  function filterResults() {
    const inputValue = glossarySearchInput.toUpperCase();
    const rows = document.querySelectorAll(".glossary__results__row");

    rows.forEach((row) => {
      let matched = false; // flag to check if any item in the row matched
      const items = row.querySelectorAll("[data-item]");

      items.forEach((item) => {
        const itemText = item.getAttribute("data-item").toUpperCase();
        if (itemText.includes(inputValue)) {
          matched = true; // at least one item in the row matched
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // If at least one item in the row matched, show the row; otherwise hide it.
      if (matched) {
        row.classList.remove("inactive");
      } else {
        row.classList.add("inactive");
      }
    });
  }
  function handleNavClick(nav) {
    activeNav = nav;
    const rows = document.querySelectorAll(".glossary__results__row");
    rows.forEach((row) => {
      row.classList.add("inactive");
      const term = row.getAttribute("data-term");
      if (nav === term) {
        row.classList.remove("inactive");
      }
    });
  }
</script>

<!-- Main Content -->
<main class="site-content p-4">
  <div class="container mx-auto">
    <!-- Glossary Nav -->
    <nav class="glossary__nav pb-4 border-b border-blue-800">
      <ul class="flex space-x-4 justify-center">
        {#each ["C", "D", "E", "I", "K", "L", "M", "O", "P", "R", "S", "U"] as navItem}
          <li
            class={`glossary__nav__item ${
              activeNav === navItem ? "active" : ""
            }`}
            on:click={() => handleNavClick(navItem)}
          >
            <a
              class="card card__content"
              data-nav={navItem}
              data-toggle="glossary"
              href="#">{navItem}</a
            >
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Glossary Search -->
    <div class="glossary__search mb-4">
      <form action="#" class="glossary__search__form relative">
        <input
          class="form-control pl-10 mt-5"
          id="glossarySearchInput"
          placeholder="Search Keywords"
          type="search"
          bind:value={glossarySearchInput}
          on:input={filterResults}
        />
        <span class="absolute left-3 top-3 text-gray-400">
          <i class="fa fa-search" />
        </span>
      </form>
    </div>

    <!-- Glossary Results -->
    <div class="glossary__results mb-6">
      {#each Object.keys(glossaryItems) as term}
        <div
class={`glossary__results__row ${activeNav && activeNav !== term ? "inactive" : ""}`}
          data-term={term}
        >
          <div class="text-blue-800 text-4xl mb-4 font-extrabold">{term}</div>
          <div class="row">
            {#each glossaryItems[term] as { title, description }}
              <div
                class=" bg-blue-100 mb-4 text-black col-md-3 p-5 col-sm-6"
                data-item={title}
              >
                <a class="" href="#">
                  <div class="text-lg font-bold">{title}</div>
                  <p class="my-2">{description}</p>
                </a>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<!-- Additional Styles (if needed) -->
<style>
  .inactive {
    pointer-events: none;  /* Make it non-interactive */
    opacity: 0;
    height: 0;
    margin: 0;
    width: 100%;
  }
  .glossary__nav__item.active a {
    color: #fff;
    background-color: #2b98eb;
  }
</style>
