void setup() {

  size(640, 360);

  for (int i = 0; i < 500; i++) {
    float x = random(width);
    float y = random(height);
    float r = random(100,255);
    float b = random(100, 255);
    
    noStroke();
    fill(r, 0, b, 100);
    ellipse(x, y, 16,16);
    
  }
  //Save the file
  save("output.png");
  exit();
  
}