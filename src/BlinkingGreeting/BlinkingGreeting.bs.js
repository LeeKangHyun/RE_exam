'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function BlinkingGreeting(Props) {
  var name = Props.name;
  var children = Props.children;
  var match = React.useState((function () {
          return true;
        }));
  var setShow = match[1];
  var match$1 = React.useState((function () {
          return false;
        }));
  var setEditing = match$1[1];
  var match$2 = React.useState((function () {
          return name;
        }));
  var onChange = match$2[1];
  var value = match$2[0];
  var match$3 = React.useReducer((function (state, action) {
          return /* record */[/* count */state[/* count */0] + 1 | 0];
        }), /* record */[/* count */0]);
  var dispatch = match$3[1];
  var onCancel = function (_evt) {
    return Curry._1(setEditing, (function (param) {
                  return false;
                }));
  };
  var onFocus = function ($$event) {
    return $$event.target.select();
  };
  React.useEffect((function () {
          Curry._1(onChange, (function (param) {
                  return name;
                }));
          return ;
        }), /* array */[name]);
  React.useEffect((function () {
          var id = setInterval((function (param) {
                  return Curry._1(setShow, (function (previousShow) {
                                return !previousShow;
                              }));
                }), 1000);
          return (function (param) {
                    clearInterval(id);
                    return /* () */0;
                  });
        }));
  React.useEffect((function () {
          var timerId = setInterval((function (param) {
                  return Curry._1(dispatch, /* Tick */0);
                }), 1000);
          return (function (param) {
                    clearInterval(timerId);
                    return /* () */0;
                  });
        }));
  var style = match[0] ? ({
        opacity: "1",
        transition: "opacity 1s"
      }) : ({
        opacity: "0",
        transition: "opacity 1s"
      });
  if (match$1[0]) {
    return React.createElement("form", {
                onBlur: onCancel,
                onSubmit: (function (param) {
                    Curry._1(setEditing, (function (param) {
                            return false;
                          }));
                    console.log(value);
                    return /* () */0;
                  })
              }, React.createElement("input", {
                    value: value,
                    onFocus: onFocus,
                    onBlur: onCancel,
                    onChange: (function ($$event) {
                        return Curry._1(onChange, $$event.target.value);
                      })
                  }));
  } else {
    return React.createElement("article", undefined, React.createElement("span", {
                    onDoubleClick: (function (_evt) {
                        return Curry._1(setEditing, (function (param) {
                                      return true;
                                    }));
                      })
                  }, value), React.createElement("p", {
                    style: style
                  }, children), React.createElement("p", undefined, name + String(match$3[0][/* count */0])));
  }
}

var make = BlinkingGreeting;

exports.make = make;
/* react Not a pure module */
