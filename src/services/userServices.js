import Axios from "./axiosServices";

const axiosServices = new Axios();
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api/";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
};

class UserServices {
  SignUp = (data) => {
    return axiosServices.postMethod(`${baseURL}user/userSignUp`, data, config);
  };

  SignIn = (data) => {
    return axiosServices.postMethod(`${baseURL}user/login`, data, config);
  };

  Forgot = (data) => {
    return axiosServices.postMethod(`${baseURL}user/reset`, data, config);
  };

  Reset = (data) => {
    return axiosServices.postMethod(
      `${baseURL}user/reset-password`,
      data,
      config
    );
  };

  AddANote = (data) => {
    let configFile = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    };
    return axiosServices.postMethod(
      `${baseURL}notes/addNotes`,
      data,
      configFile
    );
  };

  GetNotesList = () => {
    return axiosServices.getMethod(`${baseURL}notes/getNotesList`, config);
  };

  DeleteNote = (data) => {
    return axiosServices.postMethod(`${baseURL}notes/trashNotes`, data, config);
  };

  ArchiveNote = (data) => {
    return axiosServices.postMethod(
      `${baseURL}notes/archiveNotes`,
      data,
      config
    );
  };

  ChangeColor = (data) => {
    return axiosServices.postMethod(
      `${baseURL}notes/changesColorNotes`,
      data,
      config
    );
  };

  UpdateNotes = (data) => {
    return axiosServices.postMethod(
      `${baseURL}notes/updateNotes`,
      data,
      config
    );
  };

  GetArchiveNotesList = () => {
    return axiosServices.getMethod(
      `${baseURL}notes/getArchiveNotesList`,
      config
    );
  };

  GetTrashNotesList = () => {
    return axiosServices.getMethod(`${baseURL}notes/getTrashNotesList`, config);
  };

  SearchUserList = (data) => {
    return axiosServices.postMethod(
      `${baseURL}user/searchUserList`,
      data,
      config
    );
  };

  AddCollaborator = (id, data) => {
    return axiosServices.postMethod(
      `${baseURL}notes/${id}/AddcollaboratorsNotes`,
      data,
      config
    );
  };
}

export default UserServices;
