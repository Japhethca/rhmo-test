import queryString from "querystring";
/**
 * @class ApiService
 * @description Contains methods for making asynchronous Http requests
 * @exports ApiService
 */

const BASE_URL = "https://pro-zone.herokuapp.com";

class ApiService {
  static ENDPOINTS = {
    providers: `${BASE_URL}/providers`,
    imageUpload: `${BASE_URL}/upload`,
  };

  /**
   * @method get
   * @description makes a GET request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async get(url, data) {
    const response = await fetch(
      `${url}${data ? `?${queryString.stringify(data)}` : ""}`,
      {
        headers: {
          // This is not meant to be here, just a work around
          Authorization: "Bearer {auth_token}", // replace auth token with the action authentication token
        },
      }
    );
    return response.json();
  }

  /**
   * @method post
   * @description makes a POST request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async post(url, data, headers = {}) {
    const response = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        ...headers,
        // This is not meant to be here, just a work around
        Authorization: "Bearer {auth_token}", // replace auth token with the action authentication token
      },
    });
    return response.json();
  }
}

export default ApiService;
