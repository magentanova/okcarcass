

export const rainbowColor = function(scale,freq) {
   let red   = Math.sin(freq * scale + 0) * 127 + 128,
	green = Math.sin(freq * scale + 2) * 127 + 128,
	blue  = Math.sin(freq * scale + 4) * 127 + 128

   return `rgb(${parseInt(red)},${parseInt(green)},${parseInt(blue)})`
}

