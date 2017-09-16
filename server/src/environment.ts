//export const custom = process.env.CUSTOM === 'foo'; // testing setting custom env variables, works fine

export const environmentsConstants = {
    development: 'development',
    production: 'production',
    seed: 'seed',
    delete: 'delete'
};

export const environment = process.env.NODE_ENV || environmentsConstants.development;
