import React from 'react';

//1'st way to create HOC:
const WithClass2 = props => ( //WithClass - component
  <div className={props.classes}>{props.children}</div>
);

export default WithClass2;

//usage:
// <WithClass classes={...}>
//    <html_tag></html_tag>
//    <html_tag></html_tag>
//    ...
//    <html_tag></html_tag>
//</WithClass>