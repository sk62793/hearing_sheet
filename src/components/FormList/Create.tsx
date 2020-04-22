import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { reduxForm, Field, SubmissionError, InjectedFormProps } from 'redux-form';
import { renderInput } from '../Fields/Input'
import firebase, { db } from '../../configureFirebase';

const useStyles = makeStyles({
    button: {
        padding: '0 1rem',
        margin: '1rem 1rem 0 0',
        fontSize: '1rem',
        height: '4rem',
    },
})

interface Props {
    props: any,
    forms: any
}

let Form: React.FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
    const { handleSubmit, forms } = props

    const classes = useStyles();

    const validateAddedName = (values: { name: string }) => {
        for (let i = 0; i < forms.length; i++) {
            if (values.name === forms[i].name) return true;
        }
    }

    const setAtFirestore = async (values: { name: string }) => {
        await db.collection('forms').add({
            name: values.name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            title: 'タイトル',
            description: '説明',
            queries: []
        })
    }

    const addNewForm = async (values: { name: string }) => {
        if (validateAddedName(values)) {
            throw new SubmissionError({ name: '既に存在する名前です' })
        } else {
            await setAtFirestore(values);
            props.props.history.push({
                pathname: '/edit',
                state: { name: values.name }
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
                className={classes.button}
            >
                新規作成
            </Button>
        </form>
    )
}

const CreateNewForm = reduxForm<{}, Props>({
    form: 'CreateNewForm'
})(Form)

export default CreateNewForm
