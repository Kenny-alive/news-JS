import './news.css';

interface NewsItem {
    urlToImage: string | null;
    author: string | null;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    source: {
        name: string;
    };
}

class News {
    draw(data: NewsItem[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found');
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItemElement = newsClone.querySelector('.news__item') as HTMLElement;

            if (newsItemElement && idx % 2) {
                newsItemElement.classList.add('alt');
            }

            const photoElement = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            if (photoElement) {
                photoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const authorElement = newsClone.querySelector('.news__meta-author') as HTMLElement;
            if (authorElement) {
                authorElement.textContent = item.author || item.source.name;
            }

            const dateElement = newsClone.querySelector('.news__meta-date') as HTMLElement;
            if (dateElement) {
                dateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const titleElement = newsClone.querySelector('.news__description-title') as HTMLElement;
            if (titleElement) {
                titleElement.textContent = item.title;
            }

            const sourceElement = newsClone.querySelector('.news__description-source') as HTMLElement;
            if (sourceElement) {
                sourceElement.textContent = item.source.name;
            }

            const descriptionElement = newsClone.querySelector('.news__description-content') as HTMLElement;
            if (descriptionElement) {
                descriptionElement.textContent = item.description;
            }

            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLElement;
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('News container not found.');
        }
    }
}

export default News;
