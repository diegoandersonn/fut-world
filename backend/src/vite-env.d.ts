interface ImportMetaEnv {
  readonly HEADERS: string;
  readonly VITE_API_URL: string;
  // Adicione outras variáveis de ambiente aqui, se necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
