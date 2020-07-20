import React from 'react';
import axios from 'axios'

//const { environment: { API_URL } } = window

export const API_URL = 'http://localhost:8080/'

class Service {
  get(url) {
	 const api = API_URL + url
	 return axios.get(api)
  }

  post(url, params) {
	 const api = API_URL + url
	 return axios.post(api, params)
 }
 
 getApiRoot() {
	 return API_URL
 }
}

const serviceInstance = new Service();
Object.freeze(serviceInstance);

export default serviceInstance
