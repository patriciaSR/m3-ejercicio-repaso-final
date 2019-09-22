import React from 'react';
import { Link } from 'react-router-dom';

const WizardDetail = (props) => {
  const { wizards } = props;
  const wizardId = parseInt(props.details.match.params.id);

  const wizard = wizards.find(item => item.id === (wizardId));

  if (!wizard) {
    return (
      <p>Loading...</p>
    );
  }

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
  )
}

export default WizardDetail;