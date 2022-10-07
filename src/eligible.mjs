import fs from "fs";
import Decimal from "decimal.js";

export async function eligibleFilter(options) {
    if(!options.snapshotFile) {
        throw new Error('No snapshot file provided, cannot commence');
    }

    console.log('Filtering all delegators based on staked amount - must end on .314');
    const delegators = JSON.parse(fs.readFileSync(options.snapshotFile));

    const mapped = delegators.map(item => ({
        delegator: item.delegation.delegator_address,
        amount: new Decimal(item.balance.amount).div(1000000).toNumber()
    }));

    const eligible = mapped.filter(item => {
        return item.amount.toString().match(/\.314/);
    })


    const outFile = `${options.outDir}/eligible.json`;
    console.log(`storing eligible wallets in ${outFile}`)
    fs.writeFileSync(outFile, JSON.stringify(eligible));
}
