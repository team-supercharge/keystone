import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import {
    Button,
    GlyphButton,
    ResponsiveText,
} from '../../../../elemental';

// https://github.com/bpampuch/pdfmake/issues/910
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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


class LmcPdfExport extends React.Component {

    exportPdf(logs, resident) {
        const docDefinition = {
            content: logs.map((row, index) => {
                return [
                    {
                        columns: [
                            [
                                {
                                    margin: [0, 0, 0, 0],
                                    text: moment(row.date).format('DD/MM/YYYY'),
                                    style: ['h2'],
                                },
                                {
                                    text: `${resident.name} - Daily Report`,
                                    style: ['h1'],
                                    margin: [0, 0, 0, 30],
                                },
                            ],
                            {
                                width: 90,
                                alignment: 'right',
                                margin: [0, 4, 0, 0],
                                image: 'data:image/png;base64,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',
                            },
                        ]
                    },
                    {
                        style: 'tableExample',
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
                                    }
                                ],
                                ...row.logs.map(log => {
                                    let revision;
                                    let isRevised = log.revisions && (log.revisions.length > 0);
                                    if (isRevised) {
                                        revision = _.sortBy(log.revisions, d => Date.now() - new Date(d.revokedAt))[0];
                                    }

                                    return [
                                        {
                                            text: moment(log.timeLogged).format('HH:mm'),
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
                                            text: log.carerName + (log.witnessedBy && ` - witnessed by ${log.witnessedBy}`),
                                            style: 'tableText',
                                        },
                                        {
                                            text: (isRevised)
                                                ? `Edited by ${revision.revokedBy} on ${moment(revision.revokedAt).format('DD/MM/YYYY')}`
                                                : null,
                                            style: 'tableText',
                                        },
                                    ]
                                }),
                            ]
                        }
                    },
                    ((index + 1) !== logs.length) ? { pageBreak: 'after', text: '' } : null,   
                ]
            }),
            footer: (currentPage, pageCount) => { 
                return {
                    text: currentPage.toString() + ' of ' + pageCount,
                    style: ['small', 'center'],
                    margin: [0, 5],
                };
            },
            styles: {
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black',
                },
                tableText: {
                    fontSize: 10,
                    color: 'black',
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
                    italics: true
                },
                normal: {
                    fontSize: 11
                },
                small: {
                    color: '#6d6d6d',
                    fontSize: 8
                }
            }
        };

        pdfMake.createPdf(docDefinition).open();
        // pdfMake.createPdf(docDefinition).download('optionalName.pdf');
    };

	render() {
		const { logs, resident } = this.props;
		return (
			<div style={{ float: 'right' }}>
                <GlyphButton
                    color="default"
                    glyph="cloud-download"
                    onClick={() => this.exportPdf(logs, resident)}
                    position="left"
                    title={BUTTON_TEXT}
                >
                    { BUTTON_TEXT }
                </GlyphButton>
            </div>
		);
	}
}

const BUTTON_TEXT = 'Export PDF';

LmcPdfExport.propTypes = {

};


const styles = {};


export default LmcPdfExport;