import React from 'react'

export default function ContractorJobInfo() {
  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <h4>CONTRACTOR AND JOB INFORMATION</h4>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col"><h5><u>CONTRACTOR INFORMATION:</u></h5></th>
            <th scope="col"><h5><u>JOB INFORMATION:</u></h5></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="input-group">
                <label htmlFor="companyName">COMPANY NAME:</label>
                <input className="input-control" type="text" id="companyName"/>
              </div>
            </td>
            <td>
              <div className="input-group">
                <label htmlFor="projectName">PROJECT NAME:</label>
                <input className="input-control" type="text" id="projectName"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="input-group">
                <label htmlFor="companyAddress">CONTRACTOR ADDRESS:</label>
                <input className="input-control" type="text" id="companyAddress"/>
              </div>
            </td>
            <td>
              <div className="input-group">
                <label htmlFor="projectAddress">PROJECT ADDRESS:</label>
                <input className="input-control" type="text" id="projectAddress"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="input-group">
                <label htmlFor="companyCityState">CITY, STATE:</label>
                <input className="input-control" type="text" id="companyCityState"/>
              </div>
            </td>
            <td>
              <div className="input-group">
                <label htmlFor="projectCityState">CITY, STATE:</label>
                <input className="input-control" type="text" id="projectCityState"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="input-group">
                <label htmlFor="companyZipcode">ZIPCODE:</label>
                <input className="input-control" type="text" id="companyZipcode"/>
              </div>
            </td>
            <td>
              <div className="input-group">
                <label htmlFor="projectZipcode">ZIPCODE:</label>
                <input className="input-control" type="text" id="projectZipcode"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}
