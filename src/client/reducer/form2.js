import { GENDER_API_SUCCESS } from '../forms/actions'

const form2 = (state = { genders: [] }, action) => {
  switch (action.type) {
    case GENDER_API_SUCCESS:
      return { ...state, genders: action.payload };
  }
  return state;
};

export default form2;
