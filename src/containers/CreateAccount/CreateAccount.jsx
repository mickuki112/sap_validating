import React, {Component} from 'react'
import styles from './Home.module.sass'
import { Container } from '@material-ui/core';


class Home extends Component {

    render() {
        return (
            <>
                <Container className={styles.container}>
                    <CreateAccount/>
                </Container>
            </>
        )
    }
}

export default Home;