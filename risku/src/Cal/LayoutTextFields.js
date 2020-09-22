import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

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

const diseases = [
  "H/O PULMONARY DISEASE",
  "H/O CKD",
  "H/O DM/(HbA1c>7.6)",
  "H/O HCN",
  "H/O HIV",
  "IMMUNOSUPRESSION",
];

function getStyles(name, disease, theme) {
  return {
    fontWeight:
      disease.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function LayoutTextFields() {
  const classes = useStyles();
  const theme = useTheme();
  const [disease, setDisease] = React.useState([]);
  const [unit, setUnit] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setDisease(event.target.value);
  };

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const units = ["unit1", "unit2", "unit3"];

  return (
    <div className={classes.root}>
      <div className={classes.formControl}>
        <h2>Epidemiology</h2>
        <TextField
          id="filled-full-width"
          label="Age"
          style={{ margin: 8 }}
          placeholder="Enter your age"
          fullWidth="true"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-chip-label">Choose</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={disease}
            onChange={handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {diseases.map((disease) => (
              <MenuItem
                key={disease}
                value={disease}
                style={getStyles( disease, theme)}
              >
                {disease}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <h2>Vital signs</h2>

        <TextField
          label="Respirotary rate"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="Heart rate"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="SPO2"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
      </div>
      <div className={classes.FormRow}>
        <h2>Laboratory findings</h2>
        <div className={classes.FormRow}>
          <TextField
            label="DDimer"
            id="filled-margin-none"
            className={classes.textField}
            variant="filled"
          />
          <InputLabel id="demo-controlled-open-select-label">Unit</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={unit}
            onChange={handleChangeUnit}
          >
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </div>

        <TextField
          label="CPK"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="CRD"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="LDH"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="Tropopin"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="Ferritin"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="Absolute Lymphosyte Count CT Scan"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
        <TextField
          label="ABG(P/F ratio)"
          id="filled-margin-none"
          className={classes.textField}
          variant="filled"
        />
      </div>
    </div>
  );
}
