interface ImportMetaEnv {
    readonly VITE_MODE_NAME: string
    readonly VITE_RES_URL: string
    readonly VITE_APP_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}