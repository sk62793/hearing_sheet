import React, { Component } from 'react';

import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { FormHelperText } from '@material-ui/core';
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import Button from '@material-ui/core/Button';

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

const renderInputField =  ({
    input,
    label,
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
            type={type}
            { ...input }
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
)

const renderRadio = ({
    input: { value, onChange },
    label,
    children,
    meta: { touched, error },
    onFieldChange,
    row = true,
    required = false,
    rootClass = '',
}) => (
    <FormControl
        classes={{root: rootClass}}
        required={required}
        error={!!(touched && error)}
        style={{ width: '10rem' }}
    >
        <RadioGroup
            row={row}
            label={label}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
                onFieldChange && onFieldChange(e.target.value)
            }}
        >
            {children}
        </RadioGroup>
        {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
)

class InputForm extends Component {
    submit = (values) => {
        console.log(values);
    }

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <React.Fragment>
                <div className={classes.container}>
                    <div className={classes.form}>
                        <div className={classes.head}>
                            <h3 className={classes.title}>広報アンケート</h3>
                            <p className={classes.greed}>広報のネタ収集のため何でも書いてください</p>
                        </div>
                        <form onSubmit={handleSubmit(this.submit)}>
                            <div className={classes.content}>
                                <p>メールアドレス</p>
                                <Field label="mail" name="mail" type="text" component={renderInputField} required />
                            </div>
                            <div className={classes.content}>
                                <p>部署</p>
                                <Field name="belong" component={renderRadio}>
                                    <FormControlLabel value='営業部' control={<Radio />} label='営業部' />
                                    <FormControlLabel value='経理部' control={<Radio />} label='経理部' />
                                    <FormControlLabel value='経営企画部' control={<Radio />} label='経営企画部' />
                                    <FormControlLabel value='人事部' control={<Radio />} label='人事部' />
                                    <FormControlLabel value='総務部' control={<Radio />} label='総務部' />
                                </Field>
                            </div>
                            <div className={classes.content}>
                                <p>好きな趣味は何ですか？</p>
                                <Field label="趣味" name="hobby" type="text" component={renderInputField} required />              
                            </div>
                            <div className={classes.content}>
                                <p>最近ハマっていることは何ですか？</p>
                                <Field label="interest" name="interest" type="text" component={renderInputField} required />              
                            </div>
                            <div className={classes.content}>
                                <p>最近のニュースで気になることはありますか？</p>
                                <Field label="latest news" name="latest_news" type="text" component={renderInputField} required />              
                            </div>
                            <div className={classes.content}>
                                <p>最近読んだ面白い本があったら教えてください</p>
                                <Field label="book" name="book" type="text" component={renderInputField} required />              
                            </div>
                            <div className={classes.content}>
                                <p>最近見た映画や見たい映画があれば教えてください</p>
                                <Field label="movie" name="movie" type="text" component={renderInputField} required />              
                            </div>
                            <div className={classes.content}>
                                <p>あなたの最近のニュースを教えてください</p>
                                <Field label="your news" name="your_news" type="text" component={renderInputField} required />              
                            </div>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                                type="submit"
                            >
                                回答する
                            </Button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

InputForm = reduxForm({
    form: 'form'
})(InputForm);

export default compose(
    withStyles(styles),
    connect(
        null,
        null
    )
)(InputForm)
