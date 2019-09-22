# REPASO REACT. EJERCICIO POKEMONES (vídeos de Carlos)

1. Crear repo en github
2. Create-react-app nombredecarpeta

3. Npm install --save react-router-dom node-sass prop-types

4. Limpiar el proyecto para poder trabajar:
 	- index.html. ES, titulo,
	- quitar: logo, el serviceworker, app.test
	- cambiar app a clase
	- meter en constructor el estado

         [o uso carpeta React Proyect Ready]

5. En el estado pongo los datos con los que voy a trabajar


### Primera versión del proyecto. Todo en App

```js
import React from 'react';
import './App.css';

class App extends React.Component {
  // metemos en el estado la data
  constructor(props) {
    super(props);
    this.state = {
      pokemones: []
    }
  }
  // Aquí van las peticiones automáticas. Recuperado y peticiones. Todo lo que se ponga aquí se va a ejecutar una vez que se ha pintado el componente
  componentDidMount() {
    this.getPokemones();
  }

  getPokemones() {
    const endpoint = "https://raw.githubusercontent.com/Adalab/m3-evaluacion-intermedia-oneeyedman/componentbranch/pokemons.json";

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        // console.log('Aquí está la data', data)
        this.setState({
          pokemones: data
        })
        //puedo mirar en devtools. Componentes, ver que el state está ok
      })
  }
  render() {
    // console.log('Me estoy pintando', this.state.pokemones.length)
    return (
      <div className="app">
        {this.state.pokemones.map(item => <div>{item.name}</div>)}
      </div>
    );
  }
}

export default App;
```

6. Saco el fetch en un componente. 
    - Creo carpeta services
    - FetchPokemones.js
    
```js
const endpoint = "https://raw.githubusercontent.com/Adalab/m3-evaluacion-intermedia-oneeyedman/componentbranch/pokemons.json";

const fetchPokemones = () => {
    return fetch(endpoint).then(response => response.json())
}

export {fetchPokemones};
``` 

    - Lo importo en App.js
```js
import {fetchPokemones} from './services/fetchPokemones';
```

! Ahora es el momento de pensar en que cada elemento que se pinta tiene que tener un key. Si tiene id, lo usamos, si no, el index que iría en el map

```js
 <li className="pokemon" key={pokemon.id}>
```


### Si no tenemos ID en data

```js 

getPokemones() {
    fetchPokemones()
      .then(data => {
        const newData = data.map((item, index)=>{
          return {...item, newid:index}
        });
        this.setState({
          pokemones: newData
        })
      })
  }
render(){...
```

### Segunda versión del proyecto. Todo en App (menos fetch)

```js 
import React from 'react';
import './App.css';
import { fetchPokemones } from './services/fetchPokemones';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemones: []
    }
  }

  componentDidMount() {
    this.getPokemones();
  }

  getPokemones() {
    fetchPokemones()
      .then(data => {
        this.setState({
          pokemones: data
        })
      })
  }
  render() {
    const { pokemones } = this.state;
    return (
      <div className="app">
        <h1 className="app__title">Mi lista de pokemones</h1>
        <ol className="pokemones">
          {pokemones.map(pokemon => {
            return (
              <li className="pokemon" key={pokemon.id}>
                <div className="card">
                  <h2 className="card__name">{pokemon.name}</h2>
                  <div className="card__img">
                    <img src={pokemon.url} alt={`Imagen de ${pokemon.name}`}>
                    </img>
                  </div>
                </div>
              </li>)
          })}
        </ol>
      </div>
    );
  }
}

export default App;
``` 

7. Sacar PokeList en un componente fuera
8. Meter Proptypes
9. Sacar Pokemon en un componente fuera

#### PokeCard.js
```js
import React from 'react';
import PropTypes from 'prop-types';


const PokeCard = props => {
    const { name, url } = props;
    return (
        <div className="card">
            <h2 className="card__name">{name}</h2>
            <div className="card__img">
                <img src={url} alt={`Imagen de ${name}`}>
                </img>
            </div>
        </div>
    )
}

PokeCard.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default PokeCard;
``` 
#### PokeList.js
```js
import React from 'react';
import PropTypes from 'prop-types';
import PokeCard from "./PokeCard"


const PokeList = props => {
    const { pokemones } = props;
    return (
        <ol className="pokemones">
            {pokemones.map(pokemon => {
                return (
                    <li className="pokemon" key={pokemon.id}>
                        <PokeCard
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                    </li>)
            })}
        </ol>
    );
};
PokeList.protoTypes = {
    pokemones: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PokeList;

```

