import {FisherRandomizer} from "../src/core/random";

describe("Random item",()=>{

    test("Test random item",()=>{

        const items = ["A","B","C","D","E"];
        
        const randomizer = new FisherRandomizer<string>();

        const randomItems = randomizer.random(items); 
                
        expect(items).not.toStrictEqual(randomItems);

    });
});