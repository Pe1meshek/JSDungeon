import {Coord} from './coord.js';

export {Character, Skull};

class Character{

    constructor(){
        this.x = 0;
		this.y = 0;
        this.kSize = 1;

		this.speed = 1;
        this.HP = 2;

		this.timeInvulnerable = 0;
		this.maxInvulnerable = 50;

		// this.timeVzhuh = 0;
		// this.maxVzhuh = 10;

        this.widthPX = 16; 
        this.heightPX = 16; 
		
		this.alt = false;
		this.isRun = false;
		this.frameN = 0;
        this.kofAnim = 10;
		
		this.animIdle = [];
        this.animRun = [];
		for(let i=0;i<4;i++){
			this.animIdle.push(new Image());
            this.animRun.push(new Image());
		}

		this.collisionMask = [];
		for(let i=0;i<5;i++){
			this.collisionMask.push(new Coord(0,0));
		}

    }
    
    setAnim(name){
        for(let i=0;i<4;i++){
			this.animIdle[i].src = "img/"+name+"_idle_anim_f"+i+".png";
            this.animRun[i].src = "img/"+name+"_run_anim_f"+i+".png";
		}
        this.widthPX = this.animIdle[0].width;
        this.heightPX = this.animIdle[0].height;
    }


    setXY(x,y){
        this.x = x;
        this.y = y;
    }


    up() 	{this.y += this.speed*this.kSize;  this.isRun = true; }
	down() 	{this.y -= this.speed*this.kSize;  this.isRun = true; }
	right() {this.x += this.speed*this.kSize;  this.isRun = true; }
	left() 	{this.x -= this.speed*this.kSize;  this.isRun = true; }

    nextFrame(){
		this.frameN += (1/this.kofAnim);
		if(this.isRun){
			if(this.frameN >= this.animRun.length) {this.frameN = 0;}
		}
		else
			if(this.frameN >= this.animIdle.length) {this.frameN = 0;}
	}

	print(){
		if(this.isRun) 
			return this.animRun[Math.floor(this.frameN)];
		else 
			return this.animIdle[Math.floor(this.frameN)]; 
	}

	calcCollisionMask(){
		this.collisionMask[0].setXY(this.x, this.y);
		this.collisionMask[1].setXY(this.x+this.widthPX*this.kSize, this.y);
		this.collisionMask[2].setXY(this.x+this.widthPX*this.kSize, this.y+this.heightPX*this.kSize);
		this.collisionMask[3].setXY(this.x, this.y+this.heightPX*this.kSize);
		this.collisionMask[4].setXY(this.x+this.widthPX*this.kSize, this.y+this.heightPX*this.kSize);
	}

}


class Skull{
	constructor(x,y,alt,kSize){
		this.x = x;
		this.y = y;
		this.alt = alt;
		this.kSize = kSize;
		this.texture = new Image();
		this.texture.src = 'img/skull.png';
	}
}