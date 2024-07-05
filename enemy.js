import {Character} from './character.js';

export {Enemy};

class Enemy extends Character{

    constructor(){
        super();
        // this.isAgre = false;
        this.rangeAgr = 70;
    }

    scanAndRun(x,y){
        let resMove = [0,0];
        let difX = Math.abs(x - this.x); 
        let difY = Math.abs(y - this.y); 
        if( Math.sqrt( difX*difX + difY*difY ) <= this.rangeAgr * this.kSize){
            if(Math.abs(x - this.x)>1)
                if(this.x <= x){
                    this.alt = false;
                    resMove[0] = 1;
                    // this.right();
                }
                else{
                    this.alt = true;
                    resMove[0] = -1;
                    // this.left()
                }
            if(this.y <= y){
                resMove[1] = -1;
                // this.up();
            }
            else {
                resMove[1] = 1;
                // this.down();
            }
        }
        else this.isRun = false;
        return resMove;
    }

}