const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.json");

function hashWhitelist(id, address) {
    const bytes32Str = "000000000000000000000000" + address.slice(2).toLowerCase();
    console.log(bytes32Str);
    return Buffer.from(bytes32Str, "hex");
}

function createRoot() {
    const merkleTree = new MerkleTree(
        Object.entries(whitelist).map((item) => hashWhitelist(...item)),
        keccak256,
        { sortPairs: true }
    );

    console.log("merkle root:", merkleTree.getHexRoot());
}

function createProof(id, address) {
    const merkleTree = new MerkleTree(
        Object.entries(whitelist).map((item) => hashWhitelist(...item)),
        keccak256,
        { sortPairs: true }
    );

    console.log(merkleTree);

    const root = merkleTree.getHexRoot();
    const proof = merkleTree.getHexProof(hashWhitelist(id, address));

    console.log("merkle root:", root);
    console.log(
        address,
        "merkle proof",
        proof
    );

    const verify = merkleTree.verify(proof, hashWhitelist(id, address), root);
    console.log("verify:", verify);
}

function main() {
    // createRoot();
    createProof(3, '0xEe5D19BbAf15C7D33DB270e329d280b39f75d22f');
}


main();