// canvas đường 
let x1 = 0;
let x2 = 840;

function drawGround() {
    // vẽ x2 đường

    // trời 
    ctx.drawImage(sky, 0, 0);
    // dường margin left 
    // ảnh y : 150 + 200 = 350
    ctx.drawImage(ground, x1, 200); // x: trục x , y
    // dường margin
    ctx.drawImage(ground, x2, 200);
    x1 -= speed;
    x2 -= speed;
    if (x1 <= -840) {
        x1 = 840;
    }
    if (x2 <= -840) {
        x2 = 840;
    }
}





// class Obs : chướng ngại vật
// x : 3000 : ??? ==========
// w , h : dài rộng ảnh
function Obs() {
    this.x = 3000; // 3000 bên phải
    this.img = cactusBig; // mặc định là cây to
    this.w = 0; // kích thước mặc định w,h = 0
    this.h = 0;
    this.birdHeight = 0; // 0 : mặt đất, 1 : hơi cao , 2 : cao
    this.initialize = function() {
        // random < 0.3 and điểm > 200 thì tạo chim
        if (Math.random() < 0.3 && score > 200) {
            this.img = bird;
            this.birdHeight = Math.round(Math.random() * 2); // độ cao của chym
            this.w = 46;
            this.h = 40;
            console.log("bird");
        } else {
            // random cây bé, vừa , to
            switch (Math.round(Math.random() * 2)) {
                case 0:
                    this.img = cactusBig;
                    this.w = this.img.naturalWidth;
                    this.h = this.img.naturalHeight;
                    break;
                case 1:
                    this.img = cactusSmall;
                    this.w = this.img.naturalWidth;
                    this.h = this.img.naturalHeight;
                    break;
                case 2:
                    this.img = cactusSmallMany;
                    this.w = this.img.naturalWidth;
                    this.h = this.img.naturalHeight;
                    break;
            }
        }
    }
}

// thêm chướng ngại vật 
function addObs() {
    hold++; // [150 - 550]
    if (hold > minimunGap + Math.random() * 400) {
        obstacles.push(new Obs());
        console.log(obstacles[obstacles.length - 1]);
        obstacles[obstacles.length - 1].initialize(); // khơi tạo obs cuối cùng
        hold = 0; // reset số lần loop
    }
}

// xóa tất cả chướng ngại vật khi tọa độ < -10
function removeObs() {
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x < -10) { // ảnh phải về trái - 10 thì xóa
            obstacles.splice(i, 1);
        }
    }
}

// di chuyển tất cả tọa độ chướng ngại vật
function moveObs() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed;
    }
}

// vẽ canvas chướng ngại vật
// groundLevel : độ cao ảnh
function drawObs() {
    for (let i = 0; i < obstacles.length; i++) {
        // == chim 
        if (obstacles[i].img == bird) {
            // x			: tọa độ y
            console.log("bird");
            ctx.drawImage(bird[score % 2], obstacles[i].x, groundLevel - obstacles[i].h - obstacles[i].birdHeight * 30 + 5);
            // ctx.drawImage(bird[score % 2], 50, 50);
            // vẽ con chim 
        } else {
            // vẽ cây 
            console.log("cactus");
            ctx.drawImage(obstacles[i].img, obstacles[i].x, groundLevel - obstacles[i].h);
        }
    }
}