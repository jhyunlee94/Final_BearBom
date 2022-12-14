import React, { useCallback, useEffect, useState } from "react";
import MiniCard from "./MiniCard";
import "../css/mainpage.css";
import "../css/mainpage.scss";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import LikeButton from "../ModuleComponents/LikeButton";
import "react-multi-carousel/lib/styles.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import { Link, useNavigate, Navigate } from "react-router-dom";
import videoTest from "../assets/Potters.mp4";
import dataTest from "./dataTest.js";
import Card from "./Card";
import Card2 from "./Card2";

const Mainpage = () => {
  const [course, setCourse] = useState([]);
  const [endday, setEndday] = useState([]);
  const [averageRating, setAverageRating] = useState("");

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const initialArray = [
    `지금 베어봄과 함께
    일상을 취미로 채워보세요!`,
    `모든 일상이 즐겁기만 할 수는 없죠.
    그렇지만 우리는,`,
    `일상 틈틈이, 즐거운 일들을
    채워나갈 수 있어요!`,
  ]; // 원본 배열

  const [text, setText] = useState([]);
  useEffect(() => {
    let i = 0;
    setText(initialArray.filter((item, index) => index === i));
    setInterval(() => {
      i++;
      setText(initialArray.filter((item, index) => index === i));
      if (initialArray.length - 1 === i) {
        i = -1;
      }
    }, 3000);
    //데이터불러오는 axios
    axios({
      method: "get",
      url: API_BASE_URL + "/api/main/getCourseList",
    }).then((response) => {
      console.log(response.data);

      setCourse(response.data.getCourseList);
    });

    axios({
      method: "get",
      url: API_BASE_URL + "/api/main/getCourseEndDateList",
    }).then((response) => {
      console.log(response.data);
      setEndday(response.data.getCourseEndDateList);
    });
  }, []);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const navigate = useNavigate();

  const onClickClassRegist = () => {
    navigate("/course/registration");
  };
  const [dataa, setDataa] = useState(dataTest);

  const [courseInfo, setCourseInfo] = useState(course);

  const get_local = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <div className="top-vod-banner-container">
        <video
          className="vod"
          id="mainBannerVideo"
          preload="metadata"
          controlsList="nodownload"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src={videoTest} type="video/mp4" />
        </video>
        <div className="main-title-area">
          <div className="msg-wrapper">
            <div className="anim-msg msg-3 visible">
              <p className="sub-msg visible">
                <strong>{text}</strong>
              </p>
            </div>
          </div>
          <div className="chevronContainer">
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
          </div>
        </div>
      </div>

      <div className="lasted">
        <div className="inner">
          <p style={{ marginTop: "10px" }}>최근 본 상품</p>

          {get_local !== null
            ? get_local.map((a, i) => {
                return (
                  <div key={i}>
                    <Link
                      to={`/course/${a.courseIdx}`}
                      state={{ courseInfo: a }}
                      style={{ textDecoration: "none", color: "#ff5862" }}
                    >
                      <p
                        className="get-local"
                        style={{ marginTop: "20px", display: "block" }}
                      >
                        {a.courseNm + "           "}
                        <img
                          className="img_test"
                          src={`http://localhost:8080/upload/${a.courseThumbnailNm}`}
                          style={{ width: "50px", height: "50px" }}
                          alt="test"
                        ></img>
                      </p>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <main id="wrapper" className="main-contents">
        <div className="list-box h-2-box-panel main-wrapper-child-1">
          <div>
            <h1>
              베어봄에서
              <br />
              당신의 취미를 찾아보세요
            </h1>
            <div className="appstore-btn-list-area"></div>
          </div>
          <div>
            <h1>
              솜씨를 뽐내주실 작가님,
              <br />
              여기 계시네요!
            </h1>
            <div className="class-open-page-move-area">
              <Button
                className="class-open-page-move-btn"
                variant="light"
                onClick={onClickClassRegist}
              >
                클래스 오픈하기
              </Button>
            </div>
          </div>
        </div>
        <div className="list-box favorite-class-area">
          <div className="list-header">
            <h2>베어봄이 검증한 인기클래스!</h2>
          </div>
          <div>
            <CarouselContainer>
              <div className="favorite-list">
                <div style={{ width: "100%", margin: "0 auto" }}>
                  <Carousel responsive={responsive}>
                    {course.map((data, i) => (
                      // 여기서 {}말고 ()로 하면 return 안해도 됨
                      //   이게 props 넣는거
                      <div key={i}>
                        <Card course={data} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </CarouselContainer>
          </div>
        </div>

        <div className="list-box new-class-area">
          <div className="list-header">
            {/* <h2>오늘 오픈 했어요!</h2> */}
            <h2>마감임박! 단 하루 남은 클래스</h2>
          </div>
          <div>
            <CarouselContainer>
              <div className="favorite-list">
                <div style={{ width: "100%", margin: "0 auto" }}>
                  <Carousel responsive={responsive}>
                    {endday.map((data, i) => (
                      <div key={i}>
                        <Card2 endday={data} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </CarouselContainer>
          </div>
        </div>
      </main>
    </>
  );
};

export default Mainpage;

const CarouselContainer = styled.div``;
