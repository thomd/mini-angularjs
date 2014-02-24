var angular = require('./mini-angular');
var scope = new Scope();

scope.firstName = document.getElementById('firstname');
scope.countInfo = document.getElementById('count-info');
scope.counter = 0;


// register watchers (watchers should be idempotent)

// counter watcher (dependent from first-name watcher)
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

// first-name watcher
scope.$watch(
  function(scope){
    return S(scope.firstName.value).trim().s;
  },
  function(newValue, oldValue, scope){
    scope.counter ++;
  }
);

// logger watcher
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



