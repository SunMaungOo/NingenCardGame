import { Stack } from "./stack";

import {Randomizer} from "./random";

export interface Deck<T>{

    /**
     * Draw an item from a deck
     */
    draw():T;

    /**
     * Return a reminding item number in a deck
     */
    reminding():number;

    /**
     * Reset the deck
     */
    reset():void;
}

/**
 * Deck which randomize the item
 */
export class RandomDeck<T> implements Deck<T>{

    _items:Array<T>;

    _randomizer:Randomizer<T>;

    _randomItems:Array<T>;

    constructor(items:Array<T>,randomizer:Randomizer<T>){
        

        this._items = Array.from(items);
        
        this._randomizer = randomizer;

        this._randomItems = [];

        this.reset();

    }

    reset(): void {
        this._randomItems = this._randomizer.random(Array.from(this._items));
    }

    draw(): T {

        const topItem = this._randomItems[0];

        this._randomItems.splice(0,1);

        return topItem;
    }

    reminding(): number {
        return this._randomItems.length;
    }
 
}