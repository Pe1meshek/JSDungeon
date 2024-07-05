import {Coord} from './coord.js';

export {Weapon};

class Weapon{

    constructor(id){
        this.texture = new Image();
        this.attack = false;
        this.angle = 0;
        this.count = 0;
        this.maxCount = 40;
        this.x = 0;
        this.y = 0;
        this.kSize = 1;

        this.collisionMask = [];
		for(let i=0;i<4;i++){
			this.collisionMask.push(new Coord(0,0));
		}

        switch(id){
            case 1: this.texture.src = "img/weapon_knight_sword.png"; break;
            case 2: this.texture.src = "img/weapon_saw_sword.png"; break;
            case 3: this.texture.src = "img/weapon_waraxe.png"; break;
            case 4: this.texture.src = "img/weapon_throwing_axe.png"; break;
        }
    }

    setXY(x,y){
        this.x = x;
        this.y = y;
    }

    startAttack(){
        this.attack = true;
        this.angle = 0;
        this.count = 0;
        this.calcCollisionMask();
    }

    incAngle(){
        if(this.attack){
            this.angle += 6;
            this.count++;
            if(this.count>=this.maxCount) this.attack = false;
        }
    }

    // calcCoord(){
    //     this.x = -this.texture.width/2*this.kSize;
    //     this.y = -this.texture.height*this.kSize;
    // }

    calcCollisionMask(){
        this.collisionMask[0].setXY(this.x, this.y);
		this.collisionMask[1].setXY(this.x+this.texture.width*this.kSize, this.y);
		this.collisionMask[2].setXY(this.x+this.texture.width*this.kSize, this.y+this.texture.height*this.kSize);
		this.collisionMask[3].setXY(this.x, this.y+this.texture.height*this.kSize);
    }

}