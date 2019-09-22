import React from 'react';
import PropTypes from 'prop-types';
import WizardCard from './WizardCard';

const WizardList = ({ wizards, filterName, selectWizard }) => (
  <ul className="potter__list">
    {wizards
      .filter(wizard => filterName ? wizard.name.toLowerCase().includes(filterName) : true)
      .map(wizard => (
        <WizardCard wizard={wizard} key={wizard.id} selectWizard={selectWizard} />
      ))}
  </ul>
);

WizardList.propTypes = {
  wizards: PropTypes.arrayOf(PropTypes.object),
  filterName: PropTypes.string
}

export default WizardList;

