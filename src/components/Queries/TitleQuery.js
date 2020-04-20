import React from 'react';
import {
    withStyles,
    FormControl,
    TextField
}from '@material-ui/core';

export const TitleField = withStyles(theme => ({
    form: {
        width: '100%',
        height: '6rem',
        marginTop: '1.6rem',
    },
    title: {
        fontSize: '3.2rem',
        fontWeight: '500',
        margin: '.1rem 0',
    },
}))(
    ({
        input,
        meta: { touched, error },
        type='text',
        classes,
        required = false,
        label
    }) => (
    <FormControl
        className={classes.form}
        required={required}
        error={!!(touched && error)}
    >
        <TextField
            className={classes.title}
            error={!!(touched && error)}
            type={type}
            required={required}
            placeholder={label}
            { ...input }
            helperText={touched && error}
            InputProps={{
                classes: {
                    input: classes.title,    
                },
            }}
        />
    </FormControl>
    )
)
