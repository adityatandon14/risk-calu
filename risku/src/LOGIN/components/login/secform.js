import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "./styles.css";
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