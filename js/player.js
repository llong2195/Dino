function Player() {
    // thích nghi
    this.fitness = 0; // điểm số của player ^ 2
    this.inputs = []; // đầu vào [6,1]
    this.hiddens = []; // ẩn
    this.outputs = []; // đầu ra
    this.input_hidden = []; //arr 6x6
    this.hidden_output = []; //arr 3x6
    this.bias = 0; // dự kiến

    //game
    this.y = 0; // 
    this.jumpDist = 0.01;
    this.state = 1; //1 chạy, 2 nhảy, 3 cúi, 0 dead
    this.img = null;
    this.w = 48;
    this.h = 56;

    // khởi tạo

    this.initializeBrain = function() {
                                        // 6        6
        this.input_hidden = matrixRandom(hiddenNodes, inputNodes, -1, 1);
                                        // 3        6
        this.hidden_output = matrixRandom(outputNodes, hiddenNodes, -1, 1);
        
                    // dự kiến trong khoảng [-1 , 1]
        this.bias = Math.random() * 2 - 1;
    }

    // vẽ
    this.draw = function() {
        if (this.state) { // kiểm tra sống : state 1 - 3
            switch (this.state) {
                case 1:
                    this.y = 0;
                    this.img = dinoRun;
                    this.w = 48;
                    this.h = 56;
                    this.jumpDist = 0.01;
                    this.y = 0;
                    // animate theo điểm  : x 30 | y 340 - j  
                    ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
                    break;
                case 2:
                    this.img = dinoJump;
                    this.w = 48;
                    this.h = 50;
                    this.y = Math.sin(this.jumpDist) * 90; // độ cao nhảy theo sin 90
                    ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
                    this.jumpDist += 0.03;
                    if (this.y < 0.001 && this.jumpDist > 3) {
                        this.state = 1; // reset state 1 : chạy
                        this.jumpDist = 0.01; // reset thời gian nhảy
                    }
                    break;
                case 3:
                    this.img = dinoDuck;
                    this.y = 0;
                    this.w = 68;
                    this.h = 34;
                    ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
                    break;
                case 0:
                    // dead
                    this.img = dinoDead;
                    ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
                    break;
            }
        }
    }

    // kiểm tra đâm vào chướng ngại vật
    // chỉ kiểm tra chướng ngại vật đầu tiên
    this.collide = function() {
        if (obstacles.length) {
            switch (obstacles[0].birdHeight) {
                case 0: // sát mặt đất    : nhảy mới sống
                    if (obstacles[0].x <= 30 + this.w && this.y <= obstacles[0].h) {
                        this.state = 0;
                        this.fitness = score * score; // điểm 
                    }
                    break;
                case 1: // 
                    if (this.state == 3) {
                        if (obstacles[0].x <= 30 + this.w && this.y > obstacles[0].birdHeight + this.y) {
                            this.state = 0;
                            this.fitness = score * score;
                        }
                    } else {
                        if (obstacles[0].x <= 30 + this.w && this.h > obstacles[0].birdHeight + this.y) {
                            this.state = 0;
                            this.fitness = score * score;
                        }
                    }
                    break;
                case 2:
                    if (this.state == 2) {
                        if (obstacles[0].x <= 30 + this.w && groundLevel - this.h < groundLevel - obstacles[0].birdHeight - this.y) {
                            this.state = 0;
                            this.fitness = score * score;
                        }
                    } else {
                        if (obstacles[0].x <= 30 + this.w && groundLevel - this.y < groundLevel - obstacles[0].birdHeight - this.y) {
                            this.state = 0;
                            this.fitness = score * score;
                        }
                    }
            }
        }
    }

    // xác định các tham số đầu bài cho giải thuật
    // và xác định obs gần nhất
    this.look = function() { //collect input data
        let closest = 0;
        let closestD = Infinity;

        // lấy obs gần nhất
        for (let i = 0; i < obstacles.length; i++) {
            let d = obstacles[i].x - (30 + this.w);
            if (d < closestD && d >= 0) {
                closest = i; // obs [i]
                closestD = d; // khoảng cách bé nhất
            }
        }
        
        
        this.inputs = matrixZeros(6, 1);

        // input random [0 , 1]
        //w 840 h 450
        this.inputs[0][0] = closestD / 840; // [-1, 1]
        if (obstacles.length) {
            this.inputs[1][0] = obstacles[closest].h / 450;
            this.inputs[2][0] = obstacles[closest].w / 840;
            this.inputs[3][0] = obstacles[closest].birdHeight / 3;
        } else {
            this.inputs[1][0] = 0;
            this.inputs[2][0] = 0;
            this.inputs[3][0] = 0;
        }
        this.inputs[4][0] = speed / 10;
        this.inputs[5][0] = this.bias;
    }
    // tính toán để đưa ra phương án di chuyển
    this.think = function() {
        if (this.state) {
                                        // 6x 6             6x1
            this.hiddens = multiplyMatrix(this.input_hidden, this.inputs); // => [6x1]

            
                                        // 3 x 6             6x1
            this.outputs = multiplyMatrix(this.hidden_output, this.hiddens); // => 3 x 1
 

            let o = transposeMatrix(this.outputs); 
                        //[1,3] <=> [[1,2,3]]    
                        // chuyển ma trận thành [1, 3]
            switch (o[0].indexOf(Math.max.apply(null, o[0]))) { // tìm vị trí max tương ứng với state
                // [1,2,3] => max = ? => max ở index = 0 <=> chạy
                case 0:
                    if (this.state != 2) {
                        this.state = 1;
                    }
                    break;
                case 1:
                    this.state = 2;
                    break;
                case 2:
                    if (this.state != 2) {
                        this.state = 3;
                    }
                    break;
            }
        }
    }
}