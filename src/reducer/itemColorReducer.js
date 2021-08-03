const initialState = {
  ListItemColor: "#ffffff",
  Active: "#feefc3",
};

function itemColorReducer(state = initialState, action) {
  switch (action.type) {
    case "Notes":
      return {
        ListItemColor: "#ffffff",
        Active: "#feefc3",
      };
    case "Reminder":
      return {
        ListItemColor: "#ffffff",
        Active: "#feefc3",
      };
    case "Label":
      return {
        ListItemColor: "#ffffff",
        Active: "#feefc3",
      };
    case "Archive":
      return {
        ListItemColor: "#ffffff",
        Active: "#feefc3",
      };
    case "Trash":
      return {
        ListItemColor: "#ffffff",
        Active: "#feefc3",
      };

    default:
      return state;
  }
}

export default itemColorReducer;
