import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    withStyles,
    FormControl,
    Button
} from '@material-ui/core';
import _ from 'lodash';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { firestoreConnect } from 'react-redux-firebase';
import { sendAnswerRequest } from '../actions';
import { TextAnswer } from '../Fields/TextAnswer.js'
import { RadioAnswer } from '../Fields/RadioAnswer.js'

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
        classes,
        rootClass = '',
        querys,
    }) => (
        <FormControl classes={{root: rootClass}} style={{width: '100%'}}>
            {querys.map((name, index) => {
                return (
                    <div key={index} className={classes.content}>
                        {querys[index].type === 'text_query' && (
                            <Field
                                name={`answerForm.${querys}[index]`}
                                index={index}
                                component={TextAnswer}
                                querys={querys}
                                question_text={querys[index].question}
                                required
                            />
                        )}
                        {querys[index].type === 'radio_query' && (
                            <Field
                                name={`answerForm.${querys}[index]`}
                                index={index}
                                component={RadioAnswer}
                                querys={querys}
                                question_text={querys[index].question}
                                required
                                choices={querys[index].choices}
                            />
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
        classes,
        rootClass = '',
        form,
        querys,
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
        const { classes, handleSubmit, formValues } = this.props;
        const form = _.filter(formValues.form, {});
        return (
            <div className={classes.container}>
                <div className={classes.form}>
                    <form className={classes.contents} onSubmit={handleSubmit(this.submit)}>
                        {
                            form.map(
                                (key, index) => (
                                    <Querys key={index} index={index} querys={form[index].querys} form={form[index]} required />
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
    form: 'answerFormValues',
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
        { collection: 'forms', doc: '2' }
    ])
)(AnswerForm)
