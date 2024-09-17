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
  
	onMount(() => {
	  context = canvas.getContext('2d');
	  context.lineWidth = 3;
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
	  context.beginPath();
	  context.moveTo(x, y);
	  context.lineTo(offsetX, offsetY);
	  context.stroke();
  
	  start = { x: offsetX, y: offsetY };
	  saveDrawing(); // Automatically save on drawing move
	}
  
	function handleEnd() {
	  isDrawing = false;
	}
  
	function saveDrawing() {
	  const dataURL = canvas.toDataURL();
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
  
  <button on:click={clearDrawing}>Clear Drawing</button>
  
  <!-- Color Picker -->
  <label for="color-picker">Pen Color:</label>
  <input
	id="color-picker"
	type="color"
	value={color}
	on:input={handleColorChange}
  />
  