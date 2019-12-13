import { GENDER_API_SUCCESS } from "../forms/actions";

const form2 = (state = { genders: [], data: {} }, action) => {
  switch (action.type) {
    case GENDER_API_SUCCESS:
      return { ...state, genders: action.payload };
    case "SAVE_FORM_2":
      return { ...state, data: action.payload };
  }
  return state;
};

export default form2;
