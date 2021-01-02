var Collider = pc.createScript('collider');

Collider.attributes.add('buttonEntity', {type: 'entity'});

// initialize code called once per entity
Collider.prototype.initialize = function() {
    
    this.button = this.buttonEntity.button;
    this.buttonPressed = false;
    
    this.button.on('pressedstart', this.onPressedStart, this);
    this.button.on('pressedend', this.onPressedEnd, this);
    
    this.entity.collision.on('collisionstart',this.onCollisionStart,this);
};

Collider.prototype.onCollisionStart = function(result) {
    if(result.other.rigidbody){
        if (result.other.name==="Other"){
            if( this.app.keyboard.isPressed(pc.KEY_K) || this.buttonPressed){
                var otherEntity = this.app.root.findByName("Root");
                var otherPlayerPosition = result.other.getLocalPosition();
                var otherPlayerId = otherEntity.script.network.findOtherPlayer(otherPlayerPosition);
                var socket = io.connect('https://verdant-gilded-frog.glitch.me');
                
                socket.emit('test',otherPlayerId);
            }
        }
    }
};

Collider.prototype.onPressedStart = function() {
    this.buttonPressed = true;
};


Collider.prototype.onPressedEnd = function() {
    this.buttonPressed = false;
};