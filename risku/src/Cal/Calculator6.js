import React, { Fragment, Component } from "react";
import "./alignmentbutton.css";
import "./calc.css";
import "./rpage.css";
import "./rpage1.css";
import "./rpage2.css";
import "./style.css";
import Container from "react-bootstrap/Container";
import { Dropdown } from "semantic-ui-react";
import { Checkbox } from "semantic-ui-react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  Form,
  risku,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
//import LayoutTextFields from './LayoutTextFields';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
//these are the options for epidem dropdown
const options = [
  {
    key: "H/O PULMONARY DISEASE",
    text: "H/O PULMONARY DISEASE",
    value: "H/O PULMONARY DISEASE",
  },
  { key: "H/O CKD", text: "H/O CKD", value: "H/O CKD" },
  {
    key: "H/O DM/(HbA1c>7.6)",
    text: "H/O DM/(HbA1c>7.6)",
    value: "H/O DM/(HbA1c>7.6)",
  },
  { key: "H/O HCN", text: "H/O HCN", value: "H/O HCN" },
  { key: "H/O HIV", text: "H/O HIV", value: "H/O HIV" },
  {
    key: "IMMUNOSUPRESSION",
    text: "IMMUNOSUPRESSION",
    value: "IMMUNOSUPRESSION",
  },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
//basic styling property using library functions
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));
/*api */
const MOCK_SERVICE = "http://localhost:3004";
/*api ka name and defining all parameter*/
export class Calculator extends Component {
  // const classes = useStyles();
  constructor() {
    super();
    this.state = {
      checked: false,
      spo: "",
      heartRate: "",
      resRate: "",
      drpdownValue: "",
      ddimer: "",
      cpk: "",
      crp: "",
      ldh: "",
      tropo: "",
      ferr: "",
      absolute: "",
      ctscan: "",
      abg: "",
      checkAbg: "",
      measure_ddimer: 1,
      measure_cpk: 1,
      measure_crp: 1,
      measure_ldh: 1,
      measure_tropo: 1,
      measure_ferr: 1,
      measure_absolute: 1,
      measure_ctscan: 1,
      measure_abg: 1,
      measure_checkAbg: 1,
    };
    this.changeBind = this.changeBind.bind(this);
  }
  /*for the checked box*/

  changeBind() {
    this.setState({ checked: !this.state.checked });
  }

  /*for all the values getting filled*/

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  /*dropdown ki values set ke lie*/

  handleDropDownChange = (e, { value }) => {
    this.setState({ drpdownValue: value });
  };

  /*this function is for units change if its sec unit multiply by 1000 and send the values*/

  handleLabFindings = (e) => {
    const { id, value } = e.target;
    const meaureToCheck = `measure_${id}`;
    console.log(meaureToCheck, "meaureToCheck");
    if (this.state[meaureToCheck] === "2") {
      this.setState({ [id]: value * 1000 });
    } else {
      this.setState({ [id]: value });
    }
  };

  /*form submit button*/

