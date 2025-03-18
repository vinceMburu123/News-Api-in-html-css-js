import { getNews, getSearchNews } from './api.mjs';

const contentWrapper = document.getElementById("contentWrapper");
const newsSearchInput = document.getElementById("newsSearchInput");
const messageText = document.getElementById('messageText');

document.addEventListener('DOMContentLoaded', () => {
    showMessage("Loading...");
    getNews().then(data => renderNews(data.articles));
});

function renderNews(newsData) {
    contentWrapper.innerHTML = '';

    newsData.forEach(news => {
        const defaultImage = '/pic 3.avif'
        const data = {
            urlImage: news.urlToImage ?? defaultImage,
            date: news.publishedAt,
            title: news.title,
            description: news.description ?? '',
            url: news.url
        };

        const card = `
             <div class="card">
                <div class="card-image-wrapper">
                    <img src="${data.urlImage}" alt="${data.title}" onerror="this.src='${defaultImage}'">
                </div>
                <div class="card-content">
                    <span class="card-date">${new Date(data.date).toLocaleDateString()}</span>
                    <h2 class="card-title">
                        <a href="${data.url}" target="_blank">${data.title}</a>
                    </h2>
                    <p class="card-description">${data.description}</p>
                </div>
            </div>
        
        `;

        contentWrapper.insertAdjacentHTML('beforeend', card);
    });

    messageText.style.display = "none";
}

//Event Listener
newsSearchInput.addEventListener("input", event => {
    const inputSearchValue = event.target.value;

    contentWrapper.innerHTML = '';
    if (inputSearchValue == '') {
        showMessage("Loading...");
        getNews().then(data => renderNews(data.articles));
    } else {
        showMessage("Loading...");
        getSearchNews(inputSearchValue).then(data => renderNews(data.articles));
    }
});

export function showMessage(message) { // Move showMessage outside
    messageText.style.display = 'flex';
    messageText.textContent = message;
}