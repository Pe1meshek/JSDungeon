import {Player} from './player.js';
import {Map} from './map.js';
import {LVL} from './lvl.js';
import {Weapon} from './weapon.js';
import {Enemy} from './enemy.js';
import {Skull} from './character.js';


import {isLinesCollision} from './coord.js';



let cvs = document.getElementById("canvJS");
let ctx = cvs.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


let kSize = 3;


let txt = new Map();
let lvl = new LVL();

lvl.creatFloor(0,8,20,16);
lvl.creatFloor(4,4,16,8);
lvl.creatFloor(8,0,12,8);

lvl.creatFloor(8,16,12,24);
lvl.creatFloor(4,24,16,36);

lvl.creatFloor(8,36,12,44);

lvl.creatFloor(4,44,16,48);
lvl.creatFloor(4,52,16,56);

lvl.creatFloor(4,44,8,56);
lvl.creatFloor(12,44,16,56);

lvl.resizeForWalls();
lvl.bildWalls();


let GG = new Player();
GG.setAnim("elf_m");
GG.kSize = kSize;

let weaponGG = new Weapon(1);
weaponGG.kSize = kSize;

let enemyes = [];
let skulls = [];

function start(){

	GG.HP = 7;
	GG.setXY((5 + 1)*txt.widthPX*kSize, (55 + 2)*txt.widthPX*kSize);
	weaponGG.setXY((5 + 1)*txt.widthPX*kSize, (55 + 2)*txt.widthPX*kSize);

	enemyes.splice(0,enemyes.length);
	skulls.splice(0,skulls.length);

	for(let i=0; i<3; i++){
		enemyes[i] = new Enemy();
		enemyes[i].setAnim("masked_orc");
		enemyes[i].speed = 0.5;
		enemyes[i].kSize = kSize;
	}
	enemyes[1].setAnim("skelet");
	enemyes[2].kSize = 4;
	
	enemyes[0].setXY((10 + 1)*txt.widthPX*kSize, (45 + 2)*txt.widthPX*kSize);
	enemyes[1].setXY((15 + 1)*txt.widthPX*kSize, (55 + 2)*txt.widthPX*kSize);
	enemyes[2].setXY((13 + 1)*txt.widthPX*kSize, (35 + 2)*txt.widthPX*kSize);
}


function isWall(x, y, sizeW, sizeH){
	if( 
		lvl.isWall( Math.floor(x/txt.widthPX/kSize), Math.floor(y/txt.widthPX/kSize) ) ||
		lvl.isWall( Math.floor((x+sizeW-1)/txt.widthPX/kSize), Math.floor(y/txt.widthPX/kSize) )  ||
		lvl.isWall( Math.floor(x/txt.widthPX/kSize), Math.floor((y+sizeH/2-1)/txt.widthPX/kSize) )  ||
		lvl.isWall( Math.floor((x+sizeW-1)/txt.widthPX/kSize), Math.floor((y+sizeH/2-1)/txt.widthPX/kSize) )
		) return true;
	else 
		return false;
}

// ==============================
// ===ОБРАБОТКА НАЖАТИЯ КЛАВИШ===
// ==============================

// При нажатии на кнопку
let keyMap = {};
onkeydown = onkeyup = function(event){
	keyMap[event.keyCode] = event.type == "keydown";
}

function move(){
	if(GG.HP>0){
		
		if(keyMap[65]){ if(!isWall(GG.x - GG.speed*GG.kSize, GG.y, GG.widthPX*GG.kSize, GG.heightPX*GG.kSize)) GG.left(); GG.alt = true;}
		if(keyMap[68]){ if(!isWall(GG.x + GG.speed*GG.kSize, GG.y, GG.widthPX*GG.kSize, GG.heightPX*GG.kSize)) GG.right(); GG.alt = false;}
		if(keyMap[87]){ if(!isWall(GG.x, GG.y - GG.speed*GG.kSize, GG.widthPX*GG.kSize, GG.heightPX*GG.kSize)) GG.down();}
		if(keyMap[83]){ if(!isWall(GG.x, GG.y + GG.speed*GG.kSize, GG.widthPX*GG.kSize, GG.heightPX*GG.kSize)) GG.up();}
		if( !keyMap[65] && !keyMap[68] && !keyMap[87] && !keyMap[83] ){ GG.isRun = false; }
		if(keyMap[32]){ if(!weaponGG.attack) weaponGG.startAttack(); }
		GG.calcCollisionMask();
		weaponGG.setXY(GG.x, GG.y);
	}

	if(keyMap[82]) start();
}

// ===============
// ===ОТРИСОВКА===
// ===============

