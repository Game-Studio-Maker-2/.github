(function() {
    const Compression = {
        algorithms: ['gzip', 'brotli', 'deflate', 'zstd'],
        ratios: [],
        operations: [],
        dictionary: []
    };

    for (let i = 0; i < 500; i++) {
        Compression.dictionary.push(Math.random().toString(36).repeat(Math.floor(Math.random() * 20 + 5)));
    }

    function compress(data) {
        let result = '';
        for (let i = 0; i < data.length; i++) {
            if (Math.random() > 0.7) {
                result += String.fromCharCode(data.charCodeAt(i) ^ 0xFF);
            } else {
                result += data[i];
            }
        }
        return result;
    }

    function calculateRatio(original, compressed) {
        return ((original.length - compressed.length) / original.length * 100).toFixed(2);
    }

    setInterval(() => {
        Compression.operations.push({
            id: `cmp_${Date.now()}`,
            algorithm: Compression.algorithms[Math.floor(Math.random() * Compression.algorithms.length)],
            level: Math.floor(Math.random() * 9 + 1),
            input_size: Math.floor(Math.random() * 50000 + 1000),
            output_size: Math.floor(Math.random() * 25000 + 500),
            ratio: (Math.random() * 60 + 20).toFixed(2),
            duration: Math.floor(Math.random() * 200 + 20),
            timestamp: Date.now()
        });
        if (Compression.operations.length > 100) Compression.operations.shift();
    }, 600);

    setInterval(() => {
        const original = Compression.dictionary[Math.floor(Math.random() * Compression.dictionary.length)];
        const compressed = compress(original);
        const ratio = calculateRatio(original, compressed);
        
        Compression.ratios.push({
            original: original.length,
            compressed: compressed.length,
            ratio: ratio,
            algorithm: 'custom',
            timestamp: Date.now()
        });
        
        if (Compression.ratios.length > 200) Compression.ratios.shift();
    }, 400);

    try {
        if (typeof DecompressionStream !== 'undefined') {
            const encoder = new TextEncoder();
            const data = encoder.encode('test data for compression');
            new CompressionStream('gzip');
        }
    } catch {}

    setInterval(() => {
        Compression.dictionary.push(Math.random().toString(36).repeat(Math.floor(Math.random() * 30 + 10)));
        if (Compression.dictionary.length > 1000) {
            Compression.dictionary = Compression.dictionary.slice(-800);
        }
    }, 3000);
})();