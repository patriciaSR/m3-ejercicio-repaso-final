import React from 'react';
import './App.css';
import { getData } from './services/fetchService';
import WizardList from './components/WizardList';
import WizardDetail from './components/WizardDetail';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wizards: [],
      favWizards: [],
      filterName: ''
    };

    this.getWizards = this.getWizards.bind(this);
    this.filterWizards = this.filterWizards.bind(this);
    this.selectWizard = this.selectWizard.bind(this);


  }

  getWizards() {
    getData().then(data => {
      let newArr = [];
      data.map((wizard, index) => {
        newArr.push({
          ...wizard,
          id: index + 1
        });
        return newArr;
      })
      this.setState({
        wizards: newArr
      })
    })
  }

  filterWizards(e) {
    const wizardName = e.currentTarget.value;
    console.log('wizardName');
    this.setState({
      filterName: wizardName
    })
  };

  selectWizard(e) {
    const wizardId = parseInt(e.currentTarget.id);
    this.setState({
      wizardSelected: this.state.wizards[wizardId -1]
    })
  };


  componentDidMount() {
    this.getWizards();
  };

  render() {
    const {
      wizards,
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
            <WizardList
              wizards={wizards}
              filterName={filterName}
              selectWizard={this.selectWizard}
            />}
          />
          <Route path='/wizard/:id' render={(props) =>
            <WizardDetail 
              details={props}
              wizards={wizards}
            />}
          />
        </Switch>



      </div>
    );
  }
}

export default App;