## FILTRADO

1. Que funcione el filtrado. Lo último es pintarlo. 
    - Lo ponemos en el estado de la App.
    - Lo ponemos antes del render junto con pokemons.
    - Lo pasamos a PokeList a través de props
2. Actualizamos las proptypes
3. Probamos cambiando el valor de query
4. Ponemos filter antes del map
5. Hacer que el filtrado funcione con mayúsculas o minúsculas

#### App.js
```js
constructor(props) {
    super(props);
    this.state = {
      pokemones: [],
      query: 'o' //probar primero con una query metida a mano
    }
  }
---
<PokeList
     pokemones={pokemones}
     query={query} />    //pasamos tanto la data como el elemento de búsqueda
``` 

#### PokeList.js
```js
import React from 'react';
import PropTypes from 'prop-types';
import PokeCard from "./PokeCard"


const PokeList = props => {
    const { pokemones, query } = props;
    return (
        <ol className="pokemones">
            {pokemones
                .filter(myPokemon => myPokemon.name.toUpperCase().includes(query.toUpperCase())) 
                      //cambiamos la búsqueda para que funcione tanto minúsculas como mayúsculas
                .map(pokemon => {
                    return (
                        <li className="pokemon" key={pokemon.id}>
                            <PokeCard
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        </li>)
                })}
        </ol>
    );
};
PokeList.protoTypes = {
    pokemones: PropTypes.arrayOf(PropTypes.object).isRequired, //siempre ponemos required en caso de duda
    query: PropTypes.string.isRequired
};

export default PokeList;

``` 

6. Meter campo para que el usuario cambie query
7. Sacarlo a un componente. Le pasamos la funcion y el valor query
8. Ponemos las proptypes

#### Filters.js
```js 
import React from 'react';
import PropTypes from 'prop-types';


const Filters = props => {
    const { getUserQuery, query } = props;
    return (
        <div className="app__filters">
            <input type="text" onChange={getUserQuery} value={query}></input>
        </div>

    );
};

Filters.propTypes = {
    getUserQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
};
export default Filters;
```

#### App.js
``` js
  getUserQuery(event) {
    const query = event.currentTarget.value;
    this.setState({
      query: query
    })
  }
``` 


## RUTAS 
1. Instalar los paquetes del router si no lo teniamos
2. Index. importar router
3. Hacer componente con la página principal y otra página para el detalle.
    - Home, crear componente
    - Quito la importación de Pokelist y filters de App
4. Seguir la estructura de App.js
5. Meter Routers y Links


