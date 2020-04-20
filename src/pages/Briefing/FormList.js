import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles, Container } from '@material-ui/core';
import { firestoreConnect } from 'react-redux-firebase';
import CreateNewForm from '../../components/FormList/Create.js'
import FormListContent from '../../components/FormList/Content.js'

const styles = theme => ({
    container: {
        margin: '0 auto',
        paddingTop: '10rem',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80rem',
    },
    contents: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
    },
    button: {
        padding: '0 1rem',
        margin: '1rem 1rem 0 0',
        fontSize: '1rem',
        height: '4rem',
    },
    forms: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formContent: {
        height: '10rem',
        width: '16rem',
        border: '.1rem solid #ccc',
        borderRadius: '.5rem',
        margin: '1rem',
        textAlign: 'center',
        '&:hover': {
            border: `.1rem solid ${theme.palette.primary.main}`
        }
    }
});

class FormList extends Component {
    render() {
        const { classes, data } = this.props;
        const forms = data.forms
        return (
            <React.Fragment>
                <Container className={classes.container}>
                    <div className={classes.title}>
                        <h2>フォーム一覧</h2>
                    </div>
                    <div className={classes.contents}>
                        <CreateNewForm props={this.props} forms={forms} />
                        {typeof forms !== "undefined" ?
                            <div>
                                {forms.length !== 0 ?
                                    <div className={classes.forms}>
                                        {forms.map((state, index) => {
                                            return <FormListContent props={this.props} key={index} index={index} forms={forms} form={forms[index]} />
                                        })}
                                    </div>
                                    : <div>作成中のフォームはありません</div>
                                }
                            </div>
                            : <div style={{ textAlign: 'center' }}>loading...</div>
                        }
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.firestore.ordered
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'forms' }])
)(FormList)

