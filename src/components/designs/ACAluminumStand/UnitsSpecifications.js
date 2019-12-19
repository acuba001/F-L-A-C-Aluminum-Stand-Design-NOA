import React, { Component } from 'react'

import Unit from './Unit'

import img1 from './ALUMINUM STAND F&L - WEB SITE.xlxm_70_image004.png'

export default class UnitsSpecifications extends Component {

  state = {
    numberOfUnits: 1,
    unitTopAreas: [0,0,0,0,0,0,0,0,0,0],
    unitFrontAreas: [0,0,0,0,0,0,0,0,0,0],
    unitHeights: [0,0,0,0,0,0,0,0,0,0],
    unitStandHeightMinimum: [0,0,0,0,0,0,0,0,0,0]
  }

  updateTopArea = (ind, topArea) => {
    const { updateTotalTopArea } = this.props
    const { unitTopAreas } = this.state
    unitTopAreas[ind] = topArea
    const newTotalArea = unitTopAreas.reduce((x,y) => x+y, 0)
    this.setState(this.state, updateTotalTopArea.bind(this,newTotalArea))
  }

  updateFrontArea = (ind, frontArea) => {
    const { updateTotalFrontArea } = this.props
    const { unitFrontAreas } = this.state
    unitFrontAreas[ind] = frontArea
    const totalArea = unitFrontAreas.reduce((x,y) => x+y, 0)
    this.setState(this.state, updateTotalFrontArea.bind(this,totalArea))
  }

  updateHeight = (ind, height) => {
    const { updateMaxUnitHeight } = this.props
    const { unitHeights } = this.state
    unitHeights[ind] = height
    this.setState(
      {...this.state, unitHeights}, 
      updateMaxUnitHeight.bind(this, Math.max(...unitHeights))
    )
  }

  updateStandHeightMinimum = (i, minHeight) => {
    const { updateMinStandHeight } = this.props
    const { unitStandHeightMinimum } = this.state

    unitStandHeightMinimum[i] = minHeight
    this.setState(
      {...this.state, unitStandHeightMinimum}, 
      updateMinStandHeight.bind(this, Math.max(...unitStandHeightMinimum))
    )
  }

  onChangeUnitNum = (e) => {
    const { unitStandHeightMinimum, unitTopAreas, unitFrontAreas } = this.state
    for(let i = e.target.value; i < 10; i++){
      unitStandHeightMinimum[i] = 0
      unitFrontAreas[i] = 0
      unitTopAreas[i] = 0
    }
    this.setState({
      ...this.state, 
      numberOfUnits: e.target.value, 
      unitStandHeightMinimum
    })
  }

  render() {

    const { numberOfUnits, unitTopAreas, unitFrontAreas, unitStandHeightMinimum } = this.state

    const topAreasTotal = unitTopAreas.reduce((x,y)=>x+y, 0)
    const frontAreasTotal = unitFrontAreas.reduce((x,y)=>x+y, 0)

    let unitForms = []

    for(let i = 1; i <= numberOfUnits; i++){
      unitForms.push(
        <Unit
          key={i} 
          ind={i} 
          updateTopArea={this.updateTopArea} 
          updateFrontArea={this.updateFrontArea} 
          updateHeight={this.updateHeight}
          updateStandHeightMinimum={this.updateStandHeightMinimum}
        />
      )
    }

    return (
      <div className="row justify-content-center">
        <h4>UNITS SPECIFICATIONS PER STAND</h4>
        <div className="container">
          <img src={img1} style={{ width: "95%" }} alt="Unit Sizes & Configurations" />
          <div className="input-group row mb-3">
            <label htmlFor="numberOfUnits" className="col">NUMBER OF UNITS: </label>
            <select className="input-control col" value={numberOfUnits} onChange={this.onChangeUnitNum} id="numberOfUnits">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">WIDTH (in)</th>
                <th scope="col">DEPTH (in)</th>
                <th scope="col">HEIGHT (in)</th>
                <th scope="col">WEIGHT (lb)</th>
              </tr>
            </thead>
            <tbody>
              {unitForms}
            </tbody>
          </table>
          <div className="row justify-center">
            { !(topAreasTotal < 37.9) ? <p className="text-danger">The total top areas is too high!</p> : null}
          </div>
          <div className="row justify-center">
            { !(frontAreasTotal < 50) ? <p className="text-danger">The total front areas is too high!</p> : null}
          </div>
          <div className="row justify-content-center">
            <p>MINIMUM STAND HEIGHT REQUIRED: <b>{Math.max(...unitStandHeightMinimum)} in.</b></p>
          </div>
        </div>
      </div>
    )
  }
}
