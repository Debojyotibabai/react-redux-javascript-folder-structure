import axios from "axios";
import { constant } from "../app/constants";

const http = axios.create({
  baseURL: constant.BASE_URL,
});

http.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }
  return request;
});

export const fetchGetRequest = (endpoint, extraConfig = {}) => {
  return http.get(endpoint, { ...extraConfig });
};

export const fetchPostRequest = (endpoint, payload, extraConfig = {}) => {
  return http.post(endpoint, payload, { ...extraConfig }).catch((error) => {
    return Promise.reject(error.response);
  });
};

export const fetchMultipartPostRequest = (
  endpoint,
  payload,
  extraConfig = {}
) => {
  return http
    .post(endpoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...extraConfig,
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export const fetchPutRequest = (endpoint, payload, extraConfig = {}) => {
  return http.put(endpoint, payload, { ...extraConfig }).catch((error) => {
    return Promise.reject(error.response);
  });
};

export const fetchMultipartPutRequest = async (
  endpoint,
  payload,
  extraConfig = {}
) => {
  try {
    return await http.put(endpoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...extraConfig,
    });
  } catch (error) {
    return error.response;
  }
};

export const fetchPatchRequest = (endpoint, payload, extraConfig = {}) => {
  return http.patch(endpoint, payload, { ...extraConfig });
};

export const fetchMultipartPatchRequest = async (
  endpoint,
  payload,
  extraConfig = {}
) => {
  try {
    return await http.patch(endpoint, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...extraConfig,
    });
  } catch (error) {
    return error.response;
  }
};

export const fetchDeleteRequest = (endpoint, payload, extraConfig = {}) => {
  return http.delete(endpoint, payload, { ...extraConfig }).catch((error) => {
    return Promise.reject(error.response);
  });
};
