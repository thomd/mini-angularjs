// ------ library -------------------------------------------------------------------------------

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
Scope.prototype.$$digestOnce = function(){
  var self = this;
  var dirty;
  _.forEach(this.$$watchers, function(watch){
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if(newValue !== oldValue){
      watch.listenerFn(newValue, oldValue, self);
      dirty = true;
    }
    watch.last = newValue;
  });
  return dirty;
}
Scope.prototype.$digest = function(){
  var dirty;
  do {
    dirty = this.$$digestOnce();
  } while(dirty);
}



// ------ implementation ------------------------------------------------------------------------

var scope = new Scope();
scope.firstName = document.getElementById('firstname');
scope.countInfo = document.getElementById('count-info');
scope.counter = 0;

// register counter watcher (dependent from first-name watcher)
scope.$watch(
  function(scope){
    return scope.counter;
  },
  function(newValue, oldValue, scope){
    if(scope.counter % 5 == 0){
      scope.countInfo.innerHTML = scope.counter + " chars";
    }
  }
);

// register first-name watcher
scope.$watch(
  function(scope){
    return S(scope.firstName.value).trim().s;
  },
  function(newValue, oldValue, scope){
    scope.counter ++;
  }
);

// register logger
scope.$watch(
  function(){
    console.log(scope.counter);
  }
);


// trigger digesting:w
scope.firstName.addEventListener('keyup', function(ev){
  scope.$digest();
})
scope.firstName.focus();



