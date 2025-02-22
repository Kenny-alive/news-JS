type Options = Record<string, string | number>;

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

// interface Source {
//     id: string;
//     name: string;
//     description?: string;
//     url?: string;
//     category?: string;
//     language?: string;
//     country?: string;
// }

class Loader {
    private baseLink: string;
    private options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: (data: ApiResponse) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: (data: ApiResponse) => void, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: ApiResponse) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
