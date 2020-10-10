import React, { Fragment, Component } from 'react';
import './alignmentbutton.css';
import './calc.css';
import './rpage.css';
import './rpage1.css';
import './rpage2.css';
import './style.css';
import Container from 'react-bootstrap/Container';
import { Dropdown } from 'semantic-ui-react';
import { Checkbox } from 'semantic-ui-react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Form, risku, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
//import LayoutTextFields from './LayoutTextFields';
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

const options = [
  {
    key: 'H/O PULMONARY DISEASE',
    text: 'H/O PULMONARY DISEASE',
    value: 'H/O PULMONARY DISEASE'
  },
  { key: 'H/O CKD', text: 'H/O CKD', value: 'H/O CKD' },
  {
    key: 'H/O DM/(HbA1c>7.6)',
    text: 'H/O DM/(HbA1c>7.6)',
    value: 'H/O DM/(HbA1c>7.6)'
  },
  { key: 'H/O HCN', text: 'H/O HCN', value: 'H/O HCN' },
  { key: 'H/O HIV', text: 'H/O HIV', value: 'H/O HIV' },
  {
    key: 'IMMUNOSUPRESSION',
    text: 'IMMUNOSUPRESSION',
    value: 'IMMUNOSUPRESSION'
  }
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '25ch'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const MOCK_SERVICE = 'http://localhost:3004';

export class Calculator extends Component {
  // const classes = useStyles();
  constructor() {
    super();
    this.state = {
      checked: false,
      spo: '',
      heartRate: '',
      resRate: '',
      drpdownValue: '',
      ddimer: '',
      cpk: '',
      crp: '',
      ldh: '',
      tropo: '',
      ferr: '',
      absolute: '',
      ctscan: '',
      abg: '',
      checkAbg: '',
      measure_ddimer: 1,
      measure_cpk: 1,
      measure_crp: 1,
      measure_ldh: 1,
      measure_tropo: 1,
      measure_ferr: 1,
      measure_absolute: 1,
      measure_ctscan: 1,
      measure_abg: 1,
      measure_checkAbg: 1
    };
    this.changeBind = this.changeBind.bind(this);
  }
  changeBind() {
    this.setState({ checked: !this.state.checked });
  }
  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleDropDownChange = (e, { value }) => {
    this.setState({ drpdownValue: value });
  };

  handleLabFindings = e => {
    const { id, value } = e.target;
    const meaureToCheck = `measure_${id}`;
    console.log(meaureToCheck, 'meaureToCheck');
    if (this.state[meaureToCheck] === '2') {
      this.setState({ [id]: value * 1000 });
    } else {
      this.setState({ [id]: value });
    }
  };

  handleSubmit = e => {
    const {
      state: { spo, heartRate, resRate, drpdownValue, ddimer, cpk, crp, ldh, tropo, ferr, absolute, ctscan, abg }
    } = this;

    try {
      fetch(`${MOCK_SERVICE}/calculator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          spo,
          heartRate,
          resRate,
          drpdownValue,
          ddimer,
          cpk,
          crp,
          ldh,
          tropo,
          ferr,
          absolute,
          ctscan,
          abg
        })
      })
        .then(response => response.json())
        .then(data => {});
    } catch (e) {
      console.error('error');
    }
  };

  render() {
    const hidden = this.state.checked ? '' : 'hidden';
    return (
      <div>
        &lt;
        <title>Risk Calculator</title>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="para-container">
            <div className="epidem-container col-md-6 col-sm-12 width=30% ">
              <h1 className="head">EPIDEMIOLOGY</h1>
              <div className="yoyo">
                <Dropdown
                  placeholder="Comorbidities"
                  fluid
                  multiple
                  selection
                  options={options}
                  // onChange={() =>this.handleDropDownChange(e, data, 'drpdownValue')}
                  onChange={this.handleDropDownChange}
                />
              </div>

              <h1 className="head">VITAL SIGNS</h1>

              <br />
              <br />
              <div className="row">
                <div className="col-3 col-md-2 mb-1">
                  <label className="para_name">
                    RESPIRATORY RATE:
                    <input type="number" id="resRate" required onChange={this.handleChange} />
                  </label>
                  <span className="error" id="srr" color="red">
                    *
                  </span>
                  <br />
                  <br />
                  <label className="para_name">
                    HEART RATE:
                    <input type="number" id="heartRate" required onChange={this.handleChange} />
                    <span className="error" id="shr" color="red">
                      *
                    </span>
                  </label>
                  <br />
                  <br />
                  <label className="para_name">
                    SPO2:
                    <input type="number" id="spo" required onChange={this.handleChange} />
                    <span className="error" id="sspoe" color="red">
                      *
                    </span>
                  </label>
                </div>
              </div>
              <br></br>
              <Checkbox
                label={{ children: 'do u have Lab readings' }}
                checked={this.state.checked}
                onChange={this.changeBind}
              />

              <div className={hidden}>
                <div className="lab">
                  <div className="col-3 col-md-2 mb-1">
                    <h1 className="head">LABORATORY FINDINGS</h1>
                    <label className="para_name">
                      DDIMER:
                      <input
                        placeholder="DDIMER"
                        color="red"
                        type="number"
                        id="ddimer"
                        onChange={this.handleLabFindings}
                        required
                      />
                      <select id="measure_ddimer" name="measure" onChange={this.handleChange}>
                        <option value={1}>g/mL</option>
                        <option value={2}>ml/ml</option>
                      </select>
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      CPK:
                      <input type="number" id="cpk" required onChange={this.handleLabFindings} />
                      <select id="measure_cpk" name="measure" onChange={this.handleChange}>
                        <option value={1}>U/L</option>
                        <option value={2}>G/L</option>
                      </select>
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      CRP:
                      <input type="number" id="crp" required onChange={this.handleLabFindings} />
                      <select id="measure_crp" name="measure" onChange={this.handleChange}>
                        <option value={1}>mg/L</option>
                        <option value={2}>g/L</option>
                      </select>
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      LDH:
                      <input type="number" id="ldh" required onChange={this.handleLabFindings} />
                      <select id="measure_ldh" name="measure" onChange={this.handleChange}>
                        <option value={1}>U/L</option>
                        <option value={2}>g/L</option>
                      </select>
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      Troponin:
                      <input type="number" id="tropo" onChange={this.handleLabFindings} required />
                      <select id="measure_tropo" name="measure" onChange={this.handleChange}>
                        <option value={1}>ng/ml</option>
                        <option value={2}>g/mL</option>
                      </select>
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      Ferritin:
                      <input type="number" id="ferr" onChange={this.handleLabFindings} required />
                      <select id="measure_ferr" name="measure" onChange={this.handleChange}>
                        <option value={1}>g/L</option>
                        <option value={2}>mg/L</option>
                      </select>
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      Absolute LC:
                      <input type="number" id="abg" onChange={this.handleLabFindings} />
                      <select id="measure_abg" name="measure" onChange={this.handleChange}>
                        <option value={1}>10^-6/L</option>
                        <option value={2}>g/L</option>
                      </select>
                      <br />
                      <span className="error" id="sage" color="red">
                        *
                      </span>
                    </label>
                    <br />
                    <label className="para_name">
                      CT SCAN
                      <input type="number" id="ctscan" />
                      <select id="measure_ctscan" name="measure" onChange={this.handleChange}>
                        <option value={1}>U/L</option>
                        <option value={2}>g/L</option>
                      </select>
                    </label>
                    <br />
                    <br />
                    <label className="para_name">
                      ABG:
                      <input type="number" id="checkAbg" onChange={this.handleLabFindings} />
                      <select id="measure_checkAbg" name="measure" onChange={this.handleChange}>
                        <option value={1}>U/L</option>
                        <option value={2}>g/L</option>
                      </select>
                      <br />
                      (P / F ratio)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btype">
            <button type="submit" id="sub" onClick={this.handleSubmit}>
              CHECK PARAMETERS
            </button>
          </div>
        </form>
      </div>
      //</div>
    );
  }
}

export default Calculator;
