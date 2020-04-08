import React from 'react';
import { Field, FieldArray } from 'redux-form';
import {
    withStyles,
    FormControl,
} from '@material-ui/core';
import { renderInput } from '../Fields/Input.js';
import { Choices } from '../Fields/Choices.js';

export const RadioQuery = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    },
    choices: {
        display: 'flex',
    },
}))( 
    ({
        classes,
        rootClass = '',
        index,
    }) => (
        <FormControl classs={{root: rootClass}} style={{width: '85%', marginRight: '1rem'}}>
            <div className={classes.content}>
                <Field
                    component={renderInput}
                    name={`queries.${index}.question`}
                    label='質問'
                    required={true}
                />
                <FieldArray name={`queries.${index}.choices`} component={Choices} />
            </div>
    </FormControl>
    )
)
