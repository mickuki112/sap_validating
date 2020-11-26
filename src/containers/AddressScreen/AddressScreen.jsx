import React, {Component} from 'react'
import styles from './CreateAccount.module.sass'
import { Paper ,Button,Icon,TextField} from '@material-ui/core';
import CircleNavigation from '../../components/CircleNavigation/CircleNavigation'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';

class CreateAccount extends Component {

    render() {
        return (
                <Paper elevation={3} className={styles.container}>
                    <CircleNavigation active={0}/>
                    <h3>Create your account</h3>
                    <form className={styles.form} noValidate>
                        <TextField className={styles.input} id="standard-basic" label="Name" variant="outlined" />
                        <TextField className={styles.input} id="filled-basic" label="E-Mail" variant="outlined" />
                        <TextField className={styles.input} id="outlined-basic" label="Password" variant="outlined" />
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            variant="outlined"
                            defaultValue="2017-05-24"
                            className={styles.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                    <Button variant="contained"  className={styles.button}
                            color="#69e0da"
                            endIcon={<NavigateNextIcon/>}>
                        Next
                    </Button>
                </Paper>
        )
    }
}

export default CreateAccount;