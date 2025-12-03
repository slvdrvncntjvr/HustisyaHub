const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    
    // Serve index.html for root
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(Bun.file('./index.html'));
    }
    
    // Serve static files from src
    if (url.pathname.startsWith('/src/')) {
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