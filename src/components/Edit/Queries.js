import React from 'react';
import { Field } from 'redux-form';
import { MenuItem, Button } from '@material-ui/core';
import { TypeSelect } from '../../components/Fields/TypeSelect.js'
import { RadioQuery } from '../../components/Queries/RadioQuery.js'
import { TextQuery } from '../../components/Queries/TextQuery.js'
import { ImageQuery } from '../../components/Queries/ImageQuery.js'

export const Queries = ({ fields, queries, props, setUrl }) => {
    const id = props.location.state.id
    return (
        <>
            {fields.map((state, index) => {
                return (
                    <div key={index} className={props.classes.content}>
                        {queries[index].type === 'text' && <TextQuery index={index} />}
                        {queries[index].type === 'radio' && <RadioQuery index={index} />}
                        {queries[index].type === 'image' && <ImageQuery queries={queries} index={index} id={id} setUrl={setUrl} />}
                        <div className={props.classes.option}>
                            <Field name={`queries.${index}.type`} component={TypeSelect} props={{ required: true }}>
                                <MenuItem value='text'>テキスト</MenuItem>
                                <MenuItem value='radio'>ラジオ</MenuItem>
                                <MenuItem value='image'>画像</MenuItem>
                            </Field>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ backgroundColor: '#fff', marginTop: '2rem' }}
                                onClick={() => {fields.remove(index)}}
                            >
                                削除
                        </Button>
                        </div>
                    </div>
                )
            })}
            <Button
                variant="outlined"
                color="primary"
                className={props.classes.button}
                onClick={() => fields.push({ type: 'text', path: null, file: null, choices: null })}
            >
                質問を追加
            </Button>
        </>
    )
}

