const MockFieldService = {
  getField: function () {
    return {
      label: "Sales region",
      required: false,
      choices: [
        "Asia",
        "Australia",
        "Western Europe",
        "North America",
        "Eastern Europe",
        "Latin America",
        "Middle East and Africa",
      ],
      displayAlpha: true,
      default: "North America",
    };
  },
  saveField: async function (payload, setIsLoading) {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Response data:", result.data);
    } catch (err) {
      console.error("Error posting field:", err);
    } finally {
      setIsLoading(false);
    }
  },
};

export default MockFieldService;
