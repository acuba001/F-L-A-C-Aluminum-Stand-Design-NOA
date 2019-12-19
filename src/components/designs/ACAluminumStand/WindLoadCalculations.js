import React, { Component } from 'react'
import NOAStandardData from './data/NOA-standard'
import NOAHeavyData from './data/NOA-heavy'

export default class WindLoadCalculations extends Component {

  windLoadPressures = () => {
    const {
      ultimateBasicWindSpeed, 
      exposureCategory, 
      totalRoofHeight,
      maxUnitHeight,
      minStandHeight
    } = this.props

    let Rh = totalRoofHeight + maxUnitHeight/12.0 + minStandHeight/12.0
    let V = ultimateBasicWindSpeed
    let Kd = 0.85
    let Zg = exposureCategory === "C" ? 900 : 700
    let alpha = exposureCategory === "C" ? 9.5 : 11.5

    if(Rh > Zg) return [NaN, NaN, NaN]

    var Kz = 2.01
    if(Rh >= 15){
      Kz *= Math.pow(Rh/Zg, 2/alpha)
    }else{
      Kz *= Math.pow(15/Zg, 2/alpha) 
    }

    let qz = 0.00256 * Kz * Kd * V * V

    return [qz, 1.9*qz, 1.5*qz]
  }

  obtainNOA = (lateralWind, upliftWind, NOAData) => {
    const {
      maxUnitHeight,
      minStandHeight,
      totalFrontArea,
      totalTopArea
    } = this.props

    for(let i = 0; i < NOAData.length; i++){
      if(NOAData[i].frontArea >= totalFrontArea 
        && NOAData[i].topArea >= totalTopArea 
        && NOAData[i].unitHeight >= maxUnitHeight){
        
          for(let j = 0; j < NOAData[i].values.length; j++){
            let { standHeight } = NOAData[i].values[j]
            if(standHeight >= minStandHeight){
              let { frameValues } = NOAData[i].values[j]
              for(let k = 0; k < frameValues.length; k++){
                let { frames, lateral, uplift } = frameValues[k]
                if(lateral >= lateralWind && uplift >= upliftWind){
                  return [ frames, lateral, uplift ]
                }
              }
            }
          }
        }
    }

    return [NaN, NaN, NaN]
  }

  render() {

    const [ qz, lateralWind, upliftWind ] = this.windLoadPressures()
    
    const [
      standardFrames, 
      standardLateral, 
      standardUplift
    ] = this.obtainNOA(lateralWind, upliftWind, NOAStandardData)

    const [
      heavyFrames, 
      heavyLateral, 
      heavyUplift
    ] = this.obtainNOA(lateralWind, upliftWind, NOAHeavyData)
    
    return (
      <div className="row justify-content-center">
        <h4>WIND LOAD CALCULATIONS AND STAND DESIGN</h4>
        <div className="container">
          <dl className="row">
            <dt className="col-8">qz = </dt>
            <dd className="col-4">{ isNaN(qz) ? "?" :  qz.toFixed(2) } psf</dd>

            <dt className="col-8">LATERAL WIND PRESSURE = </dt>
            <dd className="col-4">{ isNaN(lateralWind) ? "?" : lateralWind.toFixed(2) } psf = 1.9 * qz</dd>

            <dt className="col-8">UPLIFT WIND PRESSURE = </dt>
            <dd className="col-4">{ isNaN(upliftWind) ? "?" : upliftWind.toFixed(2) } psf = 1.5 * qz</dd>

            <dt className="col-8">FOR STANDARD SYSTEM USE: </dt>
            { isNaN(standardFrames) 
            ? (<dd className="col-4"><b>Please, contact the engineer for this abnormal case.</b></dd>) 
            :(<>
            <dd className="col-4"><b>{standardFrames} FRAMES</b></dd>

            <dt className="col-8">LATERAL WIND PRESSURE = </dt>
            <dd className="col-4"><b>{standardLateral} psf</b> > { lateralWind.toFixed(2) } psf</dd>

            <dt className="col-8">UPLIFT WIND PRESSURE = </dt>
            <dd className="col-4"><b>{standardUplift} psf</b> > { upliftWind.toFixed(2) } psf</dd>
            </>)
            }

            <dt className="col-8">FOR HEAVY SYSTEM USE: </dt>
            { isNaN(heavyUplift)
            ? (<dd className="col-4"><b>Please, contact the engineer for this abnormal case.</b></dd>)
            :(<>
            <dd className="col-4"><b>{heavyFrames} FRAMES</b></dd>

            <dt className="col-8">LATERAL WIND PRESSURE = </dt>
            <dd className="col-4"><b>{heavyLateral} psf</b> > { lateralWind.toFixed(2) } psf</dd>

            <dt className="col-8">UPLIFT WIND PRESSURE = </dt>
            <dd className="col-4"><b>{heavyUplift} psf</b> > { upliftWind.toFixed(2) } psf</dd>
            </>)
            }
          </dl>

        </div>
      </div>
    )
  }
}
