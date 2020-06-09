import React from 'react';

const Radiobox = ({ type = 'radio', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

export default Radiobox;
