(function() {
    const DB = {
        connections: [],
        queries: [],
        indexes: [],
        transactions: [],
        pool: [],
        tables: ['users', 'repositories', 'commits', 'branches', 'releases', 'issues', 'pull_requests']
    };

    for (let i = 0; i < 30; i++) {
        DB.connections.push({
            id: `conn_${Math.random().toString(36).substring(2, 10)}`,
            created: Date.now() - Math.floor(Math.random() * 3600000),
            queries: Math.floor(Math.random() * 1000),
            latency: Math.floor(Math.random() * 50) + 5,
            host: `db-${Math.floor(Math.random() * 10)}.internal`,
            port: 5432 + Math.floor(Math.random() * 10),
            database: DB.tables[Math.floor(Math.random() * DB.tables.length)]
        });
    }

    setInterval(() => {
        const query = {
            id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            table: DB.tables[Math.floor(Math.random() * DB.tables.length)],
            type: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'][Math.floor(Math.random() * 4)],
            duration: Math.floor(Math.random() * 100) + 1,
            rows: Math.floor(Math.random() * 500),
            timestamp: Date.now(),
            explain: {
                seq_scan: Math.random() > 0.7,
                index_scan: Math.random() > 0.3,
                rows_examined: Math.floor(Math.random() * 10000)
            }
        };
        DB.queries.push(query);
        if (DB.queries.length > 200) DB.queries.shift();
    }, 300);

    setInterval(() => {
        DB.indexes.push({
            name: `idx_${Math.random().toString(36).substring(2, 10)}`,
            table: DB.tables[Math.floor(Math.random() * DB.tables.length)],
            columns: ['id', 'name', 'created_at', 'updated_at'].filter(() => Math.random() > 0.5),
            unique: Math.random() > 0.8,
            cardinality: Math.floor(Math.random() * 10000),
            size: Math.floor(Math.random() * 1024) + 'KB',
            created: Date.now() - Math.floor(Math.random() * 86400000)
        });
        if (DB.indexes.length > 50) DB.indexes.shift();
    }, 1800);

    setInterval(() => {
        const transaction = {
            id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            status: ['active', 'committed', 'rolled_back'][Math.floor(Math.random() * 3)],
            statements: Math.floor(Math.random() * 10) + 1,
            started: Date.now() - Math.floor(Math.random() * 5000),
            duration: Math.floor(Math.random() * 1000)
        };
        DB.transactions.push(transaction);
        if (DB.transactions.length > 100) DB.transactions.shift();
    }, 600);

    for (let i = 0; i < 20; i++) {
        DB.pool.push({
            id: i,
            active: Math.random() > 0.2,
            idle: Math.floor(Math.random() * 60000),
            queries: Math.floor(Math.random() * 500),
            acquired: Date.now() - Math.floor(Math.random() * 30000)
        });
    }

    setInterval(() => {
        DB.connections = DB.connections.map(c => ({
            ...c,
            queries: c.queries + Math.floor(Math.random() * 10),
            latency: Math.max(5, c.latency + (Math.random() - 0.5) * 10)
        }));
    }, 5000);
})();