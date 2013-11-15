function Scope(){

  // a watcher is something that is notified when a change occurs in the scope
  this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn){
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function(){}
  };
  this.$$watchers.push(watcher);
}

// run all teh watches which has been defined in the scope
Scope.prototype.$digest = function(){
  var self = this;
  _.forEach(this.$$watchers, function(watch){
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if(newValue !== oldValue){
      watch.listenerFn(newValue, oldValue, self);
    }
    watch.last = newValue;
  })
}

// -----------------------------------------------------------------------------------

var scope = new Scope();
scope.firstName = document.getElementById('firstname');
scope.counter = 0;
scope.$watch(
  function(scope){
    return S(scope.firstName.value).trim().s;
  },
  function(newValue, oldValue, scope){
    scope.counter ++;
    console.log(scope.counter);
  }
);
scope.$watch(
  function(){console.log("digest fired");}
);
document.getElementById('firstname').addEventListener('keyup', function(ev){
  scope.$digest();
});




