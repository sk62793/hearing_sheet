import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    container: {
        margin: '0 auto',
        paddingTop: '10rem',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        textAlign: 'center',
    },
    button: {
        margin: '0 auto',
    },
});

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container className={classes.container}>
                    <div className={classes.title}>
                        <h2>広報アンケート</h2>
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        href="/form"
                        className={classes.button}
                    >
                        回答する
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        href="/create_form"
                        className={classes.button}
                    >
                        作成する
                    </Button>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Home);
