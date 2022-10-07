import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";

// import Register from "./pages/club/register";
import Login from "./pages/login/Login";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import { Route } from "@mui/icons-material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateClub from "./pages/club/clubRegister";
import ClubEvent from "./pages/events/clubEvent";
import DownloadPdf from "./pages/events/DownloadPdf";
import { user } from "./localStore";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/">
            <Route path="login" element={<Login />} />
          </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/downloadPdf" element={<DownloadPdf />} />
          <Route path="/createClub" element={<CreateClub />} />
          <Route path="/clubEvent" element={<ClubEvent />} />
          <Route path="/" element={<Navigate to={user?"/home":"/login"} />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
