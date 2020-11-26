import React, {Component} from 'react'
import styles from './AddressScreen.module.sass'
import { Paper ,Button,Icon,TextField} from '@material-ui/core';
import CircleNavigation from '../../components/CircleNavigation/CircleNavigation'
import { withStyles } from '@material-ui/core/styles';

class AddressScreen extends Component {
    state={
        address:''
    }

    AutocompleteAddress=()=>{
        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            { types: ["geocode"] }
        );

        console.log(autocomplete)
    }

    render() {this.AutocompleteAddress()
        return (
                <Paper elevation={3} className={styles.container}>
                    <CircleNavigation active={1}/>
                    <h3>Input your address</h3>
                    <form className={styles.form} noValidate>
                        <TextField
                            onChange={(val) =>
                                this.setState({ address: val.target.value })
                            }
                            className={styles.input}
                            id="standard-basic"
                            label="Enter your address"
                            variant="outlined" />
                    </form>
                    <Button variant="contained"  className={styles.button}
                            color="#69e0da">
                        I want to do this manually
                    </Button>
                </Paper>
        )
    }
}

export default AddressScreen;