import getWizards from './get-wizards';

const getWizardById = (id, options) => {
  options = options || {};

  return getWizards(options).then((wizards) => {
    return wizards.find((wizard) => wizard.id === id);
  });
};

export default getWizardById;