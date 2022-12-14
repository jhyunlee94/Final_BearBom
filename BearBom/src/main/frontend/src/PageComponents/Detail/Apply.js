import Calendar from "./Calendar";
import "../../css/apply.css";
import { useEffect, useState, useRef } from "react";
import LikeButton from "../../ModuleComponents/LikeButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";

function Apply({ courseIdx, course }) {
  const { id } = useParams(); //id를 통해 강의id로 이동
  const [like, setLike] = useState(false);
  const [courseCostChange, setCourseCostChange] = useState("");
  const calRef = useRef(null);
  //결제창으로 이동
  const navigate = useNavigate();

  const onClickBtn = async () => {
    console.log({
      courseIdx: id,
    });
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      alert("신청을 위해 로그인해주세요 :)");
      navigate("/login");
      return;
    }
    await axios({
      method: "post",
      url: API_BASE_URL + "/api/order/orderRegistration",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
      data: { courseIdx: id },
    }).then((response) => {
      console.log(response);
    });
    navigate(`/mypage/payment`);
  };

  //찜하기 데이터 받아오기
  useEffect((e) => {
    const fetchData = async () => {
      const userId = localStorage.getItem("USER_ID");
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        return;
      }

      axios({
        method: "GET",
        url: API_BASE_URL + "/api/like/getLikeList",
        params: { userId: userId, courseIdx: courseIdx },
        //403 에러는 보안관련 에러
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.likeState === "liked") {
            setLike(true);
          } else {
            setLike(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  //금액 3자리마다 , 찍어주기
  useEffect(() => {
    setCourseCostChange((prev) =>
      (course.courseCost + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }, [course]);

  //찜하기를 위한 axios
  const toggleLike = async (e) => {
    // const res = await axios.post(`${API_BASE_URL}/api/like/{id}/insertLike`);
    const userId = localStorage.getItem("USER_ID");
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      alert("찜하기를 위해 로그인해주세요 :)");
      navigate("/login");
      return;
    }
    await axios({
      method: "POST",
      url: `${API_BASE_URL}/api/like/${course.courseIdx}/insertLike`,
      //403 에러는 보안관련 에러
      headers: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
      data: { courseIdx: course.courseIdx, userId: userId },
    })
      .then((response) => {
        console.log(response);
        if (response.data.likeState === "like") {
          setLike(!like);
        } else {
          setLike(!like);
        }
      })
      .catch((error) => {
        console.log(error);
        //불필요한 alert
        // alert("로그인 해주세요 :)");
      });
    // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    // setLike(!like);
  };

  return (
    <>
      <div className="calendar-box1" ref={calRef}>
        <h3>{course.courseNm}</h3>
        <div className="cal-box">
          <Calendar
            stDate={course.courseStDate}
            endDate={course.courseEndDate}
          />
        </div>
        <div className="apply-cost">
          <span>예약 금액 1인:</span>
          <span className="apply-cost-won">
            <b>
              {typeof courseCostChange !== "undefined"
                ? courseCostChange
                : (course.courseCost + "").replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
              원
            </b>
          </span>
        </div>

        <div className="cal-btn-box">
          <button className="cal-wishList">
            <LikeButton like={like} onClick={toggleLike}></LikeButton>찜하기
          </button>

          <button type="button" className="cal-apply" onClick={onClickBtn}>
            신청하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Apply;