  handleSubmit = (e) => {
    const {
      state: {
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
        abg,
      },
    } = this;

    /*this is how the data is being sent in json format*/

    try {
      fetch(`${MOCK_SERVICE}/calculator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          abg,
        }),
      })
        .then((response) => response.json())
        .then((data) => {});
    } catch (e) {
      console.error("error");
    }
  };

  render() {
    const hidden = this.state.checked ? "" : "hidden";
    return (
      <div>
        &lt;
        <title>Risk Calculator</title>
        <div className="full">
          <div className="navbar">
            <h1>RISK CALCULATOR</h1>
          </div>
          <div className="Image-container">
            <img
              src="https://socialimages.sakalmediagroup.com/sakaltimes-prod/s3fs-public/news-story/cover-images/1download_20_282_29.png?z4Sb2.lxpwOlAjwGaVw.sbUce8LfyVAj"
              width="100%"
              height="300px"
            />
            <div className="putto">
              <h4>
                This web based risk calculator estimates the risk of cytokine
                storm activaton in Covid-19 patients, which is based on
                epidemiological, vital signs and laboratory findings. Ref: 1.
                Eva W. Cheung at al. Multisystem Inflammatory Syndrome Related
                to COVID-19 in Previously Healthy Children and Adolescents in
                New York City. JAMA. June 08, 2020. doi:10.1001/jama.2020.10374
              </h4>
            </div>
          </div>

          <div className="Analytics">
            <div className="col">
              <div
                className="aos-refresh-onload aos-init aos-animate"
                data-aos="fade-up"
              >
                <div
                  id="page-desc-mortality"
                  className="elevation-3 jumbotron"
                  style={{ padding: "4%" }}
                >
                  <h2>Analytics can calculate the risk of mortality</h2>
                  <hr />
                  <div>
                    <p>
                      Severe COVID-19 patients require the most scarce health
                      care resources, ventilators and intensive care beds. When
                      the number of patients exceeds the availability of these
                      resources, physicians have the difficult responsibility to
                      prioritize between patients. To help them make an informed
                      decision, we developed the mortality calculator for
                      admitted COVID-19 patients.
                    </p>
                  </div>
                  <div>
                    <p>
                      We have developed two calculators that predict{" "}
                      <strong>
                        the probability of mortality of a COVID-19 patient who
                        arrives at a hospital:
                      </strong>
                    </p>
                  </div>
                  <div>
                    <ul>
                      <li>
                        A calculator that uses demographics, vitals,
                        comorbidities and <strong>lab values</strong>. This risk
                        score can be used post-triage to assess in a more
                        accurate and detailed way the severity of a COVID-19
                        patient’s condition. The out of sample AUC is 0.9.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>
                        A calculator that uses demographics, vitals and
                        comorbidities, but <strong>without lab values</strong>.
                        We envision that this model will be used at the time of
                        triage for a COVID-19 patient who arrives at the
                        hospital to assess in a preliminary way the severity of
                        his or her condition. The out of sample AUC is 0.82.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p>
                      Models are only as good as the data they are trained on.
                      We will release new versions of the calculator as the
                      amount of data we receive from our partner institutions
                      increases. If you are a medical institution and are
                      willing to contribute to our effort, please reach out to
                      us{" "}
                      <a href="https://www.covidanalytics.io/contact">here</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <div className="box1">
                  <br />
                  <br />

                  <label className="para_name">
                    RESPIRATORY RATE:
                    <input
                      type="number"
                      id="resRate"
                      required
                      onChange={this.handleChange}
                    />
                  </label>
                  <span className="error" id="srr" color="red">
                    *
                  </span>
                  <br />
                  <br />
                  <label className="para_name">
                    HEART RATE:
                    <input
                      type="number"
                      id="heartRate"
                      required
                      onChange={this.handleChange}
                    />
                    <span className="error" id="shr" color="red">
                      *
                    </span>
                  </label>
                  <br />
                  <br />
                  <label className="para_name">
                    SPO2 :
                    <input
                      type="number"
                      id="spo"
                      required
                      onChange={this.handleChange}
                    />
                    <span className="error" id="sspoe" color="red">
                      *
                    </span>
                  </label>

                  <br></br>
                </div>
                <Checkbox
                  className="ruby"
                  label={{ children: "LAB READINGS" }}
                  checked={this.state.checked}
                  onChange={this.changeBind}
                />

                <div className={hidden}>
                  <div className="lab">
                    <div className="col-3 col-md-2 mb-1">
                      <h1 className="head">LABORATORY FINDINGS</h1>
                      <div className="box2">
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
                          <select
                            id="measure_ddimer"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <input
                            type="number"
                            id="cpk"
                            required
                            onChange={this.handleLabFindings}
                          />
                          <select
                            id="measure_cpk"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <input
                            type="number"
                            id="crp"
                            required
                            onChange={this.handleLabFindings}
                          />
                          <select
                            id="measure_crp"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <input
                            type="number"
                            id="ldh"
                            required
                            onChange={this.handleLabFindings}
                          />
                          <select
                            id="measure_ldh"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <input
                            type="number"
                            id="tropo"
                            onChange={this.handleLabFindings}
                            required
                          />
                          <select
                            id="measure_tropo"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <input
                            type="number"
                            id="ferr"
                            onChange={this.handleLabFindings}
                            required
                          />
                          <select
                            id="measure_ferr"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <input
                            type="number"
                            id="abg"
                            onChange={this.handleLabFindings}
                          />
                          <select
                            id="measure_abg"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
                          <select
                            id="measure_ctscan"
                            name="measure"
                            onChange={this.handleChange}
                          >
                            <option value={1}>U/L</option>
                            <option value={2}>g/L</option>
                          </select>
                        </label>
                        <br />
                        <br />
                        <label className="para_name">
                          ABG:
                          <input
                            type="number"
                            id="checkAbg"
                            onChange={this.handleLabFindings}
                          />
                          <select
                            id="measure_checkAbg"
                            name="measure"
                            onChange={this.handleChange}
                          >
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
            </div>

            <div className="btype">
              <button type="submit" id="sub" onClick={this.handleSubmit}>
                CHECK PARAMETERS
              </button>
            </div>
          </form>
          <a href="https://forms.gle/3yrDBz4CeLhnW4kX8" target="_blank">
            <marquee
              behavior="scroll"
              direction="left"
              onmouseover="this.stop();"
              onmouseout="this.start();"
            >
              Please help us to contribute more by providing your valuable
              feedback
            </marquee>
          </a>
          <div className="technicaldetails">
            <div className="col">
              <div data-aos="fade-up" className="aos-init aos-animate">
                <div
                  id="mortality-model-desc"
                  className="elevation-3 jumbotron"
                  style={{ padding: "4%" }}
                >
                  <h2>Technical details</h2>
                  <div>
                    <p>
                      Our model was trained on 2781 patients (out of whom 25%
                      deceased) hospitalized due to COVID-19 in:{" "}
                    </p>
                  </div>
                  <div>
                    <ul>
                      <li>
                        The Italian city of Cremona (
                        <a href="https://www.asst-cremona.it/en/home">
                          Azienda Socio-Sanitaria Territoriale di Cremona
                        </a>
                        ). Cremona is one of the most severely hit italian
                        provinces in Lombardy with several thousand positive
                        cases to date.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <a href="https://www.fundacionhm.com/">HM Hospitals</a>,
                        a leading Hospital Group in Spain with 15 general
                        hospitals and 21 clinical centres that cover the regions
                        of Madrid, Galicia, and León.{" "}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>
                        <a href="https://hartfordhealthcare.org">
                          Hartford HealthCare
                        </a>
                        , a major hospital network serving patients throughout
                        Connecticut (USA).{" "}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p>
                      Given our training population, we are most confident about
                      the relevance of our model to: (a) Western population; (b)
                      Severe to acute patients; (c) Congested hospitals.{" "}
                    </p>
                  </div>
                  <hr />
                  <div>
                    The calculator is based on{" "}
                    <a href="https://xgboost.readthedocs.io/">
                      XGBoost classifier.
                    </a>
                    <br />
                    The out of sample area under the curve (AUC) on 309 patients
                    (out of whom 25% deceased) is{" "}
                    <span
                      style={{ color: "rgb(128, 0, 32)", fontWeight: "bold" }}
                    >
                      {" "}
                      0.82
                    </span>
                    .<br />
                    When features are missing, the calculator will impute and
                    report their values.
                  </div>
                  <br />
                  <div>
                    <p>
                      We use{" "}
                      <a href="https://github.com/slundberg/shap">SHAP plots</a>{" "}
                      to interpret the XGBoost models. The SHAP plot below
                      summarizes features by their importance and
                      directionality. Features are ordered by decreasing
                      significance, with the most important feature listed at
                      the top of the plot. For a given feature, the
                      corresponnding row shows a plot of the feature's impact on
                      the prediction as the value ranges from its lowest (blue)
                      to highest (red) value. Higher SHAP values correspond to
                      increased likelihood of having a positive outcome (i.e.
                      mortality or infection). Thus, features with the color
                      scale oriented blue to red (moving left to right) have
                      increasing risk as the feature increases, such as Age.
                      Features oriented red to blue have decreasing risk as the
                      feature increases, such as Oxygen Saturation. Note: gender
                      is encoded as a binary value (0=Male, 1=Female), so
                      "lower" values of gender correspond to male patients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="graph">
            <img
              src="https://www.covidanalytics.io/assets/risk_calculators/mortality/model_without_lab.jpg"
              width="60%"
              height="20%"
              className="center"
              dispaly="center"
            />
          </div>
          <div className="information">
            <pre>
              Moderate and high risk patients require aggressive monitoring of
              inflammatory milieu or up triaging. Anti-inflammatory therapy with
              steroid and Anticoagulation recommended.{"\n"}*Please note these
              are mere recommendation from the author based on the available
              scientific recommendation and no means intended to replace local
              guidelines.{"\n"}
              {"\n"}* compulsary{"\n"}
              {"            "}
            </pre>
          </div>
          <div id="myModal" className="modal">
            {/* Modal content */}
            <div className="modal-content">
              <div className="modal-header">
                <span className="close">Ã—</span>
                <div className="respa">
                  <span id="risk_fact" className="display_high" />
                </div>
              </div>
              <div className="modal-body">
                <div className="respa">
                  Epidemiology:
                  <span id="span1" />
                </div>
                <div className="respa">
                  Vital Signs:
                  <span id="span2" />
                </div>
                <div className="respa">
                  Lab-Findings:
                  <span id="span3" />
                </div>
              </div>
              <div className="modal-footer">
                <h2>PATIENT IS AT HIGH RISK</h2>
              </div>
            </div>
          </div>
          <div id="myModal1" className="modal1">
            {/* Modal content */}
            <div className="modal-content1">
              <div className="modal-header1">
                <span className="close1">Ã—</span>
                <div className="respa">
                  <span id="rissk_fact" className="display_low" />
                </div>
              </div>
              <div className="modal-body1">
                <div className="respa">
                  Epidemiology:
                  <span id="sspan1" />
                </div>
                <div className="respa">
                  Vital Signs:
                  <span id="sspan2" />
                </div>
                <div className="respa">
                  Lab-Findings:
                  <span id="sspan3" />
                </div>
              </div>
              <div className="modal-footer1">
                <h2>PATIENT IS AT LOW RISK</h2>
              </div>
            </div>
          </div>
          <div id="myModal2" className="modal2">
            {/* Modal content */}
            <div className="modal-content2">
              <div className="modal-header2">
                <span className="close2">Ã—</span>
                <div className="respa">
                  <span id="rismsk_fact" className="display_moderate" />
                </div>
              </div>
              <div className="modal-body2">
                <div className="respa">
                  Epidemiology:
                  <span id="smspan1" />
                </div>
                <div className="respa">
                  Vital Signs:
                  <span id="smspan2" />
                </div>
                <div className="respa">
                  Lab-Findings:
                  <span id="smspan3" />
                </div>
              </div>
              <div className="modal-footer2">
                <h2>PATIENT AT MODERATE RISK</h2>
              </div>
            </div>
          </div>
        </div>
        //
      </div>
    );
  }
}

export default Calculator;
