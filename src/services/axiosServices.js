import axios from "axios";

class AxiosService {
  postMethod = (url, data, header) => {
    return axios.post(url, data, header);
  };

  getMethod = (url, data, header) => {
    return axios.get(url, data, header);
  };

  putMethod = (url, data, header) => {
    return axios.put(url, data, header);
  };
}

export default AxiosService;
