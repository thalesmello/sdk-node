const assert = require('assert');
const starkbank = require('../starkbank');
const generateExampleBoletoPaymentsJson = require('./utils/boletoPayment.js').generateExampleBoletoPaymentsJson;

starkbank.user = require('./utils/user').exampleProject;

describe('TestBoletoPaymentPost', () => {
    it('test_success', async () => {
        let payments = await generateExampleBoletoPaymentsJson(5);
        payments = await starkbank.payment.boleto.create(payments);
        for (let payment of payments) {
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestBoletoPaymentGet', () => {
    it('test_success', async () => {
        let i = 0;
        const payments = await starkbank.payment.boleto.query(150);
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            i += 1;
        }
        assert(i === 150);
        console.log('Number of boletos:', i);
    });
});

describe('TestBoletoPaymentPostAndDelete', () => {
    it('test_success', async () => {
        let payments = await generateExampleBoletoPaymentsJson(1);
        payments = await starkbank.payment.boleto.create(payments);
        let payment = payments[0];
        assert(typeof payment.id == 'string');
        payment = await starkbank.payment.boleto.delete(payment.id);
        assert(typeof payment.id == 'string');
    });
});

describe('TestBoletoPaymentInfoGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.payment.boleto.query(1);
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            payment = await starkbank.payment.boleto.get(payment.id);
            assert(typeof payment.id == 'string');
        }
    });
});

describe('TestBoletoPaymentPdfGet', () => {
    it('test_success', async () => {
        let payments = await starkbank.payment.boleto.query(1, "processing");
        for await (let payment of payments) {
            assert(typeof payment.id == 'string');
            let pdf = await starkbank.payment.boleto.pdf(payment.id);
            assert(typeof pdf == 'string');
        }
    });
});
