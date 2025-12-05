// 公共配置文件
// 用于存放全局可复用的常量、RPC节点、合约地址等

const config = {

    //打包状态 并且在 configDev中配置 enable: false  走这里的配置文件
    isMainnet: true,
    bscMainnet: 'https://bsc-dataseed.binance.org/',
    mainneChainId: '0x38',
    // bscTestnet: 'https://bsc-testnet.publicnode.com',
    // testChainId: '0x61',
    
    usdt_contract: "0x55d398326f99059ff775485246999027b3197955",
    metas_contract: "0x567fd5658f48C1c826a912ea1Ba37696A6B32006",

    pledge_contract: "0x7823e55972413eD9a94719A0E08A0Eb148D27219",
    redeem_contract: "0xBa843B86A6E57b30c10bc5Ca2342111D37E14325",
    release_contract: "0x8b25c2D9feE4f90F6e869a1712ED8299Cdf4a62b",
    withdraw0_contract: "0x9e5dd83d51a73CA7f4D814a5B19Ece051f4b18B7",
    withdraw1_contract: "0xd45a509B10CDDe66aeC28536F1dd57036c4d20D5",
    income_contract: "0xcde7152c171CDF12b990D9bb9D45Bcd89125f80E",
    node_contract: "0xB0Ede807C59487FD974F388cF569935bD41a9242",
    stat_contract: "0xd89b9b90dd75004fad5aab348b3aefd1c43ef10c",

    usdt_contract_prod: "0x55d398326f99059ff775485246999027b3197955",
    node_receive_address_prod: "0x21DD135C26d0F6ec9655bEDf5842D3DD7D2b3B9d"
};

export default config; 