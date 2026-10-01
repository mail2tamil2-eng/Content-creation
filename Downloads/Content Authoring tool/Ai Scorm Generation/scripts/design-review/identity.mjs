import { createHmac, randomBytes } from 'node:crypto';
import { readFileSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import net from 'node:net';

export async function verifyServer(root, port) {
  try {
    root = realpathSync(root);
    const record = JSON.parse(readFileSync(resolve(root, 'design-review/.server.json')));
    if (record.root !== root || record.port !== port) return false;
    const challenge = randomBytes(24).toString('hex');
    const response = await fetch(`http://127.0.0.1:${port}/__design_review_identity?challenge=${challenge}`, {signal: AbortSignal.timeout(2000)});
    if (!response.ok) return false;
    const identity = await response.json();
    const expected = createHmac('sha256', record.secret).update(`${root}\n${challenge}`).digest('hex');
    return identity.root === root && identity.name === JSON.parse(readFileSync(resolve(root, 'package.json'))).name && identity.proof === expected;
  } catch { return false; }
}

// A listening socket is the availability check. Port 0 asks the OS for a free port.
export function freePort(preferred = 0) {
  return new Promise((resolvePort, reject) => {
    const socket = net.createServer();
    socket.once('error', reject);
    socket.listen(preferred, '127.0.0.1', () => {
      const port = socket.address().port;
      socket.close(() => resolvePort(port));
    });
  });
}
