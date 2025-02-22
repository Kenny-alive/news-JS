import Loader from './loader';

interface EnvVariables {
    API_URL: string;
    API_KEY: string;
}
// console.log('API URL:', process.env.API_URL);
// console.log('API KEY:', process.env.API_KEY);

class AppLoader extends Loader {
    constructor() {
        // const env = process.env as unknown as EnvVariables;

        // if (!env.API_URL || !env.API_KEY) {
        //     throw new Error('Missing API_URL or API_KEY in environment variables');
        // }
        // console.log('API URL:', env.API_URL);
        // console.log('API KEY:', env.API_KEY);

        super(process.env.API_URL as string, {
            apiKey: process.env.API_KEY as string,
        });
    }
}

export default AppLoader;
