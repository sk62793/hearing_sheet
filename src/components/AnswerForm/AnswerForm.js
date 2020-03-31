import React, { Component } from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { withStyles, TextField, Input } from '@material-ui/core';

import lightGreen from '@material-ui/core/colors/lightGreen';

import { FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import { firestoreConnect } from 'react-redux-firebase';
import { sendAnswerRequest } from '../actions';


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
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
    },
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.4rem',
    },
    button: {
        backgroundColor: '#fff',
        padding: ' 1rem 2rem',
        fontSize: '1.4rem',

    },
});

const renderTitleField = withStyles(theme => ({
    form: {
        width: '100%',
        height: '6rem',
        marginTop: '1.6rem',
    },
    title: {
        fontSize: '3.2rem',
    },
}))(
    ({
        input,
        type='text',
        classes,
        required = false,
        text,
    }) => (
    <FormControl
        className={classes.form}
    >
        <TextField

            className={classes.title}
            type={type}
            value={text}
            InputProps={{
                classes: {
                    input: classes.title,    
                },
            }}
        />
    </FormControl>
    )
)

const renderInput =  ({
    input,
    label,
    name,
    meta: { touched, error },
    type='text',
    required = false,
    rootClass = '',
    text,
}) => (
    <FormControl
        classes={{root: rootClass}}
        required={required}
        error={!!(touched && error)}
        style={{
            width: '100%',
            height: '4rem',
            marginTop: '1.6rem',
        }}
    >
        <Input
            style={{
                fontSize: '1.4rem',
            }}
            placeholder={label}
            label={label}
            name={name}
            type={type}
            value={text}
            { ...input }
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
)

const RenderChoices = withStyles(theme => ({
    choices: {
        listStyle: 'none',
        display: 'flex',
    },
}))(
    ({
        classes,
        fields,
        choices,
    }) => (
        <ul style={{width: '100%', padding: '0'}}>
            {choices.map((name, id) => (
                <li key={id} className={classes.choices}>
                    <Field
                        name={choices[id]}
                        type="text"
                        component={renderInput}
                        text={choices[id]}
                    />
                </li>
            ))}
        </ul>
    )
)

const renderRadioQuery = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: '100%',
    },
    choices: {
        display: 'flex',
    },
}))( 
    ({
        classes,
        rootClass = '',
        id,
        question_text,
        choices,
    }) => (
        <FormControl classes={{root: rootClass}} style={{width: '100%'}}>
            <div>{question_text}</div>
            <RadioGroup>
                {
                    choices.map((name, id) => (
                        <FormControlLabel key={id} value={choices[id]} control={<Radio />} label={choices[id]} />
                    ))
                }
            </RadioGroup>
    </FormControl>
    )
)

const renderTextQuery = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: '100%',
    },
}))(
    ({
        classes,
        rootClass = '',
        id,
        question_text,
        querys,
    }) => (
        <FormControl classes={{root: rootClass}} style={{width: '100%'}}>
            <div>{question_text}</div>
            <Field
                component={renderInput}
                name={`querys.${id}.answer`}
                label={`回答(記述式)`}
                className={classes.content}
            />
        </FormControl>
    )
)

const renderTypeSelect = ({
    input: { value, onChange },
    label,
    children,
    meta: { touched, error },
    onFieldChange,
    required = false,
    rootClass = '',
}) => (
    <TextField
        required={required}
        classes={{root: rootClass}}
        select
        label={label}
        variant='outlined'
        value={value}
        onChange={e => {
        onChange(e.target.value)
        onFieldChange && onFieldChange(e.target.value)
        }}
        helperText={touched && error}
    >
       {children}
    </TextField>
)

const RenderQuery = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff',
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    },
}))(
    ({
        fields,
        classes,
        rootClass = '',
        answerFormValues,
        querys,
    }) => (
        <FormControl classes={{root: rootClass}} style={{width: '100%'}}>
            {querys.map((name, id) => {
                return (
                    <div key={id} className={classes.content}>
                        {querys[id].type === 'text_query' && (
                            <Field name={`answerForm.${querys}[id]`} id={id} component={renderTextQuery} querys={querys} question_text={querys[id].question} />
                        )}
                        {querys[id].type === 'radio_query' && (
                            <Field name={`answerForm.${querys}[id]`} id={id} component={renderRadioQuery} querys={querys} question_text={querys[id].question} choices={querys[id].choices} />
                        )}
                    </div>
                )
            })}
        </FormControl>
    )
)

const Querys = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    },
    head: {
        border: '.1rem solid #eee',
        backgroundColor: '#fff',
        borderRadius: '.8rem',
        padding: '2.2rem 2.2rem 2.4rem',
    },
    title: {
        fontSize: '3.2rem',
        fontWeight: '500',
        margin: '.1rem 0',
    },
    greed: {
        fontSize: '1.2rem',
        marginTop: '1.2rem', 
    },
}))(
    ({
        fields,
        classes,
        rootClass = '',
        createFormValue,
        form,
        querys,
        name,
        id,
    }) => (
        <FormControl classes={{root: rootClass}}>
            <div className={classes.head}>
                <div className={classes.title}>{form.title}</div>
                <div className={classes.greed}>{form.description}</div>
            </div>
            <RenderQuery querys={querys} />
        </FormControl>
    )
)

class AnswerForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(values) {
        this.props.sendAnswerRequest(values);
    }

    render() {
        const { classes, handleSubmit, formValues, input } = this.props;
        const form = _.filter(formValues.form, {});
        return (
            <div className={classes.container}>
                <div className={classes.form}>
                    <form className={classes.contents} onSubmit={handleSubmit(this.submit)}>
                        {
                            form.map(
                                (key, id) => (
                                    <Querys key={id} id={id} querys={form[id].querys} form={form[id]} />
                                )
                            )
                        }
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            type="submit"
                            style={{
                                marginTop: '1rem'
                            }}                            
                        >
                            回答する
                        </Button>
                    </form>
                    <Link to='/create_form'>作成画面へ</Link>
                </div>
            </div>
        );
    }
}

AnswerForm = reduxForm({
    form: 'answerForm',
})(AnswerForm)

const mapStateToProps = (state) => {
    return {
        formValues: state.firestore.ordered
    }
}

const mapDispatchToProps = ({ sendAnswerRequest })

export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'form', doc: 'question' }
    ])
)(AnswerForm)
