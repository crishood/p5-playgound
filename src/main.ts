import './style.scss';
import p5 from 'p5';
import init, { p5SVG } from 'p5.js-svg';

init(p5);

const CRYSTAL_SIZE = 500;
const SIDES = 6;
const ROTATION_ANGLE = 360 / SIDES;
let PALLETTE: p5.Color[];
const sketch = (p: p5SVG) => {
  p.setup = () => {
    p.createCanvas(600, 600);
    p.noLoop();
    p.angleMode(p.DEGREES);
    PALLETTE = [
      p.color(255, 240, 40),
      p.color(122, 255, 184),
      p.color(80, 102, 106),
      p.color(194, 223, 56),
    ];
  };

  p.draw = () => {
    drawLime(p);
    drawOutlineShape(p);
  };
};

const drawLime = (p: p5SVG) => {
  const random = p.random([1, 2, 3]);
  let numShapes = random === 1 ? SIDES : random === 2 ? SIDES / 2 : SIDES * 2;
  const lineStroke = p.random(PALLETTE);
  const ellipseStroke = p.random(PALLETTE);

  p.fill(255);
  p.push();
  p.translate(p.width / 2, p.height / 2);
  p.stroke(lineStroke);
  p.ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
  const angle = 360 / numShapes;
  for (let i = 0; i < numShapes; i++) {
    p.stroke(ellipseStroke);
    p.line(0, 0, CRYSTAL_SIZE / 2, 0);
    p.rotate(angle);
  }
  p.pop();
};

const drawHexagon = (posX: number, posY: number, radius: number, p: p5SVG) => {
  const rotAngle = 360 / 6;
  p.beginShape();
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle, p);
    p.vertex(thisVertex.x, thisVertex.y);
  }
  p.endShape(p.CLOSE);
};

const drawOutlineShape = (p: p5SVG) => {
  let random = p.random([1, 2, 3]);
  p.stroke(0);
  p.noFill();
  p.push();
  p.translate(p.width / 2, p.height / 2);
  random === 1
    ? drawHexagon(0, 0, CRYSTAL_SIZE / 2, p)
    : random === 2
    ? drawHexagon(0, 0, CRYSTAL_SIZE / 2, p)
    : drawHexagon(0, 0, CRYSTAL_SIZE / 2, p);
  p.pop();
};

const pointOnCircle = (
  posX: number,
  posY: number,
  radius: number,
  angle: number,
  p: p5SVG
) => {
  const x = posX + radius * p.cos(angle);
  const y = posY + radius * p.sin(angle);
  return p.createVector(x, y);
};
new p5(sketch, document.getElementById('app')!);
