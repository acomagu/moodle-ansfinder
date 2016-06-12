var fbLoadedPromise = new Promise(function(resolve, reject) {
  var scripte = document.createElement('script');
  scripte.src='https://cdn.firebase.com/js/client/2.2.7/firebase.js';
  scripte.addEventListener('load', function() {
    resolve();
  });
  document.body.appendChild(scripte);
});
fbLoadedPromise.then(function() {
  var corrects = document.querySelectorAll('.answer .correct label');
  var incorrects = document.querySelectorAll('.answer .incorrect label');
  var fb = new Firebase('https://moodle-ansfinder.firebaseio.com/');
  for(var i = 0; i < corrects.length; i++) {
    fb.child('infos').push({
      isCorrect: true,
      piece: corrects[i].innerText,
      question: corrects[i].attributes.for.value.split('_')[0]
    });
  }
  for(var i = 0; i < incorrects.length; i++) {
    fb.child('infos').push({
      isCorrect: false,
      piece: incorrects[i].innerText,
      question: incorrects[i].attributes.for.value.split('_')[0]
    });
  }
});
