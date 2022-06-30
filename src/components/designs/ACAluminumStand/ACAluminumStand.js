import React, { Component } from 'react'
import Header from '../Header'
import './ACAluminumStand.css'

import ContractorJobInfo from './ContractorJobInfo'
import SiteConditions from './SiteConditions'
import UnitsSpecifications from './UnitsSpecifications'
import WindLoadCalculations from './WindLoadCalculations'

import overlay1Img from './img/im2.png'
import overlay2Img from './img/ASCE 7-10. exposure C or D.svg'

export default class ACAluminumStand extends Component {

  state = {
    ultimateBasicWindSpeed: 0,
    exposureCategory: "C",
    totalRoofHeight: 0,
    maxUnitHeight: 0,
    standHeight: 18,
    totalTopArea: 0,
    totalFrontArea: 0,
    overlay1: false,
    overlay2: false
  }

  updateSiteData = (name, value) => {
    this.setState({[name]: value})
  }

  updateMaxUnitHeight = (newHeight) => {
    this.setState({maxUnitHeight: newHeight})
  }

  updateStandHeight = (newHeight) => {
    this.setState({standHeight: newHeight})
  }

  updateTotalTopArea = (newArea) => {
    this.setState({totalTopArea: newArea})
  }

  updateTotalFrontArea = (newFrontArea) => {
    this.setState({totalFrontArea: newFrontArea})
  }

  overlay1On = () => {
    this.setState({overlay1: true})
  }

  overlay2On = () => {
    this.setState({overlay2: true})
  }

  overlayOff = () => {
    this.setState({overlay1: false, overlay2: false})
  }

  render() {

    const { onRefreshClick } = this.props

    const {
      ultimateBasicWindSpeed,
      exposureCategory,
      totalRoofHeight,
      maxUnitHeight,
      standHeight,
      totalTopArea,
      totalFrontArea,
      overlay1,
      overlay2
    } = this.state

    const display = overlay1 || overlay2 ? "block" : "none"
    const display1 = overlay1 ? "block" : "none"
    const display2 = overlay2 ? "block" : "none"

    return (
      <>
        <div id="overlay"  onClick={this.overlayOff} style={{display: display}}>
          <span className="overlay-x">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" aria-label="Close icon" viewBox="0 0 18 18">
              <path 
                fillRule="evenodd" 
                d="M15.25 2.13a.44.44 0 1 1 .62.62L9.62 9l6.25 6.25a.44.44 0 1 1-.62.62L9 9.62l-6.25 6.25a.44.44 0 0 1-.55.06l-.07-.06a.44.44 0 0 1 0-.62L8.38 9 2.13 2.75a.44.44 0 0 1 .62-.62L9 8.38z"
              />
            </svg>
          </span>
        </div>
        <div id="overlay1-content">
          <div id="overlay1Img" style={{display: display1}}>
            <img src={overlay1Img} alt="Wind Speed Map" />
          </div>
        </div>
        <div id="overlay2-content" style={{display: display2}}>
          <div id="overlay2Img" className="bg-white">
            <img src={overlay2Img} width="100%" alt="Code Description" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-3" />
            <div className="col-6">
              <Header/>
              <hr/>
              <div className="row justify-content-center text-center">
                <h3>A/C ALUMINUM STAND DESIGN ACCORDING TO NOA: 20-0720.09</h3>
                <button className="btn-info" onClick={onRefreshClick}>Refresh Form</button>
              </div>
              <hr/>
              <ContractorJobInfo/>
              <hr/>
              <SiteConditions 
                updateSiteData={this.updateSiteData} 
                overlay1On={this.overlay1On}
                overlay2On={this.overlay2On}
              />
              <hr/>
              <UnitsSpecifications
                updateMaxUnitHeight={this.updateMaxUnitHeight}
                updateStandHeight={this.updateStandHeight}
                updateTotalTopArea={this.updateTotalTopArea}
                updateTotalFrontArea={this.updateTotalFrontArea}
              />
              <hr/>
              <WindLoadCalculations
                ultimateBasicWindSpeed={ultimateBasicWindSpeed}
                exposureCategory={exposureCategory}
                totalRoofHeight={totalRoofHeight}
                maxUnitHeight={maxUnitHeight}
                standHeight={standHeight}
                totalTopArea={totalTopArea}
                totalFrontArea={totalFrontArea}
              />
              <h4 className="text-danger">This document is not legally binding without the approval of a certified Professional Engineer</h4>
            </div>
          </div>
        </div>
      </>
    )
  }
}
