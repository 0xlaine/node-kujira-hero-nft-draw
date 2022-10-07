import expect from 'unexpected';
import * as fs from 'fs';
import Decimal from 'decimal.js';
import {blocksLatest, validatorDelegators} from "../lcdClient.mjs";

describe('LCD client', function () {
    it('should fetch latest block info', async function () {
        const res = await blocksLatest();

        expect(res, 'to satisfy', {
            height: expect.it('not to be empty'),
            time: expect.it('not to be empty')
        })
    });

    it('should fetch validator delegations', async function () {
        const iterator = validatorDelegators(
            'kujiravaloper1hcdv29zzskacf4jxv62gxwq9jjnxcewmuq66x6',
            0
        );
        const delegators = [];
        for await (const item of iterator) {
            delegators.push(item);
        }

        expect(delegators, 'to have length', 100);
    });
});
