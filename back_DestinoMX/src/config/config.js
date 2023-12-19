//Configuración para producción

export const PORT = process.env.PORT || 4000

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || '123456'
export const DB_NAME = process.env.DB_NAME || 'mts_database'
export const DB_PORT = process.env.DB_PORT || 3345