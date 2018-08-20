import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import {
    GlyphButton,
    Spinner,
} from '../../elemental';

// https://github.com/bpampuch/pdfmake/issues/910
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
let canvg = require('canvg');
import saveSvgAsPng from 'save-svg-as-png';

import {
    StoolColormap,
    isStool,
    isStoolBloody,
    isStoolMucus,
    isStoolOffensive,
    getStoolColor,
} from '../common/utils';

// ... row.logs.map(log => {
//     let revision;
//     let isRevised = log.revisions && (log.revisions.length > 0);
//     let bottomNote = `${log.carerName}` + (log.witnessedBy && ` - witnessed by ${log.witnessedBy}`);
//     if (isRevised) {
//         revision = _.sortBy(log.revisions, d => Date.now() - new Date(d.revokedAt))[0];
//         bottomNote += `- edited by ${revision.revokedBy} on ${moment(revision.revokedAt).format('DD/MM/YYYY')}`
//     };    
//     return [
//         {
//             text: `${moment(log.timeLogged).format('HH:mm')} - ${log.title}`,
//             style: 'h3',
//             margin: [0, 20, 0, 0]
//         },
//         {
//             text: log.description,
//             style: 'normal',
//         },
//         {
//             text: bottomNote,
//             style: 'small',
//             margin: [0, 2, 0, 0],
//         }
//     ]
// }),

