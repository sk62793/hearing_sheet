import React from 'react';
import { Field } from 'redux-form';
import {
    withStyles,
    FormControl
} from '@material-ui/core';
import { renderInput } from '../Fields/Input.js';
import { renderDropzone } from '../Fields/Dropzone.js'
import { renderPreview } from '../Fields/Preview.js'

export const ImageQuery = withStyles(theme => ({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff',
        margin: '1rem auto 0',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    },
}))(
    ({
        classes,
        index,
        queries,
        input,
        setUrl
    }) => {
        return (
            <FormControl style={{ width: '85%', marginRight: '1rem' }}>
                <div>
                    <Field
                        component={renderInput}
                        name={`queries.${index}.question`}
                        label='質問'
                        required={true}
                    />
                    <Field
                        type='field'
                        component={renderDropzone}
                        name={`queries.${index}.file`}
                        queries={queries}
                        index={index}
                        setUrl={setUrl}
                    />
                    <Field
                        component={renderPreview}
                        name={`queries.${index}.path`}
                        queries={queries}
                        index={index}
                    />
                </div>
            </FormControl>
        )
    }
)
