import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector, InjectedFormProps } from 'redux-form';
import { makeStyles, Button } from '@material-ui/core';
import { requestUpdateBriefingForm } from '../../actions';
import { renderInput } from '../Fields/Input'
import { TitleField } from '../Queries/TitleQuery'
import { Queries } from './Queries'

const useStyles = makeStyles({
    head: {
        border: '.1rem solid #eee',
        backgroundColor: '#fff',
        borderRadius: '.8rem',
        padding: '2.2rem 2.2rem 2.4rem',
    },
    button: {
        backgroundColor: '#fff',
        zIndex: 10,
        padding: '1.5rem',
        marginTop: '1rem'
    }
})

interface Query {
    choices: string[] | null,
    path: string | null,
    question: string,
    type: string
}

interface Values {
    title: string,
    description: string,
    queries: Query[]
}

interface FormElement extends Values {
    id: string,
    name: string,
    createdAt: { seconds: number, nanoseconds: number }
}

interface IEditorProps {
    forms: any,
    props: any
}

let EditFormComponent: React.FC<IEditorProps & InjectedFormProps<{}, IEditorProps>> = (props: any) => {
    const { handleSubmit, queries } = props
    const classes = useStyles();

    const selectCurrentData = (props: any) => {
        let form: FormElement[] = props.forms.filter((element: FormElement) => element.name === props.props.location.state.name);
        return form[0];
    }

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
            queries.map((query: Query, index: number) => {
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

    const submit = (values: Values) => {
        const id = form.id
        const previousQueries = form.queries
        props.requestUpdateBriefingForm(values, id, previousQueries, props)
    }

    const setUrl = (index: number, acceptedFiles: any) => {
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
            <Button variant="outlined" color="primary" type="submit" className={classes.button}>
                保存
            </Button>
        </form>
    )
}

const EditForm = reduxForm<{}, IEditorProps>({
    form: 'formValues',
    enableReinitialize: true
})(EditFormComponent)

const selector = formValueSelector('formValues')
const EditBriefingForm = connect(state => {
    const queries = selector(state, 'queries')
    return { queries }
})(EditForm)

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
