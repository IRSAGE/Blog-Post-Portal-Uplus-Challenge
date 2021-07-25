export const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;

