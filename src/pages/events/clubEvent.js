import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
// import dayjs from 'dayjs/locale/*'

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import styled from "styled-components";
import { prodUrl } from "../../config";
import { user } from "../../localStore";
import { clubs } from "../../data";

import { useForm } from "react-hook-form";

const ChooseFile = styled.input`
  margin-bottom: 10px;
`;
const EventDesc = styled(TextField)`
  margin-bottom: 10px !important;
`;

const ClubSelect = styled(Select)`
  width: 100%;
  /* margin: 1rem 0; */
`;

const ClubEvent = (props) => {
  // Handling DatePicker
  const [date, setDate] = useState("");
  var selectedDate = date.$D + "/" + (date.$M + 1) + "/" + date.$y;
  // console.log(selectedDate);

  // handle timePicker
  const [time, setTime] = useState("");
  const [club, setClub] = useState([]);

  const selecetdTime = {
    Time: time && time.$d.toLocaleTimeString(),
  };
  // console.log(selecetdTime.Time);

  // handle clubname selection
  // const [club, setClub] = useState(null);
  console.log(club);

  const [clubData, setClubData] = useState([]);
  const flatProps = {
    options: clubData.map((option) => option.title),
  };
  const getClub = () => {
    fetch(prodUrl + "/clubs")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        let clubsList = [];
        data.map((club) => {
          clubsList.push({
            label: club.name,
            value: club["_id"],
          });
        });
        setClubData(clubsList);
      });
  };
  useEffect(() => {
    getClub();
  }, []);

  // For Switch
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.authToken);

    var formdata = new FormData();

    formdata.append("date", selectedDate);

    // formdata.append("date", "13-10-2022");
    // formdata.append("time", selecetdTime.Time);
    formdata.append("time", "12:00");
    formdata.append("club", "6322e56fb3ac64c6f9b87b6e");
    formdata.append("clubName", club);
    formdata.append("image", e.target.pic.files[0]);
    formdata.append("desc", e.target.desc.value);
    formdata.append("venue", e.target.venue.value);
    formdata.append("isOpen", checked);
    formdata.append("duration", e.target.duration.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(prodUrl + "/events", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  console.log(club);

  return (
    <div>
      <Typography
        gutterBottom
        variant="h3"
        align="center"
        sx={{ fontFamily: "Roboto" }}
      >
        Club Events
      </Typography>

      <Card sx={{ maxWidth: "450px", margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}></Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ margin: "10px auto" }}
                name="name"
                label="Name"
                placeholder="Enter Name"
                variant="outlined"
                fullWidth
                autoComplete="off"
                // {...register("test", {
                //   required: 'Name is required'
                // })}
              />
            </Grid>

            <Grid item xs={12}>
              {/* <Autocomplete
                sx={{ marginBottom: "10px" }}
                {...flatProps}
                id="controlled-demo"
                value={club}
                onChange={(event, newValue) => {
                  setClub(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Club Name"
                    placeholder="Enter club name"
                    variant="outlined"
                  />
                )}
                fullWidth
                // required
              /> */}
              <FormControl
                fullWidth
                sx={{ minWidth: "100%", margin: "1rem 0" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Club
                </InputLabel>
                <ClubSelect
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // label="Club"
                  label="Club"
                  value={club}
                  onChange={(e) => {
                    setClub(e.target.value);
                  }}
                >
                  {clubData.length !== 0 &&
                    clubData.map((club) => (
                      <MenuItem value={club.value}>{club.label}</MenuItem>
                    ))}
                </ClubSelect>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Pick Date"
                  views={["day", "month", "year"]}
                  placeholder="MM/DD/YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ marginBottom: "10px" }}
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Pick Time"
                  ampm={false}
                  placeholder="Pick time of event"
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ margin: "10px auto" }}
                name="venue"
                label="Venue"
                placeholder="Enter the venue"
                variant="outlined"
                fullWidth
                // required
              />
            </Grid>

            <Grid item xs={12}>
              <EventDesc
                multiline
                rows={5}
                name="desc"
                label="Desc ..."
                fullWidth
                // required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ marginBottom: "10px" }}
                name="duration"
                label="Duration"
                placeholder="Enter the duration of event"
                variant="outlined"
                fullWidth
                // required
              />
            </Grid>

            <Grid item xs={12}>
              <ChooseFile name="pic" type="file" accept="image/*" />
            </Grid>

            <Grid item xs={12}>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClubEvent;
