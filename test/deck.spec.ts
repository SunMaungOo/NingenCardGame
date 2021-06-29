import {RandomDeck} from "../src/core/deck";
import {FisherRandomizer} from "../src/core/random";

describe("Random Deck",()=>{

    test("Test draw random item",()=>{

        let items:Array<number> = [];

        const itemCount = 10000;

        for(let i=1;i<=itemCount;i++){
            items.push(i);
        }

        const deck1 = new RandomDeck<number>(items,new FisherRandomizer<number>());

        const deck2 = new RandomDeck<number>(items,new FisherRandomizer<number>());

        const drawItem1 = deck1.draw();

        const drawItem2 = deck2.draw();

        //test item to be random 

        expect(drawItem1).not.toStrictEqual(drawItem2);

    });

    test("Test reminding item",()=>{

        let items:Array<number> = [];

        const itemCount = 10;

        for(let i=1;i<=itemCount;i++){
            items.push(i);
        }

        const deck = new RandomDeck<number>(items,new FisherRandomizer<number>());

        deck.draw();
        deck.draw();

        const remindingItem = deck.reminding();
        
        expect(remindingItem).toStrictEqual(itemCount-2);

    });

    test("Test reset item count",()=>{

        let items:Array<number> = [];
        
        const itemCount = 10;

        for(let i=1;i<=itemCount;i++){
            items.push(i);
        }

        const deck = new RandomDeck<number>(items,new FisherRandomizer<number>());

        deck.draw();

        deck.reset();

        const remindingItem = deck.reminding();

        expect(remindingItem).toStrictEqual(itemCount);
    });

    test("Test reset draw random item",()=>{

        let items:Array<number> = [];

        const itemCount = 10000;

        for(let i=1;i<=itemCount;i++){
            items.push(i);
        }

        const deck = new RandomDeck<number>(items,new FisherRandomizer<number>());

        const drawItem1 = deck.draw();

        deck.reset();

        const drawItem2 = deck.draw();

        //test item to be random 

        expect(drawItem1).not.toStrictEqual(drawItem2);

    });

});