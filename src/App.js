import "./App.css";
import NewAccount from "./page/new-account/NewAccount";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./page/sign-in/SignIn";
import ForgotPassword from "./page/forgot-password/ForgotPassword";
import ResetPassword from "./page/reset-password/ResetPassword";
import DashBoard from "./page/dashboard/Dashboard";
import Archive from "./components/archive/Archive";
import Trash from "./components/trash/Trash";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={NewAccount}></Route>
        <Route exact path="/sign-in" component={SignIn}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/resetpassword" component={ResetPassword}></Route>
        <ProtectedRoute
          exact
          path="/dashboard/"
          component={DashBoard}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/dashboard/archive"
          component={Archive}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/dashboard/trash"
          component={Trash}
        ></ProtectedRoute>
      </div>
    </Router>
  );
}

export default App;
