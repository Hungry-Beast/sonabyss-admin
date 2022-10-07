import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { prodUrl } from "../../config";
import { React, useEffect, useState } from "react";
import { Backdrop, Button, CardActions, CircularProgress } from "@mui/material";

const Single1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [eventList, setEventList] = useState([]);

    let url = prodUrl + location.pathname;
    var myHeaders = new Headers();
    const { authToken } = JSON.parse(localStorage.getItem("user"));
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    // var formdata = new FormData();
    useEffect(() => {
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setEventList(result);
                setLoading(false);
            })
            .catch((error) => console.log("error", error));

    }, [url]);

    return (
        <div className='single'>
            <div className="side">
                <Sidebar />

            </div>
            <div className="right">

                <Navbar />
                <div className="main">
                    {!loading ? (eventList.length ? eventList.map((ele, i) => {
                        return (
                            <div className="card" key={i}>

                                <h1 className="title">Information</h1>
                                <div className="item">
                                    <img src={ele.image} alt="" className="itemImg" />
                                    <div className="details">
                                        <h1 className="itemTitle">{ele.name}</h1>
                                        <div className="detailItem">
                                            <span className="itemKey">Description:</span>
                                            <span className="itemValue">{ele.desc}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Date:</span>
                                            <span className="itemValue">{ele.date}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Time:</span>
                                            <span className="itemValue">{ele.time}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Club Name:</span>
                                            <span className="itemValue">{ele.clubName}</span>
                                        </div>
                                        <CardActions>
                                            <Button onClick={() => navigate(`/registration/${ele.id}`, { state: ele })} sx={{ color: '#6439ff', borderColor: '#6439ff' }} variant="outlined">Participants</Button>
                                        </CardActions>
                                    </div>
                                </div>
                            </div>

                        )
                    }) : (<h1 style={{ textAlign: 'center', width: "100%", margin: '5rem' }}>No Events Added Yet</h1>)) : <Backdrop
                        sx={{ color: "#7451f8", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    // onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>}
                </div>
            </div>
        </div>
    )

}

export default Single1