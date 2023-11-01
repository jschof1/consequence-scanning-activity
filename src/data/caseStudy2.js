let caseStudy2 = {
  title: "The supply and demand of taxi services",
  selectedFile: null,
  selectedStudy: null,
  objectives:
    "A taxi firm uses data about their uses to provide personalised pricing and create a more efficient transport market where supply matches demand. The automatic pricing algorithm measures the demand in a localised area and increases the price of a fare to encourage more drivers onto the road. The increases in prices are temporary and applied on top of the standard fare (for example a 2x multiplier means the dynamic fare is twice that of the standard fare). To determine the dynamic pricing model the taxi firm analyses how much people are willing to pay for a certain route and uses factors such as if your phone battery is getting low, the speed which you type (including the amount of typos), walking speed and the way in which you hold your phone on any given day. These factors, coupled with the data about the number of rides requested, taken, cost, location and timing are all analysed together to build a predictive model.\n\nObjective: Dynamic pricing is intended to provide a supply and demand model that provides an effective service for customers, whilst maintaining efficient business practices.",
  stakeholders: [
    { text: "Product Team", type: "Internal" },
    { text: "Development Team", type: "Internal" },
    { text: "Data Team", type: "Internal" },
    { text: "Exec", type: "Internal" },
    { text: "Customer Services", type: "Internal" },
    { text: "Drivers", type: "External" },
    { text: "Customers", type: "External" },
    { text: "Business Customers", type: "External" },
    { text: "General Public/Other transport users", type: "External" },
  ],
  dataUsed:
    "Data includes (amongst others): Journeys made, Cost of journeys, Distances covered, Locations, Phone data (battery, typing, etc), Customer details, Driver Details, Hours worked, Journeys delivered",
  intendedConsequences: [
    {
      description:
        "Increase overall profits for the firm through efficiencies in employment and service offering",
    },
    {
      description:
        "Improved access to taxi services by being more elastic and available during a 24/7 operation",
    },
    {
      description:
        "Support long-term effective practices by identifying peaks in service requests and usage",
    },
    {
      description:
        "Develop a better service for users by offering more choice and meeting dynamic demand",
    },
    {
      description:
        "Reduced supply during low usage periods, reducing carbon footprint of idling",
    },
    {
      description:
        "Increased flexibility for taxi drivers and benefits in workload management",
    },
  ],
  unintendedConsequences: [
    {
      description:
        "Increase in pricing disparities in communities not appropriately serviced by public transport",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement a cap on surge pricing to ensure that, despite rapid increases in demand, service users are not unfairly targeted by price rises due to events out of their control.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "",
        selectedDate: "",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "User journeys are tracked and potentially identifiable, with risk to personal safety",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement anonymisation methods to data collected about people and their journeys. Randomisation and generalisation methods can ensure that data utility is maintained, and suppression of high risk data points can be used to maintain privacy.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "",
        selectedDate: "",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Reduced services for communities in areas deemed “low demand” where drivers are encouraged to accept fares in high-demand areas",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement standardisation of direct earnings for drivers as a percentage of the base fare where drivers can earn improved fares in areas that are in low demand to support fair coverage of service. Similar processes can be applied to time of day to maintain purported flexibility in driver work/life balance.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "Product Team",
        selectedDate: "01/02/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Unintended increase in pricing in cases of extreme events (e.g. local emergencies)",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement a cap on surge pricing to ensure that, despite rapid increases in demand, service users are not unfairly targeted by price rises due to events out of their control.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "Product Team",
        selectedDate: "01/02/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Increase in vehicles on the road, increase the traffic congestion and has an environmental impact",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement data collection measures for air quality and environment with incentives and appropriate support for drivers to use more environmentally friendly vehicles.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "Data Team",
        selectedDate: "01/03/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Increase in data collection and use has an increase in the risks associated with storing and processing the data",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement anonymisation methods to data collected about people and their journeys. Randomisation and generalisation methods can ensure that data utility is maintained, and suppression of high risk data points can be used to maintain privacy.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "Data Team",
        selectedDate: "14/01/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
    {
      description:
        "Disparities in driver experiences based on flexibility, earnings and support. Drivers are encouraged to seek high fare periods which impacts work-life balance",
      impact: ["High", "Medium", "Low"],
      selectedImpact: "",
      outcome: ["Positive", "Negative"],
      selectedOutcome: "",
      likelihood: ["High", "Medium", "Low"],
      selectedLikelihood: "",
      action: {
        description:
          "Implement standardisation of direct earnings for drivers as a percentage of the base fare where drivers can earn improved fares in areas that are in low demand to support fair coverage of service. Similar processes can be applied to time of day to maintain purported flexibility in driver work/life balance.",
        date: ["3 months", "6 months", "1 year", "2 years"],
        stakeholder: "Product Team",
        selectedDate: "01/02/2024",
      },
      AIM: ["Act", "Influence", "Monitor"],
      selectedAIM: "",
      KPI: "",
    },
  ],
};

export default caseStudy2;
