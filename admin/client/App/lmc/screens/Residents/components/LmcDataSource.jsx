import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-refetch'
import _ from 'lodash'
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx'
import { BlankState } from '../../../../elemental'

export class LmcDataSource extends Component {
    render () {
        const {
            dataFetch: {
                pending,
                rejected,
                reason,
                value,
                fulfilled
            },
            errorMessage,
            noResultMessage,
            renderSuccess,
            ...props
        } = this.props

        if (pending) return <LmcLoadingScreen {...props} />

        if (rejected) {
            const msg = errorMessage || reason.message || 'Oops.. Something went wrong'
            return <BlankState heading={msg} {...props} />
        }

        if (fulfilled) {
            if (_.get(value, 'result.length')) {
                return (
                    <div {...props}>
                        {renderSuccess(value.result)}
                    </div>
                )
            } else {
                return <BlankState heading={noResultMessage || 'No result'} {...props} />
            }
        }
    }
}

LmcDataSource.propTypes = {
    dataFetch: PropTypes.object.isRequired,
    renderSuccess: PropTypes.func.isRequired,
    errorMessage: PropTypes.object,
    noResultMessage: PropTypes.object,
}

// https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
function serialize(obj) {
    let str = []
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
    }
    return str.join("&")
}

export default connect(({ url, query, refreshInterval=60000 }) => {
    let fetchUrl = url
    if (query) {
        fetchUrl += `?${serialize(query)}`
    }
    return {
        dataFetch: { url: fetchUrl, refreshInterval }
    }
})(LmcDataSource)
