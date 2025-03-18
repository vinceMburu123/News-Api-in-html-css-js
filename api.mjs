import { showMessage } from "./script.js";

const API_KEY = 'e09b9e6765f243d88ce1b4985f84ebba';
const BASE_URL = 'https://newsapi.org/v2';

export async function getNews(query) {
    try {
        const getNewsDataApi = await fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
        return getNewsDataApi.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getSearchNews(query) {
    try {
        const getNewsDataApi = await fetch(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`);
        return getNewsDataApi.json();
    } catch (error) {
        console.log(error);
    }
}