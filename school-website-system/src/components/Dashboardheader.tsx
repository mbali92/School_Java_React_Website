import React from 'react'

type headerText ={
  pageName: String,
  pageNavNameOne: String, 
  pageNavNameTwo: String
}

function Dashboardheader(props: headerText) {
  return (
    <>
      <div className="dashboard_page_header">
           <h1>{props.pageName}</h1>
           <div className="header_pagenation">
              <span><i className="lni lni-home"></i> Home</span>
              <span>{props.pageNavNameOne}</span>
              <span>{props.pageNavNameTwo}</span>
           </div>
      </div>
    </>
  )
}

export default Dashboardheader