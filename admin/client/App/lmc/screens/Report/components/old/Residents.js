import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchResidentsList } from './services/dataService';

const Resident = (res) => {
    const ref = `${Keystone.adminPath}/reports/residents/${res.id}`;
    return (
        <li className="lmc-resident-list-item" style={styles.resident}>
            <img style={styles.residentImg} src="https://raw.githubusercontent.com/Infernus101/ProfileUI/0690f5e61a9f7af02c30342d4d6414a630de47fc/icon.png"/>
            { res.name }
        </li>
    )
};

class Residents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            residents: [],
            filterValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.renderResidents = this.renderResidents.bind(this);
    }

    componentDidMount() {
        fetchResidentsList()
            .then(({ results }) => {
                this.setState({
                    loading: false,
                    residents: results
                })
            })
            .catch(err => {
                this.setState({
                    error: "The resport is not available at this time. Please contact support if this problem persists"
                });
            })
    }

    handleChange(event) {
        this.setState({ filterValue: event.target.value })
    }

    renderResidents() {
        const { residents, filterValue } = this.state;
        const pattern = new RegExp(filterValue, 'i');

        const residentsShown = filterValue.length ?
            residents.filter(res => {
                console.log(res.name, filterValue, res.name.match(pattern));
                return res.name.match(pattern);
            }) :
            residents;

        return residentsShown.length ? 
            _.sortBy(residentsShown, 'name').map(Resident) :
            <p style={styles.noMatch}>No matches</p>
    }

    render () {
        return (
            <div style={styles.container}>
                <h2>Residents</h2>
                <br/>
                {
                    this.loading ? 
                        <p>Loading...</p> :
                        <div>
                            <input placeholder="Filter..." 
                                style={styles.input} 
                                type="text"
                                autocomplete="off"
                                value={this.state.value} 
                                onChange={this.handleChange}
                                name="lmcResidentName" />
                                <ul> { this.renderResidents() } </ul>
                        </div>
                }
            </div>
        );
    }
};

const styles = {
    
    container: {
        margin: '60px 25px'
    },
    input: {
        backgroundColor: 'white',
        backgroundImage: 'none',
        borderColor: '#e8e8e8',
        width: 300,
        borderRadius: '0.2rem',
        borderStyle: 'solid',
        borderWidth: 1,
        boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, 0.1)',
        color: 'inherit',
        display: 'block',
        height: '2.4em',
        lineHeight: '2.3em',
        padding: '0 .75em'
    },
    resident: {
        margin: 10,
        fontSize: 20
    },
    residentImg: {
        width: 60,
        height: 60
    },
    noMatch: {
        margin: 10,
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)'
    }
}

export default Residents;
