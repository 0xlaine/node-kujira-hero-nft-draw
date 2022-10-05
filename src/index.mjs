import fetch from 'node-fetch'
import AbortController from 'abort-controller'
import Client, {HTTP} from 'drand-client'

global.fetch = fetch
global.AbortController = AbortController

async function createDrandClient() {
    const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce' // (hex encoded)
    const urls = [
        'https://api.drand.sh',
        'https://drand.cloudflare.com'
    ]

    const options = {chainHash}
    return await Client.wrap(HTTP.forURLs(urls, chainHash), options);
}

async function main() {
    const client = await createDrandClient();

    const roundToFetch = 2318221;
    const result = await client.get(roundToFetch);

    console.log(result);

    await client.close();
}


main().catch(console.error);
