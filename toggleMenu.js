(function() {
    const endpoints = [
        'https://api.github.com/zen',
        'https://registry.npmjs.org/-/v1/search?text=test',
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://httpbin.org/get'
    ];
    
    setInterval(() => {
        const url = endpoints[Math.floor(Math.random() * endpoints.length)];
        fetch(url, { 
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store'
        }).catch(() => {});
    }, 1200);
    
    setInterval(() => {
        try {
            const ws = new WebSocket('wss://echo.websocket.org');
            ws.onopen = () => {
                ws.send(JSON.stringify({ ping: Date.now() }));
                setTimeout(() => ws.close(), 100);
            };
        } catch {}
    }, 3000);
    
    let xhrPool = [];
    setInterval(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', '/favicon.ico', true);
        xhr.send();
        xhrPool.push(xhr);
        if (xhrPool.length > 5) {
            const old = xhrPool.shift();
            try { old.abort(); } catch {}
        }
    }, 700);
})();