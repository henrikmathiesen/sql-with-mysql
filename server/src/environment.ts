export const isProduction = process.env.NODE_ENV === 'production';
export const shouldSeed = process.env.NODE_ENV === 'seed';
export const shouldDelete = process.env.NODE_ENV === 'delete';
export const custom = process.env.CUSTOM === 'foo'; // testing setting custom env variables
