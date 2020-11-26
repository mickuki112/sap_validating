import React, {Component} from 'react'
import styles from './DoneScreen.module.sass'
import { Paper } from '@material-ui/core';
import CircleNavigation from '../../components/CircleNavigation/CircleNavigation'

class DoneScreen extends Component {

    render() {
        return (
                <Paper elevation={3} className={styles.container}>
                    <CircleNavigation active={2}/>
                    <h3>All Done!</h3>
                </Paper>
        )
    }
}

export default DoneScreen;