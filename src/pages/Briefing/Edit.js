import React from 'react';
import { useSelector } from 'react-redux'
import { withStyles } from '@material-ui/core';
import lightGreen from '@material-ui/core/colors/lightGreen';
import Editor from '../../components/Edit/Editor.js'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

const styles = theme => ({
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
        margin: '1rem auto 0',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
        display: 'flex'
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
    button: {
        backgroundColor: '#fff',
        zIndex: '10',
        padding: '1.5rem',
        marginTop: '1rem'
    },
    option: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem 0'
    }
});

function EditPage(props) {
    useFirestoreConnect('forms')
    const forms = useSelector(state => state.firestore.ordered.forms)
    return (
        <div className={props.classes.container}>
            <div className={props.classes.form}>
                {isLoaded(forms) ? <Editor forms={forms} props={props} /> : <>読み込み中...</>}
            </div>
        </div>
    )
}

export default withStyles(styles)(EditPage)
