import React from 'react';
import { Field } from 'redux-form';
import {
    withStyles,
    FormControl
} from '@material-ui/core';
import { renderInput } from './Input.js';
import { renderDropzone } from './Dropzone.js'

export const ImageQuery = ({
    index,
    querys,
    input,
}) => {
    return(
        <FormControl style={{width: '85%', marginRight: '1rem'}}>
            <div>
                <Field
                    component={renderInput}
                    name={`querys.${index}.question`}
                    label='質問'
                    required={true}
                />
                <Field
                    type='field'
                    component={renderDropzone}
                    name={`querys.${index}.answer`}
                    index={index}
                    querys={querys}
                />
            </div>
        </FormControl>
    )
}

