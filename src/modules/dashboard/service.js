import { http, responseFormatter } from "../../utils";

const getUsers = (query) => {
  return responseFormatter(
    http.get(`/users/${query || ""}`, {
      setAuthHeader: false,
    })
  );
};

const DashboardService = {
    getUsers,
};

export default DashboardService;
