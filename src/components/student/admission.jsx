import React, { Component } from 'react';
import ManageAdmissionController from '../../server/controllers/ManageAdmissionController';
import '../../styles/ManageAdmission.scss';
import Auth from '../../Auth';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

export default class Admission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogMessage: '',
      errors: [],
      user: {},
      labelWidth: 135,
      registrationId: '123456',
      studentName: '',
      fatherName: '',
      motherName: '',
      gender: 'male',
      dateOfBirth: '',
      dateOfBirthWord: '',
      religion: '',
      allReligions: [],
      category: '',
      allCategories: [],
      isHandicap: false,
      isSpecialNeedReq: false,
      createBtnText: 'Register Student',
    };
  }

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };

  showValidationError = (elem, msg) => {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors,
        {
          elem,
          msg,
        },
      ],
    }));
  };

  handleChange = (elem) => {
    this.setState({
      [elem.target.id]: elem.target.value,
    });
    this.clearValidationError(elem.target.id);
  };

  clearValidationError = (elem) => {
    this.setState((prevState) => {
      let newErrors = [];
      for (let err of prevState.errors) {
        if (elem !== err.elem) {
          newErrors.push(err);
        }
      }
      return { errors: newErrors };
    });
  };

  clearAllValidationError() {
    this.setState((prevState) => {
      let newErrors = [];
      for (let err of prevState.errors) {
        newErrors.pop();
      }
      return { errors: newErrors };
    });
  }

  async componentDidMount() {
    // if (Auth.isAuthenticated()) {
    this.fetchReligions();
    this.fetchAllCategories();
    // } else {
    // this.props.history.push('/');
    // }
  }

  async fetchReligions() {
    const allReligions = await ManageAdmissionController.fetchReligions();
    this.setState({ allReligions: allReligions });
  }
  async fetchAllCategories() {
    const allCategories = await ManageAdmissionController.fetchAllCategories();
    this.setState({ allCategories: allCategories });
  }

  handleReligionChange = async (event) => {
    const religion = event.target.value;
    this.setState({
      religion: `${religion}`,
    });
  };

  handleRegisterStudent() {}

  handleResetRegistration() {}

  render() {
    let studentNameErrMsg = null;
    let fatherNameErrMsg = null;
    let motherNameErrMsg = null;
    let dateOfBirthErrMsg = null;
    let religionErrMsg = null;

    for (let err of this.state.errors) {
      if (err.elem === 'studentName') {
        studentNameErrMsg = err.msg;
      }
      if (err.elem === 'fatherName') {
        fatherNameErrMsg = err.msg;
      }
      if (err.elem === 'motherName') {
        motherNameErrMsg = err.msg;
      }
      if (err.elem === 'dateOfBirth') {
        dateOfBirthErrMsg = err.msg;
      }
      if (err.elem === 'religion') {
        religionErrMsg = err.msg;
      }
    }
    return (
      <div>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{''}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color='primary' autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <div className='show-admission-container'>
          <div className='create-admission-container'>
            <div className='create-admission-header'>
              <Typography variant='h6' component='h2'>
                New Student Details
              </Typography>
            </div>
            <div className='create-admission-sub-container'>
              <div className='student-info-container'>
                <div className='admission-field'>
                  <TextField
                    readOnly
                    id='registrationId'
                    label='Registration Number'
                    variant='outlined'
                    fullWidth
                    className='admission-textfield'
                    margin='normal'
                    value={this.state.registrationId}
                  />
                </div>
                <div className='admission-field'>
                  <TextField
                    id='studentName'
                    label='Student Name'
                    variant='outlined'
                    fullWidth
                    className='admission-textfield'
                    margin='normal'
                    required={true}
                    onChange={this.handleChange}
                    value={this.state.studentName}
                  />
                </div>
                <div className='admission-field'>
                  <FormControl
                    required
                    variant='outlined'
                    className='formControl'
                  >
                    <FormLabel component='legend'>Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-label='gender'
                      name='gender'
                      value={this.state.gender}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                        labelPlacement='start'
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className='admission-field'>
                  <TextField
                    id='fatherName'
                    label="Father's Name"
                    variant='outlined'
                    fullWidth
                    className='admission-textfield'
                    margin='normal'
                    required={true}
                    onChange={this.handleChange}
                    value={this.state.fatherName}
                  />
                </div>
                <div className='admission-field'>
                  <TextField
                    id='motherName'
                    label="Mother's Name"
                    variant='outlined'
                    fullWidth
                    className='admission-textfield'
                    margin='normal'
                    required={true}
                    onChange={this.handleChange}
                    value={this.state.motherName}
                  />
                </div>
                <div className='admission-field'>
                  <TextField
                    id='dateOfBirth'
                    label='Date Of Birth'
                    variant='outlined'
                    fullWidth
                    className='admission-textfield'
                    margin='normal'
                    required={true}
                    onChange={this.handleChange}
                    value={this.state.dateOfBirth}
                  />
                </div>
                <div className='admission-field'>
                  <TextField
                    disabled
                    id='dateOfBirthWord'
                    label='Date Of Birth (Words)'
                    variant='outlined'
                    fullWidth
                    className='admission-textfield'
                    margin='normal'
                    required={true}
                    onChange={this.handleChange}
                    value={this.state.dateOfBirthWord}
                  />
                </div>
                <div className='admission-field'>
                  <FormControl
                    required
                    variant='outlined'
                    className='formControl'
                  >
                    <InputLabel ref={this.state.religion} id='religion-label'>
                      Religion
                    </InputLabel>
                    <Select
                      labelId='religion-select-outlined-label'
                      id='religion'
                      value={this.state.religion}
                      labelWidth={this.state.labelWidth}
                      className='selectEmpty'
                      onChange={this.handleReligionChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {this.state.allReligions.map((religion) => (
                        <MenuItem
                          key={religion.id}
                          value={religion.religionName}
                        >
                          {religion.religionName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className='admissionBtnDiv'>
                  <Button
                    id='createBtn'
                    className='gradient-button btn-primary-admission'
                    onClick={this.handleRegisterStudent}
                  >
                    {this.state.createBtnText}
                  </Button>
                  <Button
                    id='resetBtn'
                    color='primary'
                    className='gradient-button btn-primary-admission'
                    onClick={this.handleResetRegistration}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
