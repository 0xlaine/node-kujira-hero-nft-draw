import Client, {HTTP} from "drand-client";
import fetch from 'node-fetch'
import AbortController from 'abort-controller'

global.fetch = fetch
global.AbortController = AbortController

export async function _createDrandClient() {
    const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce' // (hex encoded)
    const urls = [
        'https://api.drand.sh',
        'https://drand.cloudflare.com'
    ]

    const options = {chainHash}
    return await Client.wrap(HTTP.forURLs(urls, chainHash), options);
}


/**
 * Get the next round (or a specific round) from the drand servers
 * @param round number|null|undefined
 * @return {Promise<{round: number, randomness: 'string', signature: 'string', previous_signature: 'string'}>}
 */
export async function getRound(round) {
    const client = await _createDrandClient();

    const result = await client.get(round);
    await client.close();

    return result;
}
