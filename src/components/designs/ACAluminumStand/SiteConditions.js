import React, { Component } from 'react'

export default class SiteConditions extends Component {

  state = {
    ultimateBasicWindSpeed: "",
    exposureCategory: "C",
    totalRoofHeight: ""
  }

  RegExp = new RegExp(/^\d*\.?\d*$/)

  isValidNum = (value) => this.RegExp.test(value)

  onChange = (e) => {
    const { updateSiteData } = this.props
    if(this.isValidNum(e.target.value)){
      let name = e.target.name
      let value = e.target.value === "" ? 0 : parseFloat(e.target.value)
      this.setState(
        {...this.state, [e.target.name]: e.target.value},
        updateSiteData.bind(this, name, value)
      )
    }
    if(e.target.name === "exposureCategory"){
      const name = e.target.name
      const value = e.target.value
      this.setState(
        {...this.state, [name]: value},
        updateSiteData.bind(this, name, value)
      )
    }
    
  }

  render() {

    const { overlay1On, overlay2On } = this.props
    const { ultimateBasicWindSpeed, exposureCategory, totalRoofHeight } = this.state

    return (
      <React.Fragment>
        <div className="row justify-content-center bg-info mb-3">
          <h4>SITE CONDITIONS</h4>
        </div>
        <div className="row">
          <div className="input-group row mb-3">
            <label className="col" htmlFor="ultimateBasicWindSpeed">ULTIMATE BASIC WIND SPEED (V) = </label>
            <input className="input-control col" type="text" name="ultimateBasicWindSpeed" onChange={this.onChange} value={ultimateBasicWindSpeed} />
            <span className="input-group-text">MPH</span>
            <button className="btn-info" onClick={overlay1On.bind(this)} >Find on map</button>
          </div>
          <div className="input-group row mb-3">
            <label htmlFor="exposureCategory" className="col">EXPOSURE CATEGORY = </label>
            <select className="input-control col" name="exposureCategory" onChange={this.onChange} value={exposureCategory}>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <button className="btn-info" onClick={overlay2On}>How to determine?</button>
          </div>
          <div className="input-group row mb-3">
            <label htmlFor="totalRoofHigh" className="col">TOTAL ROOF HIGH (Rh) = </label>
            <input type="text" className="input-control col" name="totalRoofHeight" onChange={this.onChange} value={totalRoofHeight} />
            <span className="input-group-text">ft</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
