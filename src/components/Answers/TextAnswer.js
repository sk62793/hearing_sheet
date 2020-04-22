import React from 'react';
import { Field } from 'redux-form';
import {
    withStyles,
    FormControl
} from '@material-ui/core';
import { renderInput } from '../Fields/Input';

export const TextAnswer = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: '100%',
    },
}))(
    ({
        classes,
        rootClass = '',
        index,
        question_text,
    }) => (
        <FormControl classes={{root: rootClass}} style={{width: '100%'}}>
            <div>{question_text}</div>
            <Field
                component={renderInput}
                name={`queries.${index}.answer`}
                label={`回答(記述式)`}
                className={classes.content}
                required
            />
        </FormControl>
    )
)

