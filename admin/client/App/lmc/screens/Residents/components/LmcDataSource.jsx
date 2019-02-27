import React, { Component } from 'react'
import { connect } from 'react-refetch'
import _ from 'lodash'
import LmcLoadingScreen from '../../../components/LmcLoadingScreen.jsx'
import { BlankState } from '../../../../elemental'

export class LmcDataSource extends Component {
    render () {
        const {
            dataFetch,
            errorMessage,
            renderSuccess,
        } = this.props

        if (dataFetch.pending) {
            return <LmcLoadingScreen />
        }

        if (dataFetch.rejected) {
            const msg = errorMessage || dataFetch.reason.message || 'Oops.. Something went wrong'
            return <BlankState heading={msg} />
        }

        if (dataFetch.fulfilled) {
            return renderSuccess(dataFetch.value.result)
        }
    }
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
