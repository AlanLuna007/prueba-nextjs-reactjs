
const login = async(data) => {
try {
    console.log('aqui');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const url = 'https://tusitioweb.dev/awards/wp-json/jwt-auth/v1/token';
    return fetch(url, requestOptions).then((res)=>res).catch((error)=> error);
} catch (error) {
    throw error;
}
}

const register = async(data) => {
try {
    console.log('aqui2');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
    const url = 'https://tusitioweb.dev/awards/wp-json/wp/v2/registro/participante';
    return fetch(url, requestOptions).then((res)=>res).catch((error)=> error);
} catch (error) {
    throw error;
}
}

const getGoula = () => {
    const url = 'https://awards.goula.lat/cms/wp-json/wp/v2/convocatoria/49';
   return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

const getCategories = () => {
    const url = 'https://awards.goula.lat/cms/wp-json/wp/v2/convocatoria/709';
   return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

const getJueces = () => {
    const url = 'https://awards.goula.lat/cms/wp-json/wp/v2/convocatoria/69';
   return fetch(url)
  .then((response) => response.json())
  .then((data) => data);
}

export const userService = {
    login,
    register,
    getGoula,
    getCategories,
    getJueces
};
