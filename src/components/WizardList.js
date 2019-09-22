import React from 'react';
import PropTypes from 'prop-types';
import WizardCard from './WizardCard';
import getWizards from '../services/get-wizards';
import { getDefaultWatermarks } from 'istanbul-lib-report';

class WizardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wizards: null
    };
  }

  componentDidMount() {
    getWizards().then((wizards) => {
      this.setState({
        wizards
      });
    });
  }

  render() {
    const { wizards } = this.state;
    const { filterName, selectWizard } = this.props;

    if (!wizards) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <ul className="potter__list">
        {wizards
          .filter(wizard => filterName ? wizard.name.toLowerCase().includes(filterName) : true)
          .map(wizard => (
            <WizardCard wizard={wizard} key={wizard.id} selectWizard={selectWizard} />
          ))}
      </ul>
    );
  }
}

WizardList.propTypes = {
  filterName: PropTypes.string
}

export default WizardList;

