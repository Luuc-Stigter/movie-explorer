import axios from 'axios';

const apiKey = '65940a5667026ad4d3a43c7616473dec';

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
        language: 'nl-NL',
    },
});

export default tmdb;