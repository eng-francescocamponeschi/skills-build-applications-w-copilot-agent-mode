"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODESPACE_NAME = void 0;
exports.getBaseUrl = getBaseUrl;
exports.CODESPACE_NAME = process.env.CODESPACE_NAME;
function getBaseUrl(port) {
    return exports.CODESPACE_NAME
        ? `https://${exports.CODESPACE_NAME}-8000.app.github.dev`
        : `http://localhost:${port}`;
}
