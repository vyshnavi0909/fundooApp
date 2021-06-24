import './App.css';
import NewAccount from './page/create-account/NewAccount'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './page/sign-in/SignIn'

function App() {
  return (
    <Router>
      <div className="App">
      <Route exact path="/" component={NewAccount}></Route>
      <Route exact path="/sign-in" component={SignIn}></Route>
    </div>
    </Router>
  );
}

export default App;
