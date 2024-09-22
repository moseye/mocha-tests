import http from 'http';

function requestHandler(req, res) {
    if (req.method === 'POST' && req.url === '/sum') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const numbers = JSON.parse(body);

                if (Array.isArray(numbers) && numbers.every(num => typeof num === 'number')) {
                    const sum = numbers.reduce((acc, curr) => acc + curr, 0);

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ sum }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid input, expected an array of numbers' }));
                }
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}

const server = http.createServer(requestHandler);

export { server, requestHandler };
