<script>
    export let canvasData;
	console.log('Received canvasData:', canvasData); // Debug

    import { onMount } from 'svelte';
    import { Canvas, Stroke } from '$lib/canvas';

    let width = 300;
    let height = 300;
    let color = '#333'; // Default pen color
    let background = '#fff';

    // Canvas Drawing Vars
    let canvas;
    let context;
    let myCanvas;
    let isDrawing = false;
    let start = { x: 0, y: 0 };
    let line_width = 3;
    let canvasOffsetTop = 0;
    let canvasOffsetLeft = 0;

	onMount(() => {
		context = canvas.getContext('2d');
		myCanvas = new Canvas(width, height);

		// Draw canvas if canvasData is defined and is of the expected type
		if (canvasData && typeof canvasData === 'object') {
			drawSavedCanvas(canvasData);
		} else {
			console.warn('canvasData is undefined or invalid, initializing empty canvas.');
		}
	});

    function handleStart({ offsetX, offsetY }) {
        isDrawing = true;
        start = { x: offsetX, y: offsetY };
    }

    function handleMove({ offsetX, offsetY }) {
        if (!isDrawing) return;
        const { x, y } = start;

        const stroke = new Stroke([{ x, y }, { x: offsetX, y: offsetY }], color, context.globalAlpha);
        myCanvas.addStroke(stroke);

        myCanvas.render(context);

        start = { x: offsetX, y: offsetY };
    }

    function handleEnd() {
        isDrawing = false;
    }

    function updateCanvasSize() {
        const { top, left } = canvas.getBoundingClientRect();
        canvasOffsetTop = top;
        canvasOffsetLeft = left;
    }

    const pen = () => context.globalCompositeOperation = 'source-over';
    const erase = () => context.globalCompositeOperation = 'destination-out';

    function handleColorChange(event) {
        color = event.target.value;
    }

    function changeLineWidth(event) {
        line_width = document.getElementById("widthslider").value;
        if(context.lineWidth != line_width){
            context.lineWidth = line_width;
        }

    }

    function changeLineOpacity(event) {
        const line_opacity = document.getElementById("opacityslider").value;
        context.globalAlpha = line_opacity;
    }

    function clearDrawing() {
        context.clearRect(0, 0, width, height);
        myCanvas.strokes = [];
    }

    function drawSavedCanvas(data) {
		// Ensure canvasData is correctly formatted
		if (typeof data === 'string') {
			const parsedData = JSON.parse(data);
			context.clearRect(0, 0, width, height);

			parsedData.strokes.forEach(stroke => {
				context.beginPath();
				context.strokeStyle = stroke.color;
				context.lineWidth = stroke.lineWidth || line_width; // Ensure stroke lineWidth is defined

				stroke.points.forEach((point, index) => {
					if (index === 0) {
						context.moveTo(point.x, point.y);
					} else {
						context.lineTo(point.x, point.y);
					}
				});

				context.stroke();
			});
		} else {
			console.warn('Invalid canvas data format:', data);
		}
	}


	async function saveCanvasToDatabase() {
		const newCanvasData = myCanvas.saveState(); 
		const formData = new FormData();
		formData.append('canvasData', JSON.stringify(newCanvasData));

		const response = await fetch('/canvas', {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			console.log('Canvas saved successfully');
		} else {
			console.error('Failed to save canvas data');
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
<button class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded" on:click={pen}>Pen</button>
<button class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded" on:click={erase}>Eraser</button>
<input
    id="color-picker"
    type="color"
    value={color}
    on:input={handleColorChange}
/>
<button class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded" on:click={clearDrawing}>Clear</button>
<form on:submit|preventDefault={saveCanvasToDatabase}>
    <button type="submit" class="bg-sky-500 text-white text-lg font-semibold hover:underline p-2 rounded">
        Save
    </button>
</form>    
<br>
<h1 style="color:white;">Size:</h1>
<div class="slidecontainer">
    <input type="range" min="1" max="10" value="3" class="slider" id="widthslider" on:click={changeLineWidth}>
</div>
<h1 style="color:white;">Opacity:</h1>
<div class="slidecontainer">
    <input type="range" min="0" max="1" value="1" step="0.1" class="slider" id="opacityslider" on:click={changeLineOpacity}>
</div>
<div>
    {#if canvasData}
        <p>Canvas Data: {canvasData}</p>
    {:else}
        <p>No canvas data available.</p>
    {/if}
</div>
