import React from 'react';
import { Field } from 'redux-form';
import { makeStyles, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { renderInput } from './Input';

const useStyles = makeStyles({
    choices: {
        listStyle: 'none',
        display: 'flex',
    },
    button: {
        backgroundColor: '#fff',
        zIndex: 10,
        padding: '1.5rem',
        marginTop: '1rem'
    }
})

export const Choices = (props: any) => {
    const classes = useStyles();
    const { fields, meta: { error } } = props
    return (
        <ul style={{ width: '100%', padding: '0' }}>
            {fields.map((name: string, index: number) => (
                <li key={index} className={classes.choices}>
                    <div style={{ lineHeight: '4rem', margin: '1.2rem 1.4rem 0' }}>○</div>
                    <Field name={name} type="text" component={renderInput} label={`選択肢 ${index + 1}`} required={true} />
                    <IconButton style={{margin: '1.2rem 0'}} onClick={() => fields.remove(index)}>
                        <DeleteIcon />
                    </IconButton>
                </li>
            ))}
            <li className={classes.choices}>
                <IconButton color='primary' style={{padding: '0 1.2rem', margin: '.5rem 0'}} onClick={() => fields.push()}>
                    <AddIcon style={{fontSize: 'large'}} />
                </IconButton>
                <Field name='disabled' type="text" component={renderInput} label={`選択肢`} disabled={true} />
            </li>
            {error && <li>{error}</li>}
        </ul>
    )
}
