import React from 'react'

import img1 from './cropped-F-L-logo-1.webp'
import img2 from './download.jpg'

export default function Header() {
  return (
    <React.Fragment>
      <div className="row align-items-center">
        <div className="col-4">
          <img src={img1} alt="F&L Aluminum" style={{ width: "40%" }} />
        </div>
        <div className="col">
          <img src={img2} alt="Milton Cubas PE INC." style={{ width: "50%" }} />
        </div>
      </div>
      <hr/>
      <div className="row justify-content-center">
        <p className=" mb-1">1302 NE 125 ST North Miami, FL 33161</p>
      </div>
      <div className="row justify-content-center">
        <p className=" mb-1">Phone: 305-891-4174 Fax: 305-891-4175</p>
      </div>
      <div className="row justify-content-center mb-3">
        <p>E-mail: miltoncubas@msn.com</p>
      </div>
    </React.Fragment>
  )
}
