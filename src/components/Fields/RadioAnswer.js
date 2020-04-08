import React from 'react';
import {
    withStyles,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';

export const RadioAnswer = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff', 
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: '100%',
    },
    choices: {
        display: 'flex',
    },
}))( 
    ({
        classes,
        rootClass = '',
        index,
        question_text,
        choices,
    }) => (
        <FormControl classes={{root: rootClass}} style={{width: '100%'}}>
            <div>{question_text}</div>
            <RadioGroup>
                {
                    choices.map((name, index) => (
                        <FormControlLabel key={index} value={choices[index]} control={<Radio required />} label={choices[index]} />
                    ))
                }
            </RadioGroup>
    </FormControl>
    )
)
