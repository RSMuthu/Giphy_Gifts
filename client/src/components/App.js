//import logo from '../static/img/logo.svg';
import '../static/css/App.css';
import Home from './Home.js';
import GiftMode from './GiftMode.js';
import Page from './Err.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/gift_mode/:id" component={GiftMode} />
            <Route component={Page} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
