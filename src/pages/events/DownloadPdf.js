import React, { useEffect, useState } from "react";
import { prodUrl } from "../../config";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DownloadPdf = () => {
  const [getList, setGetList] = useState([]);
  const downloadPDF = async () => {};
  const getEvents = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMzYTkzNTMxYjM4ODQ3YzBkNTRmMWY2In0sImlhdCI6MTY2NDgxMzAyNn0.Fot7rQrW7zeplpQPwZ61RDIxZjH0VzEUppxulJ7QvLo"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://localhost:5000/registration/633a88c402980bb67d7de538",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setGetList(result))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getEvents();
  }, []);

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = `Event Name`;
    const headers = [["NAME", "RegNo", "Phone No"]];

    const data = getList.map((elt) => [elt.name, elt.regNo,elt.phoneNo]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };
  return (
    <div>
      <button onClick={exportPDF}>Click to Download</button>
    </div>
  );
};

export default DownloadPdf;
