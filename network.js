var Network = pc.createScript('network');

// static variables
Network.id = null;
Network.socket = null;

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.player = this.app.root.findByName('Player');
    this.other = this.app.root.findByName('Other');
    
    this.currentPos = {};
    
    var socket = io.connect('https://verdant-gilded-frog.glitch.me'); // https://playcanvas-multiplayer.glitch.me https://figo-marc.glitch.me
    
    this.socket = socket;
    
    Network.socket = socket;
    
    socket.emit ('initialize');
    
    var self = this;
    socket.on ('playerData', function (data) {
        self.initializePlayers (data);
    });

    socket.on ('playerJoined', function (data) {
        self.addPlayer(data);
    });

    socket.on ('playerMoved', function (data) {
        self.movePlayer(data);
    });
    
    socket.on ('angleMoved', function (data) {
        self.moveAngle(data);
    });

    socket.on ('killPlayer', function (data) {
        self.removePlayer(data);
    });
    
};

Network.prototype.initializePlayers = function (data) {
    this.players = data.players;
    Network.id = data.id;

    for(var id in this.players){
        if(id != Network.id){
            this.players[id].entity = this.createPlayerEntity(this.players[id]);
        }
    }

    this.initialized = true;
    console.log(data);
    console.log('initialized');
};

Network.prototype.addPlayer = function (data) {
    this.players[data.id] = data;
    this.players[data.id].entity = this.createPlayerEntity(data);
};

Network.prototype.findOtherPlayer = function (data) {
    for( var player in this.players){
        if ( this.players[player].entity){
            if (data === this.players[player].entity.localPosition){
                return player;
            }
        }
    }
};

Network.prototype.findThisPlayer = function (data) {
    return this.players;
    for( var player in this.players){
        if (player === data){
            return this.players[player];
        }
    }
};

Network.prototype.movePlayer = function (data) {
    if (this.initialized && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z);
        
        if (this.currentPos[data.id]){
            if (this.currentPos[data.id].x !== data.x || this.currentPos[data.id].y !== data.y ||this.currentPos[data.id].z !== data.z){
                this.players[data.id].entity.animation.loop = true;
            }else{
                this.players[data.id].entity.animation.loop = false;
            }
        }
        
        this.currentPos[data.id] = { x : data.x, y : data.y, z : data.z};
    }
};

Network.prototype.moveAngle = function (data) {
    if (this.initialized && !this.players[data.id].deleted) {
        this.players[data.id].entity.setEulerAngles(data.ex, data.ey, data.ez);
        this.players[data.id].entity.rigidbody.syncEntityToBody();
    }
};

Network.prototype.removePlayer = function (data) {
    console.log(this.players);
    if (this.players[data].entity) {
        console.log("Player Removed");
        this.players[data].entity.destroy ();
        this.players[data].deleted = true;
    }
};

Network.prototype.createPlayerEntity = function (data) {
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;

    this.other.getParent().addChild(newPlayer);

    if (data)
        newPlayer.rigidbody.teleport(data.x, data.y, data.z);

    return newPlayer;
};

// update code called every frame
Network.prototype.update = function(dt) {
    this.updatePosition();
    this.updateEuler();
};

Network.prototype.updatePosition = function () {
    if (this.initialized) {    
        var pos = this.player.getPosition();
        Network.socket.emit('positionUpdate', {id: Network.id, x: pos.x, y: pos.y, z: pos.z});
    }
};

Network.prototype.updateEuler = function () {
    if (this.initialized) {    
        var euler = this.player.getEulerAngles();
        Network.socket.emit('eulerUpdate', {id: Network.id, ex: euler.x, ey: euler.y, ez: euler.z});
    }
};