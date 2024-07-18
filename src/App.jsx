import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/PrivateRoute";
import ApiKeyGenerator from "./routes/ApiKeyGenerator";
import ApiDocs from "./routes/ApiDocs";
import Login from "./routes/Login";
import { useState } from "react";
import Register from "./routes/Register";
import ResetPassword from "./routes/Reset";
import ResetRequest from "./routes/ResetRequest";
import DashBoard from "./routes/DashBoard";
import GettingStarted from "./routes/Docs/GettingStarted";
import Setup from "./routes/Docs/Setup";
import SideBar from "./components/SideBar"; // Ensure the path is correct
import NavBar from "./components/NavBar";
import Config from "./routes/Docs/Config";
import Node from "./routes/Docs/Node";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={token}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-request" element={<ResetRequest />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/getting-started" element={<GettingStarted />}>
            <Route path="setup" element={<Setup />} />
            <Route
              path="apikey"
              element={
                <RequireAuth>
                  <ApiKeyGenerator/>
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/config" element={<Config />}>
            <Route path="node" element={<Node />} />
          </Route>
          <Route path="/api-docs" element={<ApiDocs />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/getting-started" element={<GettingStarted />}>
              <Route path="setup" element={<Setup />} />
                <Route path="apikey" element={<RequireAuth><ApiKeyGenerator/></RequireAuth>}/>
            </Route>
            <Route path="/config" element={<Config />}>
              <Route path="node" element={<Node />} />
            </Route>
            <Route path="/api-docs" element={<ApiDocs />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
