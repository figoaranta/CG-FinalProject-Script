var Animation = pc.createScript('animation');

Animation.states = {
    walking: {
        animation: 'Take 001.glb'
    }
};

// initialize code called once per entity
Animation.prototype.initialize = function() {
    this.setState("null");
    this.blendTime = 0.2;
    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.keyDown, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.keyUp, this);
};

Animation.prototype.setState = function (state) {
    var states = Animation.states;
    var root = this.app.root.findByName("Root");
    
    this.state = state;
    
    if(root.script){
        if(state == "walking"){
            this.entity.animation.loop = true;
        }else{
            this.entity.animation.loop = false;
        }
    }
};

Animation.prototype.keyDown = function (e) {
    if ((e.key === pc.KEY_W || e.key === pc.KEY_A || e.key === pc.KEY_S || e.key === pc.KEY_D) && (this.state !== 'walking')) {
        this.setState('walking');
    }
};
Animation.prototype.keyUp = function (e) {
    if ((e.key === pc.KEY_W || e.key === pc.KEY_A || e.key === pc.KEY_S || e.key === pc.KEY_D) && (this.state === 'walking')) {
        this.setState("null");
    }
};