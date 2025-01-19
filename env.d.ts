declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLOUDINARY_CLOUD_NAME: string
            CLOUDINARY_API_KEY: string
            CLOUDINARY_API_SECRET: string
            CLOUDINARY_EVN_STRING: string
        }
    }
}