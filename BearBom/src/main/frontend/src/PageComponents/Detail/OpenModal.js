import Modal from "./ReviewModal";
import SubmitRating from "./SubmitRating";
import AutoHeightTextarea from "./AutoHeightTextarea";
import { useState } from "react";

function OpenModal({ addReviewInfo, onWriteReview }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    onWriteReview();
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div className="review-modal-header">
        <h5>
          <b>후기</b>
        </h5>
        <button
          className="reviewmodal-btn"
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
        >
          등록하기
        </button>
      </div>
      {modalOpen ? (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          onWriteReview={onWriteReview}
          open={modalOpen}
          header="후기"
        >
          <div className="modal-span">
            <span>강의는 어떠셨나요?</span>
          </div>
          <div className="modal-position">
            <SubmitRating addReviewInfo={addReviewInfo} />
          </div>
          <AutoHeightTextarea addReviewInfo={addReviewInfo} />
          <div className="regist">
            <button type="button" onClick={handleClick}>
              등록하기
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default OpenModal;
