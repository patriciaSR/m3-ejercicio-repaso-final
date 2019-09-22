import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getWizardById from '../services/get-wizard-by-id';

class WizardDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wizard: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const wizardId = parseInt(match.params.id);

    getWizardById(wizardId).then((wizard) => {
      this.setState({
        wizard
      });
    });
  }

  render() {
    const { wizard } = this.state;

    if (!wizard) {
      return (
        <p>Loading...</p>
      );
    }

    const { match } = this.props;
    const { name, house, image, yearOfBirth, alive } = wizard;

    return (
      <>
        <div className="wizard__card">
          <h2 className="wizard__name">{name}</h2>
          <p className="wizard__house">{house}</p>
          <img src={image} alt={name} className="wizard__image" />
          <p className="wizard__year">{yearOfBirth}</p>
          <p className="wizard__state">{alive ? 'alive' : 'muerto'}</p>
        </div>
        <div className="return">
          <Link to='/'>Volver a Home</Link>
        </div>
      </>
    );
  }
}

WizardDetail.propTypes = {
  filterName: PropTypes.string
}

export default WizardDetail;