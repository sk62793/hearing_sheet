import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { reduxForm, Field, SubmissionError, InjectedFormProps } from 'redux-form';
import { renderInput } from '../Fields/Input'
import dayjs from 'dayjs'
import { db } from '../../configureFirebase';

const useStyles = makeStyles({
    form: {
        position: 'absolute',
        top: '30rem',
        left: '10%',
        width: '70%',
        margin: 'auto',
        padding: '3rem',
        background: '#fff',
        border: '.1rem solid #ddd',
        borderRadius: '.5rem',
        zIndex: 10
    },
    button: {
        padding: '0 1rem',
        margin: '1rem 1rem 0 0',
        fontSize: '1rem',
        height: '4rem',
    },
    modalBackground: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.5,
        zIndex: 5,
    }
})

interface Query {
    choices: string[] | null,
    path: string | null,
    question: string,
    type: string
}

interface FormElement {
    id: string,
    name: string,
    title: string,
    description: string,
    queries: Query[],
    createdAt: { seconds: number, nanoseconds: number }
}

interface Props {
    index: number,
    forms: FormElement[],
    closeModal: () => void
}

let Modal: React.FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
    const classes = useStyles();
    const { closeModal, handleSubmit, forms, index } = props

    const validateNewName = (values: { name: string }) => {
        for (let i = 0; i < forms.length; i++) {
            if (values.name === forms[i].name) return true;
        }
    }

    const updateNameAtFirestore = (values: { name: string }) => {
        const id = forms[index].id
        db.collection('forms').doc(`${id}`).update({
            name: values.name
        })
    }

    async function submit(values: { name: string }) {
        if (validateNewName(values)) {
            if (values.name === forms[index].name) {
                closeModal();
            } else {
                throw new SubmissionError({ name: '既に使われている名前です' })
            }
        } else {
            await updateNameAtFirestore(values)
            closeModal();
        }
    }

    return (
        <>
            <form
                className={classes.form}
                onSubmit={handleSubmit(submit)}
            >
                <Field name='name' label='form name' type='text' component={renderInput} required />
                <Button type='submit' variant="outlined" color="primary" className={classes.button}>
                    保存
                </Button>
                <Button variant="outlined" color="primary" className={classes.button} onClick={closeModal}>
                    キャンセル
                </Button>
            </form>
            <div className={classes.modalBackground}></div>
        </>
    );
}

const RenameModal = reduxForm<{}, Props>({
    form: 'renameModal'
})(Modal)

export default RenameModal
