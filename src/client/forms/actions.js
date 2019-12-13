import React from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
import { Toast } from "./common-components";

const PATCH_API_MAP = {
  1: "//www.mocky.io/v2/5d02885a3100005a00ab3048",
  2: "//www.mocky.io/v2/5d0288823100005a00ab3049",
  3: "//www.mocky.io/v2/5d0288b43100003400ab304a"
};

const FULL_FORM_SUBMISSIO = "http://www.mocky.io/v2/5d0288e43100004f4aab304b";

const GENDER_API_ENDPOINT = "//www.mocky.io/v2/5d009a333200007700f9d5cb";
const HOBBIES_API_ENDPOINT = "//www.mocky.io/v2/5d0099b53200000f00f9d5c5";

export const GENDER_API_SUCCESS = "GENDER_API_SUCCESS";
export const HOBBIES_API_SUCCESS = "HOBBIES_API_SUCCESS";

export const fetchGenders = dispatch =>
  Axios.get(GENDER_API_ENDPOINT)
    .then(response => {
      if (response?.data?.status === true) {
        return dispatch({
          type: GENDER_API_SUCCESS,
          payload: response.data.responseData
        });
      }
    })
    .catch(error => error);

export const fetchHobbies = dispatch =>
  Axios.get(HOBBIES_API_ENDPOINT)
    .then(response => {
      if (response?.data?.status === true) {
        return dispatch({
          type: HOBBIES_API_SUCCESS,
          payload: response.data.responseData
        });
      }
    })
    .catch(error => error);

const unmountToast = () =>
  ReactDOM.unmountComponentAtNode(document.querySelector("#toast-container"));

export const patchForm = (formId, data) =>
  Axios.put(PATCH_API_MAP[formId], data).then(response => {
    unmountToast();

    // Responses are not parsable in JSON format
    const isSuccess = response.data.indexOf("true") > -1

    const message = isSuccess
      ? `Form ${formId} submitted`
      : "Error Occured while submitting";

    ReactDOM.render(
      <Toast message={message} onTimeout={unmountToast} error={!isSuccess} />,
      document.querySelector("#toast-container")
    );
    return response;
  });
