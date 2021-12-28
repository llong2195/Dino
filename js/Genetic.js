// Giải Thuật Di Truyền
/*
    1. Khởi Tạo
    2. Đánh Giá, Lựa Chọn
    3. Đột Biến

    4... Kết Thúc

*/

function newPop(popSize) {
    let nextGen = [];
    // tim gen xịn nhất
    champion = population[findBest(population)];
    champion.state = 1;
    // champion sống
    // thế hệ mới
    nextGen.push(champion) 

    for (let i = 1; i < popSize; i++) {
						// sum: Tổng điểm của Gen
        nextGen[i] = selectReject(population, sum);
    }
    return nextGen;
}

// Đánh giá và lựa chọn

// số lượng , đánh giá điểm
function selectReject(pop, s){
	let rand = 0;
	let fitness = 0;
	let parent1 = null;
	let child = new Player(); 
	while(rand >= fitness){
		parent1 = pop[Math.floor((Math.random()*pop.length))];
		fitness = parent1.fitness; // lấy điểm
		rand = Math.random() * s;
	}
	// tìm ngẫu nhiên cá thể cha mẹ có điểm cao


	// tìm ngẫu nhiên cá thể cha mẹ có điểm cao
	rand = 0;
	fitness = 0;
	let parent2 = null;
	while(rand >= fitness){
		parent2 = pop[Math.floor((Math.random()*pop.length))];
		fitness = parent2.fitness;
		rand = Math.random() * s;
	}

	// khởi tạo đầu vào ẩn và ra = ma trận
	let i_h = matrixZeros(hiddenNodes, inputNodes);
	let h_o = matrixZeros(outputNodes, hiddenNodes);
	// input [a][b] : output [b][a] = {0}

	// dự kiến lựa chọn : 0 dead
	let bias = 0;
	for(let i = 0;i < i_h.length;i++){
		for(let j = 0;j < i_h[0].length;j++){
			// chọn nhẫu nhiên gen giữa 2 cá thể 
			// đầu vào
			if(Math.random() > 0.5){
				i_h[i][j] = parent1.input_hidden[i][j];
			}else{
				i_h[i][j] = parent2.input_hidden[i][j];
			}
		}
	}
	for(let i = 0;i < h_o.length;i++){
		for(let j = 0;j < h_o[0].length;j++){
			// chọn nhẫu nhiên gen giữa 2 cá thể 
			// đầu ra ẩn
			if(Math.random() > 0.5){
				h_o[i][j] = parent1.hidden_output[i][j];
			}else{
				h_o[i][j] = parent2.hidden_output[i][j];
			}
		}
	}
	// lựa chọn dự kiến của cá thể cha mẹ
	if(Math.random() > 0.5){
		bias = parent1.bias;
	}else{
		bias = parent2.bias;
	}
	child.input_hidden = mutate(i_h);
	child.hidden_output = mutate(h_o);
	child.bias =  mutate(bias);
	return child;
}



// trả về player điểm cao nhất
// BEST : Lựa Chọn
function findBest(pop){
	let lastBest = 0;
	let index = 0;
	for(let i = 0;i < pop.length;i++){
		if(pop[i].fitness > lastBest){
			lastBest = pop[i].fitness;
			index = i;
		}
	}
	return index;
}

// Đột Biến

function mutate(arr){
	let rs  = arr;
	if(rs.length){
		for(let i = 0;i < rs.length;i++){
			for(let j = 0;j < rs[0].length;j++){
				if(Math.random() < mutateRate){
					rs[i][j] = Math.random() * 2 - 1;
				}
			}
		}
	}else{
		if(Math.random() < mutateRate){

			rs = Math.random() * 2 - 1;
		}
	}

	return rs;
}