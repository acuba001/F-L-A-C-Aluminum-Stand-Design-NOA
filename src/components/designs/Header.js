import React from 'react'

import img1 from './cropped-F-L-logo-1.webp'

export default function Header() {
  return (
    <React.Fragment>
      <div className="row text-center">
        <img src={img1} alt="F&L Aluminum" style={{ maxWidth: "100px" }} />
      </div>
    </React.Fragment>
  )
}
