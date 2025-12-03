import { readFileSync } from 'fs';
import { join } from 'path';

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
        entrypoints: ['./src/index.tsx'],
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

    // Manually bundle all CSS files
    if (url.pathname === '/bundle.css') {
      try {
        const globalCss = readFileSync('./src/styles/globals.css', 'utf-8');
        const missionCss = readFileSync('./src/styles/Mission.module.css', 'utf-8');
        const featuresCss = readFileSync('./src/styles/Features.module.css', 'utf-8');
        const guidesCss = readFileSync('./src/styles/GuidesBlog.module.css', 'utf-8');
        
        // Combine all CSS
        const combinedCss = `
/* Global Styles */
${globalCss}

/* Mission Module */
${missionCss}

/* Features Module */
${featuresCss}

/* Guides Blog Module */
${guidesCss}
`;
        
        return new Response(combinedCss, { 
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
    
    // 404
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📁 Serving files from: ${import.meta.dir}`);