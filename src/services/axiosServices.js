import axios from "axios";

class AxiosService {
    postMethod = (url, data, header) => {
        return axios.post(url, data, header);
    }

    getMethod = (url, data, header) => {
        return axios.get(url, data, header);
    }
}

export default AxiosService;