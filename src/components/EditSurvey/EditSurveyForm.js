import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import {
    withStyles,
    FormControl,
    MenuItem,
    Button,
} from '@material-ui/core';
import { firestoreConnect } from 'react-redux-firebase';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import { theme } from '../../index.js'
import lightGreen from '@material-ui/core/colors/lightGreen';
import { createFormRequest } from '../actions';
import { load } from '../actions';
import { renderInput } from '../Fields/Input.js'
import { TypeSelect } from '../Fields/TypeSelect.js'
import { Choices } from '../Fields/Choices.js'
import { TitleField } from '../Fields/Title.js'
import { RadioQuery } from '../Fields/RadioQuery.js'
import { TextQuery } from '../Fields/TextQuery.js'
import { ImageQuery } from '../Fields/ImageQuery.js'
import _ from 'lodash'
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';

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
        position: 'relative',
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
    },
    head: {
        border: '.1rem solid #eee',
        backgroundColor: '#fff',
        borderRadius: '.8rem',
        padding: '2.2rem 2.2rem 2.4rem',
    },
    greed: {
        fontSize: '1.2rem',
        marginTop: '1.2rem',
    },
});

const Query = ({ querys, index, props }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                {typeof querys[index].type === 'undefined' ?
                    <Field name={`querys.${index}`} index={index} component={TextQuery} /> :
                    <>
                        {querys[index].type === 'text' && (
                            <Field name={`querys.${index}`} index={index} component={TextQuery} />
                        )}
                        {querys[index].type === 'radio' && (
                            <Field name={`querys.${index}`} index={index} component={RadioQuery} />
                        )}
                        {querys[index].type === 'image' && (
                            <Field name={`querys.${index}`} querys={querys} index={index} component={ImageQuery} />
                        )}
                    </>
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem 0' }}>
                <Field name={`querys.${index}.type`} component={TypeSelect} props={{ required: true }}>
                    <MenuItem value='text'>テキスト</MenuItem>
                    <MenuItem value='radio'>ラジオ</MenuItem>
                    <MenuItem value='image'>画像</MenuItem>
                </Field>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{ backgroundColor: '#fff', marginTop: '2rem' }}
                    onClick={() => querys.remove(index)}
                >
                    削除
                </Button>
            </div>
        </div>
    )
}

const Querys = ({ fields, querys, props }) => {
    return (
        <>
            {
                fields.map((state, index) => {
                    return (
                        <Query key={index} props={props} querys={querys} index={index} />
                    )
                })
            }
            <Button
                variant="outlined"
                color="primary"
                style={{
                    backgroundColor: '#fff',
                    zIndex: '10',
                    padding: '1.5rem'
                }}
                onClick={() => fields.push({})}
            >
                質問を追加
            </Button>
        </>
    )
}

class EditSurveyForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }
    submit(values) {
        const id = this.props.formValues.id
        this.props.createFormRequest(values, id)
    }

    render() {
        const { handleSubmit, querysValue } = this.props
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field name='title' label='タイトル' component={TitleField} />
                <Field name='description' label='説明' component={renderInput} />
                {
                    typeof querysValue !== 'undefined' && <FieldArray name='querys' component={Querys} props={this.props} querys={querysValue} />
                }
                <Button
                    variant="outlined"
                    color="primary"
                    style={{
                        backgroundColor: '#fff',
                        zIndex: '10',
                        padding: '1.5rem'
                    }}
                    type="submit"
                >
                    保存
                </Button>
            </form>
        );
    }
}

EditSurveyForm = reduxForm({
    form: 'formValues',
    enableReinitialize: true
})(EditSurveyForm)

const selector = formValueSelector('formValues')
EditSurveyForm = connect(state => {
    const querysValue = selector(state, 'querys')
    return {
        querysValue,
    }
})(EditSurveyForm)

const mapStateToProps = (state, props) => {
    const form = props.props.location.state.form
    return {
        formValues: form,
        initialValues: {
            title: form.title,
            description: form.description,
            querys: form.querys,
        }
    }
}

const mapDispatchToProps = ({ createFormRequest, load })

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'forms' }])
)(EditSurveyForm)
