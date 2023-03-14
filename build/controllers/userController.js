"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.see = exports.remove = exports.postlogin = exports.postJoin = exports.postEdit = exports.postChangePawword = exports.logout = exports.getlogin = exports.getJoin = exports.getEdit = exports.getChangePawword = exports.finishGithubLogin = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getEdit = function getEdit(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile"
  });
};
exports.getEdit = getEdit;
var postEdit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$session$user, _id, avatarUrl, _req$body, name, email, username, location, file, updatedUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("hi");
          _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, location = _req$body.location, file = req.file; //const id = req.session.user.id
          console.log(file);
          _context.next = 5;
          return _User["default"].findByIdAndUpdate(_id, {
            avatarUrl: file ? file.path : avatarUrl,
            name: name,
            email: email,
            username: username,
            location: location
          }, {
            "new": true
          });
        case 5:
          updatedUser = _context.sent;
          req.session.user = updatedUser;
          res.redirect("/users/edit");
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function postEdit(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postEdit = postEdit;
var remove = function remove(req, res) {
  res.send("Edit User");
};
exports.remove = remove;
var getlogin = function getlogin(req, res) {
  res.render("login", {
    pageTitle: "login now"
  });
};
exports.getlogin = getlogin;
var postlogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, password, user, ok;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.next = 4;
          return _User["default"].findOne({
            username: username
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).render("login", {
            pageTitle: "An account with this username does not exists."
          }));
        case 7:
          console.log(user);
          _context2.next = 10;
          return _bcrypt["default"].compare(password, user.password);
        case 10:
          ok = _context2.sent;
          if (ok) {
            _context2.next = 15;
            break;
          }
          res.status(400).render("login", {
            pageTitle: "login now",
            errorMessage: "Wrong password"
          });
          _context2.next = 18;
          break;
        case 15:
          req.session.loggedIn = true;
          req.session.user = user;
          return _context2.abrupt("return", res.redirect('/'));
        case 18:
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function postlogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.postlogin = postlogin;
var getJoin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          res.render("join", {
            pageTitle: "create Account"
          });
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getJoin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body3, name, username, email, password, password2, location, exits;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body3 = req.body, name = _req$body3.name, username = _req$body3.username, email = _req$body3.email, password = _req$body3.password, password2 = _req$body3.password2, location = _req$body3.location;
          _context4.next = 3;
          return _User["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 3:
          exits = _context4.sent;
          if (!exits) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(400).render("join", {
            pageTitle: "usernameor email is already taken"
          }));
        case 6:
          if (!(password != password2)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(400).render("join", {
            pageTitle: "pwd is not equail"
          }));
        case 8:
          _context4.next = 10;
          return _User["default"].create({
            name: name,
            username: username,
            email: email,
            password: password,
            location: location
          });
        case 10:
          return _context4.abrupt("return", res.redirect("/login"));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postJoin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var logout = function logout(req, res) {
  req.session.destroy();
  req.flash("info", "Bye Bye");
  return res.redirect("/");
};
exports.logout = logout;
var see = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return _User["default"].findById(id).populate({
            path: "videos",
            populate: {
              path: "owner",
              model: "User"
            }
          });
        case 4:
          user = _context5.sent;
          if (user) {
            _context5.next = 8;
            break;
          }
          req.flash("error", "no User");
          return _context5.abrupt("return", res.status(400).render("404", {
            pageTitle: "User is not here"
          }));
        case 8:
          return _context5.abrupt("return", res.render("profile", {
            pageTitle: user.name,
            user: user
          }));
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function see(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.see = see;
var startGithubLogin = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var config, params, finalUrl;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          config = {
            client_id: process.env.GH_CLIENT,
            allow_signup: false,
            scope: "read:user user:email"
          };
          params = new URLSearchParams(config).toString();
          finalUrl = "https://github.com/login/oauth/authorize?".concat(params);
          return _context6.abrupt("return", res.redirect(finalUrl));
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function startGithubLogin(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.startGithubLogin = startGithubLogin;
var finishGithubLogin = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var config, params, finalURL, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          config = {
            clientId: process.env.GH_CLIENT,
            client_secret: process.env.GH_SECRET,
            code: req.query.code
          };
          params = new URLSearchParams(config).toString();
          finalURL = "https://github.com/login/oauth/access_token?".concat(params);
          _context7.next = 5;
          return (0, _nodeFetch["default"])(finalURL, {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          });
        case 5:
          _context7.next = 7;
          return _context7.sent.json();
        case 7:
          tokenRequest = _context7.sent;
          if (!("access_token" in tokenRequest)) {
            _context7.next = 37;
            break;
          }
          access_token = tokenRequest.access_token;
          apiUrl = "https://api.github.com";
          _context7.next = 13;
          return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 13:
          _context7.next = 15;
          return _context7.sent.json();
        case 15:
          userData = _context7.sent;
          console.log(userData);
          _context7.next = 19;
          return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
            headers: {
              Authorization: "token ".concat(access_token)
            }
          });
        case 19:
          _context7.next = 21;
          return _context7.sent.json();
        case 21:
          emailData = _context7.sent;
          emailObj = emailData.find(function (email) {
            return email.primary === true && email.verified === true;
          });
          if (emailObj) {
            _context7.next = 25;
            break;
          }
          return _context7.abrupt("return", res.redirect("/login"));
        case 25:
          _context7.next = 27;
          return _User["default"].findOne({
            email: emailObj.email
          });
        case 27:
          user = _context7.sent;
          if (user) {
            _context7.next = 32;
            break;
          }
          _context7.next = 31;
          return _User["default"].create({
            avataUrl: userData.avatar_url,
            name: userData.name,
            username: userData.login,
            email: emailObj.email,
            passwrod: "",
            socialOnly: true,
            location: userData.location
          });
        case 31:
          user = _context7.sent;
        case 32:
          req.session, loggedIn = true;
          req.session.user = user;
          return _context7.abrupt("return", res.redirect("/"));
        case 37:
          return _context7.abrupt("return", res.redirect("/login"));
        case 38:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function finishGithubLogin(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.finishGithubLogin = finishGithubLogin;
var getChangePawword = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!(req.session.user.socialOnly === true)) {
            _context8.next = 2;
            break;
          }
          return _context8.abrupt("return", res.redirect("/"));
        case 2:
          return _context8.abrupt("return", res.render("change-password", {
            pagetitle: "change password"
          }));
        case 3:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function getChangePawword(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getChangePawword = getChangePawword;
var postChangePawword = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _id, _req$body4, oldpassword, newpassword, newpassword1, user1, ok, user;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _id = req.session.user._id, _req$body4 = req.body, oldpassword = _req$body4.oldpassword, newpassword = _req$body4.newpassword, newpassword1 = _req$body4.newpassword1;
          _context9.next = 3;
          return _User["default"].findOne({
            _id: _id
          });
        case 3:
          user1 = _context9.sent;
          _context9.next = 6;
          return _bcrypt["default"].compare(oldpassword, user1.password);
        case 6:
          ok = _context9.sent;
          if (ok) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", res.status(400).render("change-password", {
            pagetitle: "change password",
            errorMessage: "the current password is incorrect"
          }));
        case 9:
          if (!(newpassword != newpassword1)) {
            _context9.next = 11;
            break;
          }
          return _context9.abrupt("return", res.status(400).render("change-password", {
            pagetitle: "change password",
            errorMessage: "password is not equl passwordconfirmation"
          }));
        case 11:
          _context9.next = 13;
          return _User["default"].findById(_id);
        case 13:
          user = _context9.sent;
          user.password = newpassword;
          _context9.next = 17;
          return user.save();
        case 17:
          req.session.user.password = user1.password;
          return _context9.abrupt("return", res.redirect("/"));
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function postChangePawword(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.postChangePawword = postChangePawword;