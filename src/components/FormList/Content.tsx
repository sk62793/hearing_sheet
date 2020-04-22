import React, { useState } from 'react';
import { IconButton, makeStyles, createStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import dayjs from 'dayjs'
import { db } from '../../configureFirebase';
import RenameModal from './RenameModal'
import { fetchDelete } from '../../sagas/fetch';
import { deleteGCS } from '../../config/gcs_config';

const useStyles = makeStyles((theme) => createStyles({
    formContent: {
        height: '10rem',
        width: '16rem',
        border: '.1rem solid #ccc',
        borderRadius: '.5rem',
        margin: '1rem',
        textAlign: 'center',
        '&:hover': {
            border: `.1rem solid ${theme.palette.primary.main}`
        }
    }
}))

interface Query {
    choices: string[] | null,
    path: string | null,
    question: string,
    type: string
}

const Content = (props: any) => {
    const classes = useStyles();
    const { form, index, forms } = props
    //const date = form.createdAt.toDate()
    //const time = dayjs(date).format('MM/DD HH:mm')
    //console.log(time)

    const moveToEditPage = () => {
        const form = props.form
        props.props.history.push({
            pathname: '/edit',
            state: { form: form, name: form.name }
        })
    }

    const [modalOpen, setModalOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const openModal = () => setModalOpen(true)

    const closeModal = () => setModalOpen(false)

    const deleteThisForm = () => {
        const queries = props.form.queries
        const id = props.form.id
        queries.map((query: Query, index: number) => {
            if (query.path !== '') {
                let url = `${deleteGCS}${id}${index}`
                fetchDelete(url)
            }
        })
        db.collection('forms').doc(id).delete()
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <div onClick={moveToEditPage} className={classes.formContent}>
                    <div><img src='/' alt='' /></div>
                    <div>
                        <p style={{ fontSize: '1.5rem', margin: '2rem 0 1rem' }}>{form.name}</p>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 1rem' }}>
                            {/* {typeof time !== 'undefined' && <p style={{padding: '.6rem 0'}}>最終閲覧：{time}</p>} */}
                        </div>
                    </div>
                </div>
                <IconButton
                    onClick={openModal}
                    style={{ padding: '.6rem', position: 'absolute', top: '60%', right: '30%' }}
                >
                    <CreateIcon />
                </IconButton>
                <IconButton
                    onClick={deleteThisForm}
                    style={{ padding: '.6rem', position: 'absolute', top: '60%', right: '15%' }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
            {modalOpen ?
                <RenameModal
                    index={index}
                    forms={forms}
                    closeModal={closeModal}
                />
            : null}
        </>
    )
}

export default Content
