import React from 'react';
import { Field } from 'redux-form';
import {
    withStyles,
    FormControl
} from '@material-ui/core';
import { renderInput } from './Input.js';

export const TextQuery = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    },
}))(
    ({
        type='text',
        classes,
        rootClass = '',
        index,
        name,
    }) => {
        return(
            <FormControl classes={{root: rootClass}} style={{width: '85%', marginRight: '1rem'}}>
                <div className={classes.content}>
                    <Field
                        component={renderInput}
                        name={`querys.${index}.question`}
                        label='質問'
                        required={true}
                    />
                    <Field
                        component={renderInput}
                        name={`querys.${index}.answer`}
                        label={`回答(記述式)`}
                        input={{disabled:true}}
                    />
                </div>
            </FormControl>
        )
    }
)
