import React from 'react';
import {NavLink} from "react-router-dom";
import './SideBar.scss';
import SvgStatistics from '../../assets/images/iconComponents/Statistics';
import SvgRallCall from '../../assets/images/iconComponents/RollCall';
import SvgSettings from '../../assets/images/iconComponents/Settings';
import SvgHelpCenter from '../../assets/images/iconComponents/HelpCenter';

function SideBar({className}) {
  const sideBarOptions = {
    optionsOnTop: [
      { key: 1, value: 'Statistics', icon: <SvgStatistics/>, link: "/statistics" },
      { key: 2, value: 'Roll Call', icon: <SvgRallCall/>, link: "/" }
    ],
    optionsOnBottom: [
      { key: 1, value: 'Settings', icon: <SvgSettings/>, link: "/settings" },
      { key: 2, value: 'Help Center', icon: <SvgHelpCenter/>, link: "/help-center" }
    ]
  };

  function isActivePage(currentLink) {
    return currentLink === window.location.pathname; //returns the current url minus the domain name
  }

  const generateOptions = (options) => {
    return options.map((option) => (
      <NavLink key={option.key} to={option.link} activeClassName={`${isActivePage(option.link) ? true : false}` }>
        <div className="option-container" >
          {option.icon}
          <span>{option.value}</span>
        </div>
      </NavLink>
    ));
  };

  return (
    <div className={className}>
      <div className="logo">Workit {/* will be replaced */}</div>

      <div className="options-container">
        <div className="options-wrapper top-option">
          {sideBarOptions.optionsOnTop.length ? (
            generateOptions(sideBarOptions.optionsOnTop)
          ) : (
            <div>Something went wrong</div>
          )}
        </div>

        <div className="options-wrapper bottom-option">
          {sideBarOptions.optionsOnBottom.length ? (
            generateOptions(sideBarOptions.optionsOnBottom)
          ) : (
            <div>Something went wrong</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
