import React, { Component } from 'react'
import classnames from 'classnames'

import Unit from './Unit'

import img1 from './ALUMINUM STAND F&L - WEB SITE.xlxm_70_image004.png'

export default class UnitsSpecifications extends Component {

  state = {
    numberOfUnits: 1,
    unitTopAreas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unitFrontAreas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unitHeights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unitStandHeightMinimum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    standHeight: 18
  }

  updateTopArea = (ind, topArea) => {
    const { updateTotalTopArea } = this.props
    const { unitTopAreas } = this.state
    unitTopAreas[ind] = topArea
    const newTotalArea = unitTopAreas.reduce((x, y) => x + y, 0)
    this.setState(
      updateTotalTopArea.bind(this, newTotalArea)
    )
  }

  updateFrontArea = (ind, frontArea) => {
    const { updateTotalFrontArea } = this.props
    const { unitFrontAreas } = this.state
    unitFrontAreas[ind] = frontArea
    const newArea = unitFrontAreas.reduce((x, y) => x + y, 0)
    this.setState(
      { unitFrontAreas },
      updateTotalFrontArea.bind(this, newArea)
    )
  }

  updateHeight = (ind, height) => {
    const { updateMaxUnitHeight } = this.props
    const { unitHeights } = this.state
    unitHeights[ind] = height
    this.setState(
      { unitHeights },
      updateMaxUnitHeight.bind(this, Math.max(...unitHeights))
    )
  }

  updateStandHeightMinimum = (i, minHeight) => {
    const { unitStandHeightMinimum } = this.state

    unitStandHeightMinimum[i] = minHeight
    this.setState({ unitStandHeightMinimum })
  }

  onChangeUnitNum = (e) => {
    const { unitStandHeightMinimum, unitTopAreas, unitFrontAreas } = this.state
    for (let i = e.target.value; i < 10; i++) {
      unitStandHeightMinimum[i] = 0
      unitFrontAreas[i] = 0
      unitTopAreas[i] = 0
    }
    this.setState({

      numberOfUnits: e.target.value,
      unitStandHeightMinimum
    })
  }

  onChangeStandHeight = (e) => {
    this.setState({standHeight: e.target.value})
    this.props.updateStandHeight(e.target.value)
  }

  render() {

    const {
      numberOfUnits, 
      unitTopAreas, 
      unitFrontAreas, 
      unitStandHeightMinimum,
      standHeight
    } = this.state

    const topAreasTotal = unitTopAreas.reduce((x, y) => x + y, 0)
    const frontAreasTotal = unitFrontAreas.reduce((x, y) => x + y, 0)

    let unitForms = []

    for (let i = 1; i <= numberOfUnits; i++) {
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

    const minStandHeight = Math.max(...unitStandHeightMinimum)
    const possibleHeights = [18, 24, 30].filter(h => h >= minStandHeight)
    const minStandClasses = classnames({'text-danger': minStandHeight >= 48})

    return (
      <>

        <div className="row justify-content-center bg-info mb-3">
          <h4>UNITS SPECIFICATIONS PER STAND</h4>
        </div>
        <div className="row justify-content-center">
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
            {
              !(topAreasTotal < 37.9) ? (
                <div className="row justify-center">
                  <p className="text-danger">The total top areas is too high!</p>
                </div>
              ) : null
            }
            {
              !(frontAreasTotal < 50) ? (
                <div className="row justify-center">
                  <p className="text-danger">The total front areas is too high!</p>
                </div>
              ) : null
            }
            <table className="table">
              <tbody>
                <tr>
                  <td><p>Stand Height:</p></td>
                  <td>
                    <select
                      className="input-control" 
                      id="standHeight" 
                      value={standHeight || Math.min(...possibleHeights)}
                      onChange={this.onChangeStandHeight}
                    >
                      {
                        possibleHeights.map((h, i) => (
                          <option key={i} value={h}>{h}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td>
                    <p className="mb-0">Minimum Stand Height:</p>
                    <p>(By FBC 2020 Table 1510.10)</p>
                  </td>
                  <td><p className={minStandClasses}>{ minStandHeight }</p></td>
                </tr>
              </tbody>
            </table>
            {
              minStandHeight >= 48 ? (
                <div className="row justify-content-center">
                  <p className="text-danger">Minimum Stand Height does not comply with NOA</p>
                </div>
              ) : null
            }
            <p><strong>NOTE: Input data provided by GC. To be verified on field. Any discrepancy is the responsibility of the general contractor.</strong></p>
          </div>
        </div>
      </>
    )
  }
}
