import React from 'react';
import {useEffect,createContext,useReducer,useContext} from 'react';
import About from './About';
import Appli from './LOGIN/Appli';
import secForm from './LOGIN/components/login/secform';
import aboutus from './Cal/aboutus';

import {BrowserRouter,useHistory} from 'react-router-dom'
import Certificates, { certification } from './Cal/certification';
import Calculator from './Cal/Calculator6';
import login from './LOGIN/components/login';
import NavBar from './Cal/navbar';
import {initialstate,reducer} from './userreducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export const usercontext=createContext()
const Routing=()=>{
  const history=useHistory() 
  const {state,dispatch}=useContext(usercontext)
  useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"))
      const tdt=localStorage.getItem("tokendate")
      if(user&&tdt){
          let dt=new Date();
          let tdate=Date.parse(tdt)
          if(tdate<=dt){
              localStorage.clear();
              history.push('/')
          }else{
              dispatch({type:"USER",payload:user})
          }
      }
      else{
          history.push('/')
      }
  },[])

  return (
      <Switch>
          <Route exact path='/calculator'>
              <Calculator/>
          </Route>
          <Route path='/login'>
              <login />
          </Route>
          <Route path='/Certificates'>
              <Certificates />
          </Route>
          <Route path='/aboutus'>
              <aboutus />
          </Route>
          
      </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialstate)
  return (
    <usercontext.Provider value={{state,dispatch}}>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={About}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/login" component={Appli}></Route>
          <Route exact path="/secLogin" component={secForm}></Route>
          <Route exact path="/calculator" component={Calculator}></Route>
          <Route exact path="/certificates" component={Certificates}></Route>
          <Route exact path="/aboutus" component={aboutus}></Route>
         
        </Switch>
      </div>
    </Router>
    </usercontext.Provider>
  );
}

export default App;



