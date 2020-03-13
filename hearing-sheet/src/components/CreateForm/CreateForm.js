import React, { Component } from 'react';

import { compose } from 'redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import lightGreen from '@material-ui/core/colors/lightGreen';
import { FormHelperText } from '@material-ui/core';
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

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
        fields,
        label,
        row = true,
        required = 'false',
        classes,
        rootClass = '',
    }) => (
        <FormControl classs={{root: rootClass}}>
        {fields.map((name, q_id) => (
            <div key={q_id} className={classes.content}>
                <Field
                    component={renderInput}
                    name={`${q_id}.radio_question`}
                    label='質問'
                />
                {fields.map((name, a_id) => (
                    <div key={a_id} className={classes.choices}>
                        <Field
                            component={renderInput}
                            name={`${a_id}.radio_choice`}
                            label='回答'
                        />
                        <Button onClick={() => fields.remove(a_id)}>削除</Button>                 
                    </div>
                ))}
                <div>
                    <Button onClick={() => fields.push({})}>選択肢を追加</Button>              
                </div>
                <Button onClick={() => fields.remove(q_id)}>削除</Button>
            </div>
        ))}
        <div>
            <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => fields.push({})}
            >
                選択肢式の質問を追加
            </Button>
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
        fields,
        required = 'false',
        classes,
        rootClass = '',
    }) => (
        <FormControl classes={{root: rootClass}}>
            {fields.map((name, id) => (
                <div key={id} className={classes.content}>
                    <Field
                        component={renderInput}
                        name={`${id}.text_question`}
                        label='質問'
                    />
                    <Field
                        component={renderInputDisabled}
                        name={`${name}.disabled`}
                        label={`回答(記述式)`}
                    />
                    <Button onClick={() => fields.remove(id)}>削除</Button>
                </div>
            ))}
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => fields.push({})}
                >
                    記述式の質問を追加
                </Button>
            </div>
        </FormControl>
    )
)   

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.props.initialize({
            title: '広報アンケート',
        })
    }
    submit(values) {
        console.log(values);
    }

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.form}>
                    <form className={classes.contents} onSubmit={handleSubmit(this.submit)}>
                        <div className={classes.head}>
                            <Field label="タイトル" name="title" type="text" component={renderTitleField} required />
                            <Field label="フォームの説明" name="description" type="text" component={renderInput} required />
                        </div>
                        <FieldArray name='contents_text_query' component={renderTextQuery} rootClass={classes.formControl} />
                        <FieldArray name='contens_radio_query' component={renderRadioQuery} rootClass={classes.formControl} /> 
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

CreateForm = reduxForm({
    form: 'form'
})(CreateForm);

const mapDispatchToProps = ({ createForm })

export default compose(
    withStyles(styles),
    connect(
        null,
        mapDispatchToProps
    )
)(CreateForm)
