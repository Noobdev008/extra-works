import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "../shared/components";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import Dashboard from "./dashboard";
import SignIn from "./sign-in";
import Settings from "./settings";
import PageNotFound from "./page-not-found";

const App = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const LIST_ITEMS = [
    {
      icon: <GridViewIcon />,
      to: "/dashboard",
      label: "Dashboard"
    },
    {
      icon: <SettingsIcon />,
      to: "/settings",
      label: "Settings"
    },
  ];
  return (
    <>
      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      )}
      {isLoggedIn && (
        <DashboardLayout listItems={LIST_ITEMS}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </DashboardLayout>
      )}
    </>
  );
};

export default App;
