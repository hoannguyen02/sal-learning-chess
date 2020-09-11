/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import CaretDown from './CaretDown';
import './index.scss';

const Dropdown = (props) => {
  const { onChange, options, label } = props;

  const [selectedItem, setSelectedItem] = useState(
    (options && options.length > 0 && (options[0] || options[0].value)) || null
  );

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    setSelectedItem(value);
    onChange(value);
  }, []);

  return (
    <div className="select-root">
      {label && <label>{label}</label>}
      <select onChange={handleChange}>
        {options &&
          Array.isArray(options) &&
          options.map((item) =>
            typeof item === 'string' ? (
              <option
                key={item}
                className={`${selectedItem === item ? 'selected' : ''}`}
              >
                {item}
              </option>
            ) : (
              <option
                key={item.name}
                value={item.value}
                className={`${selectedItem === item.value ? 'selected' : ''}`}
              >
                {item.name}
              </option>
            )
          )}
      </select>
      <CaretDown />
    </div>
  );
};

export default Dropdown;
