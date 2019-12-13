import { HOBBIES_API_SUCCESS } from "../forms/actions";

const form3 = (state = { hobbies: [], data: {} }, action) => {
  switch (action.type) {
    case HOBBIES_API_SUCCESS:
      return { ...state, hobbies: action.payload };
    case "SAVE_FORM_3":
      return { ...state, data: action.payload };
  }
  return state;
};

export default form3;
