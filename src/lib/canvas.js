    class Stroke {
      constructor(points, color, opacity, size, mode) {
        this.points = points; // An array of point objects
        this.color = color; // Color of the stroke
        this.opacity = opacity; // Opacity of the stroke
        this.size = size; //Size of stroke
        this.mode = mode;
      }

      draw(context) {
        if (this.points.length < 2) return;

        context.strokeStyle = this.color;
        context.globalAlpha = this.opacity;
        context.lineWidth = this.size;
        context.lineJoin = "round";
        context.lineCap = "round";
        if (this.mode) {
          context.globalCompositeOperation = 'destination-out';  // Set erase mode
        } else {
            context.globalCompositeOperation = 'source-over';  // Set draw mode
        }

        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);

        for (let i = 1; i < this.points.length - 1; i++) {
          const midPointX = (this.points[i].x + this.points[i + 1].x) / 2;
          const midPointY = (this.points[i].y + this.points[i + 1].y) / 2;

          context.quadraticCurveTo(
            this.points[i].x, this.points[i].y,
            midPointX, midPointY
          );
        }

        // Draw the last segment
        context.lineTo(
          this.points[this.points.length - 1].x,
          this.points[this.points.length - 1].y
        );

        context.stroke();
      }
    }
  
  class Canvas {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.strokes = [];
    }
  
    addStroke(stroke) {
      this.strokes.push(stroke);
    }
  
    render(ctx) {
      ctx.clearRect(0, 0, this.width, this.height); 
      for (const stroke of this.strokes) {
        stroke.draw(ctx); 
      }
    }
  
    saveState() {
      return JSON.stringify(this.strokes.map(stroke => ({
        points: stroke.points,
        color: stroke.color,
        opacity: stroke.opacity,
        size: stroke.size,
        mode: stroke.mode
      })));
    }
  
    restoreState(data, ctx) {
      let parsedData;
  
      if (typeof data === 'string') {
          try {
              parsedData = JSON.parse(data);
          } catch (error) {
              console.error("Error parsing canvas data:", error);
              return;
          }
      } else {
          parsedData = data;
      }
      
      if (!Array.isArray(parsedData)) {
          console.warn('Canvas data format invalid, expected an array of strokes:', parsedData);
          return;
      }
  
      this.strokes = parsedData.map(item => new Stroke(item.points, item.color, item.opacity, item.size));
  
      this.render(ctx);
    }
  
  }
  
  export { Canvas, Stroke };