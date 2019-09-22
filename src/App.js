import React from 'react';
import './App.css';
import WizardList from './components/WizardList';
import WizardDetail from './components/WizardDetail';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      favWizards: [],
      filterName: ''
    };

    this.filterWizards = this.filterWizards.bind(this);
  }

  filterWizards(e) {
    const wizardName = e.currentTarget.value;
    console.log('wizardName');
    this.setState({
      filterName: wizardName
    });
  }

  render() {
    const {
      filterName,
      wizardSelected
    } = this.state;

    return (
      <div className="app">
        <header className="page__header">
          <h1 className="page__title">Mi Potterlist</h1>
          <label htmlFor="finder" className="finder__label">Encuentra tu mago favorito</label>
          <input type="text" className="finder__input" onChange={this.filterWizards} />
        </header>
        <Switch>
          <Route exact path='/' render={() =>
              <WizardList filterName={filterName} />
            }
          />
          <Route path='/wizard/:id' component={WizardDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
