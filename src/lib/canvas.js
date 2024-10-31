    class Stroke {
        constructor(points, color, opacity) {
            this.points = points; // An array of point objects
            this.color = color; // Color of the stroke
            this.opacity = opacity; // Opacity of the stroke
        }

        draw(context) {
            context.strokeStyle = this.color;
            context.globalAlpha = this.opacity;

            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);
            
            for (let i = 1; i < this.points.length; i++) {
                context.lineTo(this.points[i].x, this.points[i].y);
            }
            
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
        opacity: stroke.opacity
      })));
    }
  
    restoreState(data, ctx) {
      this.strokes = JSON.parse(data).map(item => new Stroke(item.points, item.color, item.opacity));
      this.render(ctx); 
    }
  }
  
  export { Canvas, Stroke };