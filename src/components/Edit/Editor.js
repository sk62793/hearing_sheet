import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { Button } from '@material-ui/core';
import { requestUpdateBriefingForm } from '../../actions';
import { renderInput } from '../../components/Fields/Input.js'
import { TitleField } from '../../components/Queries/TitleQuery.js'
import { Queries } from './Queries.js'

const selectCurrentData = (props) => {
    let form;
    props.forms.forEach(function (element) {
        if (element.name === props.props.location.state.name) return form = element
    })
    return form
}

let EditBriefingForm = (props) => {
    const { handleSubmit, queries } = props
    const classes = props.props.classes
    let form = selectCurrentData(props)

    // ↓render前にfirestoreから取得した値を詰める
    useEffect(() => {
        props.change('title', form.title)
        props.change('description', form.description)
        props.change('queries', form.queries)
    }, [])

    // ↓質問のtype変更時の処理
    useEffect(() => {
        if (typeof queries !== 'undefined') {
            queries.map((query, index) => {
                if (query.type !== 'image') {
                    props.change(`queries.${index}.path`, null)
                    props.change(`queries.${index}.file`, null)
                }
                if (query.type !== 'radio') {
                    props.change(`queries.${index}.choices`, null)
                }
            })
        }
    })

    const submit = (values) => {
        const id = form.id
        const previousQueries = form.queries
        props.requestUpdateBriefingForm(values, id, previousQueries, props)
    }

    const setUrl = (index, acceptedFiles) => {
        if (typeof queries !== 'undefined') {
            if (queries[index].type === 'image' && acceptedFiles !== null) {
                let path = URL.createObjectURL(acceptedFiles[0])
                props.change(`queries.${index}.path`, path)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className={classes.head}>
                <Field name='title' label='タイトル' component={TitleField} />
                <Field name='description' label='説明' component={renderInput} />
            </div>
            {typeof queries !== 'undefined' && (
                <FieldArray name='queries' component={Queries} setUrl={setUrl} props={props} queries={queries} />
            )}
            <Button
                variant="outlined"
                color="primary"
                type="submit"
                className={classes.button}
            >
                保存
                </Button>
        </form>
    )
}

EditBriefingForm = reduxForm({
    form: 'formValues',
    enableReinitialize: true
})(EditBriefingForm)

const selector = formValueSelector('formValues')
EditBriefingForm = connect(state => {
    const queries = selector(state, 'queries')
    return { queries }
})(EditBriefingForm)

const mapStateToProps = () => {
    return {
        formValues: { form: {} },
        initialValues: {
            title: '',
            description: '',
            queries: '',
        }
    }
}

const mapDispatchToProps = ({ requestUpdateBriefingForm })

export default connect(mapStateToProps, mapDispatchToProps)(EditBriefingForm)
