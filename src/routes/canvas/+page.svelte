<script>
	import { getSupabaseClient } from '$lib/supabase-client.js';
	import { onMount } from 'svelte';
  
	export let width = 300;
	export let height = 300;
	export let color = '#333'; // Default pen color
	export let background = '#fff';

	export let data;
	$: ({ supabase } = data);

  
	//Canvas Drawing Vars
	let canvas;
	let context;
	let isDrawing = false;
	let start = { x: 0, y: 0 };
	let canvasOffsetTop = 0;
	let canvasOffsetLeft = 0;
	let line_width = 3;

	//Canvas saving/loading vars
	let flashcard_id = '46de8ae6-0823-4c26-8501-5f14f98b29f9';
	let canvas_id = true;

	onMount(() => {
	  context = canvas.getContext('2d');
	  context.lineWidth = line_width;
	  updateCanvasSize();
	  fetchSavedCanvas();
	});
  
	$: if (context) {
	  context.strokeStyle = color; // Update pen color whenever it changes
	}
  
	function handleStart({ offsetX, offsetY }) {
	  if (color === background) {
		context.clearRect(0, 0, width, height);
		saveCanvasToSupabase(); // Automatically save after clearing
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
	  saveCanvasToSupabase(); // Automatically save
	}

	
	function clearDrawing() {
	  context.clearRect(0, 0, width, height);
	  saveCanvasToSupabase();
	}
  
	function updateCanvasSize() {
	  const { top, left } = canvas.getBoundingClientRect();
	  canvasOffsetTop = top;
	  canvasOffsetLeft = left;
	}


	
	//Pen adjustment Functions
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



	//-----------------------------------------------------------------------------------
	// Canvas - Database saving
	//-----------------------------------------------------------------------------------
	function drawSavedCanvas(imageData) {
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.onload = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0);
		};
		img.src = imageData;
	}

	async function fetchSavedCanvas(){
		const { data, error } = await supabase
			.from('canvas')
			.select('canvas_data')
			.eq('id', 0)
			.single();

		if (error) {
			console.error('Error fetching canvas data', error);
		} else {
			console.log(data);
			drawSavedCanvas(data.canvas_data);
		}
	}

	async function saveCanvasToSupabase() {
		const canvasDataURL = canvas.toDataURL();
		console.log(canvasDataURL);

		if (!supabase) {
			console.error('Supabase client is not initialized');
			return; 
		}

		const { data: updateData, error: updateError } = await supabase
			.from('canvas')
			.update({
				canvas_data: canvasDataURL,
			})
			.eq('id', 0);

		if (updateError) {
			console.error('Error saving canvas to database', updateError);
		} else { 
			const { data: fetchedData, error: fetchError } = await supabase
				.from('canvas')
				.select('canvas_data')
				.eq('id', 0);
			
			if (fetchError) {
				console.error('Error fetching updated canvas data', fetchError);
			} else {
				console.log('Updated canvas_data:', fetchedData);
				if (fetchedData.length > 0) {
					console.log('Fetched canvas_data:', fetchedData.canvas_data);
				} else {
					console.log('No data found for id 0');
				}
			}
		}
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
  

  