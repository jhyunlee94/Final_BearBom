import React, { useEffect, useState } from "react";
import "./profilepicture.scss";
import adminProfileImage from "../../images/adminProfileImage.png";
import defaultProfilePicture from "../../images/defaultProfilePicture.png";
import { onRequest } from "../../ModuleComponents/UsefulFunctions/ApiService";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

const ProfilePicture = ({ userData }) => {
  const [fileImage, setFileImage] = useState(defaultProfilePicture);
  const [fileData, setFileData] = useState();
  const [formData, setFormData] = useState({});
  console.log(userData);
  const saveFileImage = (e) => {
    if (window.confirm("프로필 사진을 변경 하시겠습니까?")) {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.files && e.target.files.length > 0) {
      setFileData(e.target.files[0]);
      axios({
        url: API_BASE_URL + "/api/mypage/updateUserPhoto",
        method: "POST",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {})
        .catch((e) => {
          console.log(e);
          alert("프로필 사진 변경에 실패하였습니다.");
        });
    }

    if (window.confirm("프로필 사진을 변경 하시겠습니까?")) {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // useEffect(() => {
  //   setFormData({ image: fileData });
  // }, [fileImage]);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: API_BASE_URL + "/api/mypage/getUser",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
  //     },
  //   }).then(res => {

  //   })
  // }, []);

  return (
    <>
      {userData ? (
        <div className="profilePicture">
          <div className="wrapper1">
            <button
              onClick={() => {
                console.log(userData);
              }}
            >
              onclick
            </button>
            <img
              className="picture"
              alt="pp"
              src={
                userData.userPhotoNewNm
                  ? `${API_BASE_URL}/upload/${userData.userPhotoNewNm}`
                  : userData.userPhotoOrgNm
                  ? `${API_BASE_URL}/upload/${userData.userPhotoOrgNm}`
                  : defaultProfilePicture
              }
            />
            <input
              accept="image/*"
              id="secretInput"
              type="file"
              onChange={saveFileImage}
            />
            <label htmlFor="secretInput" id="label" />
          </div>
        </div>
      ) : (
        <div>데이터를 불러오지 못하였습니다.</div>
      )}
    </>
  );
};

export default ProfilePicture;
