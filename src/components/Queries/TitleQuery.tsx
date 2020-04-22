import React from 'react';
import { FormControl, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        width: '100%',
        height: '6rem',
        marginTop: '1.6rem',
    },
    title: {
        fontSize: '3.2rem',
        fontWeight: 500,
        margin: '.1rem 0',
    }
})

export const TitleField = (props: any) => {
    const { input, meta: { touched, error }, required = false, label } = props
    const classes = useStyles();
    return (
        <FormControl
            className={classes.form}
            required={required}
            error={!!(touched && error)}
        >
            <TextField
                className={classes.title}
                error={!!(touched && error)}
                type='text'
                required={required}
                placeholder={label}
                {...input}
                helperText={touched && error}
                InputProps={{
                    classes: {
                        input: classes.title,
                    },
                }}
            />
        </FormControl>
    )
}
