<script>
  import { onMount } from "svelte";
  import { unintendedConsequenceSuggestions } from "./store.js";

  let apiKey 
  // api key config variable or blank string
  // load location of chatgpt server from config variable

  export let projectData;

  async function convertProjectDataToString() {
    const { objectives, title, stakeholders, dataUsed, intendedConsequences } =
      projectData;

    return `
      Project Title: ${title}
      Objectives: ${objectives}
      Stakeholders: ${stakeholders.map((s) => s.text)}
      Data Used: ${dataUsed}
      Intended Consequences: ${intendedConsequences.map((ic) => ic.description)}
      `;
  }
  async function reviewWithAI(content) {
    let promptContext = `
    Anticipate and address the potential impacts of a product or service on society. I need insights and suggestions based on the following project data:

${content}

Based on the information provided, please provide me with a list of 5 potential unintended consequences, including the description of the unintended consequence appropriate actions, impact, likelihood, AIM, timeline, KPI, outcome along with their impact (High/Medium/Low), outcome (Positive/Negative), likelihood (High/Medium/Low), action, measure (Act/Influence/Monitor), and timeline (3 months/6 months/1 year/2 years). Your output must an object of arrays in JSON format with the following structure:
   [
    {
    description : [Provide a Brief description of the unintended consequence],
    outcome: ["Negative" or "Positive"],
    impact: ["High" or "Medium" or "Low"],
    likelihood: ["High" or "Medium" or "Low"],
    action: [Suggested action]
    AIM: ['Act' or 'Influence' or 'Monitor'],
    timeline: ["3 months" or "6 months" or "1 year" or "2 years"], 
    KPI: [Suggested KPIs]
    isSelected: [true // always mark as true]
   },
   {
    description : [Provide a Brief description of the unintended consequence],
   outcome: ["Negative" or "Positive"],
    impact: ["High" or "Medium" or "Low"],
    likelihood: ["High" or "Medium" or "Low"],
    action: [Suggested action]
    AIM: ['Act' or 'Influence' or 'Monitor'],
    timeline: {date: A date in this format YYYY-MM-DD, stakeholder: the possible stakeholder responsible for completion of the action taken from the stakeholders listed above}, 
    KPI: [Suggested KPIs]
    isSelected: [true // always mark as true]
   }
  ]
`;
    try {
      const review = await fetch("http://localhost:3000/openai-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          //  Authorization: 'Bearer ' + apiKey
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
      const suggestionsWithIsSelected = JSON.parse(suggestions).map((suggestion) => {
        return { ...suggestion, description: suggestion.description.replace("Unintended consequences:", ""), isSelected: true };
      });

      return suggestionsWithIsSelected;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  onMount(async () => {
    try {
      const projectDataString = await convertProjectDataToString();
      const dataFromAI = await reviewWithAI(projectDataString);
      // Since reviewWithAI now returns an array of objects directly, we don't need to use flat() or filter().
      unintendedConsequenceSuggestions.update(() => dataFromAI);
      console.log($unintendedConsequenceSuggestions);
    } catch (error) {
      console.error("Error:", error);
    }
  });
</script>
