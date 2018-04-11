import React from 'react';
import SecondaryNav from './components/SecondaryNav';


class LmcReportView extends React.Component {
    render () {
        return (
            <div>
                <SecondaryNav />
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
};


export default LmcReportView;


// import React from 'react';

// import {
//     fetchResidentLogs,
//     fetchResidentsList
// } from './services/dataService';


// class Reports extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { residents: null, residentId: null };
//         this.loadResidentLogs = this.loadResidentLogs.bind(this);
//         this.renderResidentLogs = this.renderResidentLogs.bind(this);
//     }

//     componentDidMount() {
//         fetchResidentsList()
//             .then(residents => {
//                 this.setState({ residents });
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     renderResidents(residents) {
//         return residents.results.map(resident => (
//             <div>
//                 <a onClick={() => this.loadResidentLogs(resident.id)}>
//                     { resident.name } - { resident.id }
//                 </a>
//                 <br/>
//             </div>
//         ))
//     }

//     renderResidentLogs() {
//         const { results } = this.state.residentLogs;

//         const styles = {
//             td: {
//                 paddingLeft: 10,
//                 paddingRight: 10
//             },
//             th: {
//                 padding: 10,
//                 fontWeight: 'bold'
//             }
//         }

//         return (
//             <div>
//                 <h2>Resident: <strong>{results.residentName}</strong></h2>
//                 { results.logs.map(row => (
//                     <div>
//                         <h3>{ row.date }</h3>
//                         <table>
//                             <tr>
//                                 <th style={styles.th}>Title</th>
//                                 <th style={styles.th}>Log</th>
//                                 <th style={styles.th}>Category</th>
//                             </tr>
//                             { row.logs.map(log => {
//                                 return (
//                                     <tr>
//                                         <td style={styles.td}>{ log.title }</td>
//                                         <td style={styles.td}>{ log.description }</td>
//                                         <td style={styles.td}>{ log.category }</td>
//                                     </tr>
//                                 )
//                             })}
//                         </table>
//                         <hr/>
//                     </div>
//                 ))}
//             </div>
//         )
//     }

//     loadResidentLogs(residentId) {

//         this.setState({ 
//             residentId,
//             loadingLogs: true
//         });

//         fetchResidentLogs(residentId)
//             .then(residentLogs => {
//                 this.setState({ 
//                     loadingLogs: false,
//                     residentLogs
//                 });
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     render() {
//         const { residents, residentId, loadingLogs } = this.state;
//         return (
//             <div>
//                 <h3>Daily Reports</h3>
//                 <hr/>
//                 {
//                     residentId ?
//                         <div>
//                             { loadingLogs ? 
//                                 "Loading..." :
//                                 this.renderResidentLogs()
//                             }
//                         </div> :
//                         <div>
//                             { residents ? 
//                                 this.renderResidents(residents) : 
//                                 'No Results'
//                             }
//                         </div>
//                 }
                
//             </div>
//         )
//     }
// }

// export default Reports;
