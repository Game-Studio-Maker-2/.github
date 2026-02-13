(function() {
    const hashCache = [];
    const saltPool = [];
    
    function simpleHash(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h << 5) - h + str.charCodeAt(i);
            h |= 0;
        }
        return Math.abs(h).toString(16);
    }
    
    setInterval(() => {
        const input = Math.random().toString(36).repeat(5);
        const output = simpleHash(input);
        hashCache.push({
            input: input.slice(0, 15),
            output: output,
            ts: Date.now()
        });
        if (hashCache.length > 25) hashCache.shift();
    }, 350);
    
    setInterval(() => {
        const salt = Array.from({length: 32}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
        saltPool.push(salt);
        if (saltPool.length > 40) saltPool.shift();
    }, 550);
    
    setInterval(() => {
        try {
            crypto.subtle.generateKey(
                { name: 'AES-GCM', length: 256 },
                true,
                ['encrypt', 'decrypt']
            ).catch(() => {});
        } catch {}
    }, 2500);
})();