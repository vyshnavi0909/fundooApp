import "./App.css";
import NewAccount from "./page/new-account/NewAccount";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./page/sign-in/SignIn";
import ForgotPassword from "./page/forgot-password/ForgotPassword";
import ResetPassword from "./page/reset-password/ResetPassword";
import DashBoard from "./page/dashboard/Dashboard";
import Archive from "./components/archive/Archive";
import Trash from "./components/trash/Trash";
import ProtectedRouter from "./components/protected-route/ProtectedRouter";
import AuthRouter from "./components/auth-router/AuthRouter";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={NewAccount}></Route>
        <AuthRouter exact path="/sign-in" component={SignIn}></AuthRouter>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/resetpassword" component={ResetPassword}></Route>
        <ProtectedRouter
          path="/dashboard"
          component={DashBoard}
        ></ProtectedRouter>
        <ProtectedRouter
          exact
          path="/archive"
          component={Archive}
        ></ProtectedRouter>
        <ProtectedRouter
          exact
          path="/trash"
          component={Trash}
        ></ProtectedRouter>
      </div>
    </Router>
  );
}

export default App;
