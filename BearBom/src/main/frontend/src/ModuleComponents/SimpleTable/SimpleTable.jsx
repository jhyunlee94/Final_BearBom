import React from "react";
import "./simpletable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const SimpleTable = ({ tableInfo, fetchedData, filterType }) => {
  // 가장 최근 5개 주문 내역만 보여주는 부분
  let recentData = fetchedData.slice(
    fetchedData.length - 5,
    fetchedData.length
  );

  // 5개 내역을 순서대로 출력하는 부분
  let sortedData = recentData.sort((a, b) => {
    return b.orderIdx - a.orderIdx;
  });

  // 테이블에 클래스 추가해주는 함수
  function classMaker(index) {
    return tableInfo[index].prop;
  }

  // 테이블 헤드 반환하는 함수
  const tableHead = (tableInfo) => {
    let tableItem = [];
    for (let i = 0; i < tableInfo.length; i++) {
      tableItem.push(
        <TableCell className={classMaker(i)}>{tableInfo[i].title}</TableCell>
      );
    }
    return tableItem;
  };

  // 테이블 바디 반환하는 함수
  const tableData = (tableInfo, element) => {
    let tableItem = [];
    for (let i = 0; i < tableInfo.length; i++) {
      tableItem.push(
        <TableCell className={classMaker(i)}>
          {element[tableInfo[i].cell]}
        </TableCell>
      );
    }
    return tableItem;
  };
  return (
    <>
      {fetchedData ? (
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
                style={{
                  backgroundColor: "#DDDDDA",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                <TableRow>{tableHead(tableInfo)}</TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((a) => (
                  <TableRow
                    key={a.data1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {tableData(tableInfo, a)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>조회할 내역이 없습니다.</div>
      )}
    </>
  );
};

export default SimpleTable;
