var fbLoadedPromise = new Promise(function(resolve, reject) {
  var scripte = document.createElement('script');
  scripte.src='https://cdn.firebase.com/js/client/2.2.7/firebase.js';
  scripte.addEventListener('load', function() {
    resolve();
  });
  document.body.appendChild(scripte);
});
var infosLoadedPromise = new Promise(function(resolve, reject) {
  fbLoadedPromise.then(function() {
    var fb = new Firebase('https://moodle-ansfinder.firebaseio.com/');
    fb.child('infos').on('value', function(snapshot) {
      resolve(snapshot.val());
    });
  });
});
infosLoadedPromise.then(function(infos) {
  var formes = document.querySelectorAll('.formulation');
  for(var i = 0; i < formes.length; i++) {
    var qid = formes[i].querySelector('input[type=hidden]').attributes.name.value.split('_')[0];
    Object.keys(infos).forEach(function(key) {
      if(infos[key].question == qid) {
        var infoe = document.createElement('div');
        infoe.innerText = infos[key].piece + ':' + ((infos[key].isCorrect) ? '○' : '×');
        formes[i].appendChild(infoe);
      }
    });
  }
});
