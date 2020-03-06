import axios from 'axios';

const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR_CODE';
const NETWORK_ERROR = 'Network Error';

const BASEURL = 'http://127.0.0.1:8000/';

function ApiError({
  code = UNKNOWN_ERROR_CODE,
  message = NETWORK_ERROR,
  status,
  fields,
}) {
  this.name = 'ApiError';
  this.code = code;
  this.message = message;
  this.fields = fields;
  this.status = status;
  this.stack = new Error().stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export const api = axios.create({
  baseURL: BASEURL,
  headers: {
    'content-type': 'application/json',
  },
});

async function request({ method = 'get', url, params, data, cancelToken }) {
  try {
    const response = await api.request({
      method,
      url,
      params,
      data,
      cancelToken,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 405) {
        // don't think 405 is an error. it's for logout request.
        return {};
      }
      if (error.response.data) {
        throw new ApiError(error.response.data);
      }
      throw new ApiError({ code: error.response.status });
    }
    throw new ApiError();
  }
}

export function get(url, params, cancelToken) {
  return request({
    method: 'get',
    url,
    params,
    cancelToken,
  });
}

export function post(url, data, cancelToken) {
  return request({
    method: 'post',
    url,
    data,
    cancelToken,
  });
}

export function put(url, data, cancelToken) {
  return request({
    method: 'put',
    url,
    data,
    cancelToken,
  });
}

export function patch(url, data, cancelToken) {
  return request({
    method: 'patch',
    url,
    data,
    cancelToken,
  });
}

export function remove(url, data, cancelToken) {
  return request({
    method: 'delete',
    url,
    data,
    cancelToken,
  });
}
