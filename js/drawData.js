function showNumbers(){
	ctx.fillText("Điểm: " + score, 20, 440);
	ctx.fillText("Điểm Cao: " + highest, 20, 410);
	
	if(isReplay){
		ctx.fillText("Tốc Độ: " + Math.round(speed * 10)/10, 20, 60);
		ctx.fillText("Tiến hóa...", 730, 410);
		ctx.fillText("Alive: 1", 20, 30);
		ctx.fillText("Gen: " + replayGen, 750, 380);
	}else if(isBot){
		ctx.fillText("Speed: " + Math.round(speed * 10)/10, 20, 60);
		ctx.fillText("Giải thuật tự nghĩ Bot", 690, 410);
		ctx.fillText("Sống: 1", 20, 30);
	}else{
		
		ctx.fillText("Tốc Độ: " + Math.round(speed * 10)/10, 20, 150);
		ctx.fillText("Tiến hóa...", 730, 410);
		ctx.fillText("Sống: " + stillAlive(), 20, 30);
		ctx.fillText("Tỉ Lệ: " + Math.round(stillAlive() / popSize * 1000)/10 + "%", 20, 60);
		ctx.fillText("Gen: " + gen, 750, 380);
		ctx.fillText("TBC điểm player: " + Math.round(Math.sqrt(sum/popSize)), 20, 90);
		ctx.fillText("Mục Tiêu: " + targetScore, 20, 120);
	}
}

function showBrain(inputHidden, hiddenOutput){
	let inputX = 450;
	let hiddenX = 600;
	let outputX = 750;
	let y = 30;
	let incrememt = 40;
	const neuronR = 12.5;


	if(gen != 1){
		ctx.fillText("Dự Kiến : ", 515, 25);
		for(let i = 0;i < inputHidden[0].length;i++){
			for(let j = 0;j < inputHidden.length;j++){
				ctx.beginPath();
				ctx.lineWidth = Math.abs(inputHidden[j][i]);
				if(inputHidden[j][i] > 0){
					ctx.strokeStyle = 'blue';
				}else{
					ctx.strokeStyle = 'red';
				}
				y = 30;
				ctx.moveTo(inputX + neuronR, y + neuronR + i*incrememt);
				y = 45;
				ctx.lineTo(hiddenX + neuronR, y + j*incrememt);
				ctx.closePath();
				ctx.stroke();
			}
		}
		for(let i = 0;i < hiddenOutput[0].length;i++){
			for(let j = 0;j < hiddenOutput.length;j++){
				ctx.beginPath();
				ctx.lineWidth = Math.abs(hiddenOutput[j][i]);
				if(hiddenOutput[j][i] > 0){
					ctx.strokeStyle = 'blue';
				}else{
					ctx.strokeStyle = 'red';
				}
				y = 35;
				ctx.moveTo(hiddenX + neuronR, y + neuronR + i*incrememt);
				y = 90;
				ctx.lineTo(outputX + neuronR, y + j*incrememt);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}

    y = 30;
    for(let i = 0;i < inputNodes;i++){
		ctx.drawImage(neuron, inputX, y);
		y += incrememt;
	}
	
	y = 30;
	for(let i = 0;i < hiddenNodes;i++){
		ctx.drawImage(neuron, hiddenX, y);
		y += incrememt;
	}
	y = 80;
	for(let i = 0;i < outputNodes;i++){
		ctx.drawImage(neuron, outputX, y);
		y += incrememt;
	}
	
	ctx.fillText("Khoảng Cách obs", 345, 45);
	ctx.fillText("Chiều cao obs", 360, 85);
	ctx.fillText("Độ rộng obs", 365, 125);
	ctx.fillText("Loại Chiều cao", 350, 165);
	ctx.fillText("Speed", 405, 205);
	ctx.fillText("Dự Kiến", 390, 245);

	ctx.fillText("Chạy", 776, 100);
	ctx.fillText("Nhảy", 777, 140);
	ctx.fillText("Cúi", 777, 180);
}






