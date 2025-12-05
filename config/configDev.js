// 公共配置文件
// 用于存放全局可复用的常量、RPC节点、合约地址等

const config = {
    enable: true,// true 强制使用测试环境
    isMainnet: true,
    bscMainnet: 'https://bsc-dataseed.binance.org/',
    mainneChainId: '0x38',
    // bscTestnet: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    bscTestnet: 'https://bsc-testnet.publicnode.com',
    testChainId: '0x61',

    usdt_contract: "0x54b38b6a99ad2cdb42b739a81ec65aefee3273a6",
    metas_contract: "0xf5b89cc627c63e788334493c38cd2270d04ddbab",
    metas_past_contract: "0x8003E36DB284e9308d685da6c0f6A00F0A894d39",


    pledge_contract: "0xED3eA487f65a3E47d8f633377D8Fdf377664528c",
    redeem_contract: "0x9bA1C084b554c1380cCF8181ae0715D15849B94d",
    release_contract: "0x376d86Ae161588b7B010BDfb3e378723F2d453fB",
    withdraw0_contract: "0x61a0D77A1a927678ca85ef0e4D2A15f6492dDfC6",
    withdraw1_contract: "0xF656418c9Af783ac118514ae5afCe6067f34FD28",
    income_contract: "0xbE5360705bBB74a8E73B522F0bD477135Bf07860",
    node_contract: "0xB9d28220d24d1fF8115f864341bc3ED5275b948D",
    stat_contract: "0xd89b9b90dd75004fad5aab348b3aefd1c43ef10c",

    usdt_contract_prod: "0x55d398326f99059ff775485246999027b3197955",
    node_receive_address_prod: "0x21DD135C26d0F6ec9655bEDf5842D3DD7D2b3B9d"
};

export default config; 