const StoolTable = (row, dateFormat) => {

    return {
        style: 'table',
        table: {
            layout: {
                defaultBorder: false,
            },
            headerRows: 1,
            widths: ['auto', 6, 6, 6, 6, 6, 6, 6, 'auto', 'auto', 'auto', 'auto', 90, 'auto', 'auto'],
            body: [
                [
                    {
                        text: 'Time',
                        style: 'tableHeaderSmall',
                        alignment: 'center',
                    },
                    {
                        text: 'Bristol Type',
                        style: 'tableHeaderSmall',
                        alignment: 'center',
                        colSpan: 7,
                    },
                    {}, {}, {}, {}, {}, {},
                    {
                        text: 'Blood',
                        style: 'tableText',
                        alignment: 'center',
                    },
                    {
                        text: 'Mucus',
                        style: 'tableText',
                        alignment: 'center',
                    },
                    {
                        text: 'Offensive',
                        style: 'tableText',
                        alignment: 'center',
                    },
                    {
                        text: 'Color',
                        style: 'tableText',
                        alignment: 'center',
                    },
                    {
                        text: 'Note',
                        style: 'tableHeaderSmall',
                        alignment: 'center',
                    },
                    {
                        text: 'Carer',
                        style: 'tableHeaderSmall',
                        alignment: 'center',
                    },
                    {
                        text: 'Revision',
                        style: 'tableHeaderSmall',
                        alignment: 'center',
                    }
                ],
                [
                    {},
                    {
                        text: 1,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {
                        text: 2,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {
                        text: 3,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {
                        text: 4,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {
                        text: 5,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {
                        text: 6,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {
                        text: 7,
                        style: 'tableTextSmall',
                        alignment: 'center',
                    },
                    {}, {}, {}, {}, {}, {}, {},
                ],
                ...row.logs.map(log => {
                    let revision;
                    let isRevised = log.revisions && (log.revisions.length > 0);
                    if (isRevised) {
                        revision = _.sortBy(log.revisions, d => Date.now() - new Date(d.revokedAt))[0];
                    }

                    const type = _.get(log, 'measurements.stool.value');
                    const isBloody = isStoolBloody(log);
                    const isMucus = isStoolMucus(log);
                    const isOffensive = isStoolOffensive(log);
                    const stoolColor = getStoolColor(log);
                    const highlight = '#c5c5c5';
                    const types = [1, 2, 3, 4, 5, 6, 7];
                    return [
                        {
                            text: moment(log.timeLogged).format(dateFormat || 'HH:mm DD/MM/YY'),
                            style: 'tableText',
                        },
                        ...types.map(t => type === t ? { text: 'X', style: 'whiteTableText', fillColor: StoolColormap[t] } : ''),
                        {
                            text: isBloody ? 'X' : '',
                            fillColor: isBloody ? highlight : null,
                            style: 'whiteTableText',
                        },
                        {
                            text: isMucus ? 'X' : '',
                            fillColor: isMucus ? highlight : null,
                            style: 'whiteTableText',
                        },
                        {
                            text: isOffensive ? 'X' : '',
                            fillColor: isOffensive ? highlight : null,
                            style: 'whiteTableText',
                        },
                        {
                            text: stoolColor || '',
                            fillColor: stoolColor && stoolColor === 'black' ? highlight : null,
                        },
                        {
                            text: isStool(log) ? '' : `${log.title}. ${log.description}`,
                            style: 'tableText',
                        },
                        {
                            text: log.carerName + (log.witnessedBy && ` - witnessed by ${log.witnessedBy}`),
                            style: 'tableTextSmall',
                        },
                        {
                            text: (isRevised)
                                ? `Edited by ${revision.revokedBy} on ${moment(revision.revokedAt).format('DD/MM/YYYY')}`
                                : '',
                            style: 'tableTextSmall',
                        },
                    ]
                })
            ]
        }
    };
};

const LogListTable = (row, dateFormat) => {
    return {
        style: 'table',
        table: {
            layout: {
                defaultBorder: false,
            },
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto', 'auto'],
            body: [
                [
                    {
                        text: 'Time',
                        style: 'tableHeader',
                        borderColor: 'red',
                    },
                    {
                        text: 'Title',
                        style: 'tableHeader',
                    },
                    {
                        text: 'Description',
                        style: 'tableHeader',
                    },
                    {
                        text: 'Carer',
                        style: 'tableHeader',
                    },
                    {
                        text: 'Revision Log',
                        style: 'tableHeader',
                    },
                ],
                ...row.logs.map(log => {
                    let revision;
                    let isRevised = log.revisions && (log.revisions.length > 0);
                    if (isRevised) {
                        revision = _.sortBy(log.revisions, d => Date.now() - new Date(d.revokedAt))[0];
                    }

                    return [
                        {
                            text: moment(log.timeLogged).format(dateFormat || 'HH:mm DD/MM/YY'),
                            style: 'tableText',
                        },
                        {
                            text: log.title,
                            style: 'tableText',
                        },
                        {
                            text: log.description,
                            style: 'tableText',
                        },
                        {
                            text: log.carerName + (log.witnessedBy ? ` - witnessed by ${log.witnessedBy}` : ''),
                            style: 'tableText',
                        },
                        {
                            text: (isRevised)
                                ? `Edited by ${revision.revokedBy} on ${moment(revision.revokedAt).format('DD/MM/YYYY')}`
                                : null,
                            style: 'tableText',
                        },
                    ];
                }),
            ],
        },
    };
};

class LmcPdfExport extends React.Component {

    constructor (props) {
        super(props);
        this.exportPdf = this.exportPdf.bind(this);
        this.state = { isLoading: false };
    }

    getDocDefinition ({ logs, resident, dateFormat, title, groupBy }, image, getBody) {
        // load LmC logo as well?
        // pageByDate?
        // pageByResident?

        // let sortedLogs = _.sortBy(logs, d => moment(d.timeLogged), ['desc']);
        // console.log(sortedLogs);
        let pages;
        let _logs = _.sortBy(logs, d => -moment(d.timeLogged));
        if (groupBy === 'date') {
            pages = _.chain(_logs)
                .groupBy(({ timeLogged }) => moment(timeLogged).format('YYYY-MM-DD'))
                .map((group, date) => ({ heading: date, logs: group }))
                .sortBy(({ date }) => -moment(date).valueOf())
                .value();

        // } else if (groupBy === 'day') {
        // } else if (groupBy === 'carer') {
        } else {
            pages = [{ logs: _.sortBy(_logs, d => -moment(d.timeLogged)) }];
        }

        return {
            content: pages.map((row, index) => {
                /*
                row: {
                    date: '2018-05-23',
                    logs: [
                        {
                            title: '',
                            description: '',
                            carerName: '',
                            witnessedBy: '',
                            timeLogged: '',
                            revisions: []
                        },
                        ...
                    ]
                }
                */

                const chartImage = image ? {
                    width: 500,
                    margin: [0, 10, 0, 40],
                    alignment: 'center',
                    image,
                } : null;

                const heading = row.heading
                    ? {
                        margin: [0, 0, 0, 0],
                        text: row.heading,
                        style: ['h2'],
                    } : null;

                return [
                    {
                        columns: [
                            [
                                heading,
                                {
                                    text: `${resident.name} - ${title}`,
                                    style: ['h1'],
                                    margin: [0, 0, 0, 30],
                                },
                            ],
                            {
                                width: 90,
                                alignment: 'right',
                                margin: [0, 4, 0, 0],
                                image: require('./LmcLogo.js').default, // TODO: fetch from S3 and convert to base64. If you find this you're welcome to punch me (Adam)!
                            },
                        ],
                    },
                    chartImage,
                    getBody(row, dateFormat),
                    // insert page break at the and of each day (except last day)
                    ((index + 1) !== pages.length) ? { pageBreak: 'after', text: '' } : null,
                ];
            }),
            footer: (currentPage, pageCount) => {
                return {
                    text: currentPage.toString() + ' of ' + pageCount,
                    style: ['small', 'center'],
                    margin: [0, 5],
                };
            },
            styles: {
                table: {

                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black',
                },
                tableHeaderSmall: {
                    // bold: true,
                    fontSize: 12,
                    color: 'black',
                },
                tableText: {
                    fontSize: 10,
                    color: 'black',
                },
                tableTextSmall: {
                    fontSize: 7,
                    color: 'black',
                },
                whiteTableText: {
                    fontSize: 7,
                    alignment: 'center',
                    color: 'white',
                },
                center: {
                    alignment: 'center',
                },
                h1: {
                    fontSize: 24,
                    semibold: true,
                },
                h2: {
                    fontSize: 16,
                    semibold: true,
                    color: '#6d6d6d',
                },
                h3: {
                    fontSize: 14,
                    bold: true,
                },
                quote: {
                    italics: true,
                },
                normal: {
                    fontSize: 11,
                },
                small: {
                    color: '#6d6d6d',
                    fontSize: 8,
                },
            },
        };
    }

    exportPdf () {
        this.setState({ isLoading: true });
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const { resident, title, type } = this.props;
        const SVGtoPNG = function (svg) {
            return new Promise((resolve, reject) => {
                saveSvgAsPng.svgAsPngUri(svg, { scale: 3 }, function (uri) {
                    resolve(uri);
                });
            });
        };

        const triggerDownload = (image) => {
            const docDefinition = (type === 'stool')
                ? this.getDocDefinition(this.props, image, StoolTable)
                : this.getDocDefinition(this.props, image, LogListTable);
            // pdfMake.createPdf(docDefinition).open();
            pdfMake.createPdf(docDefinition).download(`${resident.name} ${title}.pdf`);
            this.setState({ isLoading: false });
        };

        let chartElements = document.getElementsByClassName('highcharts-root');
        if (chartElements.length) {
            SVGtoPNG(chartElements[0])
                .then(triggerDownload)
                .catch((e) => {
                    // eg. IE.
                    // requires manual conversion..
                    console.log(e);
                    triggerDownload();
                });
        } else {
            triggerDownload();
        }
    }

	render () {
        const { isLoading } = this.state;
        return (
			<div style={styles.container}>
                <GlyphButton
                    color="default"
                    glyph={isLoading ? null : 'cloud-download'}
                    onClick={() => this.exportPdf()}
                    position="left"
                    title={BUTTON_TEXT}
                >
                    { isLoading ? <Spinner /> : BUTTON_TEXT }
                </GlyphButton>
            </div>
		);
	}
}

const BUTTON_TEXT = 'Export PDF';

LmcPdfExport.propTypes = {
    // resident: PropTypes.object.isRequired,
    // logs: PropTypes.object.isRequired,
};

const styles = {
    container: {
        float: 'right',
    },
};


export default LmcPdfExport;
