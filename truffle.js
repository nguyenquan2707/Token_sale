module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",     // Localhost (default: none)
            port: 7545,            // Standard Ethereum port (default: none)
            network_id: "*",       // Any network (default: none)
        },
        rinkeby: {
            host: "localhost",
            port: 8545,
            network_id: 4,
            gas: 4700000
        }   
    }
};