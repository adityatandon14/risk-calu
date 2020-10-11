import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "./styles.css";
/* isme i need to make 2 apis 

localhost8000/api/userdata/id for existing button

localhost8000/api/userdata for new patient button

then when i submit calculator.js i to post that forms data on respective api
*/
const secform = () => (
  <form className="frm">
    <div className="top">
      <label>ENTER PATIENT ID</label>
      <input placeholder="ID" />
    </div>
    <div className="bon">
      <Button type="submit">Existing Patient</Button>
      <Button type="submit">New Patient</Button>
    </div>
  </form>
);

export default secform;