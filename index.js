// file2.js
import { address, abi } from './metaData.js';
import { errors, ethers } from 'ethers';

const allFunctions = []


function main() {
    abi.map((inp) => (selectFunctions(inp)));
    // console.log(allFunctions);
}

function selectFunctions(inp) {
    if (inp.type == "function") {
        allFunctions.push(inp);
    }
}

//custom function for testing
//just return wallet/signer/provider and leave rest of the code same
async function sign() {
    try {
        const infuraProvider = new ethers.providers.InfuraProvider('sepolia', 'd9f6942875fe4a03b94c8278a7abf30f');

        const privateKey = '0425e4f5ee1c18885e2b377e4fff28e9a43e12f649b6b20dc241560867fe7e08';
        const wallet = new ethers.Wallet(privateKey, infuraProvider);
        return wallet;
    } catch {
        (err) => console.error(err);
    }
}

async function executeFunctionPureView(functionAbi, signer, parameters) {
    try {
        const contract = new ethers.Contract(address, abi, signer);

        if (functionAbi.inputs.length === 0) {
            const _name = functionAbi.name;
            const txn = await contract[_name]();
            console.log("executionIf");
            console.log("Result:",txn)
            return txn;

        }
        else {
            console.log("executionElse")
            const _name = functionAbi.name;
            const txn = await contract[_name](...parameters);
            console.log("Result:",txn)

            return txn;
        }


    }
    catch {
        (error) => { console.error("error in executionFunction: ", error) }
    }
}

async function executeFunctionNonPayable(functionAbi, signer, parameters) {
    try {
        const contract = new ethers.Contract(address, abi, signer);

        if (functionAbi.inputs.length === 0) {
            const _name = functionAbi.name;
            const txn = await contract[_name]();
            const reciept = txn.wait();
            console.log("executionIf");
            console.log("Result:",txn)
            console.log("Reciept: ", reciept);
            return reciept;
        }
        else {
            console.log("executionElse")
            const _name = functionAbi.name;
            const txn = await contract[_name](...parameters);
            const reciept = await txn.wait();
            console.log("Result:",txn)
            console.log("Reciept: ", reciept);
            return reciept;
        }

    }
    catch {
        (error) => { console.error("error in executionFunction: ", error) }
    }
}

async function executeFunctionPayable(functionAbi, signer, parameters) {
    try {
        const contract = new ethers.Contract(address, abi, signer, _amount);

        if (functionAbi.inputs.length === 0) {
            const _name = functionAbi.name;
            const txn = await contract[_name]({value: _amount});
            const reciept = txn.wait();
            console.log("executionIf");
            console.log("Result:",txn)
            console.log("Reciept: ", reciept);
            return reciept;
        }
        else {
            console.log("executionElse")
            const _name = functionAbi.name;
            const txn = await contract[_name](...parameters, {value: _amount});
            const reciept = txn.wait();
            console.log("Result:",txn)
            console.log("Reciept: ", reciept);
            return reciept;
        }

    }
    catch {
        (error) => { console.error("error in executionFunction: ", error) }
    }
}

async function callFunction(functionName, signer, parameters) {
    try{
    const _functions = allFunctions.filter((inp) => inp.name == functionName);
    const _function = _functions[0]
    
    //check if function exist or not
    //doesn't work for function shadowing in solidty contracts
    if(_functions.length != 1){
        throw new Error("function either doesn't exist or have function shadowing");
    }


    const _signer = await sign();


//stateMutablility Check
    const stateMutability = _function.stateMutability;
    if (stateMutability == ("view" || "pure")){
        console.log("State mutibility is pure or view");
        let val = await executeFunctionPureView(_function, _signer, parameters);
        console.log("Value is", typeof val);
        return val;
    }
    else if(stateMutability == "nonpayable"){
        console.log("State mutibility is nonpayable");
        let val = await executeFunctionNonPayable(_function, _signer, parameters);
        console.log("Value is", typeof val);
        return val;
    }
    else if(stateMutability == "payable"){
        console.log("State mutibility is payable");
        let val = await executeFunctionPayable(_function, _signer, parameters);
        console.log("Value is", typeof val);
        return val;
    }

    console.log(_function);}
    catch(error){
        throw error;
    }
}

async function callProxyFunctions() {
    try {
         await callFunction("balanceOf","signer",["0xF44316E37bC542bFF6eDdb33Cc11aabdc4c432A1"]);
         await callFunction("mintToken","signer",["0xF44316E37bC542bFF6eDdb33Cc11aabdc4c432A1",100]);
         await callFunction("balanceOf","signer",["0xF44316E37bC542bFF6eDdb33Cc11aabdc4c432A1"]);
    } catch (error) {
      console.error("Error calling functions:", error);
    }
  }




main();
// callProxyFunctions();
// callFunction("name","signer",["0xF44316E37bC542bFF6eDdb33Cc11aabdc4c432A1"]);

export {callFunction}


//I learned about ES MODULE 
//using a mapping for functionsName and their abis, will be way more efficient.