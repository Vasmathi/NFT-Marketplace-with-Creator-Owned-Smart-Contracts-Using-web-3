// Import Web3 library
import Web3 from 'web3';

// Initialize Web3 provider
const web3 = new Web3(window.ethereum);

// Connect to Ethereum network
async function connectToEthereum() {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to Ethereum network');
    } else {
        console.log('Please install MetaMask!');
    }
}

// Get user's Ethereum account
async function getAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

// Get NFT contract instance
async function getNFTContract() {
    const nftContractAddress = '0x...'; // Replace with your NFT contract address
    const nftContractABI = [...]; // Replace with your NFT contract ABI
    const nftContract = new web3.eth.Contract(nftContractABI, nftContractAddress);
    return nftContract;
}
// Create NFT
async function createNFT(name, description, image) {
    const account = await getAccount();
    const nftContract = await getNFTContract();
    const tx = await nftContract.methods.createNFT(name, description, image).send({ from: account });
    console.log('NFT created:', tx.transactionHash);
}

// Get NFTs
async function getNFTs() {
    const nftContract = await getNFTContract();
    const nfts = await nftContract.methods.getNFTs().call();
    console.log('NFTs:', nfts);
}

// Buy NFT
async function buyNFT(nftId) {
    const account = await getAccount();
    const nftContract = await getNFTContract();
    const tx = await nftContract.methods.buyNFT(nftId).send({ from: account });
    console.log('NFT bought:', tx.transactionHash);
}

// Event listeners
document.getElementById('connectWallet').addEventListener('click', connectToEthereum);
document.getElementById('createNFTButton').addEventListener('click', createNFTForm);
document.getElementById('buyNFTButton').addEventListener('click', buyNFT);

// Create NFT form submission handler
async function createNFTForm(event) {
    event.preventDefault();
    const name = document.getElementById('nftName').value;
    const description = document.getElementById('nftDescription').value;
    const image = document.getElementById('nftImage').value;
    await createNFT(name, description, image);
}

// Buy NFT button click handler
async function buyNFTButton(event) {
    event.preventDefault();
    const nftId = document.getElementById('nftId').value;
    await buyNFT(nftId);
}
