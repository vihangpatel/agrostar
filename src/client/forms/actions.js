import Axios from "axios";

const GENDER_API_ENDPOINT = "http://www.mocky.io/v2/5d009a333200007700f9d5cb";
const HOBBIES_API_ENDPOINT = "http://www.mocky.io/v2/5d0099b53200000f00f9d5c5";

export const GENDER_API_SUCCESS = "GENDER_API_SUCCESS";
export const HOBBIES_API_SUCCESS = "HOBBIES_API_SUCCESS";

export const fetchGenders = dispatch =>
  Axios.get(GENDER_API_ENDPOINT)
    .then(response => {
      if (response?.data?.status === true) {
        return dispatch({ type: GENDER_API_SUCCESS, payload: response.data.responseData });
      }
    })
    .catch(error => error);

export const fetchHobbies = dispatch =>
  Axios.get(HOBBIES_API_ENDPOINT)
    .then(response => {
      if (response?.data?.status === true) {
        return dispatch({ type: HOBBIES_API_SUCCESS, payload: response.data.responseData });
      }
    })
    .catch(error => error);
