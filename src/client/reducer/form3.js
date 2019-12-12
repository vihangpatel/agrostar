
import { HOBBIES_API_SUCCESS } from '../forms/actions'

const form3 = (state = { hobbies: []}, action) => {
  switch (action.type) {
    case HOBBIES_API_SUCCESS:
      return { ...state, hobbies: action.payload };
  }
  return state;
};

export default form3;
