async function main(){
    const tokenInstance = await ethers.getContractFactory('Token');   // instance of contract
    const deployedTokenContract = await tokenInstance.deploy();       // deploy contract
    console.log("Contract address: ", deployedTokenContract.address);
}

main()
    .then(()=>process.exit(0))
    .catch((error) =>{
        console.log(error);
        process.exit(1);
});