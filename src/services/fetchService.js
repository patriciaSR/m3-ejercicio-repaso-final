const ENDPOINT = 'http://hp-api.herokuapp.com/api/characters';

const getData = () => {
  return fetch(ENDPOINT).then(response => response.json());
};

export { getData };