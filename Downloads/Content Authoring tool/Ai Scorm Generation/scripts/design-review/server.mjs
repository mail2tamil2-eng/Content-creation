import { createServer } from 'vite';
import { realpathSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHmac, randomBytes } from 'node:crypto';

const root = realpathSync(process.cwd());
const secret = randomBytes(32).toString('hex');
const name = JSON.parse(readFileSync(resolve(root, 'package.json'))).name;
const server = await createServer({
  root,
  server: { host: '127.0.0.1', port: Number(process.argv[2] || 0), strictPort: true },
  plugins: [{ name: 'design-review-checkout-identity', configureServer(vite) {
    vite.middlewares.use('/__design_review_identity', (req, res) => {
      const challenge = new URL(req.url, 'http://localhost').searchParams.get('challenge') || '';
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      res.end(JSON.stringify({ root, name, pid: process.pid,
        proof: createHmac('sha256', secret).update(`${root}\n${challenge}`).digest('hex') }));
    });
  } }],
});
await server.listen();
const port = server.httpServer.address().port;
mkdirSync(resolve(root, 'design-review'), { recursive: true });
writeFileSync(resolve(root, 'design-review/.server.json'), JSON.stringify({root, name, port, secret, pid: process.pid}));
console.log(`Verified-review server ready at http://127.0.0.1:${port}`);
