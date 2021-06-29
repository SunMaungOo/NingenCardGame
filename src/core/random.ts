export interface Randomizer<T>{
    /**
     * Return a randomized items
     * @param items items to randomize
     */
    random(items:Array<T>) : Array<T>
}

/**
 * Randomize using Fisher-Yates shuffle
 */
export class FisherRandomizer<T> implements Randomizer<T>{

    random(items:Array<T>) : Array<T>{
        
        let result = Array.from(items);

        for (let i = items.length - 1; i > 0; i--) {

            let j = Math.floor(Math.random() * (i + 1));

            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;

    }
}
