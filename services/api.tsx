import axios from 'axios';

 function ApiRequest(token?) {
  const request = axios.create({baseURL: "http://192.168.0.11:3333", headers: {
  ContentType:"application/json",
  authorization:`Bearer ${token}`}})
  const methodFactory = (method) => async (action, body) => {
    const res = await request[method](action, body);
    return res;
  };
  
  const verbs = ["get", "post", "patch", "delete", "put", "options"];
  verbs.forEach(v => this[v] = methodFactory(v));

 
};

export default ApiRequest;
