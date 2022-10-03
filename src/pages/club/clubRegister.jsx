import React from "react";
import styled from "styled-components";
import { Paper, TextField, Button } from "@mui/material";
import { user } from "../../localStore";
import { localUrl, prodUrl } from "../../config";

const ClubForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 10em 5em;
`;

const ClubPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: red;

  padding: 2em 3em;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 10%;
`;

const ClubInput = styled(TextField)`
  margin: 20px;
`;

const ChoosePoster = styled.input`
  margin: 25px 0;
`;

const ClubDescription = styled(TextField)`
  margin-bottom: 25px !important;
  border-radius: 5px !important;
`;

const ClubButton = styled(Button)``;

const CreateClub = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user.authToken);

    myHeaders.append("Content-Type", "application/json");
    console.log(e.target.poster.files);
    var formdata = new FormData();
    formdata.append("file", e.target.poster.files[0]);
    formdata.append("name", e.target.clubname.value);
    formdata.append("desc", e.target.desc.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(prodUrl + "/clubs", requestOptions)
      // fetch(localUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // localStorage.setItem("clubId", JSON.stringify(result));
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <ClubForm onSubmit={handleSubmit}>
      <ClubPaper>
        <Heading>Club Registration</Heading>
        <ClubInput
          name="clubname"
          label="Club Name"
          variant="outlined"
          required
        />
        <ChoosePoster name="poster" type="file" accept="image/*" />
        <ClubDescription multiline rows={5} name="desc" label="Desc ..." />
        <ClubButton type="submit" variant="contained">
          Submit
        </ClubButton>
      </ClubPaper>
    </ClubForm>
  );
};

export default CreateClub;