#### index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));
```

#### App.js
```js
import React from 'react';
import './App.css';
import { fetchPokemones } from './services/fetchPokemones';
import Home from './components/Home'
import PokeDetail from './components/PokeDetail';
import { Switch, Route } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemones: [],
      query: ''
    }
    this.getUserQuery = this.getUserQuery.bind(this);
  }

  componentDidMount() {
    this.getPokemones();
  }

  getPokemones() {
    fetchPokemones()
      .then(data => {
        this.setState({
          pokemones: data
        })
      })
  }
  getUserQuery(event) {
    const query = event.currentTarget.value;
    this.setState({
      query: query
    })
  }
  render() {
    const { pokemones, query } = this.state;
    return (
      <div className="app">
        <h1 className="app__title">Mi lista de pokemones</h1>
        {/* necesita toda la info que necesita Filters & PokeList */}
        {/* cuando necesita props, va con render */}
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <Home
                getUserQuery={this.getUserQuery}
                query={query}
                pokemones={pokemones}
              />
            )
          }} />
          <Route path="/poke-detail" component={PokeDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
```
#### Home.js
```js
import React, { Fragment } from 'react';
import Filters from './Filters'
import PokeList from './PokeList'
import PropTypes from 'prop-types';


const Home = props => {
    const { getUserQuery, query, pokemones } = props;
    return (
        <Fragment>
            <Filters
                getUserQuery={getUserQuery}
                query={query}
            />
            <PokeList
                pokemones={pokemones}
                query={query} />
        </Fragment>
    );
};


Home.propTypes = {
    getUserQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
}

export default Home;
```

#### PokeDetail.js
```js
import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const PokeDetail = props => {
    return (
        <React.Fragment>
            <div className="poke-detail"> Soy el detalle </div>
            <Link to="/" className="app__back">Volver al listado</Link>
        </React.Fragment>
    );
};

export default PokeDetail;
``` 

## PÁGINA DE DETALLE

Para que la ruta sea diferente para cada elemento clickado hay que meter el id(si no tiene id en el json, ver ejemplo anterior para modificar ese json, y añadir un elemento id) en el Link de PokeDetail.

#### PokeList.js
```js
<Link 
  to={`/poke-detail/${pokemon.id}`}className="pokemon__link">
``` 

#### App.js
```js
 <Route path="/poke-detail/:id" render={routerProps => {
            return (
              <PokeDetail
                routerProps={routerProps}
              />
            )
          }} />
```
Cuando el route necesita pasar props ya no se puede usar un Route con componente, usamos render, y dentro le pasamos al componente las props.
En el componente PokeDetail, recibimos las props y lo consoleamos, en **params** obtenemos su id. Información que necesitamos para saber qué pokemon ha sido seleccionado.

Parseamos el id en PokeDetail, también le pasamos por props la data pokemons para encontrar el pokemon que tiene el mismo id que el elemento clickado.

**Filter** te devuelve un array. **Find** el objeto


Meter proptypes. Tenemos un objeto y un array de objetos.


Hay 2 maneras de encontrar el pokemon con mismo id:

- Filter

```js 
Antes del return

const pokemonClicked = pokemones.filter(pokemon => pokemon.id === pokeId);

    ---
En el return

<h1>{pokemonClicked[0].name}</h1>
<img src={pokemonClicked[0].url}></img>

o

const pokemonClicked = pokemones.filter(pokemon => pokemon.id === pokeId);
const { name, url, types } = pokemonClicked[0];

<h1>{name}</h1>
<img src={url}></img> 

```

- Find
```js
const pokemonClicked = pokemones.find(pokemon => pokemon.id === pokeId);
```  

### Problema al recargar la página
Error porque se pinta sin datos

Hacer un loading. Una página cuando aún no se tiene el array de pokemon.

```js

const PokeDetail = props => {
    const { routerProps, pokemones } = props;
    const pokeId = parseInt(routerProps.match.params.pokeId);

    const pokemon = pokemones.filter(pokemon => pokemon.id === pokeId);
    // el problema está aquí, cuando la página no tiene información para pintar aún
    if (pokemon[0]) {
        const { name, url, types } = pokemon[0];
        return (
            <React.Fragment>
                <div className="poke-detail">
                    {/* <h1>{pokemon.name}</h1>
                <img src={pokemon.url}></img> */}
                    <h1>{name}</h1>
                    <img src={url}></img>
                </div>

                <ul className="poke-detail__types">
                    {types.map((type, index) => {
                        return (
                            <li key={index} className="poke-detail__types">
                                {type}
                            </li>
                        )
                    })}
                </ul>
                <Link to="/" className="app__back">Volver al listado</Link>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Chacho, ese no lo tienes</p>
                <Link to="/" className="app__back">Volver al listado</Link>
            </React.Fragment>
        )
    }
};

PokeDetail.propTypes = {
    routerProps: PropTypes.object.isRequired,
    pokemones: PropTypes.arrayOf(PropTypes.object).isRequired
}

```  

Para cuando ponemos en la ruta un id más alto de los pokemones que tenemos:

```js
const PokeDetail = props => {
    const { routerProps, pokemones } = props;
    const pokeId = parseInt(routerProps.match.params.pokeId);

    if (pokeId > pokemones.length) {
        return (
            <p>Mira, mira, que es viernes...</p>
        )
    }
```  
Fin