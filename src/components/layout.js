import React from 'react'

const Layout = (props) => {
  return (
    <div>
      {props.children ? 
        props.children : 
        <h1>Its works!</h1>
      }
    </div>
  )
};

export default Layout;
