import axios from "axios";

class AxiosService {
  postMethod = (url, data, header) => {
    return axios.post(url, data, header);
  };

  getMethod = (url, header) => {
    return axios.get(url, header);
  };

  deleteMethod = (url, header) => {
    return axios.delete(url, header);
  };
}

export default AxiosService;
