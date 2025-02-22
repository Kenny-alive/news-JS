import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document.querySelector('.sources')?.addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data) => {
                const newsItems = data.articles.map((article) => ({
                    ...article,
                    urlToImage: article.urlToImage ?? null,
                    author: article.author ?? null,
                    publishedAt: article.publishedAt ?? '',
                }));
                this.view.drawNews({
                    status: data.status,
                    articles: newsItems,
                });
            });
        });
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
