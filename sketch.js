const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math'); 
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// VARIABLES
const margin = 200;
const years = ['2017', '2024', '1064', '3099'];

// SETUP
const settings = {
  dimensions: [ 2048, 1080 ]
  // animate: true
};


const sketch = () => {
  const palette = random.pick(palettes);
  // const palette = ['#f8edd1', '#d88a8a', '#474843', '#9d9d93', '#c5cfc6'];

  const createGrid = () => {
    const points = [];
    const count = random.range(40, 200);
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.025;
        points.push({
          color: random.pick(palette),
          radius,
          position: [ u, v ],
          rotation: random.noise2D(u, v)
        });
      }
    }
    return points;
  };

  // random.setSeed(1);
  const points = createGrid().filter( () => random.value() > 0.8);


  // MAIN LOOP
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    
    let textYear = random.pick(years);
    let fontSize = random.range(140, 200);

    // FOR EACH POINT LOOP
    points.forEach(data => {
      const {
        position,
        radius, 
        color,
        rotation
      } = data

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `60px Futura`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('-', 0, 0);
      context.restore();
    });


  };
};


canvasSketch(sketch, settings);
