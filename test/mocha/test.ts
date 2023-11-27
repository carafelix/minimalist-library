import { house } from '../../src/ts/index.ts';
import chai from 'chai';

mocha.timeout(15000)
const assert = chai.assert;

// Test env only functions

function _clearHouse(){
    while(house.length){
        house.pop()
    }
}



describe('House Object testing',()=>{
    context('Libraries manipulation', ()=>{
        // it('Create 3 libraries',()=>{
        //     house.createLibrary();
        //     house.createLibrary();
        //     house.createLibrary();
            
        //     assert.equal(house.length,4)
        // })
        // // it('Cannot Create more than 5 libraries',()=>{
        // //     house.createLibrary()
        // //     house.createLibrary()
        // // })

        // it('Put library "e" in house[0]',()=>{
        //     _clearHouse()

            
        //     const a = house.createLibrary();
        //     const b = house.createLibrary();
        //     const c = house.createLibrary();
        //     const d = house.createLibrary();
        //     const e = house.createLibrary();

        //     house.sortHouseBySelectedLibrary(e!)
        //     assert.equal(house[0] , e)
            
        // })
        it('Put library "c" in house[0]',()=>{
            _clearHouse()

            
            const a = house.createLibrary();
            const b = house.createLibrary();
            const c = house.createLibrary();
            const d = house.createLibrary();
            const e = house.createLibrary();

            house.sortHouseBySelectedLibrary(c!)
            assert.equal(house[0] , c)
        })
    })
})