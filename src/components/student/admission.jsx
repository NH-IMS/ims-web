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
    //   this.props.history.push('/');
    // }
  }

  async fetchReligions() {
    const activeProductCategories = await ManageAdmissionController.fetchReligions();
    this.setState({ allReligions: activeProductCategories });
  }
  async fetchAllCategories() {
    const allProduct = await ManageAdmissionController.fetchAllCategories();
    this.setState({ allCategories: allProduct });
  }

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
              <FormControl required variant='outlined' className='formControl'>
                <div className='student-info-container'>
                  <div className='admission-field'>
                    <TextField
                      disabled
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
                  <div className='admission-field-gender'>
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
                        label="Date Of Birth"
                        variant='outlined'
                        fullWidth
                        className='admission-textfield'
                        margin='normal'
                        required={true}
                        onChange={this.handleChange}
                        value={this.state.dateOfBirth}
                    />
                  </div>
                </div>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
