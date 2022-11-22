const Web3 = require('web3');
const {arrayContainsArray} = require("truffle/build/671.bundled");

const loteria = artifacts.require("loteria");

contract("loteria", accounts => {

    it("Debería retornar el name del token creado", async () => {
        let instance = await loteria.deployed();

        let _name = await instance.name.call();
        assert.equal(_name, "Loteria");
    });

    it("Debería retornar el symbol del token creado", async () => {
        let instance = await loteria.deployed();

        let _name = await instance.symbol.call();
        assert.equal(_name, "JA");
    });

    it("Debería comprobar el precio de tokens, compra tokens y balance tokens del usuario", async () => {
        let instance = await loteria.deployed();

        let tokens_usuario_compra = 1
        let cuenta_usuario = accounts[3]

        await instance.compraTokens(tokens_usuario_compra, {
            from: cuenta_usuario,
            value: Web3.utils.toWei(tokens_usuario_compra.toString(),"ether")
        });

        let _balance_tokens_usuario = await instance.balanceTokens(cuenta_usuario);
        assert.equal(_balance_tokens_usuario, tokens_usuario_compra);
    });

    it("Debería retornar el balance tokens Smart Contract", async () => {
        let instance = await loteria.deployed();

        let tokens_creados = 999

        let _balance_tokens_smart_contract = await instance.balanceTokensSC();
        assert.equal(_balance_tokens_smart_contract, tokens_creados);
    });

    it("Debería retornar el balance ethers Smart Contract", async () => {
        let instance = await loteria.deployed();

        let ethers_smart_contract = 1

        let _balance_ethers_smart_contract = await instance.balanceEthersSC();
        assert.equal(_balance_ethers_smart_contract, ethers_smart_contract);
    });

    it("Debería comprobar el minteo de tokens", async () => {
        let instance = await loteria.deployed();

        let tokens_nuevos = 1000

        let _balance_tokens_smart_contract_before = await instance.balanceTokensSC();
        assert.equal(_balance_tokens_smart_contract_before, 999);

        const owner = await instance.owner.call()
        await instance.mint(tokens_nuevos, {
            from: owner
        });

        let _balance_tokens_smart_contract_after = await instance.balanceTokensSC();
        assert.equal(_balance_tokens_smart_contract_after, 1999);
    });

    it("Devolución tokens al Smart Contract", async () => {
        let instance = await loteria.deployed();

        let cuenta_usuario = accounts[3]

        let balance_tokens_smart_contract = 1999

        let tokens_usuario_compra = 20

        await instance.compraTokens(tokens_usuario_compra, {
            from: cuenta_usuario,
            value: Web3.utils.toWei(tokens_usuario_compra.toString(),"ether")
        });

        let _balance_tokens_smart_contract_before = await instance.balanceTokensSC();
        assert.equal(_balance_tokens_smart_contract_before, balance_tokens_smart_contract - 20);

        await instance.devolverTokens(tokens_usuario_compra, {
            from: cuenta_usuario
        });

        let _balance_tokens_smart_contract_after = await instance.balanceTokensSC();
        assert.equal(_balance_tokens_smart_contract_after, balance_tokens_smart_contract);
    });

    it("Debería comprar que se compran boletos y se obtienen los boletos del usuario ya comprados", async () => {
        let instance = await loteria.deployed();

        let cuenta_usuario = accounts[4]

        let tokens_usuario_compra = 20

        let boletos_usuario_compra = 4

        await instance.compraTokens(tokens_usuario_compra, {
            from: cuenta_usuario,
            value: Web3.utils.toWei(tokens_usuario_compra.toString(),"ether")
        });

        let _balance_tokens_usuario_before = await instance.balanceTokens(cuenta_usuario);
        assert.equal(_balance_tokens_usuario_before, tokens_usuario_compra);

        let _balance_boletos_usuario_before = await instance.tusBoletos(cuenta_usuario);
        assert.equal(_balance_boletos_usuario_before.length, 0);

        await instance.compraBoleto(boletos_usuario_compra, {
            from: cuenta_usuario,
        });

        let _balance_boletos_usuario_after = await instance.tusBoletos(cuenta_usuario);
        assert.equal(_balance_boletos_usuario_after.length, boletos_usuario_compra);
    });

    it("Generación de ganador", async () => {
        let instance = await loteria.deployed();

        let ganador_before = await instance.ganador();
        assert.notEqual(true, accounts.includes(ganador_before));

        const owner = await instance.owner.call()
        await instance.generarGanador({
            from: owner,
        });

        let ganador_after = await instance.ganador();

        assert.equal(true, accounts.includes(ganador_after));
    });
})