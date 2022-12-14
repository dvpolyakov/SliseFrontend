/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://minimal-assets-api-dev.vercel.app',
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    TWITTER_KEY: process.env.TWITTER_KEY,
    TWITTER_SECRET: process.env.TWITTER_SECRET,
    BACKEND_URL: process.env.BACKEND_URL,
    ML_URL: process.env.ML_URL,
    TWITTER_PROVIDER_SECRET: process.env.TWITTER_PROVIDER_SECRET,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET
  }
});


