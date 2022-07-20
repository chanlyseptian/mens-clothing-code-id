import axios from "axios";
import Swal from "sweetalert2";

import base_url from "../helpers/base_url";

const url = base_url + "/banners";

export const getBanners = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_BANNERS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_BANNERS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_BANNERS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getActiveBanners = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "GET_ACTIVE_BANNERS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/active`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "GET_ACTIVE_BANNERS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "GET_ACTIVE_BANNERS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const addBanner = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "ADD_BANNER",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "POST",
      url: `${url}/add`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "ADD_BANNER",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "ADD_BANNER",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const editBanners = (id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: "EDIT_BANNER",
      payload: {
        status: "loading",
        data: "loading",
      },
    });
    axios({
      method: "GET",
      url: `${url}/edit/${id}`,
    })
      .then((response) => {
        // completed
        dispatch({
          type: "EDIT_BANNER",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        // failed
        dispatch({
          type: "EDIT_BANNER",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};
