import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const WizardCard = ({ wizard, selectWizard }) => {
  const {
    id,
    name,
    house,
    image
  } = wizard;
  return (
    <li className="wizard" id={id} onClick={selectWizard}>
      <Link to={`/wizard/${id}`}>
        <h2 className="wizard__name">{name}</h2>
        <p className="wizard__house">{house}</p>
        <img src={image} alt={name} className="wizard__image" />
      </Link>

    </li>
  )
};

WizardCard.propTypes = {
  wizard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    house: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  selectWizard: PropTypes.func
}

export default WizardCard;
