import React from 'react';
import { Field } from 'redux-form';
import { FormControl, makeStyles } from '@material-ui/core';
import { renderInput } from '../Fields/Input';

const useStyles = makeStyles({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff',
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    }
})

export const TextQuery = (props: any) => {
    const { index } = props
    const classes = useStyles();
    return (
        <FormControl　style={{ width: '85%', marginRight: '1rem' }}>
            <div className={classes.content}>
                <Field
                    component={renderInput}
                    name={`queries.${index}.question`}
                    label='質問'
                    required={true}
                />
                <Field
                    component={renderInput}
                    name={`queries.${index}.answer`}
                    label={`回答(記述式)`}
                    disabled={true}
                />
            </div>
        </FormControl>
    )
}
