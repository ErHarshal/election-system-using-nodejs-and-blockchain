const solc = require('solc');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
const path1 = path.join(__dirname, '../../contractAddress/Election.json');
const ElectionPath = path.resolve(__dirname,"../contracts","Election.sol");
const input = fs.readFileSync(ElectionPath,'UTF-8');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':Election'].bytecode;
const ABI = JSON.parse(output.contracts[':Election'].interface);

    web3.eth.getAccounts().then((res) => {
    const gasEstimate = web3.eth.estimateGas({ data: '0x' + bytecode });
    const contract = new web3.eth.Contract(ABI,res[1]);

    contract.deploy({
        data:'0x'+bytecode
    })
    .send({
        from: res[1],
        gas: 1500000,
        gasPrice: '3000000'
    })
    .then(function(newContractInstance){
        console.log("newContractInstance",newContractInstance.options.address) // instance with the new contract address
       let contractAddress1 = {
            'contract Name': "Election",
            'address': newContractInstance.options.address,
            'abi': ABI
        };
        fs.writeFileSync(path1, JSON.stringify(contractAddress1, null, 4), { spaces: 2 });
        process.exit();
    });
}).catch((err) => {
    console.log("error-->",err);
    process.exit();
});