
import { ethers } from "ethers";
import config from "../config/configDev"
import Vue from "vue"

export default {
    // 合约Call方法 - 只读操作
    async contactFunctionCall(abi, method, params, contract) {
        try {
            // 切换网络
            await this.switchNetwork();
            // 创建provider
            const provider = new ethers.BrowserProvider(window.ethereum);
            // 创建合约实例
            const contractInstance = new ethers.Contract(contract, abi, provider);
            // 调用合约方法
            const result = await contractInstance[method](...params);
            return { error: null, result };
        } catch (error) {
            console.error("contactFunctionCall error:", error);
            return { error, result: null };
        }
    },

    // 合约Send方法 - 写入操作
    async contactFunctionSend(abi, method, params, contract, value = "0") {
        try {
            console.log("执行合约:" + contract)
            console.log("执行参数:" + params)
            // 切换网络
            await this.switchNetwork();
            //  请求账户访问权限
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // 创建provider和signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const address = await signer.getAddress();
            console.log(address);
            // 创建合约实例
            const contractInstance = new ethers.Contract(contract, abi, signer);
            // 发送交易
            const tx = await contractInstance[method](...params, { value, gasLimit: 500000 });
            console.log("Transaction sent:", tx.hash);
            // 等待交易确认
            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);
            return { error: null, transactionHash: tx.hash, receipt };
        } catch (error) {
            console.error("contactFunctionSend error:", error);
            return { error: error.message || "Transaction failed", transactionHash: null, receipt: null };
        }
    },

    async getSignature(signMessage) {
        // 创建 provider 和 signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        // 使用 ethers.js 进行签名
        try {
            const signature = await signer.signMessage(signMessage);
            console.log("Signature:", signature);

            return signature;
            // 后续处理签名结果
        } catch (error) {
            console.error("Signing failed:", error);
        }

    },

    // 网络切换方法
    async switchNetwork() {
        try {
            const vm = new Vue();
            console.log(vm.$config.isMainnet);
            const chainId = vm.$config.isMainnet == true ? config.mainneChainId : config.testChainId;
            console.log(chainId);
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }]
            });
        } catch (error) {
            console.log("Switch network error:", error);
            if (error.code === 4902) {
                // 可以在这里添加网络
                console.log("Network not found, need to add it");
                // await this.addNetwork();
            }
            // 网络切换失败不影响后续操作
        }
    },

    // 添加网络方法（可选）
    async addNetwork() {
        const vm = new Vue();
        console.log(vm.$config.isMainnet);
        const chainId = vm.$config.isMainnet == true ? config.mainneChainId : config.testChainId;

        if (chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId }]
                });
            } catch (addError) {
                console.error("Failed to add network:", addError);
            }
        }
    },

    // 获取账户余额
    async getBalance(account) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const balance = await provider.getBalance(account);
            return ethers.formatEther(balance);
        } catch (error) {
            console.error("Get balance error:", error);
            return "0";
        }
    },

    // 获取当前网络ID
    async getChainId() {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();
            return network.chainId;
        } catch (error) {
            console.error("Get chainId error:", error);
            return null;
        }
    }
};
