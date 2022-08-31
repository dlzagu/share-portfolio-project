import axios from "axios";
import Storage from "./storage/storage";

const serverUrl = process.env.REACT_APP_SERVERURL;

async function get(endpoint, params = "") {
  return axios.get(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${Storage.getItem()}`,
    },
  });
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);
  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getItem()}`,
    },
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);
  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Storage.getItem()}`,
    },
  });
}

async function del(endpoint, params = "") {
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${Storage.getItem()}`,
    },
  });
}

async function imageUpload(endpoint, formData) {
  return axios.put(serverUrl + endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Storage.getItem()}`,
    },
  });
}

export { get, post, put, del as delete, imageUpload };
