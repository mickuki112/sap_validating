import React, {Component} from 'react'
import styles from './AddressScreen.module.sass'
import {Paper, Button, TextField} from '@material-ui/core';
import CircleNavigation from '../../components/CircleNavigation/CircleNavigation'
import Script from 'react-load-script';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {validateZip} from '../../common/validation'
import {countries} from '../../common/countries'
import NavigateNextIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {AUTH_KEY_GOOGLE} from "../../config/auth";

class AddressScreen extends Component {
    state = {
        query: '',
        manually: false,
        addr1:'',
        addr2:'',
        city:'',
        zip:'',
        country:'',
        addr1Error:'',
        addr2Error:'',
        cityError:'',
        zipError:''
    }

    handlePlaceSelect = () => {
        const addressObject = this.autocomplete.getPlace()
        const address = {
            addr1:'',
            addr2:'',
            city:'',
            zip:'',
            country:''
        }
        addressObject.address_components.map((val)=>{
            if(val.types[0]==='street_number'){
                return address.addr1=address.addr1+val.long_name
            }else
            if(val.types[0]==='route'){
                return address.addr2=val.long_name
            }else
            if(val.types[0]==='locality'){
                return address.city=val.long_name
            }else
            if(val.types[0]==='country'){
                return address.country=val.long_name
            }else
            if(val.types[0]==='postal_code'){
                return address.zip=val.long_name
            }
            return false
        })
        const {addr1, addr2, city, zip,country}=address
        const data =  {
            addr1,
            addr2,
            city,
            zip,
            country
        }
        if(addr1 && addr2 && city &&  zip && country){
            this.props.changeComponent({
                showComponent:2,
                data:{address:data}
            })
        }
    }

    handleScriptLoad = () => {
        const options = {
            types: ['geocode'],
        };

        /*global google*/
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            options,
        );

        this.autocomplete.setFields(['address_components', 'formatted_address']);

        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    validationAddressLine1 = (e) => {
        if (e.target.value !== '')
            this.setState({addr1: e.target.value, addr1Error: ''})
        else
            this.setState({addr1: e.target.value, addr1Error: 'Enter the address'})
    }
    validationAddressLine2 = (e) => {
        if (e.target.value !== '')
            this.setState({addr2: e.target.value, addr2Error: ''})
        else
            this.setState({addr2: e.target.value, addr2Error: 'Enter the address'})
    }
    validationCity = (e) => {
        if (e.target.value !== '')
            this.setState({city: e.target.value, cityError: ''})
        else
            this.setState({city: e.target.value, cityError: 'Enter the city'})
    }
    validationZip = (e) => {
        if (e.target.value !== '') {
            if (validateZip(e.target.value) && e.target.value.length === 6)
                this.setState({zip: e.target.value, zipError: ''})
            else
                this.setState({zip: e.target.value, zipError: 'Wrong zip'})
        } else
            this.setState({zip: e.target.value, zipError: 'Enter the zip'})
    }

    next = () => {
        const {addr1, addr2, city, zip,country} = this.state
        const data =  {
            addr1,
            addr2,
            city,
            zip,
            country
        }
        this.props.changeComponent({
            showComponent:2,
            data:{address:data}
        })
    }
    countryToFlag=(isoCode)=> {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }
    render() {
        const {manually, addr1Error, addr2Error, cityError, zipError, addr1, addr2, city, zip,country} = this.state
        const url=`https://maps.googleapis.com/maps/api/js?key=${AUTH_KEY_GOOGLE}&libraries=places`
        return (
            <Paper elevation={3} className={styles.container}>
                <Script
                    url={url}
                    onLoad={this.handleScriptLoad}
                />
                <CircleNavigation active={1} onClickFirstCircle={() => this.props.changeComponent(0)}/>
                <h3>Input your address</h3>
                {manually ?
                    <>
                        <form className={styles.form} noValidate>
                            <TextField
                                onChange={(val) => this.validationAddressLine1(val)}
                                className={styles.input}
                                label="Address Line 1"
                                id="addressLine1"
                                value={addr1}
                                helperText={addr1Error}
                                error={addr1Error!==''}
                                variant="outlined"/>
                            <TextField
                                onChange={(val) => this.validationAddressLine2(val)}
                                className={styles.input}
                                id="addressLine2"
                                value={addr2}
                                label="Address Line 2"
                                helperText={addr2Error}
                                error={addr2Error!==''}
                                variant="outlined"/>
                            <div>
                                <TextField
                                    onChange={(val) => this.validationZip(val)}
                                    className={styles.zip}
                                    id="zip"
                                    value={zip}
                                    label="Zip"
                                    helperText={zipError}
                                    error={zipError!==''}
                                    variant="outlined"/>
                                <TextField
                                    onChange={(val) => this.validationCity(val)}
                                    id="city"
                                    value={city}
                                    label="City"
                                    helperText={cityError}
                                    error={cityError!==''}
                                    variant="outlined"/>
                            </div>
                            <Autocomplete
                                onChange={(val) =>this.setState({country: countries[val.target.dataset.optionIndex]?.name})}
                                className={styles.input}
                                options={countries}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <span>{this.countryToFlag(option.code)}</span>
                                        {option.name}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Country"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </form>
                        <Button variant="contained"
                                onClick={this.next}
                                className={styles.button}
                                disabled={!(!addr1Error && !addr2Error && !cityError && !zipError && addr1 && addr2 && zip && city && country)}
                                endIcon={<NavigateNextIcon/>}>
                            Next
                        </Button>
                    </> :
                    <form className={styles.form}>
                        <TextField
                            onChange={(val) => this.setState({query: val.target.value})}
                            className={styles.input}
                            id="autocomplete"
                            label="Enter your address"
                            variant="outlined"/>
                        <Button variant="contained"
                                onClick={() => this.setState({manually: true})}
                                className={styles.button}>
                            I want to do this manually
                        </Button>
                    </form>}
            </Paper>
        )
    }
}

export default AddressScreen;