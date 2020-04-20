import React from 'react';
import { TextField } from '@material-ui/core';

export const TypeSelect = ({
    input: { value, onChange },
    label,
    children,
    meta: { touched, error },
    onFieldChange,
    required = true,
    rootClass = '',
}) => (
    <TextField
        required={required}
        classes={{root: rootClass}}
        select
        label={label}
        variant='outlined'
        value={value}
        onChange={e => {
        onChange(e.target.value)
        onFieldChange && onFieldChange(e.target.value)
        }}
        helperText={touched && error}
    >
       {children}
    </TextField>
)

