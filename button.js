var Button = pc.createScript('button');

// initialize code called once per entity
Button.prototype.initialize = function() {
    this.buttonPressed = false;
    
    this.entity.button.on('pressedstart', this.onPressedStart, this);
    this.entity.button.on('pressedend', this.onPressedEnd, this);
};

// update code called every frame
Button.prototype.update = function(dt) {
     if (this.buttonPressed) {
         if (this.entity.name === "Quit"){
            window.close();
         }
         else if(this.entity.name === "Play Again"){
             window.location = "https://launch.playcanvas.com/1047505?debug=true";
         }
        
    }
};

Button.prototype.onPressedStart = function() {
    this.buttonPressed = true;
};


Button.prototype.onPressedEnd = function() {
    this.buttonPressed = false;
};

// swap method called for script hot-reloading
// inherit your script state here
// Button.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/