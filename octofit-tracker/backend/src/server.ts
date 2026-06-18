export const CODESPACE_NAME = process.env.CODESPACE_NAME;

export function getBaseUrl(port: number): string {
  return CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${port}`;
}
