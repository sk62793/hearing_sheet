import React from 'react';
import { Field } from 'redux-form';
import {
    withStyles,
    Button,
} from '@material-ui/core';
import { renderInput } from './Input.js';

export const Choices = withStyles(theme => ({
    choices: {
        listStyle: 'none',
        display: 'flex',
    },
}))(
    ({
        classes,
        fields,
        meta: { error }
    }) => (
        <ul style={{width: '100%', padding: '0'}}>
            <li style={{listStyle: 'none'}}>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={() => fields.push()}
                >
                    選択肢を追加
                </Button>
            </li>
            {fields.map((name, index) => (
                <li key={index} className={classes.choices}>
                    <div style={{lineHeight: '4rem', margin: '1.2rem 1rem 0 0'}}>○</div>
                    <Field
                        name={name}
                        type="text"
                        component={renderInput}
                        label={`選択肢 ${index + 1}`}
                        required={true}
                    />
                    <Button
                        className={classes.button}
                        style={{margin: '1rem .5rem'}}
                        variant="outlined"
                        color="primary"
                        onClick={() => fields.remove(index)}
                    >
                        削除
                    </Button>
                </li>
            ))}
            {error && <li>{error}</li>}
        </ul>
    )
)
