import React from 'react';
import axios from 'axios'

const { environment: { API_URL } } = window

class Service {
  get(url) {
	 const api = API_URL + url
	 return axios.get(api)
  }

  post(url, params) {
	 const api = API_URL + url
	 return axios.post(api, params)
 }
}

const serviceInstance = new Service();
Object.freeze(serviceInstance);

export default serviceInstance
