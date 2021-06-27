import "./App.css";
import NewAccount from "./page/new-account/NewAccount";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./page/sign-in/SignIn";
import ForgotPassword from "./page/forgot-password/ForgotPassword";
import ResetPassword from "./page/reset-password/ResetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={NewAccount}></Route>
        <Route exact path="/sign-in" component={SignIn}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        <Route exact path="/reset-password" component={ResetPassword}></Route>
      </div>
    </Router>
  );
}

export default App;
