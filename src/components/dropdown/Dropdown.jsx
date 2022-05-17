import '../../App.css';
import Select from 'react-select';

function Dropdown({ title, handleChange, options }) {
  const customStyles = {
    control: (css) => ({
      ...css,
      width: 300,
      height: 30,
      fontSize: 20,
      textAlign: 'left',
      border: 0,
      // This line disable the blue border
      boxShadow: 'none'
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
      <span style={{ fontSize: 20 }}>{`${title}: `}</span>
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
