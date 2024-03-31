import "./dashboard.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { useEffect, useState } from "react";
import { prodUrl } from "../../config";
import "jspdf-autotable";
import { Backdrop, CircularProgress } from "@mui/material";
const Dashboard = () => {
    const [newData, setNewData] = useState([]);
    const [loading, setLoading] = useState(true);
    var myHeaders = new Headers();
    const { authToken } = JSON.parse(localStorage.getItem("user"));
    myHeaders.append("Authorization", `Bearer ${authToken}`);


    myHeaders.append("Authorization", `Bearer ${authToken}`);
    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    // let event = location.state;
    useEffect(() => {
        const update = () => {
            fetch(`${prodUrl}/auth/getalluser`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setNewData(data.map((e, i) => ({ ...e, id: i + 1 })));
                    setLoading(false);
                })
                .catch((error) => console.log("error", error));
        };
        update();
    }, []);

    return !loading ? (
        <div className="datatable">
            <div className="datatableTitle">
                <span style={{ fontWeight: "bold" }}>
                    Registered Users
                </span>
                {/* <Button onClick={exportPDF} className="link">
                    Download PDF
                </Button> */}
            </div>
            <DataGrid
                className="datagrid"
                rows={newData}
                columns={userColumns}
                pageSize={15}
                rowsPerPageOptions={[15]}
            />
        </div>
    ) : (
        <Backdrop
            sx={{ color: "#7451f8", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Dashboard