function inRad(num) {
	return num * Math.PI / 180;
}

function drawBackMap(){
	// отображение карты
	for(let y=0; y<lvl.mapHeight; y++){
		for(let x=0; x<lvl.mapWidth; x++){
			if(lvl.getMapBlock(x,y)>=0)
				ctx.drawImage(txt.blockTxt[ lvl.getMapBlock(x,y) ],
								x*txt.widthPX*kSize-GG.x + cvs.width/2-GG.widthPX/2*kSize,
								y*txt.widthPX*kSize-GG.y + cvs.height/2,
								txt.widthPX*kSize,
								txt.widthPX*kSize);
		}
	}
}

function drawFrontMap(){
	// отображение передних предметов
	for(let i=0; i<lvl.mapUp.length; i++){
		ctx.drawImage(txt.blockTxt[ lvl.mapUp[i].id ],
						// lvl.mapUp[i].x*txt.widthPX*kSize-GG.x + cvs.width/2-GG.widthPX/2*kSize,
						// lvl.mapUp[i].y*txt.widthPX*kSize-GG.y + cvs.height/2,
						lvl.mapUp[i].x*txt.widthPX*kSize-GG.x + cvs.width/2-GG.widthPX/2*kSize,
						lvl.mapUp[i].y*txt.widthPX*kSize-GG.y + cvs.height/2,
						txt.widthPX*kSize,
						txt.widthPX*kSize);
	}
}

function drawPlayer(){
	// отображение персонажа
	if(GG.alt){ ctx.translate(cvs.width, 0); ctx.scale(-1, 1); }
	if(GG.HP > 0)
		ctx.drawImage(GG.print(),
						cvs.width/2-GG.widthPX/2*GG.kSize,
						cvs.height/2-GG.heightPX/2*GG.kSize,
						GG.widthPX*GG.kSize,
						GG.heightPX*GG.kSize);
	if(GG.alt){	ctx.translate(cvs.width, 0); ctx.scale(-1, 1); }

	GG.nextFrame();
}

function drawWeapon(){
	if(weaponGG.attack){
		// let transX = cvs.width/2 + weaponGG.texture.width/2*(GG.alt ? -1 : 1);
		// let transAng = weaponGG.angle * (GG.alt ? -1 : 1);
		let transX = cvs.width/2;
		let transY = cvs.height/2 + GG.heightPX/3*GG.kSize;
		let transAng = weaponGG.angle;
		// weaponGG.calcCoord();

		
		if(GG.alt){ ctx.translate(cvs.width, 0); ctx.scale(-1, 1); }
		ctx.translate(transX, transY);
		ctx.rotate(inRad(transAng));
		ctx.drawImage(weaponGG.texture,
			-weaponGG.texture.width/2*weaponGG.kSize,
			-weaponGG.texture.height*weaponGG.kSize, 
			weaponGG.texture.width*weaponGG.kSize, 
			weaponGG.texture.height*weaponGG.kSize);
		ctx.rotate(inRad(360-transAng));
		ctx.translate(-transX, -transY);
		if(GG.alt){ ctx.translate(cvs.width, 0); ctx.scale(-1, 1); }

		weaponGG.incAngle();
		weaponGG.calcCollisionMask();
	}
}

function drawEnemy(){
	for(let i=0; i<enemyes.length; i++){
		let transX = (enemyes[i].x-GG.x + cvs.width/2)*2;
		if(enemyes[i].alt){ ctx.translate(transX,0); ctx.scale(-1, 1);}
		ctx.drawImage(enemyes[i].print(),
						enemyes[i].x-GG.x + cvs.width/2-enemyes[i].widthPX/2*enemyes[i].kSize,
						enemyes[i].y-GG.y + cvs.height/2-enemyes[i].heightPX/2*enemyes[i].kSize, 
						enemyes[i].widthPX*enemyes[i].kSize, enemyes[i].heightPX*enemyes[i].kSize);
		if(enemyes[i].alt){ ctx.translate(transX,0); ctx.scale(-1, 1); }
		
		// enemyes[i].scanAndRun(GG.x, GG.y);
		enemyes[i].nextFrame();
	}
}

function drawSkulls(){
	for(let i=0; i<skulls.length; i++){
		let transX = (skulls[i].x-GG.x + cvs.width/2)*2;
		if(!skulls[i].alt){ ctx.translate(transX,0); ctx.scale(-1, 1);}
		ctx.drawImage(skulls[i].texture,
						skulls[i].x-GG.x + cvs.width/2-skulls[i].texture.width/2*skulls[i].kSize,
						skulls[i].y-GG.y + cvs.height/2-skulls[i].texture.height/2*skulls[i].kSize, 
						skulls[i].texture.width*skulls[i].kSize, skulls[i].texture.height*skulls[i].kSize);
		if(!skulls[i].alt){ ctx.translate(transX,0); ctx.scale(-1, 1); }
	}
}

