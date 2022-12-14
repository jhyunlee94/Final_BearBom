import React, { useEffect, useState } from "react";
import SimpleTable from "../../../ModuleComponents/SimpleTable/SimpleTable";
import axios from "axios";
import { latestTransactionItems } from "../../../customHooks/createItems";
import { API_BASE_URL } from "../../../app-config";

const LatestTransaction = () => {
  let tableInfo = latestTransactionItems;
  const [fetchedData, setFetchedData] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/api/order/allOrderList",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
    }).then((res) => {
      setFetchedData(res.data.getOrderedCourseList);
    });
  }, []);

  return (
    <>
      <div className="listTitle" style={{ width: "100%" }}>
        <h5>
          <strong>최근 결제 내역</strong>
        </h5>

        <br />
        {fetchedData ? (
          <SimpleTable tableInfo={tableInfo} fetchedData={fetchedData} />
        ) : null}
      </div>
    </>
  );
};

export default LatestTransaction;
