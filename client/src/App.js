import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import CardDetails from "./components/CardDetail/CardDetail";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";

function App() {
  return (
  <div className="App" >
    <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
				  <Route exact path='/home' component={Home} />
          <Route exact path='/recipe/:id' component={CardDetails} />
          <Route exact path='/create' component={CreateRecipe} />

        </Switch>
    </BrowserRouter>
  </div>
  );
  
}

export default App;
