import React, { useCallback, useEffect, useState } from "react";
import "../../css/join.css";
import "../../css/join.scss";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";
import { tr } from "date-fns/locale";

const Join = () => {
  // 값 저장
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userRePw, setUserRePw] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNm, setUserNm] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userTel, setUserTel] = useState("");
  const [userAddressDef, setUserAddressDef] = useState("");

  //오류메시지 상태 저장
  const [userIdMessage, setUserIdMessage] = useState("");
  const [userPwMessage, setUserPwMessage] = useState("");
  const [userRePwMessage, setUserRePwMessage] = useState("");
  const [userEmailMessage, setUserEmailMessage] = useState("");
  const [userNmMessage, setUserNmMessage] = useState("");
  const [userNickNameMessage, setUserNickNameMessage] = useState("");
  const [userTelMessage, setUserTelMessage] = useState("");

  //유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isUserPw, setIsUserPw] = useState(false);
  const [isUserRePw, setIsUserRePw] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [isUserNm, setIsUserNm] = useState(false);
  const [isUserNickName, setIsUserNickName] = useState(false);
  const [isUserTel, setIsUserTel] = useState(false);

  //우편번호 및 주소 조회(다음 우편번호 검색 서비스 사용)
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  let [zipCode, setZipCode] = useState("");
  let [fullAddress, setFullAddress] = useState("");

  const handleComplete = (data) => {
    fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      setZipCode(data.zonecode);
      setFullAddress(fullAddress);
    }
  };

  //우편번호 검색 버튼 클릭시
  const handleClick = () => {
    open({ onComplete: handleComplete });
  }; //onComplete - 우편번호 검색이 끝났을 때 사용자가 선택한 정보를 받아올 콜백함수. 주소 데이터의 구성은 Daum 가이드를 참고.

  //유효성
  //아이디
  const onChangeName = useCallback((e) => {
    setUserId(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setUserIdMessage("2글자 이상 10글자 미만으로 입력해주세요.");
      setIsUserId(false);
    } else {
      setUserIdMessage("올바른 이름 형식입니다.");
      setIsUserId(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setUserEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setUserEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요");
      setIsUserEmail(false);
    } else {
      setUserEmailMessage("올바른 이메일 형식이에요 : )");
      setIsUserEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setUserPw(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setUserPwMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsUserPw(false);
    } else {
      setUserPwMessage("올바른 비밀번호 입니다.");
      setIsUserPw(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setUserRePw(passwordConfirmCurrent);

      if (userPw === passwordConfirmCurrent) {
        setUserRePwMessage("비밀번호가 일치합니다.");
        setIsUserRePw(true);
      } else {
        setUserRePwMessage("비밀번호가 일치하지 않습니다.");
        setIsUserRePw(false);
      }
    },
    [userPw]
  );

  //이름
  const onChangeUserNm = useCallback((e) => {
    const userNmRegex = /^[a-z|A-Zㅣ가-힣]+$/;
    const userNmCurrent = e.target.value;

    setUserNm(userNmCurrent);
    if (!userNmRegex.test(userNmCurrent)) {
      setUserNmMessage(
        "한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용불가)"
      );
      setIsUserNm(false);
    } else {
      setUserNmMessage("올바른 이름입니다.");
      setIsUserNm(true);
    }
  });

  //별명
  const onChangeUserNickName = useCallback((e) => {
    const userNickNameCurrent = e.target.value;
    setUserNickName(userNickNameCurrent);
  });

  //전화번호
  const onChangeUserTel = useCallback((e) => {
    const userTelRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const userTelCurrent = e.target.value;
    setUserTel(userTelCurrent);

    if (!userTelRegex.test(userTelCurrent)) {
      setUserTelMessage(" - 을 입력해 주세요.");
      setIsUserTel(false);
    } else {
      setUserTelMessage("올바른 전화번호입니다.");
      setIsUserTel(true);
    }
  });

  //우편번호
  const onChangeZipCode = useCallback((e) => {
    const zipCodeCurrent = e.target.value;
    setZipCode(zipCodeCurrent);
  });

  //주소
  const onChangeFullAddress = useCallback((e) => {
    const fullAddressCurrent = e.target.value;
    setFullAddress(fullAddressCurrent);
  });

  //상세주소
  const onChangeUserAddressDef = useCallback((e) => {
    const userAddressDefCurrent = e.target.value;
    setUserAddressDef(userAddressDefCurrent);
  });

  //유효성 검사 전체 테스트 버튼
  // const handleButtomValid = () => {
  //   if (
  //     !isValidInput ||
  //     !isValidEmail ||
  //     !isValidPassword
  //     !isUserId &&
  //     !isUserPw &&
  //     !isUserRePw &&
  //     !userEmail &&
  //     !userNm &&
  //     !userTel
  //     // !isCheckBoxClicked()
  //     ) {
  //     alert('please fill in the blanks');
  //   };
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form>
          {/* <form noValidate onSubmit={handleSubmit}> */}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "gray" }} />
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userId"
                      label="아이디"
                      name="userId"
                      autoFocus
                      typeName="userId"
                      value={userId}
                      onChange={onChangeName}
                    />
                    {userId.length > 0 && (
                      <span
                        className={`message ${isUserId ? "success" : "error"}`}
                      >
                        {userIdMessage}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Button type="submit" fullWidth sx={{ mt: 1 }}>
                    중복 확인
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userEmail"
                      label="이메일"
                      name="userEmail"
                      autoComplete="email"
                      value={userEmail}
                      onChange={onChangeEmail}
                      typeName="email"
                    />
                    {userEmail.length > 0 && (
                      <span
                        className={`message ${
                          isUserEmail ? "success" : "error"
                        }`}
                      >
                        {userEmailMessage}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <Button type="submit" fullWidth sx={{ mt: 1 }}>
                    이메일 인증
                  </Button>
                </Grid>
                {/* <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      fullWidth
                      id="userEmailCheck"
                      label="이메일 코드 인증"
                      name="userEmailCheck"
                    />
                  </div>
                </Grid> */}
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      name="userPw"
                      label="비밀번호"
                      type="password"
                      id="userPw"
                      value={userPw}
                      onChange={onChangePassword}
                      typeName="userPw"
                    />
                    {userPw.length > 0 && (
                      <span
                        className={`message ${isUserPw ? "success" : "error"}`}
                      >
                        {userPwMessage}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      name="userRePw"
                      label="비밀번호 확인"
                      type="Password"
                      id="userRePw"
                      value={userRePw}
                      onChange={onChangePasswordConfirm}
                      typeName="userRePw"
                    />
                    {userRePw.length > 0 && (
                      <span
                        className={`message ${
                          isUserRePw ? "success" : "error"
                        }`}
                      >
                        {userRePwMessage}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userNm"
                      label="이름"
                      name="userNm"
                      value={userNm}
                      onChange={onChangeUserNm}
                    />
                    {userNm.length > 0 && (
                      <span
                        className={`message ${isUserNm ? "success" : "error"}`}
                      >
                        {userNmMessage}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userNickName"
                      label="별명"
                      name="userNickName"
                      value={userNickName}
                      onChange={onChangeUserNickName}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userTel"
                      label="전화번호"
                      name="userTel"
                      value={userTel}
                      onChange={onChangeUserTel}
                    />
                    {userTel.length > 0 && (
                      <span
                        className={`message ${isUserTel ? "success" : "error"}`}
                      >
                        {userTelMessage}
                      </span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userZipcode"
                      label="우편번호"
                      name="userZipCode"
                      value={zipCode}
                      onChange={onChangeZipCode}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button id="userZipSearch" onClick={handleClick}>
                    우편번호 검색
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      required
                      fullWidth
                      id="userAddress"
                      label="주소"
                      name="userAddress"
                      value={fullAddress}
                      onChange={onChangeFullAddress}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      fullWidth
                      id="userAddressDef"
                      label="상세주소"
                      name="userAddressDef"
                      value={userAddressDef}
                      onChange={onChangeUserAddressDef}
                    />
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                  />
                  <Link href="#">이용약관에</Link> 동의합니다.
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                  />
                  <Link href="#">개인정보 수집·이용에</Link> 동의합니다.
                </Grid>
              </Grid>
              <Button
                // submit은 입력값 그대로 보내기 할 때,
                // button은 입력값이 경우에 따라 다르게 사용 될 때??
                type="submit"
                // type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  !(
                    isUserId &&
                    isUserPw &&
                    isUserRePw &&
                    isUserEmail &&
                    isUserNm &&
                    isUserTel
                  )
                }
              >
                회원가입
              </Button>

              <hr />

              <div className="easy_login_name">간편 로그인</div>
              <br />
              <div class="easy_login">
                <div className="google_login">
                  <a href="https://accounts.google.com/ServiceLogin/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dgo-to-account-button&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
                    <img
                      src={require("../../img/google_login.png")}
                      width="50"
                      height="50"
                      alt="t"
                    ></img>
                  </a>
                </div>
                <div className="kakao_login">
                  <a href="https://accounts.kakao.com/login?continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fcategory%3D166%26locale%3Dko%26service%3D52">
                    <img
                      src={require("../../img/kakao_login.png")}
                      width="50"
                      height="50"
                      alt="t"
                    ></img>
                  </a>
                </div>
                <div className="naver_login">
                  <a href="https://nid.naver.com/nidlogin.login">
                    <img
                      src={require("../../img/naver_login.png")}
                      width="50"
                      height="50"
                      alt="t"
                    ></img>
                  </a>
                </div>
              </div>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Join;
