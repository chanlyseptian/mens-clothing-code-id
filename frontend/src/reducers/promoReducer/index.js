const initialState = {
  action: "",
  status: "",
  data: "",

  actionPromo: "",
  statusPromo: "",
  dataPromo: "",
};

const promoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PROMOS":
      return {
        ...state,
        action: "GET_PROMOS",
        status: payload.status,
        data: payload.data,
      };
    case "GET_PROMO_BY_ID":
      return {
        ...state,
        actionPromo: "GET_PROMO_BY_ID",
        statusPromo: payload.status,
        dataPromo: payload.data,
      };
    case "GET_ACTIVE_PROMOS":
      return {
        ...state,
        action: "GET_ACTIVE_PROMOS",
        status: payload.status,
        data: payload.data,
      };
    case "CREATE_PROMO":
      return {
        ...state,
        actionPromo: "CREATE_PROMO",
        statusPromo: payload.status,
        dataPromo: payload.data,
      };
    case "EDIT_PROMO":
      return {
        ...state,
        actionPromo: "EDIT_PROMO",
        statusPromo: payload.status,
        dataPromo: payload.data,
      };
    default:
      return state;
  }
};

export default promoReducer;
