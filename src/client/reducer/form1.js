const form1 = (state = { data: {}}, action) => {
  switch (action.type) {
    case "SAVE_FORM_1":
      return { ...state, data: action.payload };
  }
  return state;
};

export default form1;
