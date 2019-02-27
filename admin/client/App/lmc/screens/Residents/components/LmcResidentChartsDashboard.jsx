import React, { Component } from 'react'
import { connect } from 'react-redux'
import LmcDataSource from './LmcDataSource.jsx'
import Selectors from '../../../selectors'
import _ from 'lodash'
import moment from 'moment'


export class LmcResidentChartsDashboard extends Component {

    formatChartDate(chart) {
      return `${moment(_.get(chart, 'timeLogged')).format('HH:mm DD/MM/YY')}`
    }

    formatChartValue(chart) {

        const feel = {
            1: 'Very Bad',
            2: 'Bad',
            3: 'Neutral',
            4: 'Good',
            5: 'Very Good',
        }
    
        switch (chart.key) {
        case 'blood_pressure':
            return chart.value.blood_pressure_upper
        case 'mobility':
            return feel[chart.value.mobility]
        case 'mood':
            return feel[chart.value.mood]
        case 'stool':
            return (!_.isNumber(chart.value.stool)) ? chart.value.stool || 'Normal' : `Type ${chart.value.stool}`
        default:
            return typeof chart.value !== 'undefined' ? chart.value[chart.key] : null
        }
    }

    renderChartsByCategory(title, charts) {

      const chartsOrderBy = _.orderBy(charts, 'item', ['asc', 'desc'])

      const measurements = [
        { label: 'Fluids', key: 'fluids_in', unit: ' ml last 24h' },
        { label: 'Food', key: 'meal', unit: ' portions last 24h' },
        { label: 'Health Visit', key: 'health_visit', },
        { label: 'Incident', key: 'incident', },
        { label: 'Activities & Social', key: 'activity_social', },
        { label: 'Blood Pressure', key: 'blood_pressure', unit: ' mmHg' },
        { label: 'Blood Oxygen', key: 'blood_oxygen', unit: '% SpO2' },
        { label: 'Heart Rate', key: 'heart_rate', unit: 'bpm' },
        { label: 'MUST', key: 'must' },
        { label: 'Temperature', key: 'temperature', unit: ' C' },
        { label: 'Turns', key: 'turns', unit: ' in last 24h' },
        { label: 'Waterlow', key: 'waterlow' },
        { label: 'Weight', key: 'weight', unit: ' kg' },
        { label: 'Stool', key: 'stool', },
        { label: 'Mood', key: 'mood', },
        { label: 'Mobility', key: 'mobility', },
      ]

      return (
        <div>
          {chartsOrderBy.map(chart => {
            if (title === chart.category) {
              return (
                <div
                  key={chart.itemId}
                  onPress={() => {
                    
                  }}
                >
                  <div style={styles.containerSeeButtons}>
                    <span style={{ background: chart.color, float: 'left', textAlign: 'center', marginRight: 12, ...styles.dot }}>
                      <img
                        style={styles.iconStyle}
                        src={chart.icon}
                        resizeMode='contain'
                      />
                    </span>
                    <div style={styles.containerText}>
                      <div style={styles.seeButtonsText}>
                        <span style={styles.seeButtonsTextValue}>
                          <strong>{chart.item}:</strong> {this.formatChartValue(chart)}
                          {measurements.map(item => item.key === chart.key && item.unit)}
                        </span>
                      </div>
                      <span style={styles.seeButtonsTextDate}>
                        {this.formatChartDate(chart)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            } else if (title === 'Others' && chart.category !== "RESIDENT_CHARTS_HEALTH_REC" && chart.category !== "RESIDENT_CHARTS_FOOD_DRINK") {
              return (
                <div
                  key={chart.itemId}
                  onPress={() => {
                    
                  }}
                >
                  <div style={styles.containerSeeButtons}>
                    <div style={[styles.dot, { backgroundColor: chart.color }]}>
                      {/* <LmcCachedImage
                        style={styles.iconStyle}
                        uri={chart.icon}
                        resizeMode='contain'
                      /> */}
                    </div>
                    <div style={styles.containerText}>
                      <div style={styles.seeButtonsText}>{`${chart.item}: `}
                        <div style={styles.seeButtonsTextValue}>
                          {this.formatChartValue(chart)}
                          {measurements.map(item => item.key === chart.key && item.unit)}
                        </div>
                      </div>
                      <div style={styles.seeButtonsTextDate}>
                        {this.formatChartDate(chart)}
                      </div>
                    </div>
                    {/* <Image
                      style={styles.seeButtonsRightArrow}
                      source={Images.images.rightArrow}
                    /> */}
                  </div>
                </div>
              )
            }
          })}
        </div>
      )
    }

    renderDashboard(charts) {

      const chartsHealth = charts.some(chart => chart.category === '')
      const chartsFood = charts.some(chart => chart.category === '')
      const chartsOthers = charts.some(chart => chart.category !== 'RESIDENT_CHARTS_HEALTH_REC' && chart.category !== 'RESIDENT_CHARTS_FOOD_DRINK')

      const categories = ["ABC Behaviour", "Activity", "Blood Oxygen", "Blood Pressure", "Drink",
          "Health Professional", "Heart Rate", "Illness", "Incident", "Mobility", "Mood", "MUST", "Snack", "Social",
          "Stool", "Temperature", "Toileting", "Waterlow", "Weight"]

      const chartsItems = charts.map(chart => chart.item)

      const noData = _.difference(categories, chartsItems)

      const titles = [
          'Health Recordings',
          'Food & Drink',
          'Other'
      ]
  
      return (
          <div style={styles.container}>
              {/* <Toolbar title={`${resident.name.first}'s Charts`} backArrow={goBack} style={LmcStyles.global.margin} /> */}
              <div>
                  <div style={styles.containerFull}>
                  {titles.map(title => (
                    <div key={title}>
                    {chartsHealth && title === "RESIDENT_CHARTS_HEALTH_REC" &&
                      <div style={styles.title}>
                      <div style={styles.headerText}>{title}</div>
                      {/* <GradientLine style={{ paddingTop: 16 }}></GradientLine> */}
                      </div>
                    }
                    {chartsFood && title === "RESIDENT_CHARTS_FOOD_DRINK" &&
                      <div style={styles.title}>
                      <div style={styles.headerText}>{title}</div>
                      {/* <GradientLine style={{ paddingTop: 16 }}></GradientLine> */}
                      </div>
                    }
                    {chartsOthers && title !== "RESIDENT_CHARTS_HEALTH_REC" && title !== "RESIDENT_CHARTS_FOOD_DRINK" &&
                      <div style={styles.title}>
                        <div style={styles.headerText}>{title}</div>
                      {/* <GradientLine style={{ paddingTop: 16 }}></GradientLine> */}
                      </div>
                    }
                    <div>
                        {this.renderChartsByCategory(title, charts)}
                    </div>
                  </div>
                  ))}
                  <div style={styles.title}>
                    <div style={styles.headerText}>No Recorded Data</div>
                      {/* <GradientLine style={{ paddingTop: 16 }}></GradientLine> */}
                    <div>
                    {noData.map(item => (
                        <div key={item} style={styles.noRecordedData}>
                          <div style={styles.noRecordedDataText}>
                              {item}
                          </div>
                        </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        )
    }

    render() {
        const {
            selectedResident,
        } = this.props

        if (!selectedResident) return null
        return (
            <div>
                <LmcDataSource
                    url={`${Keystone.adminPath}/api/reports/residents/${selectedResident}/dashboard`}
                    renderSuccess={result => this.renderDashboard(result)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedResident: state.residents.selectedResident,
        residentProfile: Selectors.getSelectedResidentProfile(state)
    }
}

export default connect(mapStateToProps)(LmcResidentChartsDashboard)


const styles = {
  container: {
    flex: 1,
  },
  containerFull: {
    marginTop: -20,
    paddingHorizontal: 16,
  },  
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(0, 0, 0)'
  },
  title: {
    paddingTop: 50,
    paddingBottom: 0
  },
  noRecordedData: {
    paddingVertical: 15,
    borderBottomColor: '$borderColor',
    borderBottomWidth: 1,
  },
  containerSeeButtons: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: '$borderColor',
    borderBottomWidth: 1,
  },
  dot: {
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    // width: 30,
    height: 20,
    top: 10,
    // left: 5,
    position: 'relative'
  },
  containerText: {
    bottom: 7,
  },
  seeButtonsText: {
    paddingHorizontal: 20, 
    fontWeight: '900',
  },
  seeButtonsTextValue: {
    paddingHorizontal: 20, 
    fontWeight: '400',
  },
  seeButtonsTextDate: {
    paddingHorizontal: 20,
    fontSize: 12, 
    fontWeight: '400',
    color: '$lmcGreyTextColor',
  },
  seeButtonsRightArrow: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 10,
    height: 15,
  }
}
