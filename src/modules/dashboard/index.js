import { useEffect, useState } from "react";
import DashboardService from "./service";
import DashboardView from "./view";

const defaultState = {
  title: "Dashboard Page",
  users: [],
};
const Dashboard = () => {
  const [state, setState] = useState(defaultState);

  const fetchUsers = async () => {
    const { data, error } = await DashboardService.getUsers();

    console.log(data)
    if (error) {
      return alert("Error: " + error)
    }
    setState(prevState => ({
      ...prevState,
      users: data,
    }))
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(state.users)
  return (
    <DashboardView
      title={state.title}
      users={state.users}
    />
  );
};

export default Dashboard;
