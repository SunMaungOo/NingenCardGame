import {FisherRandomizer} from "../core/random";
import {Stack,ItemStack}  from "../core/stack";
import {Deck,RandomDeck} from "../core/deck";

class Program{

    _skillCardContainerId:Array<string>;

    _cardStack:Stack<string>;

    _deck:Deck<string>;

    _defaultCardName:string;

    constructor(){

        this._skillCardContainerId = ["card-1","card-2","card-3","card-4","card-5"];

        this._cardStack = new ItemStack<string>(this._skillCardContainerId.length,
            (left:string,right:string)=>{
            return left===right;
        });

        this._deck = new RandomDeck<string>(this._skillCardContainerId,
            new FisherRandomizer());

        this._defaultCardName = "Place Card";

    }

    run(){

        console.log("Desk prototype version:1.0.0");

        this._appendCard("deck","draw-deck","Draw","",false);

        this._skillCardContainerId.forEach((cardContainerId:string)=>{
            this._appendCard("deck",cardContainerId,this._defaultCardName);
        });

        this._appendCard("deck","discard-card","Discard card","",false);
   
        let deckElement = document.getElementById("draw-deck-top");

        if(deckElement){
            deckElement.onclick=this._onDeckClicked.bind(this);
        }

        let discardElement = document.getElementById("discard-card-top");

        if(discardElement){
            discardElement.ondragover=this._onDiscardDragOver.bind(this);
            discardElement.ondrop=this._onDiscardDrop.bind(this);
        }

        this._skillCardContainerId.forEach((cardContainerId:string)=>{

            let cardElement = document.getElementById(`${cardContainerId}-top`);

            if(cardElement){

                cardElement.draggable=true;
                cardElement.ondragstart=this._onCardElementDragStart.bind(this);

            }
        });

    }

    _onCardElementDragStart(ev:DragEvent){

        if(ev && ev.dataTransfer){

            ev.dataTransfer.setData("drag-element-id",(ev.target as HTMLElement).id);

        }
    }

    _onDiscardDragOver(ev:DragEvent){

        if(!ev){
            return;
        }

        ev.preventDefault();

    }

    _onDiscardDrop(ev:DragEvent){

        if(!ev){
            return;
        }

        ev.preventDefault();

        if(!ev.dataTransfer){
            return;
        }

        const dragElementId = ev.dataTransfer.getData("drag-element-id");

        if(!dragElementId){
            return;
        }

        let element = document.getElementById(dragElementId);

        if(!element){
            return;
        }

        this._cardStack.discard(element.innerText);
        
        element.innerText = this._defaultCardName;
        element.className = "card card-overlay";
    }

    _onDeckClicked(ev:MouseEvent){

        if(this._cardStack.isFull()){
            return;
        }

        let emptyStackSlot = this._findEmptyStackSlot();

        if(!emptyStackSlot){

            console.log("The skill slot is full");

            return; 
        }

        //deck is empty , we reset it

        if(this._deck.reminding()==0){

            console.log("We reset the deck");

            this._deck.reset();
        }

        const cardName = this._deck.draw();

        this._cardStack.add(cardName);

        emptyStackSlot.className="card card-image";
        emptyStackSlot.innerHTML=cardName;

    }

    /**
     * Find empty stack slot to put the card
     */
    _findEmptyStackSlot():HTMLElement|null{

        const foundContainerId = this._skillCardContainerId.find((containerId:string)=>{

            let element = document.getElementById(`${containerId}-top`);

            if(element){

                if(element.innerHTML===this._defaultCardName){

                    return true;
                }
            }

            return false;
            
        });

        if(!foundContainerId){
            return null;
        }

        return document.getElementById(`${foundContainerId}-top`);
    }

    _appendCard(containerId:string,
        cardContainerId:string,
        topText:string="",
        belowText:string="",
        isOverlay:boolean=true):boolean{
    
        const container =  document.getElementById(containerId);
    
        if(!container){
            return false;
        }
    
        let card = this._createCard(cardContainerId,
            topText,
            belowText,
            isOverlay);
    
        if(!card){
            return false;
        }

        container.appendChild(card);
    
        return true;
    }

    _createCard(cardContainerId:string,
        topText:string="",
        belowText:string="",
        isOverlay:boolean=true):HTMLElement|null{
    
        if(!cardContainerId){
            return null;
        }
    
        if(!(topText||belowText)){
            return null;
        }
        
        const cardContainer = document.createElement("div");
        cardContainer.id = cardContainerId;
        cardContainer.className="card-container";
    
        const belowCard = document.createElement("div");
        belowCard.id=cardContainerId+"-below";
        belowCard.className="card";
        belowCard.innerHTML=belowText;
    
        const topCard = document.createElement("div");
        topCard.id=cardContainerId+"-top";

        if(isOverlay){
            topCard.className="card card-overlay";
        }else{
            topCard.className="card card-image";
        }
    
        topCard.innerHTML=topText;
    
        cardContainer.appendChild(belowCard);
        cardContainer.appendChild(topCard);
    
        return cardContainer;
    }
}

const program = new Program();
program.run();