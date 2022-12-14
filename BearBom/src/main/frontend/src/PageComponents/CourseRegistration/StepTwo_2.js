import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../css/courseRegistration.css";
import ThumbnailInput from "./RegistrationComponents/ThumbnailInput";
import FileInput from "./RegistrationComponents/FileInput"
import FileInput2 from "./RegistrationComponents/FileInput2"
import FileInput3 from "./RegistrationComponents/FileInput"
import FileInput4 from "./RegistrationComponents/FileInput"
import MultiUploadByKm from "./RegistrationComponents/MultiUploadByKm";
import FourFileInput1 from "./RegistrationComponents/FourFileInput1";
import FourFileInput2 from "./RegistrationComponents/FourFileInput2";
import FourFileInput3 from "./RegistrationComponents/FourFileInput3";
import FourFileInput4 from "./RegistrationComponents/FourFileInput4";

const StepTwo_2 = ({formData, saveFormData}) => {
  const [imageList, setImageList] = useState([]);
  const [formObj, setFormObj] = useState({});

  const changeImages = (file) => {
    if(typeof file !== "undefined") {
      const fileList = [...imageList];
      fileList.push(file);
      setImageList(fileList);
    }
  }

  useEffect(()=> {
    if(imageList.length !== 0)
      setFormObj({...formObj, imageList: imageList});
  }, [imageList]);

  useEffect(() => {
     saveFormData(formObj);
  }, [formObj]);


  return (
    <form id="step_two_2_form">
      <div className="content content1">
        <div className="contentName">Step.2 클래스 소개</div>
        <div className="contentWrap">
          <div className="contentDetail">
            <div className="nameWrap">
              <h5 className="detailName">
                이미지
                <div className="nameUnderbar"></div>
              </h5>
            </div>
            <div className="detailEx">
              <p className="datilNameInfo">
                클래스를 대표하는 썸네일 이미지를 등록해주세요
              </p>
            </div>
            <div className="numCheck">
              <div className="datailLabel">
                <p>대표 이미지 - 썸네일</p>
              </div>
              <div className="inputWrap inputHfix">
                <ThumbnailInput formData={formData} changeImages={changeImages} />
              </div>
              <p className="inputWar">*이미지 등록시 유의사항.</p>
            </div>
            <div className="numCheck">
              <div className="datailLabel">
                <p>추가 이미지 - 클래스에 대한 추가 이미지</p>
              </div>
              <div className="inputMultiFileBox">
                <FourFileInput1 formData={formData} changeImages={changeImages}/>
                <FourFileInput2 formData={formData} changeImages={changeImages}/>
                <FourFileInput3 formData={formData} changeImages={changeImages}/>
                <FourFileInput4 formData={formData} changeImages={changeImages}/>

                {/* <FileInput changeImages={changeImages}/>
                <FileInput2 changeImages={changeImages}/>
                <FileInput3 changeImages={changeImages}/>
                <FileInput4 changeImages={changeImages}/> */}
              </div>
              {/* <div>
                <MultiUploadByKm/>
              </div> */}
              <p className="inputWar">*최대 4장 까지 등록 가능합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default StepTwo_2;
