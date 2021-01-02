var Status = pc.createScript('status');

// initialize code called once per entity
Status.prototype.initialize = function() {
    this.entity.isDead = false;
};

// update code called every frame
// Status.prototype.update = function(dt) {
    
// };

Status.prototype.getStatus = function(){
    return this.entity.isDead;
};

Status.prototype.setStatusIsDead = function(){
    this.entity.isDead = true;
};

// swap method called for script hot-reloading
// inherit your script state here
// Status.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/