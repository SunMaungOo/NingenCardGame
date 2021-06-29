export interface Stack<T>{

    /**
     * Whether we have added the item
     * @param item an item to add
     */
    add(item:T):boolean;

    /**
     * Whether we have discard the item
     * @param card an item to discard
     */
    discard(item:T):boolean;

    /**
     * Whether a stack is full
     */
    isFull():boolean;

    /**
     * Get non-null item
     */
    items():Array<T>;
}

export class ItemStack<T> implements Stack<T>{

    _maxSize:number;

    _items : Array<T>;

    _comparer:CallableFunction;

    /**
     * 
     * @param maxSize max item the stack will take
     * @param comparer a function which check the equality and return true if there are the same object
     */
    constructor(maxSize:number,
        comparer:(left:T,right:T)=>boolean){

            this._maxSize = maxSize;

            this._comparer = comparer;

            this._items = [];
            
    }

    add(item: T): boolean {

        if(this.isFull()){
            return false;
        }

        this._items.push(item);

        return true;
    }

    discard(item: T): boolean {

        const previousLength = this._items.length;

        this._items = this._items.filter((value)=>{
            return !this._comparer(item,value);
        });

        const currentLength = this._items.length;

        return previousLength!=currentLength;
    }
    
    isFull(): boolean {
        return this._items.length>=this._maxSize;
    }

    items(): Array<T> {
        return this._items;
    }
    
}