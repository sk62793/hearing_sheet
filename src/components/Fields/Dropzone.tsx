import React from 'react';
import Dropzone from 'react-dropzone';
import { FormControl } from '@material-ui/core';
import { theme } from '../../index'

export const renderDropzone = (props: any) => {
    const { input, index, setUrl } = props
    return (
        <FormControl>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <Dropzone
                    name={`queries.${index}.file`}
                    onDrop={(acceptedFiles) => {
                        input.onChange(acceptedFiles)
                        setUrl(index, acceptedFiles)
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input
                                    {...getInputProps()}
                                    type='file'
                                    style={{
                                        height: '3rem',
                                        width: '30rem',
                                        border: `.1rem solid ${theme.palette.primary.main}`
                                    }}
                                />
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        </FormControl>
    );
}
