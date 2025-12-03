import { $ } from "bun";
import { readFileSync } from 'fs';
import { join } from 'path';

// Cache for compiled CSS
let cssCache: string | null = null;

async function compileTailwindCSS() {
  if (cssCache) return cssCache;
  
  try {
    // Use Tailwind CLI to compile CSS
    const proc = Bun.spawn(["bunx", "tailwindcss", "-i", "./src/styles/globals.css", "--stdout"], {
      cwd: process.cwd(),
    });
    
    const output = await new Response(proc.stdout).text();
    cssCache = output;
    return output;
  } catch (error) {
    console.error("Error compiling Tailwind CSS:", error);
    // Fallback: return raw CSS
    return readFileSync('./src/styles/globals.css', 'utf-8');
  }
}

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    console.log(`[${req.method}] ${url.pathname}`);
    
    // Serve index.html for root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(Bun.file('./index.html'), {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // Bundle and serve the entry point (JS)
    if (url.pathname === '/bundle.js') {
      const build = await Bun.build({
        entrypoints: ['./src/main.tsx'],
        target: 'browser',
        minify: false,
      });
      
      if (build.success) {
        const jsArtifact = build.outputs.find(a => a.kind === 'entry-point');
        return new Response(jsArtifact, { headers: { 'Content-Type': 'text/javascript' } });
      } else {
        console.error(build.logs);
        return new Response(build.logs.join('\n'), { status: 500 });
      }
    }

    // Serve compiled Tailwind CSS
    if (url.pathname === '/bundle.css') {
      try {
        const css = await compileTailwindCSS();
        return new Response(css, { 
          headers: { 'Content-Type': 'text/css' } 
        });
      } catch (err) {
        console.error('Error loading CSS:', err);
        return new Response('/* Error loading CSS */', { 
          status: 500, 
          headers: { 'Content-Type': 'text/css' } 
        });
      }
    }
    
    // Serve static files from src
    if (url.pathname.startsWith('/src/') || url.pathname.startsWith('/public/')) {
      const filePath = '.' + url.pathname;
      const file = Bun.file(filePath);
      
      if (await file.exists()) {
        return new Response(file);
      }
    }
    
    // SPA Fallback: Serve index.html for any other route
    return new Response(Bun.file('./index.html'), {
      headers: { 'Content-Type': 'text/html' }
    });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📁 Serving files from: ${import.meta.dir}`);