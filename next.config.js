/** @prettier */
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = phase => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    // when `next build` or `npm run build` is used
    const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

    const env = {
        GQL_ENDPOINT_URL: (() => {
            if (isDev) return 'localhost:5000/graphql';
            if (isProd) {
                return 'localhost:5000/graphql';
            }
            return 'localhost:5000/graphql';
        })(),
    };

    return {
        basepath: '',
        env,
    };
};
