import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { renderInput } from '../../components/Fields/Input.js'
import dayjs from 'dayjs'
import firebase, { db } from '../../Firebase';


const styles = theme => ({
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
        zIndex: '10'
    },
    button: {
        padding: '0 1rem',
        margin: '1rem 1rem 0 0',
        fontSize: '1rem',
        height: '4rem',
    },
    modalBackground: {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'block',
        position: 'absolute',
        backgroundColor: '#000',
        opacity: '0.5',
        zIndex: '5',
    }
});

class RenameModal extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }

    validateNewName(values) {
        const forms = this.props.forms
        let i;
        for (i = 0; i < forms.length; i++) {
            if (values.name === forms[i].index) return true;
        }
    }

    updateNameAtFirestore(values) {
        const index = this.props.index
        const id = this.props.forms[index].id
        db.collection('forms').doc(`${id}`).update({
            name: values.name
        })
    }

    async submit(values) {
        const index = this.props.index
        if (this.validateNewName(values)) {
            if (values.name === this.props.forms[index].name) {
                await this.updateNameAtFirestore(values)
                this.props.switchRenameModal()
            } else {
                throw new SubmissionError({ name: '既に使われている名前です' })
            }
        } else {
            await this.updateNameAtFirestore(values)
            this.props.switchRenameModal()
        }
    }

    render() {
        const { classes, handleSubmit } = this.props
        return (
            <>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(this.submit)}
                >
                    <Field name='name' label='form name' type='text' component={renderInput} required />
                    <Button
                        type='submit'
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                    >
                        新規作成
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={this.props.switchRenameModal}
                    >
                        キャンセル
                    </Button>
                </form>
                <div className={classes.modalBackground}></div>
            </>
        )
    }
}

RenameModal = reduxForm({
    form: 'renameModal'
})(RenameModal)

export default withStyles(styles)(RenameModal)

