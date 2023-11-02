<script>
  import { onMount } from "svelte";
  import { intendedConsequenceSuggestions } from "./store.js";
  const HOST_NAME = import.meta.env.VITE_HOST_NAME

  let HOST = HOST_NAME || "http://localhost:3000/";
  HOST += "openai-completion"
  export let projectData;

  async function convertProjectDataToString() {
    const { objectives, title, stakeholders, dataUsed } = projectData;

    return `
        Project Title: ${title}
        Objectives: ${objectives}
        Stakeholders: ${stakeholders.map((s) => s.text)}
        Data Used: ${dataUsed}
        `;
  }
  async function reviewWithAI(content) {
    let promptContext = `
      Anticipate and address the potential impacts of a product or service on society. I need insights and suggestions based on the following project data:

  ${content}

  Based on the information provided, please provide me with a list of 5 potential intended consequences. Your response should be in the format of an undeclared javascript array of strings`;
    try {
      const review = await fetch(HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: promptContext }],
          model: "gpt-3.5-turbo",
        }),
      });
      if (!review.ok) {
        throw new Error(
          `Network response was not ok, status: ${review.status}, statusText: ${review.statusText}`
        );
      }
      const data = await review.json();

      const suggestions = await data.choices[0].message.content;

      function convertArray(arr) {
        return arr.map((item) => ({
          description: item.replace("Intended consequences:", ""),
          isSelected: "true",
        }));
      }

      return convertArray(JSON.parse(suggestions));
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function triggerAI() {
  //onMount(async () => {
    try {
      const projectDataString = await convertProjectDataToString();
      const dataFromAI = await reviewWithAI(projectDataString);

      intendedConsequenceSuggestions.update(() => dataFromAI);
      console.log($intendedConsequenceSuggestions);

    } catch (error) {
      console.error("Error:", error);
    }
  }
  //);
</script>