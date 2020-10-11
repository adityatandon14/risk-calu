import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "./styles.css";

import  { Redirect } from 'react-router-dom'
/* isme i need to make 2 apis 

localhost8000/api/userdata/id for existing button

localhost8000/api/userdata for new patient button

then when i submit calculator.js i to post that forms data on respective api

Even i need to send the patient id to calculator.js file and udhar se on post request

*/
 class secform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Ptid: null,
    };
  }
   
  fetchExistingPatient = (id) => {
    const MOCK_SERVICE = "http://localhost:3004";
    fetch(`${MOCK_SERVICE}/api/username/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if(data){
        console.log(data);
        }
      })
      .catch((e) => {
        this.setState({ errors: e.error, isAuthenticated: false });
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  newPatient=(id)=>{
    
     const {
       props: { history },
     } = this;
    history.push(
      {
      pathname:"/calculator" ,
       //state:id 
      }
    )
  }
  render() {
    const { Ptid } = this.state;

    return (
      <form className="frm">
        <div className="top">
          <label>ENTER PATIENT ID</label>
          <input placeholder="ID" name="Ptid" />
        </div>
        <div className="bon">
          <Button
            type="submit"
            onClick={(Ptid) => this.fetchExistingPatient(Ptid)}
          >
            Existing Patient
          </Button>
          <Button type="submit" onClick={(Ptid) => this.newPatient(Ptid)}>
            New Patient
          </Button>
        </div>
      </form>
    );
  }
}
 export default secform;