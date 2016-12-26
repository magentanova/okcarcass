

export const rainbowColor = function(scale,freq,startVal) {
	scale += startVal
   let red   = Math.sin(freq * scale + 0) * 175 - 50,
	green = Math.sin(freq * scale + 2) * 175 - 50,
	blue  = Math.sin(freq * scale + 4) * 175 - 50

   return `rgb(${parseInt(red)},${parseInt(green)},${parseInt(blue)})`
}

export const randRange = function(start,end) {
	return Math.round(start + Math.random() * (end - start))
}

export const formatTimerVal = function(val) {
	return val.replace('_',' ')
}