import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    withStyles,
    Button,
    Container,
    IconButton
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { theme } from '../../index.js'
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { addFormRequest } from '../actions';
import { renderInput } from '../Fields/Input.js'
import history from '../../History.js'
import dayjs from 'dayjs'
import firebase, { db } from '../../Firebase';


const styles = theme => ({
    container: {
        margin: '0 auto',
        paddingTop: '10rem',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80rem',
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
    },
    button: {
        padding: '0 1rem',
        margin: '1rem 1rem 0 0',
        fontSize: '1rem',
        height: '4rem',
    },
    forms: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formContent: {
        height: '10rem',
        width: '16rem',
        border: '.1rem solid #ccc',
        borderRadius: '.5rem',
        margin: '1rem',
        textAlign: 'center',
        '&:hover': {
            border: `.1rem solid ${theme.palette.primary.main}`
        }
    }
});

class FormContent extends Component {
    constructor(props) {
        super(props);
        this.moveToEditPage = this.moveToEditPage.bind(this)
        this.deleteThisForm = this.deleteThisForm.bind(this)
    }
    /*
        getSelectedIndexData(values) {
            console.log(values)
            const forms = this.props.formValues.forms
            console.log(forms)
            const selectedIndex = this.props.index + '';
            let form = forms.filter(function (forms) {
                return forms.id === selectedIndex + '';
            })
            console.log(form)
            return form;
        }
    */
    async moveToEditPage() {
        //let form = await this.getSelectedIndexData(values)
        const form = this.props.form
        console.log(form)
        this.props.props.history.push({
            pathname: '/create_form',
            state: { form: this.props.form }
        })
    }

    deleteThisForm() {
        const id = this.props.form.id
        console.log(id)
        db.collection('forms').doc(id).delete()
    }

    render() {
        const { props, forms, index } = this.props
        //const date = forms[index].createdAt.toDate()
        //const time = dayjs(date).format('MM/DD HH:mm')
        //console.log(time)
        return (
            <div style={{position: 'relative'}}>
                <div onClick={this.moveToEditPage} className={props.classes.formContent}>
                    <div><img src='/' alt='' /></div>
                    <div>
                        <p style={{ fontSize: '1.5rem', margin: '2rem 0 1rem' }}>{forms[index].index}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 1rem' }}>
                            {/*{typeof time !== 'undefined' && <p style={{padding: '.6rem 0'}}>最終閲覧：{time}</p>}*/}
                        </div>
                    </div>
                </div>
                <IconButton props={this.props} onClick={this.deleteThisForm} style={{ padding: '.6rem', marginLeft: '0rem', position: 'absolute', top: '60%', right: '15%' }}>
                    <MoreVertIcon />
                </IconButton>
            </div>
        )
    }
}

const Forms = ({ forms, props, formValues }) => {
    if (forms.length === 0) return <div>作成中のフォームはありません</div>
    return (
        <div className={props.classes.forms}>
            {/*}
            <Button
                type='submit'
                color='primary'
                variant='outlined'
                className={props.classes.formContent}
                style={{ fontSize: '4rem', borderColor: `${theme.palette.primary.main}` }}
            >
                +
            </Button>
            */}
            {forms.map((state, index) => {
                return <FormContent formValues={formValues} props={props} key={index} index={index} forms={forms} form={forms[index]} />
            })}
        </div>
    )
}

class FormList extends Component {
    constructor(props) {
        super(props);
        this.addNewForm = this.addNewForm.bind(this);
    }

    validateAddedIndex(values) {
        const forms = this.props.formValues.forms
        let i;
        for (i = 0; i < forms.length; i++) {
            if (values.index === forms[i].index) return true;
        }
    }

    async setAtFirestore(values) {
        //this.props.addFormRequest(values);
        const querys = []
        await db.collection('forms').add({
            index: values.index,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            title: 'タイトル',
            description: '説明',
            querys: querys
        })
    }

    getSelectedIndexData(values) {
        const forms = this.props.formValues.forms
        const selectedIndex = values.index
        let form = forms.filter(function (forms) {
            return forms.index === selectedIndex;
        })
        return form[0];
    }

    async addNewForm(values) {
        if (this.validateAddedIndex(values)) {
            throw new SubmissionError({ index: '既に存在する名前です' })
        } else {
            await this.setAtFirestore(values);
            let form = await this.getSelectedIndexData(values)
            this.props.history.push({
                pathname: '/create_form',
                state: { form: form }
            })
        }
    }

    render() {
        const { classes, formValues, handleSubmit } = this.props;
        const forms = formValues.forms
        return (
            <React.Fragment>
                <Container className={classes.container}>
                    <div className={classes.title}>
                        <h2>フォーム一覧</h2>
                    </div>
                    <div className={classes.contents}>
                        <form onSubmit={handleSubmit(this.addNewForm)} style={{ display: 'flex', width: '90%', margin: '0 auto 2rem' }}>
                            <Field name='index' label='form name' type='text' component={renderInput} required />
                            <Button
                                type='submit'
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                            >
                                新規作成
                            </Button>
                        </form>
                        {typeof forms !== "undefined" ? <Forms formValues={formValues} forms={forms} props={this.props} /> : <div style={{ textAlign: 'center' }}>loading...</div>}
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

FormList = reduxForm({
    form: 'formList'
})(FormList)

const mapStateToProps = (state) => {
    return {
        formValues: state.firestore.ordered
    }
}

const mapDispatchToProps = ({ addFormRequest })

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'forms' }])
)(FormList)

