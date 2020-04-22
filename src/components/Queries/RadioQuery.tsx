import React from 'react';
import { Field, FieldArray, GenericFieldArray, WrappedFieldArrayProps } from 'redux-form';
import {
    withStyles,
    FormControl,
    makeStyles,
} from '@material-ui/core';
import { renderInput } from '../Fields/Input';
import { Choices } from '../Fields/Choices';

// export const RadioQuery = withStyles(theme => ({
//     content: {
//         padding: '2.4rem',
//         border: '.1rem solid #eee',
//         borderRadius: '.8rem',
//         backgroundColor: '#fff',
//         margin: '1rem auto',
//         fontSize: '1.6rem',
//         width: 'calc(100% - 4.8rem)',
//     },
//     choices: {
//         display: 'flex',
//     },
// }))(
//     ({
//         classes,
//         rootClass = '',
//         index,
//     }) => (
//             <FormControl classs={{ root: rootClass }} style={{ width: '85%', marginRight: '1rem' }}>
//                 <div className={classes.content}>
//                     <Field
//                         component={renderInput}
//                         name={`queries.${index}.question`}
//                         label='質問'
//                         required={true}
//                     />
//                     <FieldArray name={`queries.${index}.choices`} component={Choices} />
//                 </div>
//             </FormControl>
//         )
// )

const useStyles = makeStyles({
    content: {
        padding: '2.4rem',
        border: '.1rem solid #eee',
        borderRadius: '.8rem',
        backgroundColor: '#fff',
        margin: '1rem auto',
        fontSize: '1.6rem',
        width: 'calc(100% - 4.8rem)',
    }
})

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;
// interface Props {
//     props: WrappedFieldArrayProps<{}>
// }

export const RadioQuery = (props: any) => {
    const { index } = props;
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Field component={renderInput} name={`queries.${index}.question`} label='質問' required={true} />
            <FieldArrayCustom name={`queries.${index}.choices`} component={Choices} />
        </div>
    );
}
