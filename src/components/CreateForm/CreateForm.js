import React, { Component } from 'react';

import { compose } from 'redux';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import lightGreen from '@material-ui/core/colors/lightGreen';

import { FormHelperText } from '@material-ui/core';
import { FormControl, MenuItem } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import { createForm } from '../actions';

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
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
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
        meta: { touched, error },
        type='text',
        classes,
        required = false,
    }) => (
    <FormControl
        className={classes.form}
        required={required}
        error={!!(touched && error)}
    >
        <TextField
            className={classes.title}
            error={!!(touched && error)}
            type={type}
            required={required}
            { ...input }
            helperText={touched && error}
//            disableUnderline='true'
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
            { ...input }
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
)

const renderInputDisabled =  ({
    input,
    label,
    name,
    meta: { touched, error },
    type='text',
    required = false,
    rootClass = '',
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
            disabled
            name={name}
            placeholder={label}
            label={label}
            type={type}
            { ...input }
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
)

const renderChoices = withStyles(theme => ({
    choices: {
        listStyle: 'none',
        display: 'flex',
    },
}))(
    ({
        classes,
        fields,
        meta: { error }
    }) => (
        <ul style={{width: '100%', padding: '0'}}>
            <li style={{listStyle: 'none'}}>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => fields.push()}
                >
                    追加
                </Button>
            </li>
            {fields.map((name, index) => (
                <li key={index} className={classes.choices}>
                    <div style={{lineHeight: '4rem', margin: '1.2rem 1rem 0 0'}}>○</div>
                    <Field
                        name={name}
                        type="text"
                        component={renderInput}
                        label={`Choice #${index + 1}`}
                    />
                    <Button
                        className={classes.button}
                        style={{margin: '1rem .5rem'}}
                        variant="outlined"
                        color="primary"
                        onClick={() => fields.remove(index)}
                    >
                        削除
                    </Button>
                </li>
            ))}
            {error && <li>{error}</li>}
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
        width: 'calc(100% - 4.8rem)',
    },
    choices: {
        display: 'flex',
    },
}))( 
    ({
        classes,
        rootClass = '',
        index,
    }) => (
        <FormControl classs={{root: rootClass}}>
            <div className={classes.content}>
                <Field
                    component={renderInput}
                    name={`createForm.${index}.question`}
                    label='質問'
                />
                <FieldArray name={`createForm.${index}.choices`} component={renderChoices} />
            </div>
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
        width: 'calc(100% - 4.8rem)',
    },
}))(
    ({
        classes,
        rootClass = '',
        index,
    }) => (
        <FormControl classes={{root: rootClass}}>
            <div className={classes.content}>
                <Field
                    component={renderInput}
                    name={`createForm.${index}.question`}
                />
                <Field
                    component={renderInputDisabled}
                    name={`createForm.${index}.answer`}
                    label={`回答(記述式)`}
                />
            </div>
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

const renderQuery = withStyles(theme => ({
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
        createFormValue,
    }) => (
        <FormControl classes={{root: rootClass}}>
            {fields.map((name, index) => {
                return (
                    <div key={index} className={classes.content}>
                        <Field name={`createForm.${index}.type`} component={renderTypeSelect}>
                            <MenuItem value=''>未選択</MenuItem>
                            <MenuItem value='text_query'>テキスト</MenuItem>
                            <MenuItem value='radio_query'>ラジオ</MenuItem>
                        </Field>
                        {createFormValue[index].type === 'text_query' && (
                            <Field name={`createForm.${index}.question`} index={index} component={renderTextQuery} />
                        )}
                        {createFormValue[index].type === 'radio_query' && (
                            <Field name={`createForm.${index}.question`} index={index} component={renderRadioQuery} />
                        )}
                        <Button onClick={() => fields.remove(index)}>削除</Button>
                    </div>
                )
            })}
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{backgroundColor: '#fff'}}
                    onClick={() => fields.push({})}
                >
                    質問を追加
                </Button>
            </div>
        </FormControl>
    )
)

class CreateFormValuesForm extends Component {
    constructor(props) {
        super(props);
        this.props.initialize({
            title: '広報アンケート',
        })
        this.submit = this.submit.bind(this)
    }
    submit(values) {
        const { dispatch } = this.props
        dispatch({type: 'CREATE_FORM_REQUESTED', payload: {values}})
        this.props.history.push('/form')
    }

    render() {
        const { classes, fields, handleSubmit, createFormValue } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.form}>
                    <form className={classes.contents} onSubmit={handleSubmit(this.submit)}>
                        <div className={classes.head}>
                            <Field label="タイトル" name="title" type="text" component={renderTitleField} required />
                            <Field label="フォームの説明" name="description" type="text" component={renderInput} required />
                        </div>
                        <FieldArray name='createForm' createFormValue={createFormValue} component={renderQuery} />
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            type="submit"
                        >
                            送信する
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

CreateFormValuesForm = reduxForm({
    form: 'createFormValues'
})(CreateFormValuesForm)

const selector = formValueSelector('createFormValues')
CreateFormValuesForm = connect(state => {
    const createFormValue = selector(state, 'createForm')
    return {
        createFormValue,
    }
})(CreateFormValuesForm)

const mapDispatchToProps = ({ createForm })

export default compose(
    withStyles(styles),
    connect(
        null,
        mapDispatchToProps
    )
)(CreateFormValuesForm)
