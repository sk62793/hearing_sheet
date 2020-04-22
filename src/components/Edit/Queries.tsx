import React from 'react';
import { Field } from 'redux-form';
import { MenuItem, Button, makeStyles } from '@material-ui/core';
import { TypeSelect } from '../../components/Fields/TypeSelect'
import { RadioQuery } from '../../components/Queries/RadioQuery'
import { TextQuery } from '../../components/Queries/TextQuery'
import { ImageQuery } from '../../components/Queries/ImageQuery'

const useStyles = makeStyles({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff',
        margin: '1rem auto 0',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
        display: 'flex'
    },
    button: {
        backgroundColor: '#fff',
        zIndex: 10,
        padding: '1.5rem',
        marginTop: '1rem'
    },
    removeButton: {
        backgroundColor: '#fff',
        marginTop: '2rem'
    },
    option: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem 0'
    }
})

export const Queries = (props:any) => {
    const { fields, queries, setUrl } = props
    const classes = useStyles();
    return (
        <>
            {fields.map((state:any, index:number) => {
                return (
                    <div key={index} className={classes.content}>
                        {queries[index].type === 'text' && <TextQuery index={index} />}
                        {queries[index].type === 'radio' && <RadioQuery index={index} />}
                        {queries[index].type === 'image' && <ImageQuery queries={queries} index={index} setUrl={setUrl} />}
                        <div className={classes.option}>
                            <Field name={`queries.${index}.type`} component={TypeSelect} props={{ required: true }}>
                                <MenuItem value='text'>テキスト</MenuItem>
                                <MenuItem value='radio'>ラジオ</MenuItem>
                                <MenuItem value='image'>画像</MenuItem>
                            </Field>
                            <Button variant="outlined" color="primary" className={classes.removeButton} onClick={() => {fields.remove(index)}}>
                                削除
                            </Button>
                        </div>
                    </div>
                )
            })}
            <Button variant="outlined" color="primary" onClick={() => fields.push({ type: 'text', path: null, file: null, choices: null })} className={classes.button}>
                質問を追加
            </Button>
        </>
    )
}

