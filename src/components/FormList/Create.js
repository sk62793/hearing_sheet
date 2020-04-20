import React from 'react';
import { Button } from '@material-ui/core';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderInput } from '../../components/Fields/Input.js'
import firebase, { db } from '../../Firebase';

let CreateNewForm = (props) => {
    const { handleSubmit } = props

    const validateAddedName = (values) => {
        const forms = props.forms
        let i;
        for (i = 0; i < forms.length; i++) {
            if (values.name === forms[i].name) return true;
        }
    }

    const setAtFirestore = async values => {
        const queries = []
        await db.collection('forms').add({
            name: values.name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            title: 'タイトル',
            description: '説明',
            queries: queries
        })
    }

    const addNewForm = async values => {
        if (validateAddedName(values)) {
            throw new SubmissionError({ name: '既に存在する名前です' })
        } else {
            await setAtFirestore(values);
            props.props.history.push({
                pathname: '/edit',
                state: { form: {}, name: values.name }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(addNewForm)} style={{ display: 'flex', width: '90%', margin: '0 auto 2rem' }}>
            <Field name='name' label='form name' type='text' component={renderInput} required />
            <Button
                type='submit'
                variant="outlined"
                color="primary"
                className={props.props.classes.button}
            >
                新規作成
            </Button>
        </form>
    )
}

CreateNewForm = reduxForm({
    form: 'CreateNewForm'
})(CreateNewForm)

export default CreateNewForm
