import React from 'react';
import { TextField } from '@material-ui/core';

export const TypeSelect = (props: any) => {
    const { input: { value, onChange }, label, children, onFieldChange, required = true, rootClass = ''} = props
    return (
        <TextField
            required={required}
            classes={{ root: rootClass }}
            select
            label={label}
            variant='outlined'
            value={value}
            onChange={e => {
                onChange(e.target.value)
                onFieldChange && onFieldChange(e.target.value)
            }}
        >
            {children}
        </TextField>
    );
}
