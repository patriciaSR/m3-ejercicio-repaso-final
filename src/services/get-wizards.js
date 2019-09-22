const ENDPOINT = 'http://hp-api.herokuapp.com/api/characters';
let WIZARDS_CACHE;

const getWizards = (options) => {
  options = options || {};
  // Si tenemos los datos almacenados y no es necesario refrescar 
  // la caché, devolvemos lo almacenado anteriormente.
  if (WIZARDS_CACHE && !options.forceRefresh) {
    // Devolvemos una promesa, porque el fetch devuelve una promesa.
    // Así la función siempre devuelve lo mismo
    return WIZARDS_CACHE;
  }

  // Creamos la promesa que se encarga de llamar al back-end
  const promise = fetch(ENDPOINT)
    .then(response => response.json())
    .then(data => {
      // Add ID
      data.forEach((wizard, index) => {
        wizard.id = index;
      });

      return data;
    });

  // Guardamos la promesa para devolverla si se vuelve a llamar a la función
  WIZARDS_CACHE = promise;

  // Devolvemos la promesa
  return promise;
};

export default getWizards;