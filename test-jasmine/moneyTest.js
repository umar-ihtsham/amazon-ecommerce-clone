import {formatCurrency} from '../utils/money.js'


describe('test suite: formatCurrency',()=>{
    it('converts Cents into dollors',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
        expect(formatCurrency(1365)).toEqual('13.65');
    })
    it('works with "0"',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    })
    it('round upto the nearest Cents:',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
})