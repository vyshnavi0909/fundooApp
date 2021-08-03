const initialState = {
  active: "",
  nonActive: "",
};

function listColorReducer(state = initialState, action) {
  let type = action.type;
  switch (type) {
    case "Notes":
      return {
        active: "#feefc3",
        nonActive: "#ffffff",
      };
    case "Reminder":
      return {
        active: "#feefc3",
        nonActive: "#ffffff",
      };
    case "Label":
      return {
        active: "#feefc3",
        nonActive: "#ffffff",
      };
    case "Archive":
      return {
        active: "#feefc3",
        nonActive: "#ffffff",
      };
    case "Trash":
      return {
        active: "#feefc3",
        nonActive: "#ffffff",
      };

    default:
      return state;
  }
}

export default listColorReducer;
