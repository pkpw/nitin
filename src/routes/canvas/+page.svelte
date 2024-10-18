<script>
	import { onMount } from 'svelte';
  
	export let width = 300;
	export let height = 300;
	export let color = '#333'; // Default pen color
	export let background = '#fff';
  
	let canvas;
	let context;
	let isDrawing = false;
	let start = { x: 0, y: 0 };
	let canvasOffsetTop = 0;
	let canvasOffsetLeft = 0;
	let dataURL;
	let line_width = 3;
	

	onMount(() => {
	  context = canvas.getContext('2d');
	  context.lineWidth = line_width;
	  updateCanvasSize();
	  loadDrawing(); // Load saved drawing when the component mounts
	});
  
	$: if (context) {
	  context.strokeStyle = color; // Update pen color whenever it changes
	}
  
	function handleStart({ offsetX, offsetY }) {
	  if (color === background) {
		context.clearRect(0, 0, width, height);
		saveDrawing(); // Automatically save after clearing
	  } else {
		isDrawing = true;
		start = { x: offsetX, y: offsetY };
	  }
	}
  
	function handleMove({ offsetX, offsetY }) {
	  if (!isDrawing) return;
  
	  const { x, y } = start;

	  const dx = offsetX - x;
	  const dy = offsetY - y;
	  const distance = Math.sqrt(dx * dx + dy * dy);

	  const steps = Math.ceil(distance / 2);
	  for (let i = 0; i < steps; i++){
		const intermediateX = x + (dx / steps) * i;
		const intermediateY = y + (dy / steps) * i;

		context.beginPath();
		context.moveTo(intermediateX, intermediateY);
		context.lineTo(intermediateX + 0.5, intermediateY + 0.5);
		context.lineJoin = "round";
		context.lineCap = "round";
		context.stroke();
	  }
	
	  start = { x: offsetX, y: offsetY };
	}
  
	function handleEnd() {
	  isDrawing = false;
	  saveDrawing(); // Automatically save on drawing move
	}
  
	function saveDrawing() {
	  dataURL = canvas.toDataURL();
	  localStorage.setItem('savedDrawing', dataURL);
	}
  
	function loadDrawing() {
	  const savedDataURL = localStorage.getItem('savedDrawing');
	  if (savedDataURL) {
		const img = new Image();
		img.onload = () => {
		  context.clearRect(0, 0, width, height);
		  context.drawImage(img, 0, 0);
		};
		img.src = savedDataURL;
	  }
	}
  
	function clearDrawing() {
	  context.clearRect(0, 0, width, height);
	  localStorage.removeItem('savedDrawing'); // Remove the saved drawing from local storage
	}
  
	function updateCanvasSize() {
	  const { top, left } = canvas.getBoundingClientRect();
	  canvasOffsetTop = top;
	  canvasOffsetLeft = left;
	}
  
	function handleColorChange(event) {
	  color = event.target.value; // Update the pen color based on the selected color
	}

	function changeLineWidth(event){
		var line_width = document.getElementById("widthslider").value;
		if(context.lineWidth != line_width){
			context.lineWidth = line_width;
		}
	}

	function changeLineOpacity(event){
		var line_opacity = document.getElementById("opacityslider").value;
		context.globalAlpha = line_opacity;
	}

	const erase = () => context.globalCompositeOperation = 'destination-out'
	const pen = () => context.globalCompositeOperation = 'source-over'

  </script>
  
  <svelte:window on:resize={updateCanvasSize} />
  
  <canvas
	{width}
	{height}
	style="background: {background}; border: 1px solid black;"
	bind:this={canvas}
	on:mousedown={handleStart}
	on:mouseup={handleEnd}
	on:mousemove={handleMove}
	on:mouseleave={handleEnd}
	on:touchstart={e => handleStart({ offsetX: e.touches[0].clientX - canvasOffsetLeft, offsetY: e.touches[0].clientY - canvasOffsetTop })}
	on:touchend={handleEnd}
	on:touchmove={e => handleMove({ offsetX: e.touches[0].clientX - canvasOffsetLeft, offsetY: e.touches[0].clientY - canvasOffsetTop })}
  />
    <!-- Color Picker -->
	<button class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded"on:click={pen}>Pen</button>
	<button class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded" on:click={erase}>Eraser</button>
	<input
	  id="color-picker"
	  type="color"
	  value={color}
	  on:input={handleColorChange}
	/>
	<button class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded" on:click={clearDrawing}>Clear</button>
	<br>
	<h1 style="color:white;">Size:</h1>
	<div class="slidecontainer">
		<input type="range" min="1" max="10" value="3" class="slider" id="widthslider" on:click={changeLineWidth}>
	</div>
	<h1 style="color:white;">Opacity:</h1>
	<div class="slidecontainer">
		<input type="range" min="0" max="1" value="1" step = "0.1" class="slider" id="opacityslider" on:click={changeLineOpacity}>
	</div>
	{#if dataURL}
		<div style="word-wrap: break-word; max-width: 300px; margin-top: 10px;">
			<strong>Data URL:</strong> {dataURL}
		</div>
	{/if}
  
  

  