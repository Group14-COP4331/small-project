var canvas;

var particle = {
  x: [],
  y: [],
  s: [],
  speed: [],
  shape: [],
  initial: []
};

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function draw() {
  background(250, 243, 219);
  fill(243, 102, 102, 50);
  noStroke();
  for(var i = 0; i < particle.x.length; i++)
  {

    if(particle.shape[i] == 0)
    {
       ellipse(particle.x[i], particle.y[i], particle.initial[i], particle.initial[i]);
    }
    
    if(particle.shape[i] == 1)
    {
       rect(particle.x[i], particle.y[i], particle.initial[i], particle.initial[i]);
    }
    
    
    if(particle.shape[i] == 2)
    {
       triangle(particle.x[i] + particle.initial[i] / 2, particle.y[i], particle.x[i] + particle.initial[i], particle.y[i] + particle.initial[i], particle.x[i], particle.y[i] + particle.initial[i]);
    }

    if(particle.initial[i] < particle.s[i])
    {
      particle.initial[i] ++;
    }
    
    particle.x[i] += particle.speed[i];
    
    if(particle.x[i] > width + 50)
      {
        particle.speed[i] = random(1, 5);
        particle.x[i] = -100;
      }
  }

  if(particle.x.length < 100)
  {
    particle.x.push(random(-100, width));
    particle.y.push(random(-50, height + 50));
    particle.s.push(random(10, 45));
    particle.initial.push(0);
    particle.speed.push(random(1, 5));
    particle.shape.push(floor(random(0, 3)));
  }

}
