import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const KakaoAPI = ({ formData, saveFormData }) => {
  /////////////////////////////////////////////////////////
  //폼데이터 생성부분
  const [address, setAddress] = useState();
  //const [addressDef, setAddressDef] = useState();
  const [addressEx, setAddressEx] = useState();
  const [zipcode, setZipcode] = useState();

  const [check, setCheck] = useState(false);

  const [formObj, setFormObj] = useState({});
  const [addressDef, setAddressDef] = useState();
  const zipcodeRef = useRef();
  //const addressDefRef = useRef()
  const addressExRef = useRef();
  const addressRef = useRef();
  useEffect(() => {
    saveFormData(formObj);
  }, [formObj]);

  //  useEffect(() => {

  //  }, [address]);

  useEffect(() => {
    setFormObj({
      ...formObj,
      courseAddressDef: addressDef,
      courseAddress: addressRef.current.value,
      courseAddressEx: addressExRef.current.value,
      courseZipcode: zipcodeRef.current.value,
    });
    // setFormObj({...formObj, "address": addressRef.current.value})
    // setFormObj({...formObj, "addressEx": addressExRef.current.value})
    // setFormObj({...formObj, "zipcode": zipcodeRef.current.value})
  }, [addressDef]);

  useEffect(() => {
    setFormObj({ ...formObj, courseAddress: address });
  }, [address]);

  useEffect(() => {
    setFormObj({ ...formObj, courseAddressEx: addressEx });
  }, [addressEx]);

  useEffect(() => {
    setFormObj({ ...formObj, courseZipcode: zipcode });
  }, [zipcode]);

  useEffect(() => {
    setAddressDef(formData.courseAddressDef);
    if (formData.courseZipcode) {
      const $zipcode = document.querySelector(".zipcode");
      $zipcode.value = formData.courseZipcode;
    }

    if (formData.courseAddress) {
      const $zipcode = document.querySelector(".addressLong");
      $zipcode.value = formData.courseAddress;
    }

    if (formData.courseAddressEx) {
      const $zipcode = document.querySelector(".addressExtra");
      $zipcode.value = formData.courseAddressEx;
    }
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  const onCompletePost = (data) => {
    setCheck(false);
    // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    var addr = ""; // 주소 변수
    var extraAddr = ""; // 참고항목 변수

    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
    if (data.userSelectedType === "R") {
      // 사용자가 도로명 주소를 선택했을 경우
      addr = data.roadAddress;
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      addr = data.jibunAddress;
    }

    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
    if (data.userSelectedType === "R") {
      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddr !== "") {
        extraAddr = " (" + extraAddr + ")";
      }
      // 조합된 참고항목을 해당 필드에 넣는다.
      document.getElementById("sample3_extraAddress").value = extraAddr;
      setAddressEx(extraAddr);
    } else {
      document.getElementById("sample3_extraAddress").value = "";
      setAddressEx("");
    }

    // 우편번호와 주소 정보를 해당 필드에 넣는다.
    document.getElementById("sample3_postcode").value = data.zonecode;
    setZipcode(data.zonecode);
    document.getElementById("sample3_address").value = addr;
    setAddress(addr);
    // 커서를 상세주소 필드로 이동한다.
    document.getElementById("sample3_detailAddress").focus();

    const $button = document.querySelector(".postCodeDiv");
    $button.style.display = "none";
  };
  /////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div>
        <input
          type="text"
          className="addressInput zipcode"
          id="sample3_postcode"
          placeholder="우편번호"
          ref={zipcodeRef}
        />
        <Button
          variant="outlined"
          color="success"
          size="large"
          style={{
            marginLeft: 10,
            background: "#dbd7d3",
            height: 30,
            width: 100,
            fontSize: 13,
          }}
          type="button"
          onClick={() => setCheck(true)}
        >
          주소찾기
        </Button>

        <br />
        <input
          type="text"
          className="addressLongInput addressLong"
          id="sample3_address"
          placeholder="주소"
          ref={addressRef}
        />
        <br />
        <input
          type="text"
          className="addressInput"
          id="sample3_detailAddress"
          placeholder="상세주소"
          onChange={(e) => setAddressDef(e.target.value)}
          value={addressDef}
          //ref={addressDefRef}
        />
        <input
          type="text"
          className="addressInput addressExtra"
          id="sample3_extraAddress"
          placeholder="참고항목"
          ref={addressExRef}
        />
        {/* <div
          id="wrap addressWrap"
        >
          <img
            src="//t1.daumcdn.net/postcode/resource/images/close.png"
            id="btnFoldWrap"
            onclick={foldDaumPostcode}
            alt="접기 버튼"
          />
        </div> */}
        {check ? (
          <div className="postCodeDiv">
            <DaumPostcode onComplete={onCompletePost} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default KakaoAPI;
