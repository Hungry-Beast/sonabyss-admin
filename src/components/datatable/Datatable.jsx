import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { prodUrl } from "../../config";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Backdrop, Button, CircularProgress } from "@mui/material";

const Datatable = () => {
  // const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  var myHeaders = new Headers();
  const { authToken } = JSON.parse(localStorage.getItem("user"));
  myHeaders.append("Authorization", `Bearer ${authToken}`);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Event Name::${newData[0].eventName}`;
    const headers = [["NAME", "RegNo", "Phone No"]];

    const data = newData.map((elt) => [elt.name, elt.regNo, elt.phoneNo]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(`${newData[0].eventName}.pdf`);
  };

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${authToken}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let url = prodUrl + location.pathname;
  let event = location.state;
  useEffect(() => {
    const update = () => {
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setNewData(data.map((e, i) => ({ ...e, id: i + 1 })));
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    };
    update();
  }, [url]);

  return !loading ? (
    <div className="datatable">
      <div className="datatableTitle">
        <span style={{ fontWeight: "bold" }}>
          Participants of {event?.name}
        </span>
        <Button onClick={exportPDF} className="link">
          Download PDF
        </Button>
      </div>
      <DataGrid
        className="datagrid"
        rows={newData}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  ) : (
    <Backdrop
      sx={{ color: "#7451f8", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Datatable;
