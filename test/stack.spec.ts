import {ItemStack} from "../src/core/stack";


describe("Test Stack",()=>{

    test("Test add item",()=>{

        let stack = new ItemStack<number>(3,(left,right)=>{
            return left===right;
        });

        const result1 = stack.add(1);
        const result2 = stack.add(2);
        const result3 = stack.add(3);
        const result4 = stack.add(4);
        
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(result3).toBeTruthy();
        expect(result4).toBeFalsy();

    });

    
    test("Test is full",()=>{

        let stack = new ItemStack<number>(3,(left,right)=>{
            return left===right;
        });

        const result1 = stack.isFull();

        stack.add(1);

        const result2 = stack.isFull();

        stack.add(2);

        const result3 = stack.isFull();

        stack.add(3);

        const result4 = stack.isFull();

        stack.add(4);

        expect(result1).toBeFalsy();
        expect(result2).toBeFalsy();
        expect(result3).toBeFalsy();
        expect(result4).toBeTruthy();

    });

    test("Test internal items",()=>{

        const expected = [1,2,3];

        let stack = new ItemStack<number>(3,(left,right)=>{
            return left===right;
        });

        stack.add(1);
        stack.add(2);
        stack.add(3);

        const actual = stack.items();

        expect(expected).toStrictEqual(actual);

    });

    test("Test discard item",()=>{

        let stack = new ItemStack<number>(3,(left,right)=>{
            return left===right;
        });

        stack.add(1);
        stack.add(2);
        stack.add(3);

        const isDiscarded = stack.discard(2);

        expect(isDiscarded).toBeTruthy();
        expect(stack.items()).toStrictEqual([1,3]);

    });
});