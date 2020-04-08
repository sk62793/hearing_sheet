import React, { Component } from 'react';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';
import {  withStyles, FormControl, Input } from '@material-ui/core';
import { theme } from '../../index.js'
import Immutable from 'immutable'

export const renderDropzone = ({
    input,
    label,
    name,
    meta: { touched, error },
    classes,
    index,
    querys,
    field
}) =>
        {
            return (
            <FormControl>
                <Dropzone
                    name={`querys.${index}.answer.files`}
                    onDrop = {(fileToUpload) => {
                        querys[index].answer = {
                            files: []
                        }
                        let files = querys[index].answer.files
                        fileToUpload.map((file, index) =>
                        files.push({
                            name: file.name,
                            path: file.path,
                            size: file.size,
                            type: file.type
                        }))
                        input.onChange(files)
                    }}
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} style={{height: '10rem', width: '30rem', border:`.1rem solid ${theme.palette.primary.main}`}} />
                            </div>
                        </section>
                    )}
                </Dropzone>
            </FormControl>
        )
}
