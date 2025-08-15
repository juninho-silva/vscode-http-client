import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('vscode-http-client.open', () => {
            const panel = vscode.window.createWebviewPanel(
                'httpClient',
                'HTTP Client',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );

            panel.webview.html = getWebviewContent();
        })
    );
}

function getWebviewContent(): string {
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: sans-serif; padding: 10px; }
                input, textarea, button { width: 100%; margin-top: 5px; }
            </style>
        </head>
        <body>
            <h1>HTTP Client</h1>
            <select id="method">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
            </select>
            <input id="url" placeholder="URL da requisição" />
            <textarea id="body" placeholder="Corpo da requisição (JSON)"></textarea>
            <button onclick="sendRequest()">Enviar</button>
            <pre id="response"></pre>

            <script>
                async function sendRequest() {
                    const method = document.getElementById('method').value;
                    const url = document.getElementById('url').value;
                    const body = document.getElementById('body').value;

                    try {
                        const res = await fetch(url, {
                            method,
                            headers: { 'Content-Type': 'application/json' },
                            body: method !== 'GET' && body ? body : undefined
                        });
                        const text = await res.text();
                        document.getElementById('response').innerText = text;
                    } catch (err) {
                        document.getElementById('response').innerText = err;
                    }
                }
            </script>
        </body>
        </html>
    `;
}
