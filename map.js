export {Map};

class Map{
    
    constructor(){
        this.widthPX = 16;
        this.blockTxt = [];
        for(let i=0;i<8;i++){
            this.blockTxt.push(new Image());
            this.blockTxt[i].src = "img/floor_" + (i+1) + ".png";
        }

        for(let i=0;i<14;i++){
            this.blockTxt.push(new Image());
        }
        this.blockTxt[8].src = "img/wall_top_mid.png";
        this.blockTxt[9].src = "img/wall_mid.png";

        this.blockTxt[10].src = "img/wall_edge_mid_left.png";
        this.blockTxt[11].src = "img/wall_edge_mid_right.png";

        this.blockTxt[12].src = "img/wall_outer_top_right.png";
        this.blockTxt[13].src = "img/wall_outer_top_left.png";
        
        this.blockTxt[14].src = "img/wall_edge_right.png";
        this.blockTxt[15].src = "img/wall_edge_left.png";
        
        this.blockTxt[16].src = "img/wall_edge_bottom_left.png";
        this.blockTxt[17].src = "img/wall_edge_bottom_right.png";

        this.blockTxt[18].src = "img/wall_outer_front_right.png";
        this.blockTxt[19].src = "img/wall_outer_front_left.png";

        this.blockTxt[20].src = "img/wall_edge_top_right.png";
        this.blockTxt[21].src = "img/wall_edge_top_left.png";
    }

}




// for(let i=0;i<4;i++){
	// player.push(new Image());
// }


