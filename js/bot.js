
function Bot(){
	this.y = 0;
	this.jumpDist = 0.01;
	this.state = 1;
	this.img = null;
	this.w = 48;
	this.h = 56;
	

	this.inputs = []; // 2 |||||| [0] = Khoảng cách  	[1] = looại độ cao obs
	this.duckTime = 0; // thời gian cúi
	this.look = function(){
		closest = 0;
		closestD = Infinity;
		for(let i = 0;i < obstacles.length;i++){
			let d = obstacles[i].x - (30 + this.w);
			if(d < closestD && d >= 0){
				closest = i;
				closestD = d;
			}
		}
		
		if(obstacles.length){
			this.inputs[0] = closestD;
			this.inputs[1] = obstacles[closest].birdHeight;
		}else{
			this.inputs[0] = Infinity;
			this.inputs[1] = 0;
		}
		
	}
	this.think = function(){
		if(this.state){
			if(this.duckTime >= 100){
				this.duckTime = 0;
			}else if(this.duckTime > 0 && this.duckTime < 100){
				this.state = 3;
				this.duckTime++;
				return;
			}
			if(this.inputs[0] < 40*speed){
			
				if(!this.inputs[1]){
					this.state = 2;
				}else{
					this.state = 3;
					this.duckTime++;
				}
			}else{
				if(this.state != 2){
					this.state = 1;
				}
				
			}
		}
	}
	this.draw = function(){
		if(this.state){
			switch(this.state){
				case 1:
				this.y = 0;
				this.img = dinoRun;
				this.w = 48;
				this.h = 56;
				this.jumpDist = 0.01;
				this.y = 0;
				ctx.drawImage(this.img[score % 2], 30, groundLevel - this.h);
				break;
				case 2:
				this.img = dinoJump;
				this.w = 48;
				this.h = 50;
				this.y = Math.sin(this.jumpDist) * 90;
				ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
				this.jumpDist += 0.03;
				if(this.y < 0.001 && this.jumpDist > 3){
					this.state = 1;
					this.jumpDist = 0.01;
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
				this.img = dinoDead;
				ctx.drawImage(this.img, 30, groundLevel - this.h - this.y);
				break;
			}
		}
	}
	this.collide = function(){
		if(obstacles.length){
			switch(obstacles[0].birdHeight){
				case 0:
				if(obstacles[0].x <= 30 + this.w && this.y <=  obstacles[0].h){
					this.state = 0;
					this.fitness = score*score;
				}
				break;
				case 1:
				if(this.state == 3){
					if(obstacles[0].x <= 30 + this.w && this.y > obstacles[0].birdHeight + this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}else{
					if(obstacles[0].x <= 30 + this.w && this.h > obstacles[0].birdHeight + this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}
				break;
				case 2:
				if(this.state == 2){
					if(obstacles[0].x <= 30 + this.w && groundLevel - this.h < groundLevel - obstacles[0].birdHeight - this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}else{
					if(obstacles[0].x <= 30 + this.w && groundLevel - this.y < groundLevel - obstacles[0].birdHeight - this.y){
						this.state = 0;
						this.fitness = score*score;
					}
				}
			}
		}
	}
}








