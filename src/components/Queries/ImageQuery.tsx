import React from 'react';
import { Field } from 'redux-form';
import { FormControl } from '@material-ui/core';
import { renderInput } from '../Fields/Input';
import { renderDropzone } from '../Fields/Dropzone'
import { renderPreview } from '../Fields/Preview'

export const ImageQuery = (props:any) => {
    const { index, queries, setUrl } = props
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

