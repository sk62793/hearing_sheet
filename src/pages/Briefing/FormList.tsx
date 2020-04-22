import React from 'react';
import { useSelector } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
import { useFirestoreConnect } from 'react-redux-firebase';
import CreateNewForm from '../../components/FormList/Create'
import FormListContent from '../../components/FormList/Content'
import { RouteComponentProps } from 'react-router';

const useStyles = makeStyles({
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
    forms: {
        display: 'flex',
        flexWrap: 'wrap',
    },
})

interface Props extends RouteComponentProps<void> {}

const FormList: React.FC<Props> = (props: any) => {
    useFirestoreConnect('forms')
    const forms: any = useSelector((state: any) => state.firestore.ordered.forms)
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <div className={classes.title}>
                <h2>フォーム一覧</h2>
            </div>
            <div className={classes.contents}>
                <CreateNewForm props={props} forms={forms} />
                {typeof forms !== "undefined" ?
                    <div>
                        {forms.length !== 0 ?
                            <div className={classes.forms}>
                                {forms.map((form: any, index: number) => {
                                    return <FormListContent props={props} key={index} index={index} forms={forms} form={form} />
                                })}
                            </div>
                            : <div>作成中のフォームはありません</div>
                        }
                    </div>
                    : <div style={{ textAlign: 'center' }}>loading...</div>
                }
            </div>
        </Container>
    )
}

export default FormList

