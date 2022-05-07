import { useEffect, useState } from 'react';
import '../../App.css';
import Select from 'react-select';

function Dropdown({ title, handleChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // TODO: call api to get courses for the logged in user
    // set options array
    setOptions([
      { label: 'Testing', value: 1 },
      { label: 'Databases for Developers', value: 2 },
      { label: 'Large Systems Development', value: 3 }
    ]);
  }, []);

  const customStyles = {
    control: (css) => ({
      ...css,
      width: 300,
      height: 30,
      fontSize: 20,
      textAlign: 'left',
      border: 0,
      // This line disable the blue border
      boxShadow: 'none',
      cursor: 'pointer'
    }),
    menu: (base) => ({
      ...base,
      fontSize: 20,
      textAlign: 'left',
      zIndex: 999
    })
  };

  return (
    <div className="drop-down">
      <text style={{ fontSize: 20 }}>{`${title}: `}</text>
      <Select
        onChange={handleChange}
        components={{ IndicatorSeparator: () => null }}
        styles={customStyles}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors
          }
        })}
      />
    </div>
  );
}

export default Dropdown;
