const dev = import.meta.env.MODE === 'development'

export const serverUrl = dev
  ? 'http://localhost:4000'
  : 'https://YOUR-SERVER-URL-HERE' // TODO: add your PRODUCTION server url here
