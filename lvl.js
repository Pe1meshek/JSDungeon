export {LVL};

// const idText = Enum({ WALL_TOP:8, WALL:9, WALL_RIGHT:10, WALL_LEFT:11, CORNER_RIGHT:12, CORNER_LEFT:13});

const idText = {
    WALL_TOP:8,
    WALL:9,
    WALL_RIGHT:10,
    WALL_LEFT:11,
    CORNER_RIGHT:12,
    CORNER_LEFT:13,
    WALL_EDGE_RIGHT:14,
    WALL_EDGE_LEFT:15,
    CORNER_BOTTOM_RIGHT:16,
    CORNER_BOTTOM_LEFT:17,
    CORNER_WALL_RIGHT:18,
    CORNER_WALL_LEFT:19,
    WALL_TOP_RIGHT:20,
    WALL_TOP_LEFT:21
}

class LVL{

    constructor(){
        this.map = [];
        this.mapWidth = 0;
        this.mapHeight = 0;
        this.mapUp = [];

        // for(let y=0; y<this.mapHeight; y++){
        //     // this.map[y] = [];
        //     this.map.push(new Array());
        //     for(let x=0; x<this.mapWidth; x++)
        //         // this.map[y][x] = -1;
        //         this.map[y].push(-1);
        // }
        

    }

    resize(x,y){
        if(y>=this.mapHeight){
            for(let i=this.mapHeight; i<y+1; i++){
                this.map.push(new Array());
                for(let j=0; j<this.mapWidth; j++)
                    this.map[i].push(-1);
            }
            this.mapHeight = y+1;
        }

        if(x>=this.mapWidth){
            for(let j=0; j<this.mapHeight; j++)
                for(let i=this.mapWidth; i<x+1; i++)
                    this.map[j].push(-1);
            this.mapWidth = x+1;
        }
    }


    resizeForWalls(){
        for(let i=0; i<2; i++){
            this.map.unshift(new Array());
            this.map.push(new Array());
            this.mapHeight += 2;
            for(let j=0; j<this.mapWidth; j++){
                this.map[0].push(-1);
                this.map[this.mapHeight-1].push(-1);
            }
        }
        for(let i=0; i<this.mapHeight; i++){
            this.map[i].unshift(-1);
            this.map[i].push(-1);
        }
        this.mapWidth += 2;
    }

    bildWalls(){
        for(let y=2; y<this.mapHeight-2; y++){
            for(let x=1; x<this.mapWidth-1; x++){
                if(this.isFloor(x,y)){
                    
                    // верхння стена
                    if(this.map[y-1][x] == -1){
                        this.map[y-1][x] = idText.WALL;
                        if(this.map[y-2][x] == -1)
                            this.map[y-2][x] = idText.WALL_TOP;
                    }

                    // правая стена
                    if(this.map[y][x+1] == -1){ 
                        if(this.map[y-1][x] == idText.WALL){
                            this.map[y-1][x+1] = idText.WALL_RIGHT;
                            this.map[y-2][x+1] = idText.CORNER_RIGHT;         
                        }
                        if(this.isFloor(x+1,y+1)){
                            this.map[y-1][x+1] = idText.CORNER_BOTTOM_RIGHT;
                        }
                        else this.map[y][x+1] = idText.WALL_RIGHT;
                    }

                    // левая стена
                    if(this.map[y][x-1] == -1){ 
                        if(this.map[y-1][x] == idText.WALL){
                            this.map[y-1][x-1] = idText.WALL_LEFT;
                            this.map[y-2][x-1] = idText.CORNER_LEFT;         
                        }
                        if(this.isFloor(x-1,y+1)){
                            this.map[y-1][x-1] = idText.CORNER_BOTTOM_LEFT;
                        }
                        else this.map[y][x-1] = idText.WALL_LEFT;
                    }

                    // нижняя стена
                    if(this.map[y+1][x] == -1){
                        if(this.isFloor(x-1,y+1)){
                            this.map[y+1][x] = idText.WALL_EDGE_LEFT;
                            this.mapUp.push({x:x, y:y, id:idText.WALL_TOP_LEFT});
                        }
                        else if(this.isFloor(x+1,y+1)){
                            this.map[y+1][x] = idText.WALL_EDGE_RIGHT;
                            this.mapUp.push({x:x, y:y, id:idText.WALL_TOP_RIGHT});
                        }
                        else{
                            this.map[y+1][x] = idText.WALL;
                            this.mapUp.push({x:x, y:y, id:idText.WALL_TOP});
                        }

                        if(this.isWall(x-1,y) && this.isWall(x,y+1)) this.map[y+1][x-1] = idText.CORNER_WALL_LEFT;
                        if(this.isWall(x+1,y) && this.isWall(x,y+1)) this.map[y+1][x+1] = idText.CORNER_WALL_RIGHT;
                    }

                }
            }
        }
    }

    isFloor(x,y){
        if(this.map[y][x]>=0 && this.map[y][x]<=7)
            return true;
        else return false;
    }


    isWall(x,y){
        if(this.map[y][x]>=8 && this.map[y][x]<=19)
            return true;
        else return false;
    }


    getMapBlock(x,y){
        // return this.map[y*this.mapWidth+x];
        return this.map[y][x];
    }

    // creatWall(x1,y1,x2,y2){
    //     let temp;
    //     if(x2<x1){ temp = x1; x1 = x2; x2 = temp; }
    //     if(y2<y1){ temp = y1; y1 = y2; y2 = temp; }
    //     for(let i=0; i<x2-x1+1; i++){
    //         this.map[y1*this.mapWidth+x1+i] = 9;
    //         this.map[y2*this.mapWidth+x2-i] = 9;
    //     }
    //     for(let i=0; i<y2-y1+1; i++){
    //         this.map[(y1+i)*this.mapWidth+x1] = 9;
    //         this.map[(y2-i)*this.mapWidth+x2] = 9;
    //     }
    // }

    creatFloor(x1,y1,x2,y2){
        let temp;
        if(x2<x1){ temp = x1; x1 = x2; x2 = temp; }
        if(y2<y1){ temp = y1; y1 = y2; y2 = temp; }
        
        this.resize(x2,y2);

        for(let y=0; y<y2-y1+1; y++)
            for(let x=0; x<x2-x1+1; x++)
                this.map[y1+y][x1+x] = Math.floor(Math.random()*100)%8;
             
    }

}