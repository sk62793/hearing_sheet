import React from 'react';
import { useSelector } from 'react-redux'
import { makeStyles, Theme } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Editor from '../../components/Edit/Editor'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

const useStyles = makeStyles({
    container: {
        margin: '0 auto',
        backgroundColor: lightGreen[50],
        padding: '2rem 0',
        width: '100%',
        minHeight: '75rem'
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
});

const EditPage: React.FC = (props:any, state:any) => {
    const classes = useStyles()

    useFirestoreConnect('forms')
    const forms:any = useSelector((state: any) => {
        return state.firestore.ordered.forms
    })
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                {isLoaded(forms) ? <Editor forms={forms} props={props} /> : <>読み込み中...</>}
            </div>
        </div>
    )
}

export default EditPage
