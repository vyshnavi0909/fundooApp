import Axios from "./axiosServices";

const axiosServices = new Axios();
const baseURL =  "http://fundoonotes.incubation.bridgelabz.com/api/";
const config = {
    headers: {
        'Content-Type': "application/json",
        "x-access-token": localStorage.getItem("token")
    }
}

class UserServices {

    SignUp = (data) => {
        return axiosServices.postMethod(`${baseURL}user/userSignUp`,data,config);
    }

    SignIn = (data) => {
        return axiosServices.postMethod(`${baseURL}user/login`, data, config);
    }

    Forgot = (data) =>{
        return axiosServices.postMethod(`${baseURL}user/reset`, data, config);
    }

    Reset = (data) => {
        return axiosServices.postMethod(`${baseURL}user/reset-password`, data, config);
    }

}

export default UserServices;