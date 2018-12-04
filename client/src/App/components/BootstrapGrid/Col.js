import React from 'react'

const Col = ({ children, overflow, size, span = 12, offset }) => {

  let className = size ? `col-${size}-${span}` : `col-${span}`;

  className = offset ? `${className} offset-${offset}` : className;

  if (overflow)
    className += " overflow";

  return (

    <div className={className}>
      {children}
    </div>

  );
}


export default Col;