function drawUI(){
	let ind = 0;
	for(let i=0; i<Math.ceil(GG.maxHP/2);i++){
		if((i+1)*2<=GG.HP)	ind = 2;
		else if((i+1)*2-1==GG.HP) ind = 1;
		else ind = 0;
		ctx.drawImage(GG.heartUI[ind],
						15*kSize + (GG.heartUI[ind].width*kSize+10)*i,
						15*kSize, 
						GG.heartUI[ind].width*kSize, GG.heartUI[ind].height*kSize);
	}
}


// ===============
// === СОБЫТИЯ ===
// ===============

function enemyMove(){
	for(let i=0; i<enemyes.length; i++){
		
		let enMove = enemyes[i].scanAndRun(GG.x, GG.y);
		if(enMove[0]!=0){
			if(enMove[0]==1){
				enemyes[i].right();
				if(	isWall(enemyes[i].x, enemyes[i].y, enemyes[i].widthPX*enemyes[i].kSize, 
					enemyes[i].heightPX*enemyes[i].kSize) )
					enemyes[i].left();
			}
			else {
				enemyes[i].left();
				if(	isWall(enemyes[i].x, enemyes[i].y, enemyes[i].widthPX*enemyes[i].kSize, 
					enemyes[i].heightPX*enemyes[i].kSize) )
					enemyes[i].right();
			}
		}

		if(enMove[1]!=0){
			if(enMove[1]==1){
				enemyes[i].down();
				if(	isWall(enemyes[i].x, enemyes[i].y, enemyes[i].widthPX*enemyes[i].kSize, 
					enemyes[i].heightPX*enemyes[i].kSize) )
					enemyes[i].up();
			}
			else {
				enemyes[i].up();
				if(	isWall(enemyes[i].x, enemyes[i].y, enemyes[i].widthPX*enemyes[i].kSize, 
					enemyes[i].heightPX*enemyes[i].kSize) )
					enemyes[i].down();
			}
		}
		enemyes[i].calcCollisionMask();
	}
}

function plColEn(){
	for(let en=0; en<enemyes.length; en++){
		for(let gP=0; gP<GG.collisionMask.length; gP++){
			for(let enP=0; enP<enemyes[en].collisionMask.length; enP++){
				if(isLinesCollision(
					GG.collisionMask[gP],
					GG.collisionMask[(gP+1)%GG.collisionMask.length],
					enemyes[en].collisionMask[enP],
					enemyes[en].collisionMask[(enP+1)%enemyes[en].collisionMask.length]
				)){
					return true;
				}
			}
		}
	}
	return false;
}

function playerCollision(){
	if(plColEn() && GG.timeInvulnerable == 0){
		GG.HP--;
		GG.timeInvulnerable++;
	}
	if(GG.timeInvulnerable!=0){
		GG.timeInvulnerable++;
		if(GG.timeInvulnerable>=GG.maxInvulnerable){
			GG.timeInvulnerable = 0;
		}
	}
	if(GG.HP<=0)
		skulls.push(new Skull(GG.x, GG.y, GG.alt, GG.kSize));
}

function enColWeapon(){
	if(weaponGG.attack){
		for(let en=0; en<enemyes.length; en++){
			bam:
			for(let enP=0; enP<enemyes[en].collisionMask.length; enP++){
				for(let wP=0; wP<weaponGG.collisionMask.length; wP++){
					if(isLinesCollision(
						weaponGG.collisionMask[wP],
						weaponGG.collisionMask[(wP+1)%weaponGG.collisionMask.length],
						enemyes[en].collisionMask[enP],
						enemyes[en].collisionMask[(enP+1)%enemyes[en].collisionMask.length]
						)){
							console.log('BAM');
							break bam;
						}
				}
			}
		}
	}
}


function draw(){

	// ctx.clearRect(0, 0, cvs.width, cvs.height);
	ctx.fillStyle = '#505050';
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	drawBackMap();
	drawSkulls();
	drawEnemy();

	if(GG.alt){
		drawWeapon();
		drawPlayer();
	}
	else{
		drawPlayer();
		drawWeapon();
	}

	
	drawFrontMap();
	drawUI();
	
	enemyMove();
	playerCollision();
	enColWeapon();

	move();
}

// player.onload = setInterval(draw,10);
start();
setInterval(draw,10);