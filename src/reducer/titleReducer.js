const initialState = {
  heading: "",
};

function titleReducer(state = initialState, action) {
  switch (action.type) {
    case "Notes":
      return {
        heading: "Notes",
      };
    case "Reminder":
      return {
        heading: "Reminder",
      };
    case "Label":
      return {
        heading: "Label",
      };
    case "Archive":
      return {
        heading: "Archive",
      };
    case "Trash":
      return {
        heading: "Trash",
      };

    default:
      return state;
  }
}

export default titleReducer;
