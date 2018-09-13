'use strict';

var getTime = Date.now;
var time = getTime();
var focusDelay = 20;
var inputTypes = ['input', 'textarea', 'select'];
var isInput = function isInput(node) {
  return node.name && ~inputTypes.indexOf(node.nodeName.toLowerCase());
};

var attachListeners = function attachListeners(form) {
  var lastClick = void 0;
  var lastTab = void 0;
  var keysPressed = void 0;
  var pastes = void 0;
  var backSpaces = void 0;
  var entry = void 0;
  var entryTime = void 0;

  var makeHandler = function makeHandler(fn) {
    return function (event) {
      var now = getTime() - time;
      var target = event.target;
      var result = fn(event, now);
      if (result) {
        result.time = now;
        result.form = form.name;
        if (isInput(target)) {
          result.name = target.name;
        }
        console.info(result);
      }
    };
  };
  var onMouseDown = makeHandler(function (event, now) {
    lastClick = now;
  });
  var onFocus = makeHandler(function (event, now) {
    keysPressed = backSpaces = pastes = 0;
    entryTime = now;
    entry = lastClick && now - focusDelay < lastClick ? 'click' : lastTab && now - focusDelay < lastTab ? 'tab' : undefined;
  });
  var onBlur = makeHandler(function (event, now) {
    return {
      event: 'blur',
      entry: entry,
      keysPressed: keysPressed,
      backSpaces: backSpaces,
      pastes: pastes,
      timeSpent: now - entryTime
    };
  });
  var onPaste = makeHandler(function (event, now) {
    pastes++;
  });
  var onKeyDown = makeHandler(function (event, now) {
    var keyCode = event.keyCode;
    keysPressed++;
    if (keyCode === 8) {
      backSpaces++;
    }
    if (keyCode === 9) {
      lastTab = now;
    }
  });
  var onSubmit = makeHandler(function (event, now) {
    return { event: 'submit' };
  });

  if (!form.name && window.console) {
    console.info('FormNerd: You should specify a name attribute on your form');
  }
  var formLength = form.length;
  for (var j = 0; j < formLength; j++) {
    var input = form[j];
    if (isInput(input)) {
      input.addEventListener('focus', onFocus);
      input.addEventListener('blur', onBlur);
      input.addEventListener('keydown', onKeyDown);
      input.addEventListener('mousedown', onMouseDown);
      input.addEventListener('paste', onPaste);
    }
  }
  form.addEventListener('submit', onSubmit);
};

var forms = document.forms;
var formsLength = forms.length;
if (formsLength) {
  for (var i = 0; i < formsLength; i++) {
    attachListeners(forms[i]);
  }
  console.info('FormNerd: init', formsLength);
} else {
  console.info('FormNerd: no forms detected');
}
