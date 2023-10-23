import { writable } from 'svelte/store';


// export const aiSuggestions = writable([
// ]);

export const aiSuggestions = writable([
  { 
    description: "Potential impact on the environment due to waste.",
    outcome: ["Negative"],
    selectedOutcome: "Negative",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "Improve the product's recyclability.",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"], 
    selectedTimeline: "6 months",
    KPI : "Recyclability rate",
    isSelected: false
  },
  {
    description: "Possible misuse of the product by end-users.",
    outcome: ["Negative"],
    selectedOutcome: "Positive",
    impact: ["High", "Medium", "Low"],
    selectedImpact: "High",
    likelihood: ["High", "Medium", "Low"],
    selectedLikelihood: "Low",
    action: "Ensure that the product is used as intended.",
    AIM: ['Act', 'Influence', 'Monitor'],
    selectedAIM: "Act",
    timeline: ["3 months", "6 months", "1 year", "2 years"],
    KPI : "Number of complaints",
    selectedTimeline: "3 months",
    isSelected: false
  }
]);