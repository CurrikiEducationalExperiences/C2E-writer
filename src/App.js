import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Myc2e from './C2EComponents/myc2e';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="ts-particles"></div>
      <Switch>
        <Route exact path="/">
          <Myc2e />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
