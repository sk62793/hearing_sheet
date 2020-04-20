import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import dayjs from 'dayjs'
import firebase, { db } from '../../Firebase';
import RenameModal from './RenameModal.js'
import { fetchDelete } from '../../sagas/fetch';
import { deleteGCS } from '../../Config';

class FormListContent extends Component {
    constructor(props) {
        super(props);
        this.state = { renameModalOpened: false }
        this.switchRenameModal = this.switchRenameModal.bind(this)
    }

    moveToEditPage() {
        const form = this.props.form
        this.props.props.history.push({
            pathname: '/edit',
            state: { form: form, id: form.id }
        })
    }

    switchRenameModal() {
        this.setState({ renameModalOpened: !this.state.renameModalOpened })
    }

    deleteThisForm() {
        const queries = this.props.form.queries
        const id = this.props.form.id
        queries.map((query, index) => {
            if (query.answer !== '') {
                let url = `${deleteGCS}${id}${index}`
                fetchDelete(url)
            }
        })
        db.collection('forms').doc(id).delete()
    }

    render() {
        const { props, form, index, forms } = this.props
        //const date = form.createdAt.toDate()
        //const time = dayjs(date).format('MM/DD HH:mm')
        //console.log(time)
        return (
            <>
                <div style={{ position: 'relative' }}>
                    <div onClick={() => { this.moveToEditPage() }} className={props.classes.formContent}>
                        <div><img src='/' alt='' /></div>
                        <div>
                            <p style={{ fontSize: '1.5rem', margin: '2rem 0 1rem' }}>{form.name}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 1rem' }}>
                                {/* {typeof time !== 'undefined' && <p style={{padding: '.6rem 0'}}>最終閲覧：{time}</p>} */}
                            </div>
                        </div>
                    </div>
                    <IconButton
                        props={this.props}
                        onClick={this.switchRenameModal}
                        style={{ padding: '.6rem', position: 'absolute', top: '60%', right: '30%' }}
                    >
                        <CreateIcon />
                    </IconButton>
                    <IconButton
                        props={this.props}
                        onClick={() => { this.deleteThisForm() }}
                        style={{ padding: '.6rem', position: 'absolute', top: '60%', right: '15%' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
                {this.state.renameModalOpened === true &&
                    <RenameModal
                        index={index}
                        forms={forms}
                        renameModalOpened={this.state.renameModalOpened}
                        switchRenameModal={this.switchRenameModal}
                    />
                }
            </>
        )
    }
}

export default FormListContent
