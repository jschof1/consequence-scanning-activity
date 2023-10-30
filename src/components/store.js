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
    action: "This is a mock action response",
    AIM: ["Act", "Influence", "Monitor"],
    selectedAIM: "Monitor",
    timeline: "3 Months",
    selectedTimeline: "3 months",
    KPI: "THIS IS A KPI",
    isSelected: true,
  },
  {
    description: "This is a mock response",
    impact: "High",
    selectedImpact: "High",
    outcome: "Positive",
    selectedOutcome: "Positive",
    likelihood: "Low",
    selectedLikelihood: "Low",
    action: "This is a mock action response",
    AIM: ["Act", "Influence", "Monitor"],
    selectedAIM: "Monitor",
    timeline: "3 Months",
    selectedTimeline: "3 months",
    KPI: "THIS IS A KPI",
    isSelected: true,
  },
  {
    description: "This is a mock response",
    impact: "High",
    selectedImpact: "High",
    outcome: "Positive",
    selectedOutcome: "Positive",
    likelihood: "Low",
    selectedLikelihood: "Low",
    action: "This is a mock action response",
    AIM: ["Act", "Influence", "Monitor"],
    selectedAIM: "Monitor",
    timeline: "3 Months",
    selectedTimeline: "3 months",
    KPI: "THIS IS A KPI",
    isSelected: true
  },
]);

export const intendedConsequenceSuggestions = writable([
  {
    description: "this is a mock response",
    isSelected: true,
  },
  {
    description: "this is a mock response",
    isSelected: true,
  },
  {
    description: "this is a mock response",
    isSelected: true,
  },
  {
    description: "this is a mock response",
    isSelected: true,
  },
  {
    description: "this is a mock response",
    isSelected: true,
  },
]);
