import {Character} from './character.js';


export {Player};


class Player extends Character{
	
	constructor(){
		super();
		this.HP = 7;
		this.maxHP = 7;

		this.heartUI = [];
		for(let i=0;i<3; i++){this.heartUI.push(new Image());}
		this.heartUI[0].src = 'img/ui_heart_empty.png';
		this.heartUI[1].src = 'img/ui_heart_half.png';
		this.heartUI[2].src = 'img/ui_heart_full.png';
		// this.heartUI[2].src = 'img/skull.png';
	}
	


}