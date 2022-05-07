import React from 'react';
import './SideBar.scss';
import StatisticsIcon from '../../assets/images/statistics-icon.svg';
import RallCallIcon from '../../assets/images/roll-call-icon.svg';
import SettingsIcon from '../../assets/images/settings-icon.svg';
import HelpCenterIcon from '../../assets/images/help-center-icon.svg';


function SideBar({className}) {

  const sideBarOptions = {
    optionsOnTop: [
      {key: 1, value: "Statistics", icon: StatisticsIcon}, 
      {key: 2, value: "Roll Call", icon: RallCallIcon}
    ],
    optionsOnBottom: [
      {key: 1, value: "Settings", icon: SettingsIcon}, 
      {key: 2, value: "Help Center", icon: HelpCenterIcon}
    ]
  }

  const generateOptions = (options) => {
    return options.map(option => 
      <div className='option-container' key={option.key}>
        <img src={option.icon} alt={'icon'} className='icon'/>
        <span>{option.value}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className='logo'> 
        Workit {/* will be replaced */}
      </div>

      <div className='options-container'>
        <div className='options-wrapper top-option'>
          { sideBarOptions.optionsOnTop.length ? generateOptions(sideBarOptions.optionsOnTop) : <div>Something went wrong</div> } 
        </div>

        <div className='options-wrapper bottom-option'>
          { sideBarOptions.optionsOnBottom.length ? generateOptions(sideBarOptions.optionsOnBottom) : <div>Something went wrong</div> }
        </div>
      </div>
    </div>
  );
}

export default SideBar;