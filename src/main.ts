import './style.scss';

import p5 from 'p5';
import init, { p5SVG } from 'p5.js-svg';

init(p5);

// Define tu sketch p5
const sketch = (p: p5SVG) => {
  p.setup = () => {
    p.createCanvas(400, 400, p.SVG);
    p.background(220);
  };

  p.draw = () => {
    p.ellipse(200, 200, 50, 50);
  };
};

// Crea una instancia de p5 con tu sketch
new p5(sketch);
