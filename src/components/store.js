import { writable } from "svelte/store";

// export const aiSuggestions = writable([
// ]);

export const unintendedConsequenceSuggestions = writable([
  {
    description: "This is a mock response",
    impact: "High",
    selectedImpact: "High",
    outcome: "Positive",
    selectedOutcome: "Positive",
    likelihood: "Low",
    selectedLikelihood: "Low",
    action: {
      description: "This is a mock action response",
      date: "01/01/2024",
      stakeholder: "Project manager (internal)",
      selectedTimeline: "01/01/2024",
    },
    AIM: ["Act", "Influence", "Monitor"],
    selectedAIM: "Monitor",
    KPI: "THIS IS A KPI",
    isSelected: true,
  },
  {
    description: "This is one mock response",
    impact: "High",
    selectedImpact: "High",
    outcome: "Positive",
    selectedOutcome: "Positive",
    likelihood: "Low",
    selectedLikelihood: "Low",
    action: {
      description: "This is a mock action response",
      date: "01/01/2024",
      stakeholder: "Project manager (internal)",
      selectedTimeline: "01/01/2024",
    },
    AIM: ["Act", "Influence", "Monitor"],
    selectedAIM: "Monitor",
    KPI: "THIS IS A KPI",
    isSelected: true,
  },
  {
    description: "This is another mock response",
    impact: "High",
    selectedImpact: "High",
    outcome: "Positive",
    selectedOutcome: "Positive",
    likelihood: "Low",
    selectedLikelihood: "Low",
    action: {
      description: "This is a mock action response",
      date: "01/01/2024",
      stakeholder: "Project manager (internal)",
      selectedTimeline: "01/01/2024",
    },
    AIM: ["Act", "Influence", "Monitor"],
    selectedAIM: "Monitor",
    KPI: "THIS IS A KPI",
    isSelected: true,
  },
]);

export const intendedConsequenceSuggestions = writable([
  {
    description: "this is one mock response",
    isSelected: true,
  },
  {
    description: "this is another mock response",
    isSelected: true,
  },
  {
    description: "this is an additional mock response",
    isSelected: true,
  },
  {
    description: "this is another additional mock response",
    isSelected: true,
  },
  {
    description: "this is the final mock response",
    isSelected: true,
  },
]);
