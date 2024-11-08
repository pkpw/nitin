<script>
    export let data;
	$: ({ canvasData } = data);

    import { onMount } from 'svelte';
    import { Canvas, Stroke } from '$lib/canvas';
	//import { ContainerWithChildren } from 'postcss/lib/container';

    let width = 300;
    let height = 300;
    let currentColor = '#000000'; // Default color
    let background = '#fff';

    // Canvas Drawing Vars
    let canvas;
    let context;
    let myCanvas;
    let isDrawing = false;
    let isErasing = false;
    let start = { x: 0, y: 0 };
    let line_width = 3;
    let canvasOffsetTop = 0;
    let canvasOffsetLeft = 0;

	onMount(() => {
		//console.log(canvasData) //DEBUG------------------------
		context = canvas.getContext('2d');
        context.globalAlpha = 1;
        context.lineWidth = 3;
		myCanvas = new Canvas(width, height);
		// Draw canvas if canvasData is defined and is the expected type
		if (typeof canvasData === 'string') {
			myCanvas.strokes = JSON.parse(canvasData);
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
        const dx = offsetX - x;
        const dy = offsetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(distance / 1);

        const stroke = new Stroke([{ x, y }], currentColor, context.globalAlpha, line_width, isErasing);

        context.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

        for (let i = 0; i <= steps; i++) {
            const intermediateX = x + (dx / steps) * i;
            const intermediateY = y + (dy / steps) * i;

            // Draw on the canvas
            context.beginPath();
            context.moveTo(intermediateX, intermediateY);
            context.lineTo(intermediateX + 0.5, intermediateY + 0.5);
            context.lineJoin = "round";
            context.lineCap = "round";
            context.stroke();

            stroke.points.push({ x: intermediateX, y: intermediateY });
        }

        myCanvas.addStroke(stroke);
        //myCanvas.render(context); //Causes extreme lag when drawing too much

        // Update start position for the next move
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
    function pen() {
        context.globalCompositeOperation = 'source-over';
        isErasing = false;
    }
    function erase() {
        context.globalCompositeOperation = 'destination-out';
        isErasing = true;
    }

    function handleColorChange(event) {
        currentColor = event.target.value;
        context.strokeStyle = currentColor;
        console.log("Selected color:", currentColor);  // Check if color changes
    }

    function changeLineWidth(event) {
        line_width = document.getElementById("widthslider").value;
        context.lineWidth = line_width;
    }

    function changeLineOpacity(event) {
        var line_opacity = document.getElementById("opacityslider").value;
        context.globalAlpha = line_opacity;
    }

    function clearDrawing() {
        context.clearRect(0, 0, width, height);
        myCanvas.strokes = [];
    }

    function drawSavedCanvas(data) {
        let parsedData;

        if (typeof data === 'string') {
            try {
                parsedData = JSON.parse(data);
            } catch (error) {
                console.error("Error parsing canvas data:", error);
                return;
            }
        } else if (typeof data === 'object') {
            parsedData = data;
        } else {
            console.warn('Invalid canvas data format:', data);
            return;
        }

        if (!Array.isArray(parsedData)) {
            console.warn('Canvas data format invalid, expected an array of strokes:', parsedData);
            return;
        }
        
        // Clear the canvas before rendering
        context.clearRect(0, 0, width, height);

        // Draw each stroke
        parsedData.forEach(stroke => {
            stroke.points = stroke.points.filter(point => point.x !== 0 || point.y !== 0);
            
            if (stroke.mode) {
                context.globalCompositeOperation = 'destination-out';  // Set erase mode
            } else {
                context.globalCompositeOperation = 'source-over';  // Set draw mode
            }
            
            context.beginPath();
            context.strokeStyle = stroke.color;
            context.globalAlpha = stroke.opacity || 1;
            context.lineWidth = stroke.size;
            context.lineJoin = "round";
            context.lineCap = "round";

            // Start drawing
            context.moveTo(stroke.points[0].x, stroke.points[0].y);

            for (let i = 1; i < stroke.points.length - 1; i++) {
                const midX = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
                const midY = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
                context.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, midX, midY);
            }

            
            context.lineTo(stroke.points[stroke.points.length - 1].x, stroke.points[stroke.points.length - 1].y);
            context.stroke();
            context.globalCompositeOperation = 'source-over';  // Set draw mode
        });
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
    value={currentColor}
    on:input ={handleColorChange}
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
    <input type="range" min="0.01" max="1" value="1" step="0.005" class="slider" id="opacityslider" on:click={changeLineOpacity}>
</div>
