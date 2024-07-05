export {Coord, isLinesCollision};

class Coord{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    setXY(x,y){
        this.x = x;
        this.y = y;
    }
}


function isLinesCollision(pA0, pA1, pB0, pB1){

    let vec1 = new Coord(pB0.x - pA0.x, pB0.y - pA0.y);
    let vec2 = new Coord(pB1.x - pA0.x, pB1.y - pA0.y);

    let vec3 = new Coord(pB0.x - pA1.x, pB0.y - pA1.y);
    let vec4 = new Coord(pB1.x - pA1.x, pB1.y - pA1.y);

    let z1 = vec1.x * vec2.y - vec1.y * vec2.x;
    let z2 = vec3.x * vec4.y - vec3.y * vec4.x;

    vec1 = new Coord(pA0.x - pB0.x, pA0.y - pB0.y);
    vec2 = new Coord(pA1.x - pB0.x, pA1.y - pB0.y);
    vec3 = new Coord(pA0.x - pB1.x, pA0.y - pB1.y);
    vec4 = new Coord(pA1.x - pB1.x, pA1.y - pB1.y);

    let z3 = vec1.x * vec2.y - vec1.y * vec2.x;
    let z4 = vec3.x * vec4.y - vec3.y * vec4.x;

    return z1*z2<0 && z3*z4<0;
}