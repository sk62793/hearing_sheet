import React from 'react';
import {
    FormControl,
    Input,
    FormHelperText
} from '@material-ui/core';

export const renderInput = (props: any) => {
    const { input, label, name, meta: { touched, error }, type = 'text', required = false, rootClass = '', text, disabled } = props
    return (
        <FormControl
            classes={{ root: rootClass }}
            required={required}
            error={!!(touched && error)}
            style={{
                width: '100%',
                height: '4rem',
                marginTop: '1.6rem',
            }}
        >
            <Input
                style={{
                    fontSize: '1.4rem',
                }}
                placeholder={label}
                label={label}
                name={name}
                type={type}
                value={text}
                {...input}
                disabled={disabled}
            />
            {touched && error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}
