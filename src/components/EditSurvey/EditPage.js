import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import {
    withStyles,
    FormControl,
    MenuItem,
    Button,
} from '@material-ui/core';
import { firestoreConnect } from 'react-redux-firebase';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import lightGreen from '@material-ui/core/colors/lightGreen';
import { createFormRequest } from '../actions';
import { load } from '../actions';
import { renderInput } from '../Fields/Input.js'
import { TypeSelect } from '../Fields/TypeSelect.js'
import { Choices } from '../Fields/Choices.js'
import { TitleField } from '../Fields/Title.js'
import { RadioQuery } from '../Fields/RadioQuery.js'
import { TextQuery } from '../Fields/TextQuery.js'

import EditSurveyForm from './EditSurveyForm.js'

const styles = theme => ({
    container: {
        margin: '0 auto',
        backgroundColor: lightGreen[50],
        padding: '2rem 0',
        width: '100%',
    },
    form: {
        width: '90%',
        maxWidth: '64rem',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        margin: '0 auto',
        position: 'relative',
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
    },
    head: {
        border: '.1rem solid #eee',
        backgroundColor: '#fff',
        borderRadius: '.8rem',
        padding: '2.2rem 2.2rem 2.4rem',
    },
    greed: {
        fontSize: '1.2rem',
        marginTop: '1.2rem',
    },
});

class EditSurveyPage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.form}>
                    <EditSurveyForm props={this.props} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EditSurveyPage)
