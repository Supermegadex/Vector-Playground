// addition
function add(u, v){
	if(diff(u, v)){ return }
	if(u.length){
		var result = [];
		for(var i in u){
			result.push(add(u[i], v[i]));
		}
		return result;
	}
	return u + v;
}

// multiplication and dot product
function mult(u, v){
	if(diff(u, v)){
		// scalar multiplication
		var result = [];
		if(!u.length){
			for(var i in v){ result.push(mult(v[i], u)) }
			return result;
		}
		if(!v.length){
			for(var i in u){ result.push(mult(u[i], v)) }
			return result;
		}
		// incompatible
		return;
	}
	if(u.length){
		// matrix multiplication
		if(u[0].length){
			var result = [];
			for(var i in u){
				result.push([]);
				for(var j in u[i]){
					result[i][j] = mult(u[i], col(v, j));
				}
			}
			return result;
		}
		// dot product
		var result = 0;
		for(var i in u){ result += mult(u[i], v[i]) }
		return result;
	}
	// normal multiplication
	return u * v;
}

// cross product of n-1 n-vectors
function cross(vArr){
	var r=[];
	for(var i = 0; i < vArr.length + 1; i++){
		var d = det(minor(vArr, -1, i));
		d *= Math.pow(-1, i + 1);
		r.push(d);
	}
	return r;
}

// distance
function dist(v){ return Math.sqrt(mult(v, v)) }

// determinant
function det(m){
	if(m.length == 1){return m[0][0] }
	var result = 0;
	for(var i in m[0]){ result += Math.pow(-1, i) * m[0][i] * det(minor(m, 0, i)) }
	return result;
}

// compatibility check
function diff(u, v){
	if(u.length == v.length){
		for(var i in u){
			if(diff(u[i], v[i])){ return true }
		}
		return false;
	}
	return true;
}

// MATRIX MANIPULATION

// returns ith column
function col(m, i){
	var result = [];
	for(var j in m){ result.push(m[j][i]) }
	return result;
}

// returns matrix missing i0th row and j0th column
function minor(m, i0, j0){
	var result = [];
	for(var i in m){
		if(i != i0){
			result.push([]);
			for(var j in m[i]){
				if(j != j0){ result[result.length - 1].push(m[i][j]) }
			}
		}
	}
	return result;
}


// COMPLEX PLANE

function cMult(v1,v2){ return [v1[0] * v2[0] - v1[1] * v2[1], v1[0] * v2[1] + v1[1] * v2[0]] }

function cPlot(v){ drawList.push(new line(ogn, [v[0], v[1], 0])) }


// CALCULUS

function cDerivative(func, pt){
	var arb=Math.pow(10,-10);
	var val=(func(pt+arb)-func(pt))/(arb);
	return val;
}


// COORDINATE SYSTEMS

function vPolar(v){
	var p=[Math.sqrt(v[0]*v[0]+v[1]*v[1]),Math.atan2(v[1],v[0])];
	for(var i=2;i<v.length;i++){p.push(v[i])}
	return p;
}

function vRectangular(v){
	var r=[v[0]*Math.cos(v[1]),v[0]*Math.sin(v[1])];
	for(var i=2;i<v.length;i++){r.push(v[i])}
	return r;
}