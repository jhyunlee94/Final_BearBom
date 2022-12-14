import React, { useEffect, useState } from "react";
import "./profilepicture.scss";
import defaultProfilePicture from "../../images/defaultProfilePicture.png";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { useDispatch } from "react-redux";
import { onIncrease } from "../reduxStore/reduxStore";

const ProfilePicture = ({ userData, updateUserInfo, setUpdateUserInfo }) => {
  const dispatch = useDispatch();
  const saveFileImage = (e) => {
    if (window.confirm("프로필 사진을 변경 하시겠습니까?")) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      axios({
        url: API_BASE_URL + "/api/mypage/updateUserPhoto",
        method: "POST",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          setUpdateUserInfo(updateUserInfo + 1);
          dispatch(onIncrease());
        })
        .catch((e) => {
          console.log(e);
          alert("프로필 사진 변경에 실패하였습니다.");
        });
    }
  };

  return (
    <>
      {userData ? (
        <div className="profilePicture">
          <div className="wrapper1">
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
