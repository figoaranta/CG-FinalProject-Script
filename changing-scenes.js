var ChangingScenes = pc.createScript('changingScenes');

var loaded = false;


ChangingScenes.prototype.initialize = function(dt) {
};

ChangingScenes.prototype.update = function(dt) {
    // Change scenes in 1 second
    var root = this.app.root.findByName("Root");
    var self = this;
    setTimeout(function (){
        if(loaded === false && root.script){
            if (root.script.network.socket.disconnected === true){
                self.loadScene("Died") ;
                loaded = true;
            }
        }
    }, 10000);

    
};


ChangingScenes.prototype.loadScene = function (sceneName) {
    // Get a reference to the scene's root object
    var oldHierarchy = this.app.root.findByName ('Root');
    
    // Get the path to the scene
    var scene = this.app.scenes.find(sceneName);
    
    // Load the scenes entity hierarchy
    this.app.scenes.loadSceneHierarchy(scene.url, function (err, parent) {
        if (!err) {
            oldHierarchy.destroy();
        } else {
            console.error(err);
        }
    });
};
