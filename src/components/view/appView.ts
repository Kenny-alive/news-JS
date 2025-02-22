import News from './news/news';
import Sources from './sources/sources';

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

interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

interface NewsData {
    articles: NewsItem[];
    status: string;
}

interface SourcesData {
    sources: Source[];
}

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
