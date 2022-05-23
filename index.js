// Imports
const prompt = require('prompt-sync')();
const fs = require('fs').promises;
const fetch = require('node-fetch');

// To sleep in ms
const sleep = (ms) => { 
    return new Promise((resolve) => { 
        setTimeout(resolve, ms); 
    }); 
}

// Scraping sites
const httpSites = [
    'https://sunny9577.github.io/proxy-scraper/proxies.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
    'https://api.openproxylist.xyz/http.txt',
    'http://proxylists.net/http_highanon.txt'
];

const socks4Sites = [
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS4_RAW.txt',
    'https://api.openproxylist.xyz/socks4.txt'
];

const socks5Sites = [
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/SOCKS5_RAW.txt',
    'https://api.openproxylist.xyz/socks5.txt'
];

const getProxies = async (proxyType) => {
    switch(proxyType) {
        case 1:
            // Clears file and makes the file (if it hasn't been made already)
            fs.writeFile('httpProxies.txt', '');
            for (i = 0; i < httpSites.length; i++) {
                let response = await fetch(httpSites[i],  {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
                    },
                    method: "GET"
                });
                let proxies = await response.text();
                await fs.appendFile('httpProxies.txt', proxies);
            }
            console.log("Successfully added proxies to httpProxies.txt");
            break;

        case 2:
            // Clears file and makes the file (if it hasn't been made already)
            fs.writeFile('socks4Proxies.txt', '');
            for (i = 0; i < socks4Sites.length; i++) {
                let response = await fetch(socks4Sites[i],  {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
                    },
                    method: "GET"
                });
                let proxies = await response.text();
                await fs.appendFile('socks4Proxies.txt', proxies);
            }
            console.log("Successfully added proxies to socks4Proxies.txt");
            break;

        case 3:
            // Clears file and makes the file (if it hasn't been made already)
            fs.writeFile('socks5Proxies.txt', '');
            for (i = 0; i < socks5Sites.length; i++) {
                let response = await fetch(socks5Sites[i],  {
                    headers: {
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
                    },
                    method: "GET"
                });
                let proxies = await response.text();
                await fs.appendFile('socks5Proxies.txt', proxies);
            }
            console.log("Successfully added proxies to socks5Proxies.txt");
            break;

        default:
            console.log("An unknown error occured");
    }
}

const main = async () => {
    console.clear();
    console.log(`
    Proxy Type
[1] http
[2] socks4
[3] socks5
    `)
    const proxyType = Number(prompt("[>]"));

    // Checks if proxyType is 1,2 or 3
    if (Number.isNaN(proxyType)) {
        console.log("Your choice is invalid, value must be integer!");
        await sleep(5000);
        process.exit(0);

    } else if ([1,2,3].indexOf(proxyType) === -1) {
        console.log("Your choice is invalid, value must be 1,2 or 3!");
        await sleep(5000);
        process.exit(0);
    } 

    await getProxies(proxyType);
}

main();
