import AppLoader from './appLoader';

enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

interface Article {
    title: string;
    description: string;
    url: string;
    author?: string;
    publishedAt?: string;
    urlToImage?: string | null;
    source: { name: string };
}

interface ApiResponse {
    status: string;
    articles?: Article[];
    sources?: {
        id: string;
        name: string;
        description?: string;
        url?: string;
        category?: string;
        language?: string;
        country?: string;
    }[];
}

type SourcesCallback = (data: { status: string; sources: { id: string; name: string }[] }) => void;

type NewsCallback = (data: { status: string; articles: Article[] }) => void;

class AppController extends AppLoader {
    getSources(callback: SourcesCallback): void {
        super.getResp(
            {
                endpoint: Endpoint.Sources,
            },
            (data: ApiResponse) => {
                if (data.sources && data.sources.length > 0) {
                    const sources = data.sources.map((source) => ({
                        ...source,
                        description: source.description || '',
                        url: source.url || '',
                        category: source.category || 'unknown',
                        language: source.language || 'en',
                        country: source.country || 'us',
                    }));
                    callback({ status: data.status, sources });
                } else {
                    console.error('Sources not found in API response');
                    callback({ status: data.status, sources: [] });
                }
            }
        );
    }

    getNews(e: Event, callback: NewsCallback): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data: ApiResponse) => {
                            callback({ status: data.status, articles: data.articles || [] });
                        }
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
