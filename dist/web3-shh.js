"use strict";var _typeof = typeof Symbol === "function" && typeof (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== (typeof Symbol === "function" ? Symbol.prototype : "@@prototype") ? "symbol" : typeof obj;};(function (f) {if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {module.exports = f();} else if (typeof define === "function" && define.amd) {define([], f);} else {var g;if (typeof window !== "undefined") {g = window;} else if (typeof global !== "undefined") {g = global;} else if (typeof self !== "undefined") {g = self;} else {g = this;}g.Web3Shh = f();}})(function () {var define, module, exports;return function e(t, n, r) {function s(o, u) {if (!n[o]) {if (!t[o]) {var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {var n = t[o][1][e];return s(n ? n : e);}, l, l.exports, e, t, n, r);}return n[o].exports;}var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {s(r[o]);}return s;}({ 1: [function (require, module, exports) {

        }, {}], 2: [function (require, module, exports) {

            var process = module.exports = {};






            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
            }
            (function () {
                try {
                    if (typeof setTimeout === 'function') {
                        cachedSetTimeout = setTimeout;
                    } else {
                        cachedSetTimeout = defaultSetTimout;
                    }
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    if (typeof clearTimeout === 'function') {
                        cachedClearTimeout = clearTimeout;
                    } else {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            })();
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {

                    return setTimeout(fun, 0);
                }

                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {

                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {

                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {

                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {

                    return clearTimeout(marker);
                }

                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {

                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {

                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {


                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };


            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = '';
            process.versions = {};

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function (name) {return [];};

            process.binding = function (name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function () {return '/';};
            process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function () {return 0;};

        }, {}], 3: [function (require, module, exports) {





            (function () {





                var root = this;


                var previousUnderscore = root._;


                var ArrayProto = Array.prototype,ObjProto = Object.prototype,FuncProto = Function.prototype;


                var
                push = ArrayProto.push,
                slice = ArrayProto.slice,
                toString = ObjProto.toString,
                hasOwnProperty = ObjProto.hasOwnProperty;



                var
                nativeIsArray = Array.isArray,
                nativeKeys = Object.keys,
                nativeBind = FuncProto.bind,
                nativeCreate = Object.create;


                var Ctor = function Ctor() {};


                var _ = function _(obj) {
                    if (obj instanceof _) return obj;
                    if (!(this instanceof _)) return new _(obj);
                    this._wrapped = obj;
                };




                if (typeof exports !== 'undefined') {
                    if (typeof module !== 'undefined' && module.exports) {
                        exports = module.exports = _;
                    }
                    exports._ = _;
                } else {
                    root._ = _;
                }


                _.VERSION = '1.8.3';




                var optimizeCb = function optimizeCb(func, context, argCount) {
                    if (context === void 0) return func;
                    switch (argCount == null ? 3 : argCount) {
                        case 1:return function (value) {
                                return func.call(context, value);
                            };
                        case 2:return function (value, other) {
                                return func.call(context, value, other);
                            };
                        case 3:return function (value, index, collection) {
                                return func.call(context, value, index, collection);
                            };
                        case 4:return function (accumulator, value, index, collection) {
                                return func.call(context, accumulator, value, index, collection);
                            };}

                    return function () {
                        return func.apply(context, arguments);
                    };
                };




                var cb = function cb(value, context, argCount) {
                    if (value == null) return _.identity;
                    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
                    if (_.isObject(value)) return _.matcher(value);
                    return _.property(value);
                };
                _.iteratee = function (value, context) {
                    return cb(value, context, Infinity);
                };


                var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
                    return function (obj) {
                        var length = arguments.length;
                        if (length < 2 || obj == null) return obj;
                        for (var index = 1; index < length; index++) {
                            var source = arguments[index],
                            keys = keysFunc(source),
                            l = keys.length;
                            for (var i = 0; i < l; i++) {
                                var key = keys[i];
                                if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                            }
                        }
                        return obj;
                    };
                };


                var baseCreate = function baseCreate(prototype) {
                    if (!_.isObject(prototype)) return {};
                    if (nativeCreate) return nativeCreate(prototype);
                    Ctor.prototype = prototype;
                    var result = new Ctor();
                    Ctor.prototype = null;
                    return result;
                };

                var property = function property(key) {
                    return function (obj) {
                        return obj == null ? void 0 : obj[key];
                    };
                };





                var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
                var getLength = property('length');
                var isArrayLike = function isArrayLike(collection) {
                    var length = getLength(collection);
                    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
                };







                _.each = _.forEach = function (obj, iteratee, context) {
                    iteratee = optimizeCb(iteratee, context);
                    var i, length;
                    if (isArrayLike(obj)) {
                        for (i = 0, length = obj.length; i < length; i++) {
                            iteratee(obj[i], i, obj);
                        }
                    } else {
                        var keys = _.keys(obj);
                        for (i = 0, length = keys.length; i < length; i++) {
                            iteratee(obj[keys[i]], keys[i], obj);
                        }
                    }
                    return obj;
                };


                _.map = _.collect = function (obj, iteratee, context) {
                    iteratee = cb(iteratee, context);
                    var keys = !isArrayLike(obj) && _.keys(obj),
                    length = (keys || obj).length,
                    results = Array(length);
                    for (var index = 0; index < length; index++) {
                        var currentKey = keys ? keys[index] : index;
                        results[index] = iteratee(obj[currentKey], currentKey, obj);
                    }
                    return results;
                };


                function createReduce(dir) {


                    function iterator(obj, iteratee, memo, keys, index, length) {
                        for (; index >= 0 && index < length; index += dir) {
                            var currentKey = keys ? keys[index] : index;
                            memo = iteratee(memo, obj[currentKey], currentKey, obj);
                        }
                        return memo;
                    }

                    return function (obj, iteratee, memo, context) {
                        iteratee = optimizeCb(iteratee, context, 4);
                        var keys = !isArrayLike(obj) && _.keys(obj),
                        length = (keys || obj).length,
                        index = dir > 0 ? 0 : length - 1;

                        if (arguments.length < 3) {
                            memo = obj[keys ? keys[index] : index];
                            index += dir;
                        }
                        return iterator(obj, iteratee, memo, keys, index, length);
                    };
                }



                _.reduce = _.foldl = _.inject = createReduce(1);


                _.reduceRight = _.foldr = createReduce(-1);


                _.find = _.detect = function (obj, predicate, context) {
                    var key;
                    if (isArrayLike(obj)) {
                        key = _.findIndex(obj, predicate, context);
                    } else {
                        key = _.findKey(obj, predicate, context);
                    }
                    if (key !== void 0 && key !== -1) return obj[key];
                };



                _.filter = _.select = function (obj, predicate, context) {
                    var results = [];
                    predicate = cb(predicate, context);
                    _.each(obj, function (value, index, list) {
                        if (predicate(value, index, list)) results.push(value);
                    });
                    return results;
                };


                _.reject = function (obj, predicate, context) {
                    return _.filter(obj, _.negate(cb(predicate)), context);
                };



                _.every = _.all = function (obj, predicate, context) {
                    predicate = cb(predicate, context);
                    var keys = !isArrayLike(obj) && _.keys(obj),
                    length = (keys || obj).length;
                    for (var index = 0; index < length; index++) {
                        var currentKey = keys ? keys[index] : index;
                        if (!predicate(obj[currentKey], currentKey, obj)) return false;
                    }
                    return true;
                };



                _.some = _.any = function (obj, predicate, context) {
                    predicate = cb(predicate, context);
                    var keys = !isArrayLike(obj) && _.keys(obj),
                    length = (keys || obj).length;
                    for (var index = 0; index < length; index++) {
                        var currentKey = keys ? keys[index] : index;
                        if (predicate(obj[currentKey], currentKey, obj)) return true;
                    }
                    return false;
                };



                _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
                    if (!isArrayLike(obj)) obj = _.values(obj);
                    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
                    return _.indexOf(obj, item, fromIndex) >= 0;
                };


                _.invoke = function (obj, method) {
                    var args = slice.call(arguments, 2);
                    var isFunc = _.isFunction(method);
                    return _.map(obj, function (value) {
                        var func = isFunc ? method : value[method];
                        return func == null ? func : func.apply(value, args);
                    });
                };


                _.pluck = function (obj, key) {
                    return _.map(obj, _.property(key));
                };



                _.where = function (obj, attrs) {
                    return _.filter(obj, _.matcher(attrs));
                };



                _.findWhere = function (obj, attrs) {
                    return _.find(obj, _.matcher(attrs));
                };


                _.max = function (obj, iteratee, context) {
                    var result = -Infinity,lastComputed = -Infinity,
                    value,computed;
                    if (iteratee == null && obj != null) {
                        obj = isArrayLike(obj) ? obj : _.values(obj);
                        for (var i = 0, length = obj.length; i < length; i++) {
                            value = obj[i];
                            if (value > result) {
                                result = value;
                            }
                        }
                    } else {
                        iteratee = cb(iteratee, context);
                        _.each(obj, function (value, index, list) {
                            computed = iteratee(value, index, list);
                            if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                                result = value;
                                lastComputed = computed;
                            }
                        });
                    }
                    return result;
                };


                _.min = function (obj, iteratee, context) {
                    var result = Infinity,lastComputed = Infinity,
                    value,computed;
                    if (iteratee == null && obj != null) {
                        obj = isArrayLike(obj) ? obj : _.values(obj);
                        for (var i = 0, length = obj.length; i < length; i++) {
                            value = obj[i];
                            if (value < result) {
                                result = value;
                            }
                        }
                    } else {
                        iteratee = cb(iteratee, context);
                        _.each(obj, function (value, index, list) {
                            computed = iteratee(value, index, list);
                            if (computed < lastComputed || computed === Infinity && result === Infinity) {
                                result = value;
                                lastComputed = computed;
                            }
                        });
                    }
                    return result;
                };



                _.shuffle = function (obj) {
                    var set = isArrayLike(obj) ? obj : _.values(obj);
                    var length = set.length;
                    var shuffled = Array(length);
                    for (var index = 0, rand; index < length; index++) {
                        rand = _.random(0, index);
                        if (rand !== index) shuffled[index] = shuffled[rand];
                        shuffled[rand] = set[index];
                    }
                    return shuffled;
                };




                _.sample = function (obj, n, guard) {
                    if (n == null || guard) {
                        if (!isArrayLike(obj)) obj = _.values(obj);
                        return obj[_.random(obj.length - 1)];
                    }
                    return _.shuffle(obj).slice(0, Math.max(0, n));
                };


                _.sortBy = function (obj, iteratee, context) {
                    iteratee = cb(iteratee, context);
                    return _.pluck(_.map(obj, function (value, index, list) {
                        return {
                            value: value,
                            index: index,
                            criteria: iteratee(value, index, list) };

                    }).sort(function (left, right) {
                        var a = left.criteria;
                        var b = right.criteria;
                        if (a !== b) {
                            if (a > b || a === void 0) return 1;
                            if (a < b || b === void 0) return -1;
                        }
                        return left.index - right.index;
                    }), 'value');
                };


                var group = function group(behavior) {
                    return function (obj, iteratee, context) {
                        var result = {};
                        iteratee = cb(iteratee, context);
                        _.each(obj, function (value, index) {
                            var key = iteratee(value, index, obj);
                            behavior(result, value, key);
                        });
                        return result;
                    };
                };



                _.groupBy = group(function (result, value, key) {
                    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
                });



                _.indexBy = group(function (result, value, key) {
                    result[key] = value;
                });




                _.countBy = group(function (result, value, key) {
                    if (_.has(result, key)) result[key]++;else result[key] = 1;
                });


                _.toArray = function (obj) {
                    if (!obj) return [];
                    if (_.isArray(obj)) return slice.call(obj);
                    if (isArrayLike(obj)) return _.map(obj, _.identity);
                    return _.values(obj);
                };


                _.size = function (obj) {
                    if (obj == null) return 0;
                    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
                };



                _.partition = function (obj, predicate, context) {
                    predicate = cb(predicate, context);
                    var pass = [],fail = [];
                    _.each(obj, function (value, key, obj) {
                        (predicate(value, key, obj) ? pass : fail).push(value);
                    });
                    return [pass, fail];
                };







                _.first = _.head = _.take = function (array, n, guard) {
                    if (array == null) return void 0;
                    if (n == null || guard) return array[0];
                    return _.initial(array, array.length - n);
                };




                _.initial = function (array, n, guard) {
                    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
                };



                _.last = function (array, n, guard) {
                    if (array == null) return void 0;
                    if (n == null || guard) return array[array.length - 1];
                    return _.rest(array, Math.max(0, array.length - n));
                };




                _.rest = _.tail = _.drop = function (array, n, guard) {
                    return slice.call(array, n == null || guard ? 1 : n);
                };


                _.compact = function (array) {
                    return _.filter(array, _.identity);
                };


                var flatten = function flatten(input, shallow, strict, startIndex) {
                    var output = [],idx = 0;
                    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
                        var value = input[i];
                        if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {

                            if (!shallow) value = flatten(value, shallow, strict);
                            var j = 0,len = value.length;
                            output.length += len;
                            while (j < len) {
                                output[idx++] = value[j++];
                            }
                        } else if (!strict) {
                            output[idx++] = value;
                        }
                    }
                    return output;
                };


                _.flatten = function (array, shallow) {
                    return flatten(array, shallow, false);
                };


                _.without = function (array) {
                    return _.difference(array, slice.call(arguments, 1));
                };




                _.uniq = _.unique = function (array, isSorted, iteratee, context) {
                    if (!_.isBoolean(isSorted)) {
                        context = iteratee;
                        iteratee = isSorted;
                        isSorted = false;
                    }
                    if (iteratee != null) iteratee = cb(iteratee, context);
                    var result = [];
                    var seen = [];
                    for (var i = 0, length = getLength(array); i < length; i++) {
                        var value = array[i],
                        computed = iteratee ? iteratee(value, i, array) : value;
                        if (isSorted) {
                            if (!i || seen !== computed) result.push(value);
                            seen = computed;
                        } else if (iteratee) {
                            if (!_.contains(seen, computed)) {
                                seen.push(computed);
                                result.push(value);
                            }
                        } else if (!_.contains(result, value)) {
                            result.push(value);
                        }
                    }
                    return result;
                };



                _.union = function () {
                    return _.uniq(flatten(arguments, true, true));
                };



                _.intersection = function (array) {
                    var result = [];
                    var argsLength = arguments.length;
                    for (var i = 0, length = getLength(array); i < length; i++) {
                        var item = array[i];
                        if (_.contains(result, item)) continue;
                        for (var j = 1; j < argsLength; j++) {
                            if (!_.contains(arguments[j], item)) break;
                        }
                        if (j === argsLength) result.push(item);
                    }
                    return result;
                };



                _.difference = function (array) {
                    var rest = flatten(arguments, true, true, 1);
                    return _.filter(array, function (value) {
                        return !_.contains(rest, value);
                    });
                };



                _.zip = function () {
                    return _.unzip(arguments);
                };



                _.unzip = function (array) {
                    var length = array && _.max(array, getLength).length || 0;
                    var result = Array(length);

                    for (var index = 0; index < length; index++) {
                        result[index] = _.pluck(array, index);
                    }
                    return result;
                };




                _.object = function (list, values) {
                    var result = {};
                    for (var i = 0, length = getLength(list); i < length; i++) {
                        if (values) {
                            result[list[i]] = values[i];
                        } else {
                            result[list[i][0]] = list[i][1];
                        }
                    }
                    return result;
                };


                function createPredicateIndexFinder(dir) {
                    return function (array, predicate, context) {
                        predicate = cb(predicate, context);
                        var length = getLength(array);
                        var index = dir > 0 ? 0 : length - 1;
                        for (; index >= 0 && index < length; index += dir) {
                            if (predicate(array[index], index, array)) return index;
                        }
                        return -1;
                    };
                }


                _.findIndex = createPredicateIndexFinder(1);
                _.findLastIndex = createPredicateIndexFinder(-1);



                _.sortedIndex = function (array, obj, iteratee, context) {
                    iteratee = cb(iteratee, context, 1);
                    var value = iteratee(obj);
                    var low = 0,high = getLength(array);
                    while (low < high) {
                        var mid = Math.floor((low + high) / 2);
                        if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
                    }
                    return low;
                };


                function createIndexFinder(dir, predicateFind, sortedIndex) {
                    return function (array, item, idx) {
                        var i = 0,length = getLength(array);
                        if (typeof idx == 'number') {
                            if (dir > 0) {
                                i = idx >= 0 ? idx : Math.max(idx + length, i);
                            } else {
                                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                            }
                        } else if (sortedIndex && idx && length) {
                            idx = sortedIndex(array, item);
                            return array[idx] === item ? idx : -1;
                        }
                        if (item !== item) {
                            idx = predicateFind(slice.call(array, i, length), _.isNaN);
                            return idx >= 0 ? idx + i : -1;
                        }
                        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                            if (array[idx] === item) return idx;
                        }
                        return -1;
                    };
                }





                _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
                _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);




                _.range = function (start, stop, step) {
                    if (stop == null) {
                        stop = start || 0;
                        start = 0;
                    }
                    step = step || 1;

                    var length = Math.max(Math.ceil((stop - start) / step), 0);
                    var range = Array(length);

                    for (var idx = 0; idx < length; idx++, start += step) {
                        range[idx] = start;
                    }

                    return range;
                };






                var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
                    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
                    var self = baseCreate(sourceFunc.prototype);
                    var result = sourceFunc.apply(self, args);
                    if (_.isObject(result)) return result;
                    return self;
                };




                _.bind = function (func, context) {
                    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
                    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
                    var args = slice.call(arguments, 2);
                    var bound = function bound() {
                        return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
                    };
                    return bound;
                };




                _.partial = function (func) {
                    var boundArgs = slice.call(arguments, 1);
                    var bound = function bound() {
                        var position = 0,length = boundArgs.length;
                        var args = Array(length);
                        for (var i = 0; i < length; i++) {
                            args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
                        }
                        while (position < arguments.length) {args.push(arguments[position++]);}
                        return executeBound(func, bound, this, this, args);
                    };
                    return bound;
                };




                _.bindAll = function (obj) {
                    var i,length = arguments.length,key;
                    if (length <= 1) throw new Error('bindAll must be passed function names');
                    for (i = 1; i < length; i++) {
                        key = arguments[i];
                        obj[key] = _.bind(obj[key], obj);
                    }
                    return obj;
                };


                _.memoize = function (func, hasher) {
                    var memoize = function memoize(key) {
                        var cache = memoize.cache;
                        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
                        if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
                        return cache[address];
                    };
                    memoize.cache = {};
                    return memoize;
                };



                _.delay = function (func, wait) {
                    var args = slice.call(arguments, 2);
                    return setTimeout(function () {
                        return func.apply(null, args);
                    }, wait);
                };



                _.defer = _.partial(_.delay, _, 1);






                _.throttle = function (func, wait, options) {
                    var context, args, result;
                    var timeout = null;
                    var previous = 0;
                    if (!options) options = {};
                    var later = function later() {
                        previous = options.leading === false ? 0 : _.now();
                        timeout = null;
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    };
                    return function () {
                        var now = _.now();
                        if (!previous && options.leading === false) previous = now;
                        var remaining = wait - (now - previous);
                        context = this;
                        args = arguments;
                        if (remaining <= 0 || remaining > wait) {
                            if (timeout) {
                                clearTimeout(timeout);
                                timeout = null;
                            }
                            previous = now;
                            result = func.apply(context, args);
                            if (!timeout) context = args = null;
                        } else if (!timeout && options.trailing !== false) {
                            timeout = setTimeout(later, remaining);
                        }
                        return result;
                    };
                };





                _.debounce = function (func, wait, immediate) {
                    var timeout, args, context, timestamp, result;

                    var later = function later() {
                        var last = _.now() - timestamp;

                        if (last < wait && last >= 0) {
                            timeout = setTimeout(later, wait - last);
                        } else {
                            timeout = null;
                            if (!immediate) {
                                result = func.apply(context, args);
                                if (!timeout) context = args = null;
                            }
                        }
                    };

                    return function () {
                        context = this;
                        args = arguments;
                        timestamp = _.now();
                        var callNow = immediate && !timeout;
                        if (!timeout) timeout = setTimeout(later, wait);
                        if (callNow) {
                            result = func.apply(context, args);
                            context = args = null;
                        }

                        return result;
                    };
                };




                _.wrap = function (func, wrapper) {
                    return _.partial(wrapper, func);
                };


                _.negate = function (predicate) {
                    return function () {
                        return !predicate.apply(this, arguments);
                    };
                };



                _.compose = function () {
                    var args = arguments;
                    var start = args.length - 1;
                    return function () {
                        var i = start;
                        var result = args[start].apply(this, arguments);
                        while (i--) {result = args[i].call(this, result);}
                        return result;
                    };
                };


                _.after = function (times, func) {
                    return function () {
                        if (--times < 1) {
                            return func.apply(this, arguments);
                        }
                    };
                };


                _.before = function (times, func) {
                    var memo;
                    return function () {
                        if (--times > 0) {
                            memo = func.apply(this, arguments);
                        }
                        if (times <= 1) func = null;
                        return memo;
                    };
                };



                _.once = _.partial(_.before, 2);





                var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
                var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

                function collectNonEnumProps(obj, keys) {
                    var nonEnumIdx = nonEnumerableProps.length;
                    var constructor = obj.constructor;
                    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;


                    var prop = 'constructor';
                    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

                    while (nonEnumIdx--) {
                        prop = nonEnumerableProps[nonEnumIdx];
                        if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                            keys.push(prop);
                        }
                    }
                }



                _.keys = function (obj) {
                    if (!_.isObject(obj)) return [];
                    if (nativeKeys) return nativeKeys(obj);
                    var keys = [];
                    for (var key in obj) {if (_.has(obj, key)) keys.push(key);}

                    if (hasEnumBug) collectNonEnumProps(obj, keys);
                    return keys;
                };


                _.allKeys = function (obj) {
                    if (!_.isObject(obj)) return [];
                    var keys = [];
                    for (var key in obj) {keys.push(key);}

                    if (hasEnumBug) collectNonEnumProps(obj, keys);
                    return keys;
                };


                _.values = function (obj) {
                    var keys = _.keys(obj);
                    var length = keys.length;
                    var values = Array(length);
                    for (var i = 0; i < length; i++) {
                        values[i] = obj[keys[i]];
                    }
                    return values;
                };



                _.mapObject = function (obj, iteratee, context) {
                    iteratee = cb(iteratee, context);
                    var keys = _.keys(obj),
                    length = keys.length,
                    results = {},
                    currentKey;
                    for (var index = 0; index < length; index++) {
                        currentKey = keys[index];
                        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
                    }
                    return results;
                };


                _.pairs = function (obj) {
                    var keys = _.keys(obj);
                    var length = keys.length;
                    var pairs = Array(length);
                    for (var i = 0; i < length; i++) {
                        pairs[i] = [keys[i], obj[keys[i]]];
                    }
                    return pairs;
                };


                _.invert = function (obj) {
                    var result = {};
                    var keys = _.keys(obj);
                    for (var i = 0, length = keys.length; i < length; i++) {
                        result[obj[keys[i]]] = keys[i];
                    }
                    return result;
                };



                _.functions = _.methods = function (obj) {
                    var names = [];
                    for (var key in obj) {
                        if (_.isFunction(obj[key])) names.push(key);
                    }
                    return names.sort();
                };


                _.extend = createAssigner(_.allKeys);



                _.extendOwn = _.assign = createAssigner(_.keys);


                _.findKey = function (obj, predicate, context) {
                    predicate = cb(predicate, context);
                    var keys = _.keys(obj),key;
                    for (var i = 0, length = keys.length; i < length; i++) {
                        key = keys[i];
                        if (predicate(obj[key], key, obj)) return key;
                    }
                };


                _.pick = function (object, oiteratee, context) {
                    var result = {},obj = object,iteratee,keys;
                    if (obj == null) return result;
                    if (_.isFunction(oiteratee)) {
                        keys = _.allKeys(obj);
                        iteratee = optimizeCb(oiteratee, context);
                    } else {
                        keys = flatten(arguments, false, false, 1);
                        iteratee = function iteratee(value, key, obj) {return key in obj;};
                        obj = Object(obj);
                    }
                    for (var i = 0, length = keys.length; i < length; i++) {
                        var key = keys[i];
                        var value = obj[key];
                        if (iteratee(value, key, obj)) result[key] = value;
                    }
                    return result;
                };


                _.omit = function (obj, iteratee, context) {
                    if (_.isFunction(iteratee)) {
                        iteratee = _.negate(iteratee);
                    } else {
                        var keys = _.map(flatten(arguments, false, false, 1), String);
                        iteratee = function iteratee(value, key) {
                            return !_.contains(keys, key);
                        };
                    }
                    return _.pick(obj, iteratee, context);
                };


                _.defaults = createAssigner(_.allKeys, true);




                _.create = function (prototype, props) {
                    var result = baseCreate(prototype);
                    if (props) _.extendOwn(result, props);
                    return result;
                };


                _.clone = function (obj) {
                    if (!_.isObject(obj)) return obj;
                    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
                };




                _.tap = function (obj, interceptor) {
                    interceptor(obj);
                    return obj;
                };


                _.isMatch = function (object, attrs) {
                    var keys = _.keys(attrs),length = keys.length;
                    if (object == null) return !length;
                    var obj = Object(object);
                    for (var i = 0; i < length; i++) {
                        var key = keys[i];
                        if (attrs[key] !== obj[key] || !(key in obj)) return false;
                    }
                    return true;
                };



                var eq = function eq(a, b, aStack, bStack) {


                    if (a === b) return a !== 0 || 1 / a === 1 / b;

                    if (a == null || b == null) return a === b;

                    if (a instanceof _) a = a._wrapped;
                    if (b instanceof _) b = b._wrapped;

                    var className = toString.call(a);
                    if (className !== toString.call(b)) return false;
                    switch (className) {

                        case '[object RegExp]':

                        case '[object String]':


                            return '' + a === '' + b;
                        case '[object Number]':


                            if (+a !== +a) return +b !== +b;

                            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                        case '[object Date]':
                        case '[object Boolean]':



                            return +a === +b;}


                    var areArrays = className === '[object Array]';
                    if (!areArrays) {
                        if ((typeof a === "undefined" ? "undefined" : _typeof(a)) != 'object' || (typeof b === "undefined" ? "undefined" : _typeof(b)) != 'object') return false;



                        var aCtor = a.constructor,bCtor = b.constructor;
                        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                        _.isFunction(bCtor) && bCtor instanceof bCtor) &&
                        'constructor' in a && 'constructor' in b) {
                            return false;
                        }
                    }





                    aStack = aStack || [];
                    bStack = bStack || [];
                    var length = aStack.length;
                    while (length--) {


                        if (aStack[length] === a) return bStack[length] === b;
                    }


                    aStack.push(a);
                    bStack.push(b);


                    if (areArrays) {

                        length = a.length;
                        if (length !== b.length) return false;

                        while (length--) {
                            if (!eq(a[length], b[length], aStack, bStack)) return false;
                        }
                    } else {

                        var keys = _.keys(a),key;
                        length = keys.length;

                        if (_.keys(b).length !== length) return false;
                        while (length--) {

                            key = keys[length];
                            if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
                        }
                    }

                    aStack.pop();
                    bStack.pop();
                    return true;
                };


                _.isEqual = function (a, b) {
                    return eq(a, b);
                };



                _.isEmpty = function (obj) {
                    if (obj == null) return true;
                    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
                    return _.keys(obj).length === 0;
                };


                _.isElement = function (obj) {
                    return !!(obj && obj.nodeType === 1);
                };



                _.isArray = nativeIsArray || function (obj) {
                    return toString.call(obj) === '[object Array]';
                };


                _.isObject = function (obj) {
                    var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
                    return type === 'function' || type === 'object' && !!obj;
                };


                _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
                    _['is' + name] = function (obj) {
                        return toString.call(obj) === '[object ' + name + ']';
                    };
                });



                if (!_.isArguments(arguments)) {
                    _.isArguments = function (obj) {
                        return _.has(obj, 'callee');
                    };
                }



                if (typeof /./ != 'function' && (typeof Int8Array === "undefined" ? "undefined" : _typeof(Int8Array)) != 'object') {
                    _.isFunction = function (obj) {
                        return typeof obj == 'function' || false;
                    };
                }


                _.isFinite = function (obj) {
                    return isFinite(obj) && !isNaN(parseFloat(obj));
                };


                _.isNaN = function (obj) {
                    return _.isNumber(obj) && obj !== +obj;
                };


                _.isBoolean = function (obj) {
                    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
                };


                _.isNull = function (obj) {
                    return obj === null;
                };


                _.isUndefined = function (obj) {
                    return obj === void 0;
                };



                _.has = function (obj, key) {
                    return obj != null && hasOwnProperty.call(obj, key);
                };






                _.noConflict = function () {
                    root._ = previousUnderscore;
                    return this;
                };


                _.identity = function (value) {
                    return value;
                };


                _.constant = function (value) {
                    return function () {
                        return value;
                    };
                };

                _.noop = function () {};

                _.property = property;


                _.propertyOf = function (obj) {
                    return obj == null ? function () {} : function (key) {
                        return obj[key];
                    };
                };



                _.matcher = _.matches = function (attrs) {
                    attrs = _.extendOwn({}, attrs);
                    return function (obj) {
                        return _.isMatch(obj, attrs);
                    };
                };


                _.times = function (n, iteratee, context) {
                    var accum = Array(Math.max(0, n));
                    iteratee = optimizeCb(iteratee, context, 1);
                    for (var i = 0; i < n; i++) {accum[i] = iteratee(i);}
                    return accum;
                };


                _.random = function (min, max) {
                    if (max == null) {
                        max = min;
                        min = 0;
                    }
                    return min + Math.floor(Math.random() * (max - min + 1));
                };


                _.now = Date.now || function () {
                    return new Date().getTime();
                };


                var escapeMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;',
                    '`': '&#x60;' };

                var unescapeMap = _.invert(escapeMap);


                var createEscaper = function createEscaper(map) {
                    var escaper = function escaper(match) {
                        return map[match];
                    };

                    var source = '(?:' + _.keys(map).join('|') + ')';
                    var testRegexp = RegExp(source);
                    var replaceRegexp = RegExp(source, 'g');
                    return function (string) {
                        string = string == null ? '' : '' + string;
                        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
                    };
                };
                _.escape = createEscaper(escapeMap);
                _.unescape = createEscaper(unescapeMap);



                _.result = function (object, property, fallback) {
                    var value = object == null ? void 0 : object[property];
                    if (value === void 0) {
                        value = fallback;
                    }
                    return _.isFunction(value) ? value.call(object) : value;
                };



                var idCounter = 0;
                _.uniqueId = function (prefix) {
                    var id = ++idCounter + '';
                    return prefix ? prefix + id : id;
                };



                _.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g };





                var noMatch = /(.)^/;



                var escapes = {
                    "'": "'",
                    '\\': '\\',
                    '\r': 'r',
                    '\n': 'n',
                    "\u2028": 'u2028',
                    "\u2029": 'u2029' };


                var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

                var escapeChar = function escapeChar(match) {
                    return '\\' + escapes[match];
                };





                _.template = function (text, settings, oldSettings) {
                    if (!settings && oldSettings) settings = oldSettings;
                    settings = _.defaults({}, settings, _.templateSettings);


                    var matcher = RegExp([
                    (settings.escape || noMatch).source,
                    (settings.interpolate || noMatch).source,
                    (settings.evaluate || noMatch).source].
                    join('|') + '|$', 'g');


                    var index = 0;
                    var source = "__p+='";
                    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
                        source += text.slice(index, offset).replace(escaper, escapeChar);
                        index = offset + match.length;

                        if (escape) {
                            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                        } else if (interpolate) {
                            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                        } else if (evaluate) {
                            source += "';\n" + evaluate + "\n__p+='";
                        }


                        return match;
                    });
                    source += "';\n";


                    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

                    source = "var __t,__p='',__j=Array.prototype.join," +
                    "print=function(){__p+=__j.call(arguments,'');};\n" +
                    source + 'return __p;\n';

                    try {
                        var render = new Function(settings.variable || 'obj', '_', source);
                    } catch (e) {
                        e.source = source;
                        throw e;
                    }

                    var template = function template(data) {
                        return render.call(this, data, _);
                    };


                    var argument = settings.variable || 'obj';
                    template.source = 'function(' + argument + '){\n' + source + '}';

                    return template;
                };


                _.chain = function (obj) {
                    var instance = _(obj);
                    instance._chain = true;
                    return instance;
                };








                var result = function result(instance, obj) {
                    return instance._chain ? _(obj).chain() : obj;
                };


                _.mixin = function (obj) {
                    _.each(_.functions(obj), function (name) {
                        var func = _[name] = obj[name];
                        _.prototype[name] = function () {
                            var args = [this._wrapped];
                            push.apply(args, arguments);
                            return result(this, func.apply(_, args));
                        };
                    });
                };


                _.mixin(_);


                _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
                    var method = ArrayProto[name];
                    _.prototype[name] = function () {
                        var obj = this._wrapped;
                        method.apply(obj, arguments);
                        if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
                        return result(this, obj);
                    };
                });


                _.each(['concat', 'join', 'slice'], function (name) {
                    var method = ArrayProto[name];
                    _.prototype[name] = function () {
                        return result(this, method.apply(this._wrapped, arguments));
                    };
                });


                _.prototype.value = function () {
                    return this._wrapped;
                };



                _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

                _.prototype.toString = function () {
                    return '' + this._wrapped;
                };








                if (typeof define === 'function' && define.amd) {
                    define('underscore', [], function () {
                        return _;
                    });
                }
            }).call(this);

        }, {}], 4: [function (require, module, exports) {























            "use strict";
































            module.exports = {




                defaultBlock: 'latest',
                defaultAccount: null };



        }, {}], 5: [function (require, module, exports) {























            "use strict";

            module.exports = {
                ErrorResponse: function ErrorResponse(result) {
                    var message = !!result && !!result.error && !!result.error.message ? result.error.message : JSON.stringify(result);
                    return new Error('Returned error: ' + message);
                },
                InvalidNumberOfParams: function InvalidNumberOfParams(got, expected, method) {
                    return new Error('Invalid number of parameters for "' + method + '". Got ' + got + ' expected ' + expected + '!');
                },
                InvalidConnection: function InvalidConnection(host) {
                    return new Error('CONNECTION ERROR: Couldn\'t connect to node ' + host + '.');
                },
                InvalidProvider: function InvalidProvider() {
                    return new Error('Provider not set or invalid');
                },
                InvalidResponse: function InvalidResponse(result) {
                    var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
                    return new Error(message);
                },
                ConnectionTimeout: function ConnectionTimeout(ms) {
                    return new Error('CONNECTION TIMEOUT: timeout of ' + ms + ' ms achived');
                } };


        }, {}], 6: [function (require, module, exports) {























            "use strict";


            var _ = require("underscore");
            var utils = require("web3-utils");
            var Iban = require("web3-eth-iban");

            var config = require('./config');








            var outputBigNumberFormatter = function outputBigNumberFormatter(number) {
                return utils.toBN(number).toString(10);
            };

            var isPredefinedBlockNumber = function isPredefinedBlockNumber(blockNumber) {
                return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
            };

            var inputDefaultBlockNumberFormatter = function inputDefaultBlockNumberFormatter(blockNumber) {
                if (blockNumber === undefined || blockNumber === null) {
                    return config.defaultBlock;
                }
                if (blockNumber === 'genesis' || blockNumber === 'earliest') {
                    return '0x0';
                }
                return inputBlockNumberFormatter(blockNumber);
            };

            var inputBlockNumberFormatter = function inputBlockNumberFormatter(blockNumber) {
                if (blockNumber === undefined) {
                    return undefined;
                } else if (isPredefinedBlockNumber(blockNumber)) {
                    return blockNumber;
                }
                return utils.isHex(blockNumber) ? _.isString(blockNumber) ? blockNumber.toLowerCase() : blockNumber : utils.numberToHex(blockNumber);
            };








            var inputCallFormatter = function inputCallFormatter(options) {

                var from = options.from || config.defaultAccount;

                if (from) {
                    options.from = inputAddressFormatter(from);
                }

                if (options.to) {
                    options.to = inputAddressFormatter(options.to);
                }

                ['gasPrice', 'gas', 'gasLimit', 'value', 'nonce'].filter(function (key) {
                    return options[key] !== undefined;
                }).forEach(function (key) {
                    options[key] = utils.numberToHex(options[key]);
                });

                return options;
            };








            var inputTransactionFormatter = function inputTransactionFormatter(options) {


                if (!_.isNumber(options.from) && !_.isObject(options.from)) {
                    options.from = options.from || config.defaultAccount;

                    if (!options.from && !_.isNumber(options.from)) {
                        throw new Error('The send transactions "from" field must be defined!');
                    }

                    options.from = inputAddressFormatter(options.from);
                }

                if (options.to) {
                    options.to = inputAddressFormatter(options.to);
                }


                if (options.gas || options.gasLimit) {
                    options.gas = options.gas || options.gasLimit;
                }

                ['gasPrice', 'gas', 'value', 'nonce'].filter(function (key) {
                    return options[key] !== undefined;
                }).forEach(function (key) {
                    options[key] = utils.numberToHex(options[key]);
                });

                return options;
            };








            var inputSignFormatter = function inputSignFormatter(data) {
                return utils.isHex(data) ? data : utils.utf8ToHex(data);
            };








            var outputTransactionFormatter = function outputTransactionFormatter(tx) {
                if (tx.blockNumber !== null)
                tx.blockNumber = utils.hexToNumber(tx.blockNumber);
                if (tx.transactionIndex !== null)
                tx.transactionIndex = utils.hexToNumber(tx.transactionIndex);
                tx.nonce = utils.hexToNumber(tx.nonce);
                tx.gas = utils.hexToNumber(tx.gas);
                tx.gasPrice = outputBigNumberFormatter(tx.gasPrice);
                tx.value = outputBigNumberFormatter(tx.value);

                if (tx.to) {
                    tx.to = utils.toChecksumAddress(tx.to);
                }
                if (tx.from) {
                    tx.from = utils.toChecksumAddress(tx.from);
                }

                return tx;
            };








            var outputTransactionReceiptFormatter = function outputTransactionReceiptFormatter(receipt) {
                if ((typeof receipt === "undefined" ? "undefined" : _typeof(receipt)) !== 'object') {
                    throw new Error('Received receipt is invalid: ' + receipt);
                }

                if (receipt.blockNumber !== null)
                receipt.blockNumber = utils.hexToNumber(receipt.blockNumber);
                if (receipt.transactionIndex !== null)
                receipt.transactionIndex = utils.hexToNumber(receipt.transactionIndex);
                receipt.cumulativeGasUsed = utils.hexToNumber(receipt.cumulativeGasUsed);
                receipt.gasUsed = utils.hexToNumber(receipt.gasUsed);

                if (_.isArray(receipt.logs)) {
                    receipt.logs = receipt.logs.map(outputLogFormatter);
                }

                if (receipt.contractAddress) {
                    receipt.contractAddress = utils.toChecksumAddress(receipt.contractAddress);
                }

                return receipt;
            };








            var outputBlockFormatter = function outputBlockFormatter(block) {


                block.gasLimit = utils.hexToNumber(block.gasLimit);
                block.gasUsed = utils.hexToNumber(block.gasUsed);
                block.size = utils.hexToNumber(block.size);
                block.timestamp = utils.hexToNumber(block.timestamp);
                if (block.number !== null)
                block.number = utils.hexToNumber(block.number);

                if (block.difficulty)
                block.difficulty = outputBigNumberFormatter(block.difficulty);
                if (block.totalDifficulty)
                block.totalDifficulty = outputBigNumberFormatter(block.totalDifficulty);

                if (_.isArray(block.transactions)) {
                    block.transactions.forEach(function (item) {
                        if (!_.isString(item))
                        return outputTransactionFormatter(item);
                    });
                }

                if (block.miner)
                block.miner = utils.toChecksumAddress(block.miner);

                return block;
            };








            var inputLogFormatter = function inputLogFormatter(options) {
                var toTopic = function toTopic(value) {

                    if (value === null || typeof value === 'undefined')
                    return null;

                    value = String(value);

                    if (value.indexOf('0x') === 0)
                    return value;else

                    return utils.fromUtf8(value);
                };


                options.topics = options.topics || [];
                options.topics = options.topics.map(function (topic) {
                    return _.isArray(topic) ? topic.map(toTopic) : toTopic(topic);
                });

                toTopic = null;

                if (options.address)
                options.address = inputAddressFormatter(options.address);

                return options;
            };








            var outputLogFormatter = function outputLogFormatter(log) {


                if (typeof log.blockHash === 'string' &&
                typeof log.transactionHash === 'string' &&
                typeof log.logIndex === 'string') {
                    var shaId = utils.sha3(log.blockHash.replace('0x', '') + log.transactionHash.replace('0x', '') + log.logIndex.replace('0x', ''));
                    log.id = 'log_' + shaId.replace('0x', '').substr(0, 8);
                } else if (!log.id) {
                    log.id = null;
                }

                if (log.blockNumber !== null)
                log.blockNumber = utils.hexToNumber(log.blockNumber);
                if (log.transactionIndex !== null)
                log.transactionIndex = utils.hexToNumber(log.transactionIndex);
                if (log.logIndex !== null)
                log.logIndex = utils.hexToNumber(log.logIndex);

                if (log.address)
                log.address = utils.toChecksumAddress(log.address);

                return log;
            };








            var inputPostFormatter = function inputPostFormatter(post) {



                if (post.ttl)
                post.ttl = utils.numberToHex(post.ttl);
                if (post.workToProve)
                post.workToProve = utils.numberToHex(post.workToProve);
                if (post.priority)
                post.priority = utils.numberToHex(post.priority);


                if (!_.isArray(post.topics)) {
                    post.topics = post.topics ? [post.topics] : [];
                }


                post.topics = post.topics.map(function (topic) {

                    return topic.indexOf('0x') === 0 ? topic : utils.fromUtf8(topic);
                });

                return post;
            };








            var outputPostFormatter = function outputPostFormatter(post) {

                post.expiry = utils.hexToNumber(post.expiry);
                post.sent = utils.hexToNumber(post.sent);
                post.ttl = utils.hexToNumber(post.ttl);
                post.workProved = utils.hexToNumber(post.workProved);








                if (!post.topics) {
                    post.topics = [];
                }
                post.topics = post.topics.map(function (topic) {
                    return utils.toUtf8(topic);
                });

                return post;
            };

            var inputAddressFormatter = function inputAddressFormatter(address) {
                var iban = new Iban(address);
                if (iban.isValid() && iban.isDirect()) {
                    return iban.toAddress().toLowerCase();
                } else if (utils.isAddress(address)) {
                    return '0x' + address.toLowerCase().replace('0x', '');
                }
                throw new Error('Provided address "' + address + '" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can\'t be converted.');
            };


            var outputSyncingFormatter = function outputSyncingFormatter(result) {

                result.startingBlock = utils.hexToNumber(result.startingBlock);
                result.currentBlock = utils.hexToNumber(result.currentBlock);
                result.highestBlock = utils.hexToNumber(result.highestBlock);
                if (result.knownStates) {
                    result.knownStates = utils.hexToNumber(result.knownStates);
                    result.pulledStates = utils.hexToNumber(result.pulledStates);
                }

                return result;
            };

            module.exports = {
                inputDefaultBlockNumberFormatter: inputDefaultBlockNumberFormatter,
                inputBlockNumberFormatter: inputBlockNumberFormatter,
                inputCallFormatter: inputCallFormatter,
                inputTransactionFormatter: inputTransactionFormatter,
                inputAddressFormatter: inputAddressFormatter,
                inputPostFormatter: inputPostFormatter,
                inputLogFormatter: inputLogFormatter,
                inputSignFormatter: inputSignFormatter,
                outputBigNumberFormatter: outputBigNumberFormatter,
                outputTransactionFormatter: outputTransactionFormatter,
                outputTransactionReceiptFormatter: outputTransactionReceiptFormatter,
                outputBlockFormatter: outputBlockFormatter,
                outputLogFormatter: outputLogFormatter,
                outputPostFormatter: outputPostFormatter,
                outputSyncingFormatter: outputSyncingFormatter };



        }, { "./config": 4, "underscore": 3, "web3-eth-iban": 25, "web3-utils": 48 }], 7: [function (require, module, exports) {






















            "use strict";

            var errors = require('./errors');
            var formatters = require('./formatters');
            var config = require('./config');

            module.exports = {
                errors: errors,
                formatters: formatters,
                config: config };



        }, { "./config": 4, "./errors": 5, "./formatters": 6 }], 8: [function (require, module, exports) {
            arguments[4][3][0].apply(exports, arguments);
        }, { "dup": 3 }], 9: [function (require, module, exports) {























            "use strict";

            var _ = require("underscore");
            var errors = require("web3-core-helpers").errors;
            var formatters = require("web3-core-helpers").formatters;
            var utils = require("web3-utils");
            var promiEvent = require("web3-core-promievent");
            var Subscriptions = require("web3-core-subscriptions").subscriptions;

            var TIMEOUTBLOCK = 50;
            var CONFIRMATIONBLOCKS = 24;

            var Method = function Method(options) {

                if (!options.call || !options.name) {
                    throw new Error('When creating a method you need to provide at least the "name" and "call" property.');
                }

                this.name = options.name;
                this.call = options.call;
                this.params = options.params || 0;
                this.inputFormatter = options.inputFormatter;
                this.outputFormatter = options.outputFormatter;
                this.transformPayload = options.transformPayload;

                this.requestManager = options.requestManager;

                this.accounts = options.accounts;

            };

            Method.prototype.setRequestManager = function (requestManager, accounts) {
                var _this = this;
                this.requestManager = requestManager;


                if (accounts) {
                    this.accounts = accounts;
                }


                var _ethereumCall = [
                new Method({
                    name: 'getTransactionReceipt',
                    call: 'eth_getTransactionReceipt',
                    params: 1,
                    inputFormatter: [null],
                    outputFormatter: formatters.outputTransactionReceiptFormatter }),

                new Method({
                    name: 'getCode',
                    call: 'eth_getCode',
                    params: 2,
                    inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter] }),

                new Method({
                    name: 'getGasPrice',
                    call: 'eth_gasPrice',
                    params: 0 }),

                new Subscriptions({
                    name: 'subscribe',
                    type: 'eth',
                    subscriptions: {
                        'newBlockHeaders': {
                            subscriptionName: 'newHeads',
                            params: 0,
                            outputFormatter: formatters.outputBlockFormatter } } })];





                this._ethereumCall = {};
                _.each(_ethereumCall, function (method) {
                    method.attachToObject(_this._ethereumCall);
                    method.requestManager = _this.requestManager;
                });
            };








            Method.prototype.getCall = function (args) {
                return _.isFunction(this.call) ? this.call(args) : this.call;
            };








            Method.prototype.extractCallback = function (args) {
                if (_.isFunction(args[args.length - 1])) {
                    return args.pop();
                }
            };








            Method.prototype.validateArgs = function (args) {
                if (args.length !== this.params) {
                    throw errors.InvalidNumberOfParams(args.length, this.params, this.name);
                }
            };








            Method.prototype.formatInput = function (args) {
                if (!this.inputFormatter) {
                    return args;
                }

                return this.inputFormatter.map(function (formatter, index) {
                    return formatter ? formatter(args[index]) : args[index];
                });
            };








            Method.prototype.formatOutput = function (result) {
                var _this = this;

                if (_.isArray(result)) {
                    return result.map(function (res) {
                        return _this.outputFormatter && res ? _this.outputFormatter(res) : res;
                    });
                } else {
                    return this.outputFormatter && result ? this.outputFormatter(result) : result;
                }
            };








            Method.prototype.toPayload = function (args) {
                var call = this.getCall(args);
                var callback = this.extractCallback(args);
                var params = this.formatInput(args);
                this.validateArgs(params);

                var payload = {
                    method: call,
                    params: params,
                    callback: callback };


                if (this.transformPayload) {
                    payload = this.transformPayload(payload);
                }

                return payload;
            };

            Method.prototype.attachToObject = function (obj) {
                var func = this.buildCall();
                func.call = this.call;
                var name = this.name.split('.');
                if (name.length > 1) {
                    obj[name[0]] = obj[name[0]] || {};
                    obj[name[0]][name[1]] = func;
                } else {
                    obj[name[0]] = func;
                }
            };

            Method.prototype._confirmTransaction = function (defer, result, payload, extraFormatters) {
                var method = this,
                promiseResolved = false,
                canUnsubscribe = true,
                timeoutCount = 0,
                confirmationCount = 0,
                intervalId = null,
                gasProvided = _.isObject(payload.params[0]) && payload.params[0].gas ? payload.params[0].gas : null,
                isContractDeployment = _.isObject(payload.params[0]) &&
                payload.params[0].data &&
                payload.params[0].from &&
                !payload.params[0].to;



                var checkConfirmation = function checkConfirmation(err, blockHeader, sub, existingReceipt) {
                    if (!err) {

                        if (!sub) {
                            sub = {
                                unsubscribe: function unsubscribe() {
                                    clearInterval(intervalId);
                                } };

                        }

                        return (existingReceipt ? promiEvent.resolve(existingReceipt) : method._ethereumCall.getTransactionReceipt(result)).

                        catch(function (err) {
                            sub.unsubscribe();
                            promiseResolved = true;
                            utils._fireError({ message: 'Failed to check for transaction receipt:', data: err }, defer.eventEmitter, defer.reject);
                        }).

                        then(function (receipt) {

                            if (!receipt) {
                                throw new Error('Receipt is "null"');
                            }


                            if (extraFormatters && extraFormatters.receiptFormatter) {
                                receipt = extraFormatters.receiptFormatter(receipt);
                            }


                            if (defer.eventEmitter.listeners('confirmation').length > 0) {

                                defer.eventEmitter.emit('confirmation', confirmationCount, receipt);

                                canUnsubscribe = false;
                                confirmationCount++;

                                if (confirmationCount === CONFIRMATIONBLOCKS + 1) {
                                    sub.unsubscribe();
                                    defer.eventEmitter.removeAllListeners();
                                }
                            }

                            return receipt;
                        }).

                        then(function (receipt) {

                            if (isContractDeployment && !promiseResolved) {

                                if (!receipt.contractAddress) {

                                    if (canUnsubscribe) {
                                        sub.unsubscribe();
                                        promiseResolved = true;
                                    }

                                    return utils._fireError(new Error('The transaction receipt didn\'t contain a contract address.'), defer.eventEmitter, defer.reject);
                                }

                                method._ethereumCall.getCode(receipt.contractAddress, function (e, code) {

                                    if (!code) {
                                        return;
                                    }


                                    if (code.length > 2) {
                                        defer.eventEmitter.emit('receipt', receipt);


                                        if (extraFormatters && extraFormatters.contractDeployFormatter) {
                                            defer.resolve(extraFormatters.contractDeployFormatter(receipt));
                                        } else {
                                            defer.resolve(receipt);
                                        }


                                        if (canUnsubscribe) {
                                            defer.eventEmitter.removeAllListeners();
                                        }

                                    } else {
                                        utils._fireError(new Error('The contract code couldn\'t be stored, please check your gas limit.'), defer.eventEmitter, defer.reject);
                                    }

                                    if (canUnsubscribe) {
                                        sub.unsubscribe();
                                    }
                                    promiseResolved = true;
                                });
                            }

                            return receipt;
                        }).

                        then(function (receipt) {

                            if (!isContractDeployment && !promiseResolved) {

                                if (!receipt.outOfGas && (
                                !gasProvided || gasProvided !== receipt.gasUsed)) {
                                    defer.eventEmitter.emit('receipt', receipt);
                                    defer.resolve(receipt);


                                    if (canUnsubscribe) {
                                        defer.eventEmitter.removeAllListeners();
                                    }

                                } else {
                                    if (receipt) {
                                        receipt = JSON.stringify(receipt, null, 2);
                                    }
                                    utils._fireError(new Error("Transaction ran out of gas. Please provide more gas:\n" + receipt), defer.eventEmitter, defer.reject);
                                }

                                if (canUnsubscribe) {
                                    sub.unsubscribe();
                                }
                                promiseResolved = true;
                            }

                        }).

                        catch(function () {
                            timeoutCount++;

                            if (timeoutCount - 1 >= TIMEOUTBLOCK) {
                                sub.unsubscribe();
                                promiseResolved = true;
                                return utils._fireError(new Error('Transaction was not mined within 50 blocks, please make sure your transaction was properly send. Be aware that it might still be mined!'), defer.eventEmitter, defer.reject);
                            }
                        });


                    } else {
                        sub.unsubscribe();
                        promiseResolved = true;
                        return utils._fireError({ message: 'Failed to subscribe to new newBlockHeaders to confirm the transaction receipts.', data: err }, defer.eventEmitter, defer.reject);
                    }
                };


                var startWatching = function () {

                    if (_.isFunction(this.requestManager.provider.on)) {
                        method._ethereumCall.subscribe('newBlockHeaders', checkConfirmation);
                    } else {
                        intervalId = setInterval(checkConfirmation, 1000);
                    }
                }.bind(this);


                method._ethereumCall.getTransactionReceipt(result).
                then(function (receipt) {
                    if (receipt && receipt.blockNumber) {
                        checkConfirmation(null, null, null, receipt);
                        if (defer.eventEmitter.listeners('confirmation').length > 0) {
                            setTimeout(function () {

                                if (!promiseResolved) startWatching();
                            }, 1000);
                        }
                    } else
                    {
                        startWatching();
                    }
                }).
                catch(startWatching);

            };


            var getWallet = function getWallet(from, accounts) {
                var wallet = null;


                if (_.isNumber(from)) {
                    wallet = accounts.wallet[from];


                } else if (_.isObject(from) && from.address && from.privateKey) {
                    wallet = from;


                } else {
                    wallet = accounts.wallet[from.toLowerCase()];
                }

                return wallet;
            };

            Method.prototype.buildCall = function () {
                var method = this,
                isSendTx = method.call === 'eth_sendTransaction' || method.call === 'eth_sendRawTransaction';


                var send = function send() {
                    var extraFormatters = this;
                    var defer = promiEvent(!isSendTx),
                    payload = method.toPayload(Array.prototype.slice.call(arguments));



                    var sendTxCallback = function sendTxCallback(err, result) {
                        result = method.formatOutput(result);

                        if (!err) {
                            if (payload.callback) {
                                payload.callback(null, result);
                            }
                        } else {
                            if (err.error) {
                                err = err.error;
                            }

                            return utils._fireError(err, defer.eventEmitter, defer.reject, payload.callback);
                        }


                        if (!isSendTx) {

                            if (!err) {
                                defer.resolve(result);

                            }


                        } else {
                            defer.eventEmitter.emit('transactionHash', result);

                            method._confirmTransaction(defer, result, payload, extraFormatters);
                        }

                    };


                    var sendSignedTx = function sendSignedTx(sign) {

                        payload.method = 'eth_sendRawTransaction';
                        payload.params = [sign.rawTransaction];

                        method.requestManager.send(payload, sendTxCallback);
                    };


                    var sendRequest = function sendRequest(payload, method) {

                        if (method && method.accounts && method.accounts.wallet && method.accounts.wallet.length) {
                            var wallet;


                            if (payload.method === 'eth_sendTransaction') {
                                var tx = payload.params[0];
                                wallet = getWallet(_.isObject(tx) ? tx.from : null, method.accounts);



                                if (wallet && wallet.privateKey) {
                                    delete tx.from;

                                    var signature = method.accounts.signTransaction(tx, wallet.privateKey);

                                    return _.isFunction(signature.then) ? signature.then(sendSignedTx) : sendSignedTx(signature);
                                }


                            } else if (payload.method === 'eth_sign') {
                                var data = payload.params[1];
                                wallet = getWallet(payload.params[0], method.accounts);


                                if (wallet && wallet.privateKey) {
                                    var sign = method.accounts.sign(data, wallet.privateKey);

                                    if (payload.callback) {
                                        payload.callback(null, sign.signature);
                                    }

                                    defer.resolve(sign.signature);
                                    return;
                                }


                            }
                        }

                        return method.requestManager.send(payload, sendTxCallback);
                    };


                    if (isSendTx && _.isObject(payload.params[0]) && !payload.params[0].gasPrice) {

                        method._ethereumCall.getGasPrice(function (err, gasPrice) {

                            if (gasPrice) {
                                payload.params[0].gasPrice = gasPrice;
                            }
                            sendRequest(payload, method);
                        });

                    } else {
                        sendRequest(payload, method);
                    }


                    return defer.eventEmitter;
                };


                send.method = method;

                send.request = this.request.bind(this);
                return send;
            };







            Method.prototype.request = function () {
                var payload = this.toPayload(Array.prototype.slice.call(arguments));
                payload.format = this.formatOutput.bind(this);
                return payload;
            };

            module.exports = Method;

        }, { "underscore": 8, "web3-core-helpers": 7, "web3-core-promievent": 12, "web3-core-subscriptions": 20, "web3-utils": 48 }], 10: [function (require, module, exports) {
            (function (process, global) {
                /* @preserve
                                          * The MIT License (MIT)
                                          * 
                                          * Copyright (c) 2013-2015 Petka Antonov
                                          * 
                                          * Permission is hereby granted, free of charge, to any person obtaining a copy
                                          * of this software and associated documentation files (the "Software"), to deal
                                          * in the Software without restriction, including without limitation the rights
                                          * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                          * copies of the Software, and to permit persons to whom the Software is
                                          * furnished to do so, subject to the following conditions:
                                          * 
                                          * The above copyright notice and this permission notice shall be included in
                                          * all copies or substantial portions of the Software.
                                          * 
                                          * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                          * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                          * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
                                          * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                          * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                          * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                                          * THE SOFTWARE.
                                          * 
                                          */




                !function (e) {if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {var f;"undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Promise = e();}}(function () {var define, module, exports;return function e(t, n, r) {function s(o, u) {if (!n[o]) {if (!t[o]) {var a = typeof _dereq_ == "function" && _dereq_;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;}var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {var n = t[o][1][e];return s(n ? n : e);}, l, l.exports, e, t, n, r);}return n[o].exports;}var i = typeof _dereq_ == "function" && _dereq_;for (var o = 0; o < r.length; o++) {s(r[o]);}return s;}({ 1: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise) {
                                var SomePromiseArray = Promise._SomePromiseArray;
                                function any(promises) {
                                    var ret = new SomePromiseArray(promises);
                                    var promise = ret.promise();
                                    ret.setHowMany(1);
                                    ret.setUnwrap();
                                    ret.init();
                                    return promise;
                                }

                                Promise.any = function (promises) {
                                    return any(promises);
                                };

                                Promise.prototype.any = function () {
                                    return any(this);
                                };

                            };

                        }, {}], 2: [function (_dereq_, module, exports) {
                            "use strict";
                            var firstLineError;
                            try {throw new Error();} catch (e) {firstLineError = e;}
                            var schedule = _dereq_("./schedule");
                            var Queue = _dereq_("./queue");
                            var util = _dereq_("./util");

                            function Async() {
                                this._isTickUsed = false;
                                this._lateQueue = new Queue(16);
                                this._normalQueue = new Queue(16);
                                this._haveDrainedQueues = false;
                                this._trampolineEnabled = true;
                                var self = this;
                                this.drainQueues = function () {
                                    self._drainQueues();
                                };
                                this._schedule = schedule;
                            }

                            Async.prototype.enableTrampoline = function () {
                                this._trampolineEnabled = true;
                            };

                            Async.prototype.disableTrampolineIfNecessary = function () {
                                if (util.hasDevTools) {
                                    this._trampolineEnabled = false;
                                }
                            };

                            Async.prototype.haveItemsQueued = function () {
                                return this._isTickUsed || this._haveDrainedQueues;
                            };


                            Async.prototype.fatalError = function (e, isNode) {
                                if (isNode) {
                                    process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e));
                                    process.exit(2);
                                } else {
                                    this.throwLater(e);
                                }
                            };

                            Async.prototype.throwLater = function (fn, arg) {
                                if (arguments.length === 1) {
                                    arg = fn;
                                    fn = function fn() {throw arg;};
                                }
                                if (typeof setTimeout !== "undefined") {
                                    setTimeout(function () {
                                        fn(arg);
                                    }, 0);
                                } else try {
                                    this._schedule(function () {
                                        fn(arg);
                                    });
                                } catch (e) {
                                    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                                }
                            };

                            function AsyncInvokeLater(fn, receiver, arg) {
                                this._lateQueue.push(fn, receiver, arg);
                                this._queueTick();
                            }

                            function AsyncInvoke(fn, receiver, arg) {
                                this._normalQueue.push(fn, receiver, arg);
                                this._queueTick();
                            }

                            function AsyncSettlePromises(promise) {
                                this._normalQueue._pushOne(promise);
                                this._queueTick();
                            }

                            if (!util.hasDevTools) {
                                Async.prototype.invokeLater = AsyncInvokeLater;
                                Async.prototype.invoke = AsyncInvoke;
                                Async.prototype.settlePromises = AsyncSettlePromises;
                            } else {
                                Async.prototype.invokeLater = function (fn, receiver, arg) {
                                    if (this._trampolineEnabled) {
                                        AsyncInvokeLater.call(this, fn, receiver, arg);
                                    } else {
                                        this._schedule(function () {
                                            setTimeout(function () {
                                                fn.call(receiver, arg);
                                            }, 100);
                                        });
                                    }
                                };

                                Async.prototype.invoke = function (fn, receiver, arg) {
                                    if (this._trampolineEnabled) {
                                        AsyncInvoke.call(this, fn, receiver, arg);
                                    } else {
                                        this._schedule(function () {
                                            fn.call(receiver, arg);
                                        });
                                    }
                                };

                                Async.prototype.settlePromises = function (promise) {
                                    if (this._trampolineEnabled) {
                                        AsyncSettlePromises.call(this, promise);
                                    } else {
                                        this._schedule(function () {
                                            promise._settlePromises();
                                        });
                                    }
                                };
                            }

                            Async.prototype.invokeFirst = function (fn, receiver, arg) {
                                this._normalQueue.unshift(fn, receiver, arg);
                                this._queueTick();
                            };

                            Async.prototype._drainQueue = function (queue) {
                                while (queue.length() > 0) {
                                    var fn = queue.shift();
                                    if (typeof fn !== "function") {
                                        fn._settlePromises();
                                        continue;
                                    }
                                    var receiver = queue.shift();
                                    var arg = queue.shift();
                                    fn.call(receiver, arg);
                                }
                            };

                            Async.prototype._drainQueues = function () {
                                this._drainQueue(this._normalQueue);
                                this._reset();
                                this._haveDrainedQueues = true;
                                this._drainQueue(this._lateQueue);
                            };

                            Async.prototype._queueTick = function () {
                                if (!this._isTickUsed) {
                                    this._isTickUsed = true;
                                    this._schedule(this.drainQueues);
                                }
                            };

                            Async.prototype._reset = function () {
                                this._isTickUsed = false;
                            };

                            module.exports = Async;
                            module.exports.firstLineError = firstLineError;

                        }, { "./queue": 26, "./schedule": 29, "./util": 36 }], 3: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL, tryConvertToPromise, debug) {
                                var calledBind = false;
                                var rejectThis = function rejectThis(_, e) {
                                    this._reject(e);
                                };

                                var targetRejected = function targetRejected(e, context) {
                                    context.promiseRejectionQueued = true;
                                    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
                                };

                                var bindingResolved = function bindingResolved(thisArg, context) {
                                    if ((this._bitField & 50397184) === 0) {
                                        this._resolveCallback(context.target);
                                    }
                                };

                                var bindingRejected = function bindingRejected(e, context) {
                                    if (!context.promiseRejectionQueued) this._reject(e);
                                };

                                Promise.prototype.bind = function (thisArg) {
                                    if (!calledBind) {
                                        calledBind = true;
                                        Promise.prototype._propagateFrom = debug.propagateFromFunction();
                                        Promise.prototype._boundValue = debug.boundValueFunction();
                                    }
                                    var maybePromise = tryConvertToPromise(thisArg);
                                    var ret = new Promise(INTERNAL);
                                    ret._propagateFrom(this, 1);
                                    var target = this._target();
                                    ret._setBoundTo(maybePromise);
                                    if (maybePromise instanceof Promise) {
                                        var context = {
                                            promiseRejectionQueued: false,
                                            promise: ret,
                                            target: target,
                                            bindingPromise: maybePromise };

                                        target._then(INTERNAL, targetRejected, undefined, ret, context);
                                        maybePromise._then(
                                        bindingResolved, bindingRejected, undefined, ret, context);
                                        ret._setOnCancel(maybePromise);
                                    } else {
                                        ret._resolveCallback(target);
                                    }
                                    return ret;
                                };

                                Promise.prototype._setBoundTo = function (obj) {
                                    if (obj !== undefined) {
                                        this._bitField = this._bitField | 2097152;
                                        this._boundTo = obj;
                                    } else {
                                        this._bitField = this._bitField & ~2097152;
                                    }
                                };

                                Promise.prototype._isBound = function () {
                                    return (this._bitField & 2097152) === 2097152;
                                };

                                Promise.bind = function (thisArg, value) {
                                    return Promise.resolve(value).bind(thisArg);
                                };
                            };

                        }, {}], 4: [function (_dereq_, module, exports) {
                            "use strict";
                            var old;
                            if (typeof Promise !== "undefined") old = Promise;
                            function noConflict() {
                                try {if (Promise === bluebird) Promise = old;}
                                catch (e) {}
                                return bluebird;
                            }
                            var bluebird = _dereq_("./promise")();
                            bluebird.noConflict = noConflict;
                            module.exports = bluebird;

                        }, { "./promise": 22 }], 5: [function (_dereq_, module, exports) {
                            "use strict";
                            var cr = Object.create;
                            if (cr) {
                                var callerCache = cr(null);
                                var getterCache = cr(null);
                                callerCache[" size"] = getterCache[" size"] = 0;
                            }

                            module.exports = function (Promise) {
                                var util = _dereq_("./util");
                                var canEvaluate = util.canEvaluate;
                                var isIdentifier = util.isIdentifier;

                                var getMethodCaller;
                                var getGetter;
                                if (!true) {
                                    var makeMethodCaller = function makeMethodCaller(methodName) {
                                        return new Function("ensureMethod", "                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g, methodName))(ensureMethod);
                                    };

                                    var makeGetter = function makeGetter(propertyName) {
                                        return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
                                    };

                                    var getCompiled = function getCompiled(name, compiler, cache) {
                                        var ret = cache[name];
                                        if (typeof ret !== "function") {
                                            if (!isIdentifier(name)) {
                                                return null;
                                            }
                                            ret = compiler(name);
                                            cache[name] = ret;
                                            cache[" size"]++;
                                            if (cache[" size"] > 512) {
                                                var keys = Object.keys(cache);
                                                for (var i = 0; i < 256; ++i) {delete cache[keys[i]];}
                                                cache[" size"] = keys.length - 256;
                                            }
                                        }
                                        return ret;
                                    };

                                    getMethodCaller = function getMethodCaller(name) {
                                        return getCompiled(name, makeMethodCaller, callerCache);
                                    };

                                    getGetter = function getGetter(name) {
                                        return getCompiled(name, makeGetter, getterCache);
                                    };
                                }

                                function ensureMethod(obj, methodName) {
                                    var fn;
                                    if (obj != null) fn = obj[methodName];
                                    if (typeof fn !== "function") {
                                        var message = "Object " + util.classString(obj) + " has no method '" +
                                        util.toString(methodName) + "'";
                                        throw new Promise.TypeError(message);
                                    }
                                    return fn;
                                }

                                function caller(obj) {
                                    var methodName = this.pop();
                                    var fn = ensureMethod(obj, methodName);
                                    return fn.apply(obj, this);
                                }
                                Promise.prototype.call = function (methodName) {
                                    var args = [].slice.call(arguments, 1);;
                                    if (!true) {
                                        if (canEvaluate) {
                                            var maybeCaller = getMethodCaller(methodName);
                                            if (maybeCaller !== null) {
                                                return this._then(
                                                maybeCaller, undefined, undefined, args, undefined);
                                            }
                                        }
                                    }
                                    args.push(methodName);
                                    return this._then(caller, undefined, undefined, args, undefined);
                                };

                                function namedGetter(obj) {
                                    return obj[this];
                                }
                                function indexedGetter(obj) {
                                    var index = +this;
                                    if (index < 0) index = Math.max(0, index + obj.length);
                                    return obj[index];
                                }
                                Promise.prototype.get = function (propertyName) {
                                    var isIndex = typeof propertyName === "number";
                                    var getter;
                                    if (!isIndex) {
                                        if (canEvaluate) {
                                            var maybeGetter = getGetter(propertyName);
                                            getter = maybeGetter !== null ? maybeGetter : namedGetter;
                                        } else {
                                            getter = namedGetter;
                                        }
                                    } else {
                                        getter = indexedGetter;
                                    }
                                    return this._then(getter, undefined, undefined, propertyName, undefined);
                                };
                            };

                        }, { "./util": 36 }], 6: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, PromiseArray, apiRejection, debug) {
                                var util = _dereq_("./util");
                                var tryCatch = util.tryCatch;
                                var errorObj = util.errorObj;
                                var async = Promise._async;

                                Promise.prototype["break"] = Promise.prototype.cancel = function () {
                                    if (!debug.cancellation()) return this._warn("cancellation is disabled");

                                    var promise = this;
                                    var child = promise;
                                    while (promise.isCancellable()) {
                                        if (!promise._cancelBy(child)) {
                                            if (child._isFollowing()) {
                                                child._followee().cancel();
                                            } else {
                                                child._cancelBranched();
                                            }
                                            break;
                                        }

                                        var parent = promise._cancellationParent;
                                        if (parent == null || !parent.isCancellable()) {
                                            if (promise._isFollowing()) {
                                                promise._followee().cancel();
                                            } else {
                                                promise._cancelBranched();
                                            }
                                            break;
                                        } else {
                                            if (promise._isFollowing()) promise._followee().cancel();
                                            child = promise;
                                            promise = parent;
                                        }
                                    }
                                };

                                Promise.prototype._branchHasCancelled = function () {
                                    this._branchesRemainingToCancel--;
                                };

                                Promise.prototype._enoughBranchesHaveCancelled = function () {
                                    return this._branchesRemainingToCancel === undefined ||
                                    this._branchesRemainingToCancel <= 0;
                                };

                                Promise.prototype._cancelBy = function (canceller) {
                                    if (canceller === this) {
                                        this._branchesRemainingToCancel = 0;
                                        this._invokeOnCancel();
                                        return true;
                                    } else {
                                        this._branchHasCancelled();
                                        if (this._enoughBranchesHaveCancelled()) {
                                            this._invokeOnCancel();
                                            return true;
                                        }
                                    }
                                    return false;
                                };

                                Promise.prototype._cancelBranched = function () {
                                    if (this._enoughBranchesHaveCancelled()) {
                                        this._cancel();
                                    }
                                };

                                Promise.prototype._cancel = function () {
                                    if (!this.isCancellable()) return;

                                    this._setCancelled();
                                    async.invoke(this._cancelPromises, this, undefined);
                                };

                                Promise.prototype._cancelPromises = function () {
                                    if (this._length() > 0) this._settlePromises();
                                };

                                Promise.prototype._unsetOnCancel = function () {
                                    this._onCancelField = undefined;
                                };

                                Promise.prototype.isCancellable = function () {
                                    return this.isPending() && !this.isCancelled();
                                };

                                Promise.prototype._doInvokeOnCancel = function (onCancelCallback, internalOnly) {
                                    if (util.isArray(onCancelCallback)) {
                                        for (var i = 0; i < onCancelCallback.length; ++i) {
                                            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
                                        }
                                    } else if (onCancelCallback !== undefined) {
                                        if (typeof onCancelCallback === "function") {
                                            if (!internalOnly) {
                                                var e = tryCatch(onCancelCallback).call(this._boundValue());
                                                if (e === errorObj) {
                                                    this._attachExtraTrace(e.e);
                                                    async.throwLater(e.e);
                                                }
                                            }
                                        } else {
                                            onCancelCallback._resultCancelled(this);
                                        }
                                    }
                                };

                                Promise.prototype._invokeOnCancel = function () {
                                    var onCancelCallback = this._onCancel();
                                    this._unsetOnCancel();
                                    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
                                };

                                Promise.prototype._invokeInternalOnCancel = function () {
                                    if (this.isCancellable()) {
                                        this._doInvokeOnCancel(this._onCancel(), true);
                                        this._unsetOnCancel();
                                    }
                                };

                                Promise.prototype._resultCancelled = function () {
                                    this.cancel();
                                };

                            };

                        }, { "./util": 36 }], 7: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (NEXT_FILTER) {
                                var util = _dereq_("./util");
                                var getKeys = _dereq_("./es5").keys;
                                var tryCatch = util.tryCatch;
                                var errorObj = util.errorObj;

                                function catchFilter(instances, cb, promise) {
                                    return function (e) {
                                        var boundTo = promise._boundValue();
                                        predicateLoop: for (var i = 0; i < instances.length; ++i) {
                                            var item = instances[i];

                                            if (item === Error ||
                                            item != null && item.prototype instanceof Error) {
                                                if (e instanceof item) {
                                                    return tryCatch(cb).call(boundTo, e);
                                                }
                                            } else if (typeof item === "function") {
                                                var matchesPredicate = tryCatch(item).call(boundTo, e);
                                                if (matchesPredicate === errorObj) {
                                                    return matchesPredicate;
                                                } else if (matchesPredicate) {
                                                    return tryCatch(cb).call(boundTo, e);
                                                }
                                            } else if (util.isObject(e)) {
                                                var keys = getKeys(item);
                                                for (var j = 0; j < keys.length; ++j) {
                                                    var key = keys[j];
                                                    if (item[key] != e[key]) {
                                                        continue predicateLoop;
                                                    }
                                                }
                                                return tryCatch(cb).call(boundTo, e);
                                            }
                                        }
                                        return NEXT_FILTER;
                                    };
                                }

                                return catchFilter;
                            };

                        }, { "./es5": 13, "./util": 36 }], 8: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise) {
                                var longStackTraces = false;
                                var contextStack = [];

                                Promise.prototype._promiseCreated = function () {};
                                Promise.prototype._pushContext = function () {};
                                Promise.prototype._popContext = function () {return null;};
                                Promise._peekContext = Promise.prototype._peekContext = function () {};

                                function Context() {
                                    this._trace = new Context.CapturedTrace(peekContext());
                                }
                                Context.prototype._pushContext = function () {
                                    if (this._trace !== undefined) {
                                        this._trace._promiseCreated = null;
                                        contextStack.push(this._trace);
                                    }
                                };

                                Context.prototype._popContext = function () {
                                    if (this._trace !== undefined) {
                                        var trace = contextStack.pop();
                                        var ret = trace._promiseCreated;
                                        trace._promiseCreated = null;
                                        return ret;
                                    }
                                    return null;
                                };

                                function createContext() {
                                    if (longStackTraces) return new Context();
                                }

                                function peekContext() {
                                    var lastIndex = contextStack.length - 1;
                                    if (lastIndex >= 0) {
                                        return contextStack[lastIndex];
                                    }
                                    return undefined;
                                }
                                Context.CapturedTrace = null;
                                Context.create = createContext;
                                Context.deactivateLongStackTraces = function () {};
                                Context.activateLongStackTraces = function () {
                                    var Promise_pushContext = Promise.prototype._pushContext;
                                    var Promise_popContext = Promise.prototype._popContext;
                                    var Promise_PeekContext = Promise._peekContext;
                                    var Promise_peekContext = Promise.prototype._peekContext;
                                    var Promise_promiseCreated = Promise.prototype._promiseCreated;
                                    Context.deactivateLongStackTraces = function () {
                                        Promise.prototype._pushContext = Promise_pushContext;
                                        Promise.prototype._popContext = Promise_popContext;
                                        Promise._peekContext = Promise_PeekContext;
                                        Promise.prototype._peekContext = Promise_peekContext;
                                        Promise.prototype._promiseCreated = Promise_promiseCreated;
                                        longStackTraces = false;
                                    };
                                    longStackTraces = true;
                                    Promise.prototype._pushContext = Context.prototype._pushContext;
                                    Promise.prototype._popContext = Context.prototype._popContext;
                                    Promise._peekContext = Promise.prototype._peekContext = peekContext;
                                    Promise.prototype._promiseCreated = function () {
                                        var ctx = this._peekContext();
                                        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
                                    };
                                };
                                return Context;
                            };

                        }, {}], 9: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, Context) {
                                var getDomain = Promise._getDomain;
                                var async = Promise._async;
                                var Warning = _dereq_("./errors").Warning;
                                var util = _dereq_("./util");
                                var canAttachTrace = util.canAttachTrace;
                                var unhandledRejectionHandled;
                                var possiblyUnhandledRejection;
                                var bluebirdFramePattern =
                                /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
                                var stackFramePattern = null;
                                var formatStack = null;
                                var indentStackFrames = false;
                                var printWarning;
                                var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && (
                                true ||
                                util.env("BLUEBIRD_DEBUG") ||
                                util.env("NODE_ENV") === "development"));

                                var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (
                                debugging || util.env("BLUEBIRD_WARNINGS")));

                                var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (
                                debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

                                var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (
                                warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

                                Promise.prototype.suppressUnhandledRejections = function () {
                                    var target = this._target();
                                    target._bitField = target._bitField & ~1048576 |
                                    524288;
                                };

                                Promise.prototype._ensurePossibleRejectionHandled = function () {
                                    if ((this._bitField & 524288) !== 0) return;
                                    this._setRejectionIsUnhandled();
                                    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
                                };

                                Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
                                    fireRejectionEvent("rejectionHandled",
                                    unhandledRejectionHandled, undefined, this);
                                };

                                Promise.prototype._setReturnedNonUndefined = function () {
                                    this._bitField = this._bitField | 268435456;
                                };

                                Promise.prototype._returnedNonUndefined = function () {
                                    return (this._bitField & 268435456) !== 0;
                                };

                                Promise.prototype._notifyUnhandledRejection = function () {
                                    if (this._isRejectionUnhandled()) {
                                        var reason = this._settledValue();
                                        this._setUnhandledRejectionIsNotified();
                                        fireRejectionEvent("unhandledRejection",
                                        possiblyUnhandledRejection, reason, this);
                                    }
                                };

                                Promise.prototype._setUnhandledRejectionIsNotified = function () {
                                    this._bitField = this._bitField | 262144;
                                };

                                Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
                                    this._bitField = this._bitField & ~262144;
                                };

                                Promise.prototype._isUnhandledRejectionNotified = function () {
                                    return (this._bitField & 262144) > 0;
                                };

                                Promise.prototype._setRejectionIsUnhandled = function () {
                                    this._bitField = this._bitField | 1048576;
                                };

                                Promise.prototype._unsetRejectionIsUnhandled = function () {
                                    this._bitField = this._bitField & ~1048576;
                                    if (this._isUnhandledRejectionNotified()) {
                                        this._unsetUnhandledRejectionIsNotified();
                                        this._notifyUnhandledRejectionIsHandled();
                                    }
                                };

                                Promise.prototype._isRejectionUnhandled = function () {
                                    return (this._bitField & 1048576) > 0;
                                };

                                Promise.prototype._warn = function (message, shouldUseOwnTrace, promise) {
                                    return warn(message, shouldUseOwnTrace, promise || this);
                                };

                                Promise.onPossiblyUnhandledRejection = function (fn) {
                                    var domain = getDomain();
                                    possiblyUnhandledRejection =
                                    typeof fn === "function" ? domain === null ? fn : domain.bind(fn) :
                                    undefined;
                                };

                                Promise.onUnhandledRejectionHandled = function (fn) {
                                    var domain = getDomain();
                                    unhandledRejectionHandled =
                                    typeof fn === "function" ? domain === null ? fn : domain.bind(fn) :
                                    undefined;
                                };

                                var disableLongStackTraces = function disableLongStackTraces() {};
                                Promise.longStackTraces = function () {
                                    if (async.haveItemsQueued() && !config.longStackTraces) {
                                        throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    if (!config.longStackTraces && longStackTracesIsSupported()) {
                                        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
                                        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
                                        config.longStackTraces = true;
                                        disableLongStackTraces = function disableLongStackTraces() {
                                            if (async.haveItemsQueued() && !config.longStackTraces) {
                                                throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                            }
                                            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
                                            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
                                            Context.deactivateLongStackTraces();
                                            async.enableTrampoline();
                                            config.longStackTraces = false;
                                        };
                                        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
                                        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
                                        Context.activateLongStackTraces();
                                        async.disableTrampolineIfNecessary();
                                    }
                                };

                                Promise.hasLongStackTraces = function () {
                                    return config.longStackTraces && longStackTracesIsSupported();
                                };

                                var fireDomEvent = function () {
                                    try {
                                        var event = document.createEvent("CustomEvent");
                                        event.initCustomEvent("testingtheevent", false, true, {});
                                        util.global.dispatchEvent(event);
                                        return function (name, event) {
                                            var domEvent = document.createEvent("CustomEvent");
                                            domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
                                            return !util.global.dispatchEvent(domEvent);
                                        };
                                    } catch (e) {}
                                    return function () {
                                        return false;
                                    };
                                }();

                                var fireGlobalEvent = function () {
                                    if (util.isNode) {
                                        return function () {
                                            return process.emit.apply(process, arguments);
                                        };
                                    } else {
                                        if (!util.global) {
                                            return function () {
                                                return false;
                                            };
                                        }
                                        return function (name) {
                                            var methodName = "on" + name.toLowerCase();
                                            var method = util.global[methodName];
                                            if (!method) return false;
                                            method.apply(util.global, [].slice.call(arguments, 1));
                                            return true;
                                        };
                                    }
                                }();

                                function generatePromiseLifecycleEventObject(name, promise) {
                                    return { promise: promise };
                                }

                                var eventToObjectGenerator = {
                                    promiseCreated: generatePromiseLifecycleEventObject,
                                    promiseFulfilled: generatePromiseLifecycleEventObject,
                                    promiseRejected: generatePromiseLifecycleEventObject,
                                    promiseResolved: generatePromiseLifecycleEventObject,
                                    promiseCancelled: generatePromiseLifecycleEventObject,
                                    promiseChained: function promiseChained(name, promise, child) {
                                        return { promise: promise, child: child };
                                    },
                                    warning: function warning(name, _warning) {
                                        return { warning: _warning };
                                    },
                                    unhandledRejection: function unhandledRejection(name, reason, promise) {
                                        return { reason: reason, promise: promise };
                                    },
                                    rejectionHandled: generatePromiseLifecycleEventObject };


                                var activeFireEvent = function activeFireEvent(name) {
                                    var globalEventFired = false;
                                    try {
                                        globalEventFired = fireGlobalEvent.apply(null, arguments);
                                    } catch (e) {
                                        async.throwLater(e);
                                        globalEventFired = true;
                                    }

                                    var domEventFired = false;
                                    try {
                                        domEventFired = fireDomEvent(name,
                                        eventToObjectGenerator[name].apply(null, arguments));
                                    } catch (e) {
                                        async.throwLater(e);
                                        domEventFired = true;
                                    }

                                    return domEventFired || globalEventFired;
                                };

                                Promise.config = function (opts) {
                                    opts = Object(opts);
                                    if ("longStackTraces" in opts) {
                                        if (opts.longStackTraces) {
                                            Promise.longStackTraces();
                                        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
                                            disableLongStackTraces();
                                        }
                                    }
                                    if ("warnings" in opts) {
                                        var warningsOption = opts.warnings;
                                        config.warnings = !!warningsOption;
                                        wForgottenReturn = config.warnings;

                                        if (util.isObject(warningsOption)) {
                                            if ("wForgottenReturn" in warningsOption) {
                                                wForgottenReturn = !!warningsOption.wForgottenReturn;
                                            }
                                        }
                                    }
                                    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
                                        if (async.haveItemsQueued()) {
                                            throw new Error(
                                            "cannot enable cancellation after promises are in use");
                                        }
                                        Promise.prototype._clearCancellationData =
                                        cancellationClearCancellationData;
                                        Promise.prototype._propagateFrom = cancellationPropagateFrom;
                                        Promise.prototype._onCancel = cancellationOnCancel;
                                        Promise.prototype._setOnCancel = cancellationSetOnCancel;
                                        Promise.prototype._attachCancellationCallback =
                                        cancellationAttachCancellationCallback;
                                        Promise.prototype._execute = cancellationExecute;
                                        _propagateFromFunction = cancellationPropagateFrom;
                                        config.cancellation = true;
                                    }
                                    if ("monitoring" in opts) {
                                        if (opts.monitoring && !config.monitoring) {
                                            config.monitoring = true;
                                            Promise.prototype._fireEvent = activeFireEvent;
                                        } else if (!opts.monitoring && config.monitoring) {
                                            config.monitoring = false;
                                            Promise.prototype._fireEvent = defaultFireEvent;
                                        }
                                    }
                                };

                                function defaultFireEvent() {return false;}

                                Promise.prototype._fireEvent = defaultFireEvent;
                                Promise.prototype._execute = function (executor, resolve, reject) {
                                    try {
                                        executor(resolve, reject);
                                    } catch (e) {
                                        return e;
                                    }
                                };
                                Promise.prototype._onCancel = function () {};
                                Promise.prototype._setOnCancel = function (handler) {;};
                                Promise.prototype._attachCancellationCallback = function (onCancel) {
                                    ;
                                };
                                Promise.prototype._captureStackTrace = function () {};
                                Promise.prototype._attachExtraTrace = function () {};
                                Promise.prototype._clearCancellationData = function () {};
                                Promise.prototype._propagateFrom = function (parent, flags) {
                                    ;
                                    ;
                                };

                                function cancellationExecute(executor, resolve, reject) {
                                    var promise = this;
                                    try {
                                        executor(resolve, reject, function (onCancel) {
                                            if (typeof onCancel !== "function") {
                                                throw new TypeError("onCancel must be a function, got: " +
                                                util.toString(onCancel));
                                            }
                                            promise._attachCancellationCallback(onCancel);
                                        });
                                    } catch (e) {
                                        return e;
                                    }
                                }

                                function cancellationAttachCancellationCallback(onCancel) {
                                    if (!this.isCancellable()) return this;

                                    var previousOnCancel = this._onCancel();
                                    if (previousOnCancel !== undefined) {
                                        if (util.isArray(previousOnCancel)) {
                                            previousOnCancel.push(onCancel);
                                        } else {
                                            this._setOnCancel([previousOnCancel, onCancel]);
                                        }
                                    } else {
                                        this._setOnCancel(onCancel);
                                    }
                                }

                                function cancellationOnCancel() {
                                    return this._onCancelField;
                                }

                                function cancellationSetOnCancel(onCancel) {
                                    this._onCancelField = onCancel;
                                }

                                function cancellationClearCancellationData() {
                                    this._cancellationParent = undefined;
                                    this._onCancelField = undefined;
                                }

                                function cancellationPropagateFrom(parent, flags) {
                                    if ((flags & 1) !== 0) {
                                        this._cancellationParent = parent;
                                        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
                                        if (branchesRemainingToCancel === undefined) {
                                            branchesRemainingToCancel = 0;
                                        }
                                        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
                                    }
                                    if ((flags & 2) !== 0 && parent._isBound()) {
                                        this._setBoundTo(parent._boundTo);
                                    }
                                }

                                function bindingPropagateFrom(parent, flags) {
                                    if ((flags & 2) !== 0 && parent._isBound()) {
                                        this._setBoundTo(parent._boundTo);
                                    }
                                }
                                var _propagateFromFunction = bindingPropagateFrom;

                                function _boundValueFunction() {
                                    var ret = this._boundTo;
                                    if (ret !== undefined) {
                                        if (ret instanceof Promise) {
                                            if (ret.isFulfilled()) {
                                                return ret.value();
                                            } else {
                                                return undefined;
                                            }
                                        }
                                    }
                                    return ret;
                                }

                                function longStackTracesCaptureStackTrace() {
                                    this._trace = new CapturedTrace(this._peekContext());
                                }

                                function longStackTracesAttachExtraTrace(error, ignoreSelf) {
                                    if (canAttachTrace(error)) {
                                        var trace = this._trace;
                                        if (trace !== undefined) {
                                            if (ignoreSelf) trace = trace._parent;
                                        }
                                        if (trace !== undefined) {
                                            trace.attachExtraTrace(error);
                                        } else if (!error.__stackCleaned__) {
                                            var parsed = parseStackAndMessage(error);
                                            util.notEnumerableProp(error, "stack",
                                            parsed.message + "\n" + parsed.stack.join("\n"));
                                            util.notEnumerableProp(error, "__stackCleaned__", true);
                                        }
                                    }
                                }

                                function checkForgottenReturns(returnValue, promiseCreated, name, promise,
                                parent) {
                                    if (returnValue === undefined && promiseCreated !== null &&
                                    wForgottenReturn) {
                                        if (parent !== undefined && parent._returnedNonUndefined()) return;

                                        if (name) name = name + " ";
                                        var msg = "a promise was created in a " + name +
                                        "handler but was not returned from it";
                                        promise._warn(msg, true, promiseCreated);
                                    }
                                }

                                function deprecated(name, replacement) {
                                    var message = name +
                                    " is deprecated and will be removed in a future version.";
                                    if (replacement) message += " Use " + replacement + " instead.";
                                    return warn(message);
                                }

                                function warn(message, shouldUseOwnTrace, promise) {
                                    if (!config.warnings) return;
                                    var warning = new Warning(message);
                                    var ctx;
                                    if (shouldUseOwnTrace) {
                                        promise._attachExtraTrace(warning);
                                    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
                                        ctx.attachExtraTrace(warning);
                                    } else {
                                        var parsed = parseStackAndMessage(warning);
                                        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
                                    }

                                    if (!activeFireEvent("warning", warning)) {
                                        formatAndLogError(warning, "", true);
                                    }
                                }

                                function reconstructStack(message, stacks) {
                                    for (var i = 0; i < stacks.length - 1; ++i) {
                                        stacks[i].push("From previous event:");
                                        stacks[i] = stacks[i].join("\n");
                                    }
                                    if (i < stacks.length) {
                                        stacks[i] = stacks[i].join("\n");
                                    }
                                    return message + "\n" + stacks.join("\n");
                                }

                                function removeDuplicateOrEmptyJumps(stacks) {
                                    for (var i = 0; i < stacks.length; ++i) {
                                        if (stacks[i].length === 0 ||
                                        i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
                                            stacks.splice(i, 1);
                                            i--;
                                        }
                                    }
                                }

                                function removeCommonRoots(stacks) {
                                    var current = stacks[0];
                                    for (var i = 1; i < stacks.length; ++i) {
                                        var prev = stacks[i];
                                        var currentLastIndex = current.length - 1;
                                        var currentLastLine = current[currentLastIndex];
                                        var commonRootMeetPoint = -1;

                                        for (var j = prev.length - 1; j >= 0; --j) {
                                            if (prev[j] === currentLastLine) {
                                                commonRootMeetPoint = j;
                                                break;
                                            }
                                        }

                                        for (var j = commonRootMeetPoint; j >= 0; --j) {
                                            var line = prev[j];
                                            if (current[currentLastIndex] === line) {
                                                current.pop();
                                                currentLastIndex--;
                                            } else {
                                                break;
                                            }
                                        }
                                        current = prev;
                                    }
                                }

                                function cleanStack(stack) {
                                    var ret = [];
                                    for (var i = 0; i < stack.length; ++i) {
                                        var line = stack[i];
                                        var isTraceLine = "    (No stack trace)" === line ||
                                        stackFramePattern.test(line);
                                        var isInternalFrame = isTraceLine && shouldIgnore(line);
                                        if (isTraceLine && !isInternalFrame) {
                                            if (indentStackFrames && line.charAt(0) !== " ") {
                                                line = "    " + line;
                                            }
                                            ret.push(line);
                                        }
                                    }
                                    return ret;
                                }

                                function stackFramesAsArray(error) {
                                    var stack = error.stack.replace(/\s+$/g, "").split("\n");
                                    for (var i = 0; i < stack.length; ++i) {
                                        var line = stack[i];
                                        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
                                            break;
                                        }
                                    }
                                    if (i > 0) {
                                        stack = stack.slice(i);
                                    }
                                    return stack;
                                }

                                function parseStackAndMessage(error) {
                                    var stack = error.stack;
                                    var message = error.toString();
                                    stack = typeof stack === "string" && stack.length > 0 ?
                                    stackFramesAsArray(error) : ["    (No stack trace)"];
                                    return {
                                        message: message,
                                        stack: cleanStack(stack) };

                                }

                                function formatAndLogError(error, title, isSoft) {
                                    if (typeof console !== "undefined") {
                                        var message;
                                        if (util.isObject(error)) {
                                            var stack = error.stack;
                                            message = title + formatStack(stack, error);
                                        } else {
                                            message = title + String(error);
                                        }
                                        if (typeof printWarning === "function") {
                                            printWarning(message, isSoft);
                                        } else if (typeof console.log === "function" ||
                                        _typeof(console.log) === "object") {
                                            console.log(message);
                                        }
                                    }
                                }

                                function fireRejectionEvent(name, localHandler, reason, promise) {
                                    var localEventFired = false;
                                    try {
                                        if (typeof localHandler === "function") {
                                            localEventFired = true;
                                            if (name === "rejectionHandled") {
                                                localHandler(promise);
                                            } else {
                                                localHandler(reason, promise);
                                            }
                                        }
                                    } catch (e) {
                                        async.throwLater(e);
                                    }

                                    if (name === "unhandledRejection") {
                                        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
                                            formatAndLogError(reason, "Unhandled rejection ");
                                        }
                                    } else {
                                        activeFireEvent(name, promise);
                                    }
                                }

                                function formatNonError(obj) {
                                    var str;
                                    if (typeof obj === "function") {
                                        str = "[function " + (
                                        obj.name || "anonymous") +
                                        "]";
                                    } else {
                                        str = obj && typeof obj.toString === "function" ?
                                        obj.toString() : util.toString(obj);
                                        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
                                        if (ruselessToString.test(str)) {
                                            try {
                                                var newStr = JSON.stringify(obj);
                                                str = newStr;
                                            }
                                            catch (e) {

                                            }
                                        }
                                        if (str.length === 0) {
                                            str = "(empty array)";
                                        }
                                    }
                                    return "(<" + snip(str) + ">, no stack trace)";
                                }

                                function snip(str) {
                                    var maxChars = 41;
                                    if (str.length < maxChars) {
                                        return str;
                                    }
                                    return str.substr(0, maxChars - 3) + "...";
                                }

                                function longStackTracesIsSupported() {
                                    return typeof captureStackTrace === "function";
                                }

                                var shouldIgnore = function shouldIgnore() {return false;};
                                var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                                function parseLineInfo(line) {
                                    var matches = line.match(parseLineInfoRegex);
                                    if (matches) {
                                        return {
                                            fileName: matches[1],
                                            line: parseInt(matches[2], 10) };

                                    }
                                }

                                function setBounds(firstLineError, lastLineError) {
                                    if (!longStackTracesIsSupported()) return;
                                    var firstStackLines = firstLineError.stack.split("\n");
                                    var lastStackLines = lastLineError.stack.split("\n");
                                    var firstIndex = -1;
                                    var lastIndex = -1;
                                    var firstFileName;
                                    var lastFileName;
                                    for (var i = 0; i < firstStackLines.length; ++i) {
                                        var result = parseLineInfo(firstStackLines[i]);
                                        if (result) {
                                            firstFileName = result.fileName;
                                            firstIndex = result.line;
                                            break;
                                        }
                                    }
                                    for (var i = 0; i < lastStackLines.length; ++i) {
                                        var result = parseLineInfo(lastStackLines[i]);
                                        if (result) {
                                            lastFileName = result.fileName;
                                            lastIndex = result.line;
                                            break;
                                        }
                                    }
                                    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
                                    firstFileName !== lastFileName || firstIndex >= lastIndex) {
                                        return;
                                    }

                                    shouldIgnore = function shouldIgnore(line) {
                                        if (bluebirdFramePattern.test(line)) return true;
                                        var info = parseLineInfo(line);
                                        if (info) {
                                            if (info.fileName === firstFileName &&
                                            firstIndex <= info.line && info.line <= lastIndex) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    };
                                }

                                function CapturedTrace(parent) {
                                    this._parent = parent;
                                    this._promisesCreated = 0;
                                    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
                                    captureStackTrace(this, CapturedTrace);
                                    if (length > 32) this.uncycle();
                                }
                                util.inherits(CapturedTrace, Error);
                                Context.CapturedTrace = CapturedTrace;

                                CapturedTrace.prototype.uncycle = function () {
                                    var length = this._length;
                                    if (length < 2) return;
                                    var nodes = [];
                                    var stackToIndex = {};

                                    for (var i = 0, node = this; node !== undefined; ++i) {
                                        nodes.push(node);
                                        node = node._parent;
                                    }
                                    length = this._length = i;
                                    for (var i = length - 1; i >= 0; --i) {
                                        var stack = nodes[i].stack;
                                        if (stackToIndex[stack] === undefined) {
                                            stackToIndex[stack] = i;
                                        }
                                    }
                                    for (var i = 0; i < length; ++i) {
                                        var currentStack = nodes[i].stack;
                                        var index = stackToIndex[currentStack];
                                        if (index !== undefined && index !== i) {
                                            if (index > 0) {
                                                nodes[index - 1]._parent = undefined;
                                                nodes[index - 1]._length = 1;
                                            }
                                            nodes[i]._parent = undefined;
                                            nodes[i]._length = 1;
                                            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

                                            if (index < length - 1) {
                                                cycleEdgeNode._parent = nodes[index + 1];
                                                cycleEdgeNode._parent.uncycle();
                                                cycleEdgeNode._length =
                                                cycleEdgeNode._parent._length + 1;
                                            } else {
                                                cycleEdgeNode._parent = undefined;
                                                cycleEdgeNode._length = 1;
                                            }
                                            var currentChildLength = cycleEdgeNode._length + 1;
                                            for (var j = i - 2; j >= 0; --j) {
                                                nodes[j]._length = currentChildLength;
                                                currentChildLength++;
                                            }
                                            return;
                                        }
                                    }
                                };

                                CapturedTrace.prototype.attachExtraTrace = function (error) {
                                    if (error.__stackCleaned__) return;
                                    this.uncycle();
                                    var parsed = parseStackAndMessage(error);
                                    var message = parsed.message;
                                    var stacks = [parsed.stack];

                                    var trace = this;
                                    while (trace !== undefined) {
                                        stacks.push(cleanStack(trace.stack.split("\n")));
                                        trace = trace._parent;
                                    }
                                    removeCommonRoots(stacks);
                                    removeDuplicateOrEmptyJumps(stacks);
                                    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
                                    util.notEnumerableProp(error, "__stackCleaned__", true);
                                };

                                var captureStackTrace = function stackDetection() {
                                    var v8stackFramePattern = /^\s*at\s*/;
                                    var v8stackFormatter = function v8stackFormatter(stack, error) {
                                        if (typeof stack === "string") return stack;

                                        if (error.name !== undefined &&
                                        error.message !== undefined) {
                                            return error.toString();
                                        }
                                        return formatNonError(error);
                                    };

                                    if (typeof Error.stackTraceLimit === "number" &&
                                    typeof Error.captureStackTrace === "function") {
                                        Error.stackTraceLimit += 6;
                                        stackFramePattern = v8stackFramePattern;
                                        formatStack = v8stackFormatter;
                                        var captureStackTrace = Error.captureStackTrace;

                                        shouldIgnore = function shouldIgnore(line) {
                                            return bluebirdFramePattern.test(line);
                                        };
                                        return function (receiver, ignoreUntil) {
                                            Error.stackTraceLimit += 6;
                                            captureStackTrace(receiver, ignoreUntil);
                                            Error.stackTraceLimit -= 6;
                                        };
                                    }
                                    var err = new Error();

                                    if (typeof err.stack === "string" &&
                                    err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
                                        stackFramePattern = /@/;
                                        formatStack = v8stackFormatter;
                                        indentStackFrames = true;
                                        return function captureStackTrace(o) {
                                            o.stack = new Error().stack;
                                        };
                                    }

                                    var hasStackAfterThrow;
                                    try {throw new Error();}
                                    catch (e) {
                                        hasStackAfterThrow = "stack" in e;
                                    }
                                    if (!("stack" in err) && hasStackAfterThrow &&
                                    typeof Error.stackTraceLimit === "number") {
                                        stackFramePattern = v8stackFramePattern;
                                        formatStack = v8stackFormatter;
                                        return function captureStackTrace(o) {
                                            Error.stackTraceLimit += 6;
                                            try {throw new Error();}
                                            catch (e) {o.stack = e.stack;}
                                            Error.stackTraceLimit -= 6;
                                        };
                                    }

                                    formatStack = function formatStack(stack, error) {
                                        if (typeof stack === "string") return stack;

                                        if (((typeof error === "undefined" ? "undefined" : _typeof(error)) === "object" ||
                                        typeof error === "function") &&
                                        error.name !== undefined &&
                                        error.message !== undefined) {
                                            return error.toString();
                                        }
                                        return formatNonError(error);
                                    };

                                    return null;

                                }([]);

                                if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
                                    printWarning = function printWarning(message) {
                                        console.warn(message);
                                    };
                                    if (util.isNode && process.stderr.isTTY) {
                                        printWarning = function printWarning(message, isSoft) {
                                            var color = isSoft ? "\x1B[33m" : "\x1B[31m";
                                            console.warn(color + message + "\x1B[0m\n");
                                        };
                                    } else if (!util.isNode && typeof new Error().stack === "string") {
                                        printWarning = function printWarning(message, isSoft) {
                                            console.warn("%c" + message,
                                            isSoft ? "color: darkorange" : "color: red");
                                        };
                                    }
                                }

                                var config = {
                                    warnings: warnings,
                                    longStackTraces: false,
                                    cancellation: false,
                                    monitoring: false };


                                if (longStackTraces) Promise.longStackTraces();

                                return {
                                    longStackTraces: function longStackTraces() {
                                        return config.longStackTraces;
                                    },
                                    warnings: function warnings() {
                                        return config.warnings;
                                    },
                                    cancellation: function cancellation() {
                                        return config.cancellation;
                                    },
                                    monitoring: function monitoring() {
                                        return config.monitoring;
                                    },
                                    propagateFromFunction: function propagateFromFunction() {
                                        return _propagateFromFunction;
                                    },
                                    boundValueFunction: function boundValueFunction() {
                                        return _boundValueFunction;
                                    },
                                    checkForgottenReturns: checkForgottenReturns,
                                    setBounds: setBounds,
                                    warn: warn,
                                    deprecated: deprecated,
                                    CapturedTrace: CapturedTrace,
                                    fireDomEvent: fireDomEvent,
                                    fireGlobalEvent: fireGlobalEvent };

                            };

                        }, { "./errors": 12, "./util": 36 }], 10: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise) {
                                function returner() {
                                    return this.value;
                                }
                                function thrower() {
                                    throw this.reason;
                                }

                                Promise.prototype["return"] =
                                Promise.prototype.thenReturn = function (value) {
                                    if (value instanceof Promise) value.suppressUnhandledRejections();
                                    return this._then(
                                    returner, undefined, undefined, { value: value }, undefined);
                                };

                                Promise.prototype["throw"] =
                                Promise.prototype.thenThrow = function (reason) {
                                    return this._then(
                                    thrower, undefined, undefined, { reason: reason }, undefined);
                                };

                                Promise.prototype.catchThrow = function (reason) {
                                    if (arguments.length <= 1) {
                                        return this._then(
                                        undefined, thrower, undefined, { reason: reason }, undefined);
                                    } else {
                                        var _reason = arguments[1];
                                        var handler = function handler() {throw _reason;};
                                        return this.caught(reason, handler);
                                    }
                                };

                                Promise.prototype.catchReturn = function (value) {
                                    if (arguments.length <= 1) {
                                        if (value instanceof Promise) value.suppressUnhandledRejections();
                                        return this._then(
                                        undefined, returner, undefined, { value: value }, undefined);
                                    } else {
                                        var _value = arguments[1];
                                        if (_value instanceof Promise) _value.suppressUnhandledRejections();
                                        var handler = function handler() {return _value;};
                                        return this.caught(value, handler);
                                    }
                                };
                            };

                        }, {}], 11: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL) {
                                var PromiseReduce = Promise.reduce;
                                var PromiseAll = Promise.all;

                                function promiseAllThis() {
                                    return PromiseAll(this);
                                }

                                function PromiseMapSeries(promises, fn) {
                                    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
                                }

                                Promise.prototype.each = function (fn) {
                                    return this.mapSeries(fn).
                                    _then(promiseAllThis, undefined, undefined, this, undefined);
                                };

                                Promise.prototype.mapSeries = function (fn) {
                                    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
                                };

                                Promise.each = function (promises, fn) {
                                    return PromiseMapSeries(promises, fn).
                                    _then(promiseAllThis, undefined, undefined, promises, undefined);
                                };

                                Promise.mapSeries = PromiseMapSeries;
                            };

                        }, {}], 12: [function (_dereq_, module, exports) {
                            "use strict";
                            var es5 = _dereq_("./es5");
                            var Objectfreeze = es5.freeze;
                            var util = _dereq_("./util");
                            var inherits = util.inherits;
                            var notEnumerableProp = util.notEnumerableProp;

                            function subError(nameProperty, defaultMessage) {
                                function SubError(message) {
                                    if (!(this instanceof SubError)) return new SubError(message);
                                    notEnumerableProp(this, "message",
                                    typeof message === "string" ? message : defaultMessage);
                                    notEnumerableProp(this, "name", nameProperty);
                                    if (Error.captureStackTrace) {
                                        Error.captureStackTrace(this, this.constructor);
                                    } else {
                                        Error.call(this);
                                    }
                                }
                                inherits(SubError, Error);
                                return SubError;
                            }

                            var _TypeError, _RangeError;
                            var Warning = subError("Warning", "warning");
                            var CancellationError = subError("CancellationError", "cancellation error");
                            var TimeoutError = subError("TimeoutError", "timeout error");
                            var AggregateError = subError("AggregateError", "aggregate error");
                            try {
                                _TypeError = TypeError;
                                _RangeError = RangeError;
                            } catch (e) {
                                _TypeError = subError("TypeError", "type error");
                                _RangeError = subError("RangeError", "range error");
                            }

                            var methods = ("join pop push shift unshift slice filter forEach some " +
                            "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

                            for (var i = 0; i < methods.length; ++i) {
                                if (typeof Array.prototype[methods[i]] === "function") {
                                    AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
                                }
                            }

                            es5.defineProperty(AggregateError.prototype, "length", {
                                value: 0,
                                configurable: false,
                                writable: true,
                                enumerable: true });

                            AggregateError.prototype["isOperational"] = true;
                            var level = 0;
                            AggregateError.prototype.toString = function () {
                                var indent = Array(level * 4 + 1).join(" ");
                                var ret = "\n" + indent + "AggregateError of:" + "\n";
                                level++;
                                indent = Array(level * 4 + 1).join(" ");
                                for (var i = 0; i < this.length; ++i) {
                                    var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
                                    var lines = str.split("\n");
                                    for (var j = 0; j < lines.length; ++j) {
                                        lines[j] = indent + lines[j];
                                    }
                                    str = lines.join("\n");
                                    ret += str + "\n";
                                }
                                level--;
                                return ret;
                            };

                            function OperationalError(message) {
                                if (!(this instanceof OperationalError))
                                return new OperationalError(message);
                                notEnumerableProp(this, "name", "OperationalError");
                                notEnumerableProp(this, "message", message);
                                this.cause = message;
                                this["isOperational"] = true;

                                if (message instanceof Error) {
                                    notEnumerableProp(this, "message", message.message);
                                    notEnumerableProp(this, "stack", message.stack);
                                } else if (Error.captureStackTrace) {
                                    Error.captureStackTrace(this, this.constructor);
                                }

                            }
                            inherits(OperationalError, Error);

                            var errorTypes = Error["__BluebirdErrorTypes__"];
                            if (!errorTypes) {
                                errorTypes = Objectfreeze({
                                    CancellationError: CancellationError,
                                    TimeoutError: TimeoutError,
                                    OperationalError: OperationalError,
                                    RejectionError: OperationalError,
                                    AggregateError: AggregateError });

                                es5.defineProperty(Error, "__BluebirdErrorTypes__", {
                                    value: errorTypes,
                                    writable: false,
                                    enumerable: false,
                                    configurable: false });

                            }

                            module.exports = {
                                Error: Error,
                                TypeError: _TypeError,
                                RangeError: _RangeError,
                                CancellationError: errorTypes.CancellationError,
                                OperationalError: errorTypes.OperationalError,
                                TimeoutError: errorTypes.TimeoutError,
                                AggregateError: errorTypes.AggregateError,
                                Warning: Warning };


                        }, { "./es5": 13, "./util": 36 }], 13: [function (_dereq_, module, exports) {
                            var isES5 = function () {
                                "use strict";
                                return this === undefined;
                            }();

                            if (isES5) {
                                module.exports = {
                                    freeze: Object.freeze,
                                    defineProperty: Object.defineProperty,
                                    getDescriptor: Object.getOwnPropertyDescriptor,
                                    keys: Object.keys,
                                    names: Object.getOwnPropertyNames,
                                    getPrototypeOf: Object.getPrototypeOf,
                                    isArray: Array.isArray,
                                    isES5: isES5,
                                    propertyIsWritable: function propertyIsWritable(obj, prop) {
                                        var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
                                        return !!(!descriptor || descriptor.writable || descriptor.set);
                                    } };

                            } else {
                                var has = {}.hasOwnProperty;
                                var str = {}.toString;
                                var proto = {}.constructor.prototype;

                                var ObjectKeys = function ObjectKeys(o) {
                                    var ret = [];
                                    for (var key in o) {
                                        if (has.call(o, key)) {
                                            ret.push(key);
                                        }
                                    }
                                    return ret;
                                };

                                var ObjectGetDescriptor = function ObjectGetDescriptor(o, key) {
                                    return { value: o[key] };
                                };

                                var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
                                    o[key] = desc.value;
                                    return o;
                                };

                                var ObjectFreeze = function ObjectFreeze(obj) {
                                    return obj;
                                };

                                var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
                                    try {
                                        return Object(obj).constructor.prototype;
                                    }
                                    catch (e) {
                                        return proto;
                                    }
                                };

                                var ArrayIsArray = function ArrayIsArray(obj) {
                                    try {
                                        return str.call(obj) === "[object Array]";
                                    }
                                    catch (e) {
                                        return false;
                                    }
                                };

                                module.exports = {
                                    isArray: ArrayIsArray,
                                    keys: ObjectKeys,
                                    names: ObjectKeys,
                                    defineProperty: ObjectDefineProperty,
                                    getDescriptor: ObjectGetDescriptor,
                                    freeze: ObjectFreeze,
                                    getPrototypeOf: ObjectGetPrototypeOf,
                                    isES5: isES5,
                                    propertyIsWritable: function propertyIsWritable() {
                                        return true;
                                    } };

                            }

                        }, {}], 14: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL) {
                                var PromiseMap = Promise.map;

                                Promise.prototype.filter = function (fn, options) {
                                    return PromiseMap(this, fn, options, INTERNAL);
                                };

                                Promise.filter = function (promises, fn, options) {
                                    return PromiseMap(promises, fn, options, INTERNAL);
                                };
                            };

                        }, {}], 15: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, tryConvertToPromise) {
                                var util = _dereq_("./util");
                                var CancellationError = Promise.CancellationError;
                                var errorObj = util.errorObj;

                                function PassThroughHandlerContext(promise, type, handler) {
                                    this.promise = promise;
                                    this.type = type;
                                    this.handler = handler;
                                    this.called = false;
                                    this.cancelPromise = null;
                                }

                                PassThroughHandlerContext.prototype.isFinallyHandler = function () {
                                    return this.type === 0;
                                };

                                function FinallyHandlerCancelReaction(finallyHandler) {
                                    this.finallyHandler = finallyHandler;
                                }

                                FinallyHandlerCancelReaction.prototype._resultCancelled = function () {
                                    checkCancel(this.finallyHandler);
                                };

                                function checkCancel(ctx, reason) {
                                    if (ctx.cancelPromise != null) {
                                        if (arguments.length > 1) {
                                            ctx.cancelPromise._reject(reason);
                                        } else {
                                            ctx.cancelPromise._cancel();
                                        }
                                        ctx.cancelPromise = null;
                                        return true;
                                    }
                                    return false;
                                }

                                function succeed() {
                                    return finallyHandler.call(this, this.promise._target()._settledValue());
                                }
                                function fail(reason) {
                                    if (checkCancel(this, reason)) return;
                                    errorObj.e = reason;
                                    return errorObj;
                                }
                                function finallyHandler(reasonOrValue) {
                                    var promise = this.promise;
                                    var handler = this.handler;

                                    if (!this.called) {
                                        this.called = true;
                                        var ret = this.isFinallyHandler() ?
                                        handler.call(promise._boundValue()) :
                                        handler.call(promise._boundValue(), reasonOrValue);
                                        if (ret !== undefined) {
                                            promise._setReturnedNonUndefined();
                                            var maybePromise = tryConvertToPromise(ret, promise);
                                            if (maybePromise instanceof Promise) {
                                                if (this.cancelPromise != null) {
                                                    if (maybePromise.isCancelled()) {
                                                        var reason =
                                                        new CancellationError("late cancellation observer");
                                                        promise._attachExtraTrace(reason);
                                                        errorObj.e = reason;
                                                        return errorObj;
                                                    } else if (maybePromise.isPending()) {
                                                        maybePromise._attachCancellationCallback(
                                                        new FinallyHandlerCancelReaction(this));
                                                    }
                                                }
                                                return maybePromise._then(
                                                succeed, fail, undefined, this, undefined);
                                            }
                                        }
                                    }

                                    if (promise.isRejected()) {
                                        checkCancel(this);
                                        errorObj.e = reasonOrValue;
                                        return errorObj;
                                    } else {
                                        checkCancel(this);
                                        return reasonOrValue;
                                    }
                                }

                                Promise.prototype._passThrough = function (handler, type, success, fail) {
                                    if (typeof handler !== "function") return this.then();
                                    return this._then(success,
                                    fail,
                                    undefined,
                                    new PassThroughHandlerContext(this, type, handler),
                                    undefined);
                                };

                                Promise.prototype.lastly =
                                Promise.prototype["finally"] = function (handler) {
                                    return this._passThrough(handler,
                                    0,
                                    finallyHandler,
                                    finallyHandler);
                                };

                                Promise.prototype.tap = function (handler) {
                                    return this._passThrough(handler, 1, finallyHandler);
                                };

                                return PassThroughHandlerContext;
                            };

                        }, { "./util": 36 }], 16: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise,
                            apiRejection,
                            INTERNAL,
                            tryConvertToPromise,
                            Proxyable,
                            debug) {
                                var errors = _dereq_("./errors");
                                var TypeError = errors.TypeError;
                                var util = _dereq_("./util");
                                var errorObj = util.errorObj;
                                var tryCatch = util.tryCatch;
                                var yieldHandlers = [];

                                function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
                                    for (var i = 0; i < yieldHandlers.length; ++i) {
                                        traceParent._pushContext();
                                        var result = tryCatch(yieldHandlers[i])(value);
                                        traceParent._popContext();
                                        if (result === errorObj) {
                                            traceParent._pushContext();
                                            var ret = Promise.reject(errorObj.e);
                                            traceParent._popContext();
                                            return ret;
                                        }
                                        var maybePromise = tryConvertToPromise(result, traceParent);
                                        if (maybePromise instanceof Promise) return maybePromise;
                                    }
                                    return null;
                                }

                                function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
                                    var promise = this._promise = new Promise(INTERNAL);
                                    promise._captureStackTrace();
                                    promise._setOnCancel(this);
                                    this._stack = stack;
                                    this._generatorFunction = generatorFunction;
                                    this._receiver = receiver;
                                    this._generator = undefined;
                                    this._yieldHandlers = typeof yieldHandler === "function" ?
                                    [yieldHandler].concat(yieldHandlers) :
                                    yieldHandlers;
                                    this._yieldedPromise = null;
                                }
                                util.inherits(PromiseSpawn, Proxyable);

                                PromiseSpawn.prototype._isResolved = function () {
                                    return this._promise === null;
                                };

                                PromiseSpawn.prototype._cleanup = function () {
                                    this._promise = this._generator = null;
                                };

                                PromiseSpawn.prototype._promiseCancelled = function () {
                                    if (this._isResolved()) return;
                                    var implementsReturn = typeof this._generator["return"] !== "undefined";

                                    var result;
                                    if (!implementsReturn) {
                                        var reason = new Promise.CancellationError(
                                        "generator .return() sentinel");
                                        Promise.coroutine.returnSentinel = reason;
                                        this._promise._attachExtraTrace(reason);
                                        this._promise._pushContext();
                                        result = tryCatch(this._generator["throw"]).call(this._generator,
                                        reason);
                                        this._promise._popContext();
                                        if (result === errorObj && result.e === reason) {
                                            result = null;
                                        }
                                    } else {
                                        this._promise._pushContext();
                                        result = tryCatch(this._generator["return"]).call(this._generator,
                                        undefined);
                                        this._promise._popContext();
                                    }
                                    var promise = this._promise;
                                    this._cleanup();
                                    if (result === errorObj) {
                                        promise._rejectCallback(result.e, false);
                                    } else {
                                        promise.cancel();
                                    }
                                };

                                PromiseSpawn.prototype._promiseFulfilled = function (value) {
                                    this._yieldedPromise = null;
                                    this._promise._pushContext();
                                    var result = tryCatch(this._generator.next).call(this._generator, value);
                                    this._promise._popContext();
                                    this._continue(result);
                                };

                                PromiseSpawn.prototype._promiseRejected = function (reason) {
                                    this._yieldedPromise = null;
                                    this._promise._attachExtraTrace(reason);
                                    this._promise._pushContext();
                                    var result = tryCatch(this._generator["throw"]).
                                    call(this._generator, reason);
                                    this._promise._popContext();
                                    this._continue(result);
                                };

                                PromiseSpawn.prototype._resultCancelled = function () {
                                    if (this._yieldedPromise instanceof Promise) {
                                        var promise = this._yieldedPromise;
                                        this._yieldedPromise = null;
                                        promise.cancel();
                                    }
                                };

                                PromiseSpawn.prototype.promise = function () {
                                    return this._promise;
                                };

                                PromiseSpawn.prototype._run = function () {
                                    this._generator = this._generatorFunction.call(this._receiver);
                                    this._receiver =
                                    this._generatorFunction = undefined;
                                    this._promiseFulfilled(undefined);
                                };

                                PromiseSpawn.prototype._continue = function (result) {
                                    var promise = this._promise;
                                    if (result === errorObj) {
                                        this._cleanup();
                                        return promise._rejectCallback(result.e, false);
                                    }

                                    var value = result.value;
                                    if (result.done === true) {
                                        this._cleanup();
                                        return promise._resolveCallback(value);
                                    } else {
                                        var maybePromise = tryConvertToPromise(value, this._promise);
                                        if (!(maybePromise instanceof Promise)) {
                                            maybePromise =
                                            promiseFromYieldHandler(maybePromise,
                                            this._yieldHandlers,
                                            this._promise);
                                            if (maybePromise === null) {
                                                this._promiseRejected(
                                                new TypeError(
                                                "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", value) +
                                                "From coroutine:\n" +
                                                this._stack.split("\n").slice(1, -7).join("\n")));


                                                return;
                                            }
                                        }
                                        maybePromise = maybePromise._target();
                                        var bitField = maybePromise._bitField;
                                        ;
                                        if ((bitField & 50397184) === 0) {
                                            this._yieldedPromise = maybePromise;
                                            maybePromise._proxy(this, null);
                                        } else if ((bitField & 33554432) !== 0) {
                                            this._promiseFulfilled(maybePromise._value());
                                        } else if ((bitField & 16777216) !== 0) {
                                            this._promiseRejected(maybePromise._reason());
                                        } else {
                                            this._promiseCancelled();
                                        }
                                    }
                                };

                                Promise.coroutine = function (generatorFunction, options) {
                                    if (typeof generatorFunction !== "function") {
                                        throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    var yieldHandler = Object(options).yieldHandler;
                                    var PromiseSpawn$ = PromiseSpawn;
                                    var stack = new Error().stack;
                                    return function () {
                                        var generator = generatorFunction.apply(this, arguments);
                                        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
                                        stack);
                                        var ret = spawn.promise();
                                        spawn._generator = generator;
                                        spawn._promiseFulfilled(undefined);
                                        return ret;
                                    };
                                };

                                Promise.coroutine.addYieldHandler = function (fn) {
                                    if (typeof fn !== "function") {
                                        throw new TypeError("expecting a function but got " + util.classString(fn));
                                    }
                                    yieldHandlers.push(fn);
                                };

                                Promise.spawn = function (generatorFunction) {
                                    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
                                    if (typeof generatorFunction !== "function") {
                                        return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    var spawn = new PromiseSpawn(generatorFunction, this);
                                    var ret = spawn.promise();
                                    spawn._run(Promise.spawn);
                                    return ret;
                                };
                            };

                        }, { "./errors": 12, "./util": 36 }], 17: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports =
                            function (Promise, PromiseArray, tryConvertToPromise, INTERNAL) {
                                var util = _dereq_("./util");
                                var canEvaluate = util.canEvaluate;
                                var tryCatch = util.tryCatch;
                                var errorObj = util.errorObj;
                                var reject;

                                if (!true) {
                                    if (canEvaluate) {
                                        var thenCallback = function thenCallback(i) {
                                            return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
                                        };

                                        var promiseSetter = function promiseSetter(i) {
                                            return new Function("promise", "holder", "                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g, i));
                                        };

                                        var generateHolderClass = function generateHolderClass(total) {
                                            var props = new Array(total);
                                            for (var i = 0; i < props.length; ++i) {
                                                props[i] = "this.p" + (i + 1);
                                            }
                                            var assignment = props.join(" = ") + " = null;";
                                            var cancellationCode = "var promise;\n" + props.map(function (prop) {
                                                return "                                                         \n\
                promise = " + prop + ";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
                                            }).join("\n");
                                            var passedArguments = props.join(", ");
                                            var name = "Holder$" + total;


                                            var code = "return function(tryCatch, errorObj, Promise) {           \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.now = 0;                                                \n\
            }                                                                \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    promise._pushContext();                                  \n\
                    var callback = this.fn;                                  \n\
                    var ret = tryCatch(callback)([ThePassedArguments]);      \n\
                    promise._popContext();                                   \n\
                    if (ret === errorObj) {                                  \n\
                        promise._rejectCallback(ret.e, false);               \n\
                    } else {                                                 \n\
                        promise._resolveCallback(ret);                       \n\
                    }                                                        \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise);                                      \n\
        ";

                                            code = code.replace(/\[TheName\]/g, name).
                                            replace(/\[TheTotal\]/g, total).
                                            replace(/\[ThePassedArguments\]/g, passedArguments).
                                            replace(/\[TheProperties\]/g, assignment).
                                            replace(/\[CancellationCode\]/g, cancellationCode);

                                            return new Function("tryCatch", "errorObj", "Promise", code)(
                                            tryCatch, errorObj, Promise);
                                        };

                                        var holderClasses = [];
                                        var thenCallbacks = [];
                                        var promiseSetters = [];

                                        for (var i = 0; i < 8; ++i) {
                                            holderClasses.push(generateHolderClass(i + 1));
                                            thenCallbacks.push(thenCallback(i + 1));
                                            promiseSetters.push(promiseSetter(i + 1));
                                        }

                                        reject = function reject(reason) {
                                            this._reject(reason);
                                        };
                                    }}

                                Promise.join = function () {
                                    var last = arguments.length - 1;
                                    var fn;
                                    if (last > 0 && typeof arguments[last] === "function") {
                                        fn = arguments[last];
                                        if (!true) {
                                            if (last <= 8 && canEvaluate) {
                                                var ret = new Promise(INTERNAL);
                                                ret._captureStackTrace();
                                                var HolderClass = holderClasses[last - 1];
                                                var holder = new HolderClass(fn);
                                                var callbacks = thenCallbacks;

                                                for (var i = 0; i < last; ++i) {
                                                    var maybePromise = tryConvertToPromise(arguments[i], ret);
                                                    if (maybePromise instanceof Promise) {
                                                        maybePromise = maybePromise._target();
                                                        var bitField = maybePromise._bitField;
                                                        ;
                                                        if ((bitField & 50397184) === 0) {
                                                            maybePromise._then(callbacks[i], reject,
                                                            undefined, ret, holder);
                                                            promiseSetters[i](maybePromise, holder);
                                                        } else if ((bitField & 33554432) !== 0) {
                                                            callbacks[i].call(ret,
                                                            maybePromise._value(), holder);
                                                        } else if ((bitField & 16777216) !== 0) {
                                                            ret._reject(maybePromise._reason());
                                                        } else {
                                                            ret._cancel();
                                                        }
                                                    } else {
                                                        callbacks[i].call(ret, maybePromise, holder);
                                                    }
                                                }
                                                if (!ret._isFateSealed()) {
                                                    ret._setAsyncGuaranteed();
                                                    ret._setOnCancel(holder);
                                                }
                                                return ret;
                                            }
                                        }
                                    }
                                    var args = [].slice.call(arguments);;
                                    if (fn) args.pop();
                                    var ret = new PromiseArray(args).promise();
                                    return fn !== undefined ? ret.spread(fn) : ret;
                                };

                            };

                        }, { "./util": 36 }], 18: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise,
                            PromiseArray,
                            apiRejection,
                            tryConvertToPromise,
                            INTERNAL,
                            debug) {
                                var getDomain = Promise._getDomain;
                                var util = _dereq_("./util");
                                var tryCatch = util.tryCatch;
                                var errorObj = util.errorObj;
                                var EMPTY_ARRAY = [];

                                function MappingPromiseArray(promises, fn, limit, _filter) {
                                    this.constructor$(promises);
                                    this._promise._captureStackTrace();
                                    var domain = getDomain();
                                    this._callback = domain === null ? fn : domain.bind(fn);
                                    this._preservedValues = _filter === INTERNAL ?
                                    new Array(this.length()) :
                                    null;
                                    this._limit = limit;
                                    this._inFlight = 0;
                                    this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
                                    this._init$(undefined, -2);
                                }
                                util.inherits(MappingPromiseArray, PromiseArray);

                                MappingPromiseArray.prototype._init = function () {};

                                MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
                                    var values = this._values;
                                    var length = this.length();
                                    var preservedValues = this._preservedValues;
                                    var limit = this._limit;

                                    if (index < 0) {
                                        index = index * -1 - 1;
                                        values[index] = value;
                                        if (limit >= 1) {
                                            this._inFlight--;
                                            this._drainQueue();
                                            if (this._isResolved()) return true;
                                        }
                                    } else {
                                        if (limit >= 1 && this._inFlight >= limit) {
                                            values[index] = value;
                                            this._queue.push(index);
                                            return false;
                                        }
                                        if (preservedValues !== null) preservedValues[index] = value;

                                        var promise = this._promise;
                                        var callback = this._callback;
                                        var receiver = promise._boundValue();
                                        promise._pushContext();
                                        var ret = tryCatch(callback).call(receiver, value, index, length);
                                        var promiseCreated = promise._popContext();
                                        debug.checkForgottenReturns(
                                        ret,
                                        promiseCreated,
                                        preservedValues !== null ? "Promise.filter" : "Promise.map",
                                        promise);

                                        if (ret === errorObj) {
                                            this._reject(ret.e);
                                            return true;
                                        }

                                        var maybePromise = tryConvertToPromise(ret, this._promise);
                                        if (maybePromise instanceof Promise) {
                                            maybePromise = maybePromise._target();
                                            var bitField = maybePromise._bitField;
                                            ;
                                            if ((bitField & 50397184) === 0) {
                                                if (limit >= 1) this._inFlight++;
                                                values[index] = maybePromise;
                                                maybePromise._proxy(this, (index + 1) * -1);
                                                return false;
                                            } else if ((bitField & 33554432) !== 0) {
                                                ret = maybePromise._value();
                                            } else if ((bitField & 16777216) !== 0) {
                                                this._reject(maybePromise._reason());
                                                return true;
                                            } else {
                                                this._cancel();
                                                return true;
                                            }
                                        }
                                        values[index] = ret;
                                    }
                                    var totalResolved = ++this._totalResolved;
                                    if (totalResolved >= length) {
                                        if (preservedValues !== null) {
                                            this._filter(values, preservedValues);
                                        } else {
                                            this._resolve(values);
                                        }
                                        return true;
                                    }
                                    return false;
                                };

                                MappingPromiseArray.prototype._drainQueue = function () {
                                    var queue = this._queue;
                                    var limit = this._limit;
                                    var values = this._values;
                                    while (queue.length > 0 && this._inFlight < limit) {
                                        if (this._isResolved()) return;
                                        var index = queue.pop();
                                        this._promiseFulfilled(values[index], index);
                                    }
                                };

                                MappingPromiseArray.prototype._filter = function (booleans, values) {
                                    var len = values.length;
                                    var ret = new Array(len);
                                    var j = 0;
                                    for (var i = 0; i < len; ++i) {
                                        if (booleans[i]) ret[j++] = values[i];
                                    }
                                    ret.length = j;
                                    this._resolve(ret);
                                };

                                MappingPromiseArray.prototype.preservedValues = function () {
                                    return this._preservedValues;
                                };

                                function map(promises, fn, options, _filter) {
                                    if (typeof fn !== "function") {
                                        return apiRejection("expecting a function but got " + util.classString(fn));
                                    }
                                    var limit = (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" && options !== null ?
                                    options.concurrency :
                                    0;
                                    limit = typeof limit === "number" &&
                                    isFinite(limit) && limit >= 1 ? limit : 0;
                                    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
                                }

                                Promise.prototype.map = function (fn, options) {
                                    return map(this, fn, options, null);
                                };

                                Promise.map = function (promises, fn, options, _filter) {
                                    return map(promises, fn, options, _filter);
                                };


                            };

                        }, { "./util": 36 }], 19: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports =
                            function (Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
                                var util = _dereq_("./util");
                                var tryCatch = util.tryCatch;

                                Promise.method = function (fn) {
                                    if (typeof fn !== "function") {
                                        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
                                    }
                                    return function () {
                                        var ret = new Promise(INTERNAL);
                                        ret._captureStackTrace();
                                        ret._pushContext();
                                        var value = tryCatch(fn).apply(this, arguments);
                                        var promiseCreated = ret._popContext();
                                        debug.checkForgottenReturns(
                                        value, promiseCreated, "Promise.method", ret);
                                        ret._resolveFromSyncValue(value);
                                        return ret;
                                    };
                                };

                                Promise.attempt = Promise["try"] = function (fn) {
                                    if (typeof fn !== "function") {
                                        return apiRejection("expecting a function but got " + util.classString(fn));
                                    }
                                    var ret = new Promise(INTERNAL);
                                    ret._captureStackTrace();
                                    ret._pushContext();
                                    var value;
                                    if (arguments.length > 1) {
                                        debug.deprecated("calling Promise.try with more than 1 argument");
                                        var arg = arguments[1];
                                        var ctx = arguments[2];
                                        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) :
                                        tryCatch(fn).call(ctx, arg);
                                    } else {
                                        value = tryCatch(fn)();
                                    }
                                    var promiseCreated = ret._popContext();
                                    debug.checkForgottenReturns(
                                    value, promiseCreated, "Promise.try", ret);
                                    ret._resolveFromSyncValue(value);
                                    return ret;
                                };

                                Promise.prototype._resolveFromSyncValue = function (value) {
                                    if (value === util.errorObj) {
                                        this._rejectCallback(value.e, false);
                                    } else {
                                        this._resolveCallback(value, true);
                                    }
                                };
                            };

                        }, { "./util": 36 }], 20: [function (_dereq_, module, exports) {
                            "use strict";
                            var util = _dereq_("./util");
                            var maybeWrapAsError = util.maybeWrapAsError;
                            var errors = _dereq_("./errors");
                            var OperationalError = errors.OperationalError;
                            var es5 = _dereq_("./es5");

                            function isUntypedError(obj) {
                                return obj instanceof Error &&
                                es5.getPrototypeOf(obj) === Error.prototype;
                            }

                            var rErrorKey = /^(?:name|message|stack|cause)$/;
                            function wrapAsOperationalError(obj) {
                                var ret;
                                if (isUntypedError(obj)) {
                                    ret = new OperationalError(obj);
                                    ret.name = obj.name;
                                    ret.message = obj.message;
                                    ret.stack = obj.stack;
                                    var keys = es5.keys(obj);
                                    for (var i = 0; i < keys.length; ++i) {
                                        var key = keys[i];
                                        if (!rErrorKey.test(key)) {
                                            ret[key] = obj[key];
                                        }
                                    }
                                    return ret;
                                }
                                util.markAsOriginatingFromRejection(obj);
                                return obj;
                            }

                            function nodebackForPromise(promise, multiArgs) {
                                return function (err, value) {
                                    if (promise === null) return;
                                    if (err) {
                                        var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
                                        promise._attachExtraTrace(wrapped);
                                        promise._reject(wrapped);
                                    } else if (!multiArgs) {
                                        promise._fulfill(value);
                                    } else {
                                        var args = [].slice.call(arguments, 1);;
                                        promise._fulfill(args);
                                    }
                                    promise = null;
                                };
                            }

                            module.exports = nodebackForPromise;

                        }, { "./errors": 12, "./es5": 13, "./util": 36 }], 21: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise) {
                                var util = _dereq_("./util");
                                var async = Promise._async;
                                var tryCatch = util.tryCatch;
                                var errorObj = util.errorObj;

                                function spreadAdapter(val, nodeback) {
                                    var promise = this;
                                    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
                                    var ret =
                                    tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
                                    if (ret === errorObj) {
                                        async.throwLater(ret.e);
                                    }
                                }

                                function successAdapter(val, nodeback) {
                                    var promise = this;
                                    var receiver = promise._boundValue();
                                    var ret = val === undefined ?
                                    tryCatch(nodeback).call(receiver, null) :
                                    tryCatch(nodeback).call(receiver, null, val);
                                    if (ret === errorObj) {
                                        async.throwLater(ret.e);
                                    }
                                }
                                function errorAdapter(reason, nodeback) {
                                    var promise = this;
                                    if (!reason) {
                                        var newReason = new Error(reason + "");
                                        newReason.cause = reason;
                                        reason = newReason;
                                    }
                                    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
                                    if (ret === errorObj) {
                                        async.throwLater(ret.e);
                                    }
                                }

                                Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
                                options) {
                                    if (typeof nodeback == "function") {
                                        var adapter = successAdapter;
                                        if (options !== undefined && Object(options).spread) {
                                            adapter = spreadAdapter;
                                        }
                                        this._then(
                                        adapter,
                                        errorAdapter,
                                        undefined,
                                        this,
                                        nodeback);

                                    }
                                    return this;
                                };
                            };

                        }, { "./util": 36 }], 22: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function () {
                                var makeSelfResolutionError = function makeSelfResolutionError() {
                                    return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
                                };
                                var reflectHandler = function reflectHandler() {
                                    return new Promise.PromiseInspection(this._target());
                                };
                                var apiRejection = function apiRejection(msg) {
                                    return Promise.reject(new TypeError(msg));
                                };
                                function Proxyable() {}
                                var UNDEFINED_BINDING = {};
                                var util = _dereq_("./util");

                                var getDomain;
                                if (util.isNode) {
                                    getDomain = function getDomain() {
                                        var ret = process.domain;
                                        if (ret === undefined) ret = null;
                                        return ret;
                                    };
                                } else {
                                    getDomain = function getDomain() {
                                        return null;
                                    };
                                }
                                util.notEnumerableProp(Promise, "_getDomain", getDomain);

                                var es5 = _dereq_("./es5");
                                var Async = _dereq_("./async");
                                var async = new Async();
                                es5.defineProperty(Promise, "_async", { value: async });
                                var errors = _dereq_("./errors");
                                var TypeError = Promise.TypeError = errors.TypeError;
                                Promise.RangeError = errors.RangeError;
                                var CancellationError = Promise.CancellationError = errors.CancellationError;
                                Promise.TimeoutError = errors.TimeoutError;
                                Promise.OperationalError = errors.OperationalError;
                                Promise.RejectionError = errors.OperationalError;
                                Promise.AggregateError = errors.AggregateError;
                                var INTERNAL = function INTERNAL() {};
                                var APPLY = {};
                                var NEXT_FILTER = {};
                                var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
                                var PromiseArray =
                                _dereq_("./promise_array")(Promise, INTERNAL,
                                tryConvertToPromise, apiRejection, Proxyable);
                                var Context = _dereq_("./context")(Promise);

                                var createContext = Context.create;
                                var debug = _dereq_("./debuggability")(Promise, Context);
                                var CapturedTrace = debug.CapturedTrace;
                                var PassThroughHandlerContext =
                                _dereq_("./finally")(Promise, tryConvertToPromise);
                                var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
                                var nodebackForPromise = _dereq_("./nodeback");
                                var errorObj = util.errorObj;
                                var tryCatch = util.tryCatch;
                                function check(self, executor) {
                                    if (typeof executor !== "function") {
                                        throw new TypeError("expecting a function but got " + util.classString(executor));
                                    }
                                    if (self.constructor !== Promise) {
                                        throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                }

                                function Promise(executor) {
                                    this._bitField = 0;
                                    this._fulfillmentHandler0 = undefined;
                                    this._rejectionHandler0 = undefined;
                                    this._promise0 = undefined;
                                    this._receiver0 = undefined;
                                    if (executor !== INTERNAL) {
                                        check(this, executor);
                                        this._resolveFromExecutor(executor);
                                    }
                                    this._promiseCreated();
                                    this._fireEvent("promiseCreated", this);
                                }

                                Promise.prototype.toString = function () {
                                    return "[object Promise]";
                                };

                                Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
                                    var len = arguments.length;
                                    if (len > 1) {
                                        var catchInstances = new Array(len - 1),
                                        j = 0,i;
                                        for (i = 0; i < len - 1; ++i) {
                                            var item = arguments[i];
                                            if (util.isObject(item)) {
                                                catchInstances[j++] = item;
                                            } else {
                                                return apiRejection("expecting an object but got " + util.classString(item));
                                            }
                                        }
                                        catchInstances.length = j;
                                        fn = arguments[i];
                                        return this.then(undefined, catchFilter(catchInstances, fn, this));
                                    }
                                    return this.then(undefined, fn);
                                };

                                Promise.prototype.reflect = function () {
                                    return this._then(reflectHandler,
                                    reflectHandler, undefined, this, undefined);
                                };

                                Promise.prototype.then = function (didFulfill, didReject) {
                                    if (debug.warnings() && arguments.length > 0 &&
                                    typeof didFulfill !== "function" &&
                                    typeof didReject !== "function") {
                                        var msg = ".then() only accepts functions but was passed: " +
                                        util.classString(didFulfill);
                                        if (arguments.length > 1) {
                                            msg += ", " + util.classString(didReject);
                                        }
                                        this._warn(msg);
                                    }
                                    return this._then(didFulfill, didReject, undefined, undefined, undefined);
                                };

                                Promise.prototype.done = function (didFulfill, didReject) {
                                    var promise =
                                    this._then(didFulfill, didReject, undefined, undefined, undefined);
                                    promise._setIsFinal();
                                };

                                Promise.prototype.spread = function (fn) {
                                    if (typeof fn !== "function") {
                                        return apiRejection("expecting a function but got " + util.classString(fn));
                                    }
                                    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
                                };

                                Promise.prototype.toJSON = function () {
                                    var ret = {
                                        isFulfilled: false,
                                        isRejected: false,
                                        fulfillmentValue: undefined,
                                        rejectionReason: undefined };

                                    if (this.isFulfilled()) {
                                        ret.fulfillmentValue = this.value();
                                        ret.isFulfilled = true;
                                    } else if (this.isRejected()) {
                                        ret.rejectionReason = this.reason();
                                        ret.isRejected = true;
                                    }
                                    return ret;
                                };

                                Promise.prototype.all = function () {
                                    if (arguments.length > 0) {
                                        this._warn(".all() was passed arguments but it does not take any");
                                    }
                                    return new PromiseArray(this).promise();
                                };

                                Promise.prototype.error = function (fn) {
                                    return this.caught(util.originatesFromRejection, fn);
                                };

                                Promise.is = function (val) {
                                    return val instanceof Promise;
                                };

                                Promise.fromNode = Promise.fromCallback = function (fn) {
                                    var ret = new Promise(INTERNAL);
                                    ret._captureStackTrace();
                                    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs :
                                    false;
                                    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
                                    if (result === errorObj) {
                                        ret._rejectCallback(result.e, true);
                                    }
                                    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
                                    return ret;
                                };

                                Promise.all = function (promises) {
                                    return new PromiseArray(promises).promise();
                                };

                                Promise.cast = function (obj) {
                                    var ret = tryConvertToPromise(obj);
                                    if (!(ret instanceof Promise)) {
                                        ret = new Promise(INTERNAL);
                                        ret._captureStackTrace();
                                        ret._setFulfilled();
                                        ret._rejectionHandler0 = obj;
                                    }
                                    return ret;
                                };

                                Promise.resolve = Promise.fulfilled = Promise.cast;

                                Promise.reject = Promise.rejected = function (reason) {
                                    var ret = new Promise(INTERNAL);
                                    ret._captureStackTrace();
                                    ret._rejectCallback(reason, true);
                                    return ret;
                                };

                                Promise.setScheduler = function (fn) {
                                    if (typeof fn !== "function") {
                                        throw new TypeError("expecting a function but got " + util.classString(fn));
                                    }
                                    var prev = async._schedule;
                                    async._schedule = fn;
                                    return prev;
                                };

                                Promise.prototype._then = function (
                                didFulfill,
                                didReject,
                                _, receiver,
                                internalData)
                                {
                                    var haveInternalData = internalData !== undefined;
                                    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
                                    var target = this._target();
                                    var bitField = target._bitField;

                                    if (!haveInternalData) {
                                        promise._propagateFrom(this, 3);
                                        promise._captureStackTrace();
                                        if (receiver === undefined &&
                                        (this._bitField & 2097152) !== 0) {
                                            if (!((bitField & 50397184) === 0)) {
                                                receiver = this._boundValue();
                                            } else {
                                                receiver = target === this ? undefined : this._boundTo;
                                            }
                                        }
                                        this._fireEvent("promiseChained", this, promise);
                                    }

                                    var domain = getDomain();
                                    if (!((bitField & 50397184) === 0)) {
                                        var handler,value,settler = target._settlePromiseCtx;
                                        if ((bitField & 33554432) !== 0) {
                                            value = target._rejectionHandler0;
                                            handler = didFulfill;
                                        } else if ((bitField & 16777216) !== 0) {
                                            value = target._fulfillmentHandler0;
                                            handler = didReject;
                                            target._unsetRejectionIsUnhandled();
                                        } else {
                                            settler = target._settlePromiseLateCancellationObserver;
                                            value = new CancellationError("late cancellation observer");
                                            target._attachExtraTrace(value);
                                            handler = didReject;
                                        }

                                        async.invoke(settler, target, {
                                            handler: domain === null ? handler :
                                            typeof handler === "function" && domain.bind(handler),
                                            promise: promise,
                                            receiver: receiver,
                                            value: value });

                                    } else {
                                        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
                                    }

                                    return promise;
                                };

                                Promise.prototype._length = function () {
                                    return this._bitField & 65535;
                                };

                                Promise.prototype._isFateSealed = function () {
                                    return (this._bitField & 117506048) !== 0;
                                };

                                Promise.prototype._isFollowing = function () {
                                    return (this._bitField & 67108864) === 67108864;
                                };

                                Promise.prototype._setLength = function (len) {
                                    this._bitField = this._bitField & -65536 |
                                    len & 65535;
                                };

                                Promise.prototype._setFulfilled = function () {
                                    this._bitField = this._bitField | 33554432;
                                    this._fireEvent("promiseFulfilled", this);
                                };

                                Promise.prototype._setRejected = function () {
                                    this._bitField = this._bitField | 16777216;
                                    this._fireEvent("promiseRejected", this);
                                };

                                Promise.prototype._setFollowing = function () {
                                    this._bitField = this._bitField | 67108864;
                                    this._fireEvent("promiseResolved", this);
                                };

                                Promise.prototype._setIsFinal = function () {
                                    this._bitField = this._bitField | 4194304;
                                };

                                Promise.prototype._isFinal = function () {
                                    return (this._bitField & 4194304) > 0;
                                };

                                Promise.prototype._unsetCancelled = function () {
                                    this._bitField = this._bitField & ~65536;
                                };

                                Promise.prototype._setCancelled = function () {
                                    this._bitField = this._bitField | 65536;
                                    this._fireEvent("promiseCancelled", this);
                                };

                                Promise.prototype._setAsyncGuaranteed = function () {
                                    this._bitField = this._bitField | 134217728;
                                };

                                Promise.prototype._receiverAt = function (index) {
                                    var ret = index === 0 ? this._receiver0 : this[
                                    index * 4 - 4 + 3];
                                    if (ret === UNDEFINED_BINDING) {
                                        return undefined;
                                    } else if (ret === undefined && this._isBound()) {
                                        return this._boundValue();
                                    }
                                    return ret;
                                };

                                Promise.prototype._promiseAt = function (index) {
                                    return this[
                                    index * 4 - 4 + 2];
                                };

                                Promise.prototype._fulfillmentHandlerAt = function (index) {
                                    return this[
                                    index * 4 - 4 + 0];
                                };

                                Promise.prototype._rejectionHandlerAt = function (index) {
                                    return this[
                                    index * 4 - 4 + 1];
                                };

                                Promise.prototype._boundValue = function () {};

                                Promise.prototype._migrateCallback0 = function (follower) {
                                    var bitField = follower._bitField;
                                    var fulfill = follower._fulfillmentHandler0;
                                    var reject = follower._rejectionHandler0;
                                    var promise = follower._promise0;
                                    var receiver = follower._receiverAt(0);
                                    if (receiver === undefined) receiver = UNDEFINED_BINDING;
                                    this._addCallbacks(fulfill, reject, promise, receiver, null);
                                };

                                Promise.prototype._migrateCallbackAt = function (follower, index) {
                                    var fulfill = follower._fulfillmentHandlerAt(index);
                                    var reject = follower._rejectionHandlerAt(index);
                                    var promise = follower._promiseAt(index);
                                    var receiver = follower._receiverAt(index);
                                    if (receiver === undefined) receiver = UNDEFINED_BINDING;
                                    this._addCallbacks(fulfill, reject, promise, receiver, null);
                                };

                                Promise.prototype._addCallbacks = function (
                                fulfill,
                                reject,
                                promise,
                                receiver,
                                domain)
                                {
                                    var index = this._length();

                                    if (index >= 65535 - 4) {
                                        index = 0;
                                        this._setLength(0);
                                    }

                                    if (index === 0) {
                                        this._promise0 = promise;
                                        this._receiver0 = receiver;
                                        if (typeof fulfill === "function") {
                                            this._fulfillmentHandler0 =
                                            domain === null ? fulfill : domain.bind(fulfill);
                                        }
                                        if (typeof reject === "function") {
                                            this._rejectionHandler0 =
                                            domain === null ? reject : domain.bind(reject);
                                        }
                                    } else {
                                        var base = index * 4 - 4;
                                        this[base + 2] = promise;
                                        this[base + 3] = receiver;
                                        if (typeof fulfill === "function") {
                                            this[base + 0] =
                                            domain === null ? fulfill : domain.bind(fulfill);
                                        }
                                        if (typeof reject === "function") {
                                            this[base + 1] =
                                            domain === null ? reject : domain.bind(reject);
                                        }
                                    }
                                    this._setLength(index + 1);
                                    return index;
                                };

                                Promise.prototype._proxy = function (proxyable, arg) {
                                    this._addCallbacks(undefined, undefined, arg, proxyable, null);
                                };

                                Promise.prototype._resolveCallback = function (value, shouldBind) {
                                    if ((this._bitField & 117506048) !== 0) return;
                                    if (value === this)
                                    return this._rejectCallback(makeSelfResolutionError(), false);
                                    var maybePromise = tryConvertToPromise(value, this);
                                    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

                                    if (shouldBind) this._propagateFrom(maybePromise, 2);

                                    var promise = maybePromise._target();
                                    var bitField = promise._bitField;
                                    if ((bitField & 50397184) === 0) {
                                        var len = this._length();
                                        if (len > 0) promise._migrateCallback0(this);
                                        for (var i = 1; i < len; ++i) {
                                            promise._migrateCallbackAt(this, i);
                                        }
                                        this._setFollowing();
                                        this._setLength(0);
                                        this._setFollowee(promise);
                                    } else if ((bitField & 33554432) !== 0) {
                                        this._fulfill(promise._value());
                                    } else if ((bitField & 16777216) !== 0) {
                                        this._reject(promise._reason());
                                    } else {
                                        var reason = new CancellationError("late cancellation observer");
                                        promise._attachExtraTrace(reason);
                                        this._reject(reason);
                                    }
                                };

                                Promise.prototype._rejectCallback =
                                function (reason, synchronous, ignoreNonErrorWarnings) {
                                    var trace = util.ensureErrorObject(reason);
                                    var hasStack = trace === reason;
                                    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
                                        var message = "a promise was rejected with a non-error: " +
                                        util.classString(reason);
                                        this._warn(message, true);
                                    }
                                    this._attachExtraTrace(trace, synchronous ? hasStack : false);
                                    this._reject(reason);
                                };

                                Promise.prototype._resolveFromExecutor = function (executor) {
                                    var promise = this;
                                    this._captureStackTrace();
                                    this._pushContext();
                                    var synchronous = true;
                                    var r = this._execute(executor, function (value) {
                                        promise._resolveCallback(value);
                                    }, function (reason) {
                                        promise._rejectCallback(reason, synchronous);
                                    });
                                    synchronous = false;
                                    this._popContext();

                                    if (r !== undefined) {
                                        promise._rejectCallback(r, true);
                                    }
                                };

                                Promise.prototype._settlePromiseFromHandler = function (
                                handler, receiver, value, promise)
                                {
                                    var bitField = promise._bitField;
                                    if ((bitField & 65536) !== 0) return;
                                    promise._pushContext();
                                    var x;
                                    if (receiver === APPLY) {
                                        if (!value || typeof value.length !== "number") {
                                            x = errorObj;
                                            x.e = new TypeError("cannot .spread() a non-array: " +
                                            util.classString(value));
                                        } else {
                                            x = tryCatch(handler).apply(this._boundValue(), value);
                                        }
                                    } else {
                                        x = tryCatch(handler).call(receiver, value);
                                    }
                                    var promiseCreated = promise._popContext();
                                    bitField = promise._bitField;
                                    if ((bitField & 65536) !== 0) return;

                                    if (x === NEXT_FILTER) {
                                        promise._reject(value);
                                    } else if (x === errorObj || x === promise) {
                                        var err = x === promise ? makeSelfResolutionError() : x.e;
                                        promise._rejectCallback(err, false);
                                    } else {
                                        debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
                                        promise._resolveCallback(x);
                                    }
                                };

                                Promise.prototype._target = function () {
                                    var ret = this;
                                    while (ret._isFollowing()) {ret = ret._followee();}
                                    return ret;
                                };

                                Promise.prototype._followee = function () {
                                    return this._rejectionHandler0;
                                };

                                Promise.prototype._setFollowee = function (promise) {
                                    this._rejectionHandler0 = promise;
                                };

                                Promise.prototype._settlePromise = function (promise, handler, receiver, value) {
                                    var isPromise = promise instanceof Promise;
                                    var bitField = this._bitField;
                                    var asyncGuaranteed = (bitField & 134217728) !== 0;
                                    if ((bitField & 65536) !== 0) {
                                        if (isPromise) promise._invokeInternalOnCancel();

                                        if (receiver instanceof PassThroughHandlerContext &&
                                        receiver.isFinallyHandler()) {
                                            receiver.cancelPromise = promise;
                                            if (tryCatch(handler).call(receiver, value) === errorObj) {
                                                promise._reject(errorObj.e);
                                            }
                                        } else if (handler === reflectHandler) {
                                            promise._fulfill(reflectHandler.call(receiver));
                                        } else if (receiver instanceof Proxyable) {
                                            receiver._promiseCancelled(promise);
                                        } else if (isPromise || promise instanceof PromiseArray) {
                                            promise._cancel();
                                        } else {
                                            receiver.cancel();
                                        }
                                    } else if (typeof handler === "function") {
                                        if (!isPromise) {
                                            handler.call(receiver, value, promise);
                                        } else {
                                            if (asyncGuaranteed) promise._setAsyncGuaranteed();
                                            this._settlePromiseFromHandler(handler, receiver, value, promise);
                                        }
                                    } else if (receiver instanceof Proxyable) {
                                        if (!receiver._isResolved()) {
                                            if ((bitField & 33554432) !== 0) {
                                                receiver._promiseFulfilled(value, promise);
                                            } else {
                                                receiver._promiseRejected(value, promise);
                                            }
                                        }
                                    } else if (isPromise) {
                                        if (asyncGuaranteed) promise._setAsyncGuaranteed();
                                        if ((bitField & 33554432) !== 0) {
                                            promise._fulfill(value);
                                        } else {
                                            promise._reject(value);
                                        }
                                    }
                                };

                                Promise.prototype._settlePromiseLateCancellationObserver = function (ctx) {
                                    var handler = ctx.handler;
                                    var promise = ctx.promise;
                                    var receiver = ctx.receiver;
                                    var value = ctx.value;
                                    if (typeof handler === "function") {
                                        if (!(promise instanceof Promise)) {
                                            handler.call(receiver, value, promise);
                                        } else {
                                            this._settlePromiseFromHandler(handler, receiver, value, promise);
                                        }
                                    } else if (promise instanceof Promise) {
                                        promise._reject(value);
                                    }
                                };

                                Promise.prototype._settlePromiseCtx = function (ctx) {
                                    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
                                };

                                Promise.prototype._settlePromise0 = function (handler, value, bitField) {
                                    var promise = this._promise0;
                                    var receiver = this._receiverAt(0);
                                    this._promise0 = undefined;
                                    this._receiver0 = undefined;
                                    this._settlePromise(promise, handler, receiver, value);
                                };

                                Promise.prototype._clearCallbackDataAtIndex = function (index) {
                                    var base = index * 4 - 4;
                                    this[base + 2] =
                                    this[base + 3] =
                                    this[base + 0] =
                                    this[base + 1] = undefined;
                                };

                                Promise.prototype._fulfill = function (value) {
                                    var bitField = this._bitField;
                                    if ((bitField & 117506048) >>> 16) return;
                                    if (value === this) {
                                        var err = makeSelfResolutionError();
                                        this._attachExtraTrace(err);
                                        return this._reject(err);
                                    }
                                    this._setFulfilled();
                                    this._rejectionHandler0 = value;

                                    if ((bitField & 65535) > 0) {
                                        if ((bitField & 134217728) !== 0) {
                                            this._settlePromises();
                                        } else {
                                            async.settlePromises(this);
                                        }
                                    }
                                };

                                Promise.prototype._reject = function (reason) {
                                    var bitField = this._bitField;
                                    if ((bitField & 117506048) >>> 16) return;
                                    this._setRejected();
                                    this._fulfillmentHandler0 = reason;

                                    if (this._isFinal()) {
                                        return async.fatalError(reason, util.isNode);
                                    }

                                    if ((bitField & 65535) > 0) {
                                        if ((bitField & 134217728) !== 0) {
                                            this._settlePromises();
                                        } else {
                                            async.settlePromises(this);
                                        }
                                    } else {
                                        this._ensurePossibleRejectionHandled();
                                    }
                                };

                                Promise.prototype._fulfillPromises = function (len, value) {
                                    for (var i = 1; i < len; i++) {
                                        var handler = this._fulfillmentHandlerAt(i);
                                        var promise = this._promiseAt(i);
                                        var receiver = this._receiverAt(i);
                                        this._clearCallbackDataAtIndex(i);
                                        this._settlePromise(promise, handler, receiver, value);
                                    }
                                };

                                Promise.prototype._rejectPromises = function (len, reason) {
                                    for (var i = 1; i < len; i++) {
                                        var handler = this._rejectionHandlerAt(i);
                                        var promise = this._promiseAt(i);
                                        var receiver = this._receiverAt(i);
                                        this._clearCallbackDataAtIndex(i);
                                        this._settlePromise(promise, handler, receiver, reason);
                                    }
                                };

                                Promise.prototype._settlePromises = function () {
                                    var bitField = this._bitField;
                                    var len = bitField & 65535;

                                    if (len > 0) {
                                        if ((bitField & 16842752) !== 0) {
                                            var reason = this._fulfillmentHandler0;
                                            this._settlePromise0(this._rejectionHandler0, reason, bitField);
                                            this._rejectPromises(len, reason);
                                        } else {
                                            var value = this._rejectionHandler0;
                                            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                                            this._fulfillPromises(len, value);
                                        }
                                        this._setLength(0);
                                    }
                                    this._clearCancellationData();
                                };

                                Promise.prototype._settledValue = function () {
                                    var bitField = this._bitField;
                                    if ((bitField & 33554432) !== 0) {
                                        return this._rejectionHandler0;
                                    } else if ((bitField & 16777216) !== 0) {
                                        return this._fulfillmentHandler0;
                                    }
                                };

                                function deferResolve(v) {this.promise._resolveCallback(v);}
                                function deferReject(v) {this.promise._rejectCallback(v, false);}

                                Promise.defer = Promise.pending = function () {
                                    debug.deprecated("Promise.defer", "new Promise");
                                    var promise = new Promise(INTERNAL);
                                    return {
                                        promise: promise,
                                        resolve: deferResolve,
                                        reject: deferReject };

                                };

                                util.notEnumerableProp(Promise,
                                "_makeSelfResolutionError",
                                makeSelfResolutionError);

                                _dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection,
                                debug);
                                _dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
                                _dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
                                _dereq_("./direct_resolve")(Promise);
                                _dereq_("./synchronous_inspection")(Promise);
                                _dereq_("./join")(
                                Promise, PromiseArray, tryConvertToPromise, INTERNAL, debug);
                                Promise.Promise = Promise;
                                _dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
                                _dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
                                _dereq_('./timers.js')(Promise, INTERNAL, debug);
                                _dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
                                _dereq_('./nodeify.js')(Promise);
                                _dereq_('./call_get.js')(Promise);
                                _dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
                                _dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
                                _dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
                                _dereq_('./settle.js')(Promise, PromiseArray, debug);
                                _dereq_('./some.js')(Promise, PromiseArray, apiRejection);
                                _dereq_('./promisify.js')(Promise, INTERNAL);
                                _dereq_('./any.js')(Promise);
                                _dereq_('./each.js')(Promise, INTERNAL);
                                _dereq_('./filter.js')(Promise, INTERNAL);

                                util.toFastProperties(Promise);
                                util.toFastProperties(Promise.prototype);
                                function fillTypes(value) {
                                    var p = new Promise(INTERNAL);
                                    p._fulfillmentHandler0 = value;
                                    p._rejectionHandler0 = value;
                                    p._promise0 = value;
                                    p._receiver0 = value;
                                }


                                fillTypes({ a: 1 });
                                fillTypes({ b: 2 });
                                fillTypes({ c: 3 });
                                fillTypes(1);
                                fillTypes(function () {});
                                fillTypes(undefined);
                                fillTypes(false);
                                fillTypes(new Promise(INTERNAL));
                                debug.setBounds(Async.firstLineError, util.lastLineError);
                                return Promise;

                            };

                        }, { "./any.js": 1, "./async": 2, "./bind": 3, "./call_get.js": 5, "./cancel": 6, "./catch_filter": 7, "./context": 8, "./debuggability": 9, "./direct_resolve": 10, "./each.js": 11, "./errors": 12, "./es5": 13, "./filter.js": 14, "./finally": 15, "./generators.js": 16, "./join": 17, "./map.js": 18, "./method": 19, "./nodeback": 20, "./nodeify.js": 21, "./promise_array": 23, "./promisify.js": 24, "./props.js": 25, "./race.js": 27, "./reduce.js": 28, "./settle.js": 30, "./some.js": 31, "./synchronous_inspection": 32, "./thenables": 33, "./timers.js": 34, "./using.js": 35, "./util": 36 }], 23: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL, tryConvertToPromise,
                            apiRejection, Proxyable) {
                                var util = _dereq_("./util");
                                var isArray = util.isArray;

                                function toResolutionValue(val) {
                                    switch (val) {
                                        case -2:return [];
                                        case -3:return {};}

                                }

                                function PromiseArray(values) {
                                    var promise = this._promise = new Promise(INTERNAL);
                                    if (values instanceof Promise) {
                                        promise._propagateFrom(values, 3);
                                    }
                                    promise._setOnCancel(this);
                                    this._values = values;
                                    this._length = 0;
                                    this._totalResolved = 0;
                                    this._init(undefined, -2);
                                }
                                util.inherits(PromiseArray, Proxyable);

                                PromiseArray.prototype.length = function () {
                                    return this._length;
                                };

                                PromiseArray.prototype.promise = function () {
                                    return this._promise;
                                };

                                PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
                                    var values = tryConvertToPromise(this._values, this._promise);
                                    if (values instanceof Promise) {
                                        values = values._target();
                                        var bitField = values._bitField;
                                        ;
                                        this._values = values;

                                        if ((bitField & 50397184) === 0) {
                                            this._promise._setAsyncGuaranteed();
                                            return values._then(
                                            init,
                                            this._reject,
                                            undefined,
                                            this,
                                            resolveValueIfEmpty);

                                        } else if ((bitField & 33554432) !== 0) {
                                            values = values._value();
                                        } else if ((bitField & 16777216) !== 0) {
                                            return this._reject(values._reason());
                                        } else {
                                            return this._cancel();
                                        }
                                    }
                                    values = util.asArray(values);
                                    if (values === null) {
                                        var err = apiRejection(
                                        "expecting an array or an iterable object but got " + util.classString(values)).reason();
                                        this._promise._rejectCallback(err, false);
                                        return;
                                    }

                                    if (values.length === 0) {
                                        if (resolveValueIfEmpty === -5) {
                                            this._resolveEmptyArray();
                                        } else
                                        {
                                            this._resolve(toResolutionValue(resolveValueIfEmpty));
                                        }
                                        return;
                                    }
                                    this._iterate(values);
                                };

                                PromiseArray.prototype._iterate = function (values) {
                                    var len = this.getActualLength(values.length);
                                    this._length = len;
                                    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
                                    var result = this._promise;
                                    var isResolved = false;
                                    var bitField = null;
                                    for (var i = 0; i < len; ++i) {
                                        var maybePromise = tryConvertToPromise(values[i], result);

                                        if (maybePromise instanceof Promise) {
                                            maybePromise = maybePromise._target();
                                            bitField = maybePromise._bitField;
                                        } else {
                                            bitField = null;
                                        }

                                        if (isResolved) {
                                            if (bitField !== null) {
                                                maybePromise.suppressUnhandledRejections();
                                            }
                                        } else if (bitField !== null) {
                                            if ((bitField & 50397184) === 0) {
                                                maybePromise._proxy(this, i);
                                                this._values[i] = maybePromise;
                                            } else if ((bitField & 33554432) !== 0) {
                                                isResolved = this._promiseFulfilled(maybePromise._value(), i);
                                            } else if ((bitField & 16777216) !== 0) {
                                                isResolved = this._promiseRejected(maybePromise._reason(), i);
                                            } else {
                                                isResolved = this._promiseCancelled(i);
                                            }
                                        } else {
                                            isResolved = this._promiseFulfilled(maybePromise, i);
                                        }
                                    }
                                    if (!isResolved) result._setAsyncGuaranteed();
                                };

                                PromiseArray.prototype._isResolved = function () {
                                    return this._values === null;
                                };

                                PromiseArray.prototype._resolve = function (value) {
                                    this._values = null;
                                    this._promise._fulfill(value);
                                };

                                PromiseArray.prototype._cancel = function () {
                                    if (this._isResolved() || !this._promise.isCancellable()) return;
                                    this._values = null;
                                    this._promise._cancel();
                                };

                                PromiseArray.prototype._reject = function (reason) {
                                    this._values = null;
                                    this._promise._rejectCallback(reason, false);
                                };

                                PromiseArray.prototype._promiseFulfilled = function (value, index) {
                                    this._values[index] = value;
                                    var totalResolved = ++this._totalResolved;
                                    if (totalResolved >= this._length) {
                                        this._resolve(this._values);
                                        return true;
                                    }
                                    return false;
                                };

                                PromiseArray.prototype._promiseCancelled = function () {
                                    this._cancel();
                                    return true;
                                };

                                PromiseArray.prototype._promiseRejected = function (reason) {
                                    this._totalResolved++;
                                    this._reject(reason);
                                    return true;
                                };

                                PromiseArray.prototype._resultCancelled = function () {
                                    if (this._isResolved()) return;
                                    var values = this._values;
                                    this._cancel();
                                    if (values instanceof Promise) {
                                        values.cancel();
                                    } else {
                                        for (var i = 0; i < values.length; ++i) {
                                            if (values[i] instanceof Promise) {
                                                values[i].cancel();
                                            }
                                        }
                                    }
                                };

                                PromiseArray.prototype.shouldCopyValues = function () {
                                    return true;
                                };

                                PromiseArray.prototype.getActualLength = function (len) {
                                    return len;
                                };

                                return PromiseArray;
                            };

                        }, { "./util": 36 }], 24: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL) {
                                var THIS = {};
                                var util = _dereq_("./util");
                                var nodebackForPromise = _dereq_("./nodeback");
                                var withAppended = util.withAppended;
                                var maybeWrapAsError = util.maybeWrapAsError;
                                var canEvaluate = util.canEvaluate;
                                var TypeError = _dereq_("./errors").TypeError;
                                var defaultSuffix = "Async";
                                var defaultPromisified = { __isPromisified__: true };
                                var noCopyProps = [
                                "arity", "length",
                                "name",
                                "arguments",
                                "caller",
                                "callee",
                                "prototype",
                                "__isPromisified__"];

                                var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

                                var defaultFilter = function defaultFilter(name) {
                                    return util.isIdentifier(name) &&
                                    name.charAt(0) !== "_" &&
                                    name !== "constructor";
                                };

                                function propsFilter(key) {
                                    return !noCopyPropsPattern.test(key);
                                }

                                function isPromisified(fn) {
                                    try {
                                        return fn.__isPromisified__ === true;
                                    }
                                    catch (e) {
                                        return false;
                                    }
                                }

                                function hasPromisified(obj, key, suffix) {
                                    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                    defaultPromisified);
                                    return val ? isPromisified(val) : false;
                                }
                                function checkValid(ret, suffix, suffixRegexp) {
                                    for (var i = 0; i < ret.length; i += 2) {
                                        var key = ret[i];
                                        if (suffixRegexp.test(key)) {
                                            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
                                            for (var j = 0; j < ret.length; j += 2) {
                                                if (ret[j] === keyWithoutAsyncSuffix) {
                                                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".
                                                    replace("%s", suffix));
                                                }
                                            }
                                        }
                                    }
                                }

                                function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
                                    var keys = util.inheritedDataKeys(obj);
                                    var ret = [];
                                    for (var i = 0; i < keys.length; ++i) {
                                        var key = keys[i];
                                        var value = obj[key];
                                        var passesDefaultFilter = filter === defaultFilter ?
                                        true : defaultFilter(key, value, obj);
                                        if (typeof value === "function" &&
                                        !isPromisified(value) &&
                                        !hasPromisified(obj, key, suffix) &&
                                        filter(key, value, obj, passesDefaultFilter)) {
                                            ret.push(key, value);
                                        }
                                    }
                                    checkValid(ret, suffix, suffixRegexp);
                                    return ret;
                                }

                                var escapeIdentRegex = function escapeIdentRegex(str) {
                                    return str.replace(/([$])/, "\\$");
                                };

                                var makeNodePromisifiedEval;
                                if (!true) {
                                    var switchCaseArgumentOrder = function switchCaseArgumentOrder(likelyArgumentCount) {
                                        var ret = [likelyArgumentCount];
                                        var min = Math.max(0, likelyArgumentCount - 1 - 3);
                                        for (var i = likelyArgumentCount - 1; i >= min; --i) {
                                            ret.push(i);
                                        }
                                        for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
                                            ret.push(i);
                                        }
                                        return ret;
                                    };

                                    var argumentSequence = function argumentSequence(argumentCount) {
                                        return util.filledRange(argumentCount, "_arg", "");
                                    };

                                    var parameterDeclaration = function parameterDeclaration(parameterCount) {
                                        return util.filledRange(
                                        Math.max(parameterCount, 3), "_arg", "");
                                    };

                                    var parameterCount = function parameterCount(fn) {
                                        if (typeof fn.length === "number") {
                                            return Math.max(Math.min(fn.length, 1023 + 1), 0);
                                        }
                                        return 0;
                                    };

                                    makeNodePromisifiedEval =
                                    function makeNodePromisifiedEval(callback, receiver, originalName, fn, _, multiArgs) {
                                        var newParameterCount = Math.max(0, parameterCount(fn) - 1);
                                        var argumentOrder = switchCaseArgumentOrder(newParameterCount);
                                        var shouldProxyThis = typeof callback === "string" || receiver === THIS;

                                        function generateCallForArgumentCount(count) {
                                            var args = argumentSequence(count).join(", ");
                                            var comma = count > 0 ? ", " : "";
                                            var ret;
                                            if (shouldProxyThis) {
                                                ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
                                            } else {
                                                ret = receiver === undefined ?
                                                "ret = callback({{args}}, nodeback); break;\n" :
                                                "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
                                            }
                                            return ret.replace("{{args}}", args).replace(", ", comma);
                                        }

                                        function generateArgumentSwitchCase() {
                                            var ret = "";
                                            for (var i = 0; i < argumentOrder.length; ++i) {
                                                ret += "case " + argumentOrder[i] + ":" +
                                                generateCallForArgumentCount(argumentOrder[i]);
                                            }

                                            ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", shouldProxyThis ?
                                            "ret = callback.apply(this, args);\n" :
                                            "ret = callback.apply(receiver, args);\n");
                                            return ret;
                                        }

                                        var getFunctionCode = typeof callback === "string" ?
                                        "this != null ? this['" + callback + "'] : fn" :
                                        "fn";
                                        var body = "'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).
                                        replace("[GetFunctionCode]", getFunctionCode);
                                        body = body.replace("Parameters", parameterDeclaration(newParameterCount));
                                        return new Function("Promise",
                                        "fn",
                                        "receiver",
                                        "withAppended",
                                        "maybeWrapAsError",
                                        "nodebackForPromise",
                                        "tryCatch",
                                        "errorObj",
                                        "notEnumerableProp",
                                        "INTERNAL",
                                        body)(
                                        Promise,
                                        fn,
                                        receiver,
                                        withAppended,
                                        maybeWrapAsError,
                                        nodebackForPromise,
                                        util.tryCatch,
                                        util.errorObj,
                                        util.notEnumerableProp,
                                        INTERNAL);
                                    };
                                }

                                function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
                                    var defaultThis = function () {return this;}();
                                    var method = callback;
                                    if (typeof method === "string") {
                                        callback = fn;
                                    }
                                    function promisified() {
                                        var _receiver = receiver;
                                        if (receiver === THIS) _receiver = this;
                                        var promise = new Promise(INTERNAL);
                                        promise._captureStackTrace();
                                        var cb = typeof method === "string" && this !== defaultThis ?
                                        this[method] : callback;
                                        var fn = nodebackForPromise(promise, multiArgs);
                                        try {
                                            cb.apply(_receiver, withAppended(arguments, fn));
                                        } catch (e) {
                                            promise._rejectCallback(maybeWrapAsError(e), true, true);
                                        }
                                        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
                                        return promise;
                                    }
                                    util.notEnumerableProp(promisified, "__isPromisified__", true);
                                    return promisified;
                                }

                                var makeNodePromisified = canEvaluate ?
                                makeNodePromisifiedEval :
                                makeNodePromisifiedClosure;

                                function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
                                    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
                                    var methods =
                                    promisifiableMethods(obj, suffix, suffixRegexp, filter);

                                    for (var i = 0, len = methods.length; i < len; i += 2) {
                                        var key = methods[i];
                                        var fn = methods[i + 1];
                                        var promisifiedKey = key + suffix;
                                        if (promisifier === makeNodePromisified) {
                                            obj[promisifiedKey] =
                                            makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                                        } else {
                                            var promisified = promisifier(fn, function () {
                                                return makeNodePromisified(key, THIS, key,
                                                fn, suffix, multiArgs);
                                            });
                                            util.notEnumerableProp(promisified, "__isPromisified__", true);
                                            obj[promisifiedKey] = promisified;
                                        }
                                    }
                                    util.toFastProperties(obj);
                                    return obj;
                                }

                                function promisify(callback, receiver, multiArgs) {
                                    return makeNodePromisified(callback, receiver, undefined,
                                    callback, null, multiArgs);
                                }

                                Promise.promisify = function (fn, options) {
                                    if (typeof fn !== "function") {
                                        throw new TypeError("expecting a function but got " + util.classString(fn));
                                    }
                                    if (isPromisified(fn)) {
                                        return fn;
                                    }
                                    options = Object(options);
                                    var receiver = options.context === undefined ? THIS : options.context;
                                    var multiArgs = !!options.multiArgs;
                                    var ret = promisify(fn, receiver, multiArgs);
                                    util.copyDescriptors(fn, ret, propsFilter);
                                    return ret;
                                };

                                Promise.promisifyAll = function (target, options) {
                                    if (typeof target !== "function" && (typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object") {
                                        throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    options = Object(options);
                                    var multiArgs = !!options.multiArgs;
                                    var suffix = options.suffix;
                                    if (typeof suffix !== "string") suffix = defaultSuffix;
                                    var filter = options.filter;
                                    if (typeof filter !== "function") filter = defaultFilter;
                                    var promisifier = options.promisifier;
                                    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

                                    if (!util.isIdentifier(suffix)) {
                                        throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                                    }

                                    var keys = util.inheritedDataKeys(target);
                                    for (var i = 0; i < keys.length; ++i) {
                                        var value = target[keys[i]];
                                        if (keys[i] !== "constructor" &&
                                        util.isClass(value)) {
                                            promisifyAll(value.prototype, suffix, filter, promisifier,
                                            multiArgs);
                                            promisifyAll(value, suffix, filter, promisifier, multiArgs);
                                        }
                                    }

                                    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
                                };
                            };


                        }, { "./errors": 12, "./nodeback": 20, "./util": 36 }], 25: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (
                            Promise, PromiseArray, tryConvertToPromise, apiRejection) {
                                var util = _dereq_("./util");
                                var isObject = util.isObject;
                                var es5 = _dereq_("./es5");
                                var Es6Map;
                                if (typeof Map === "function") Es6Map = Map;

                                var mapToEntries = function () {
                                    var index = 0;
                                    var size = 0;

                                    function extractEntry(value, key) {
                                        this[index] = value;
                                        this[index + size] = key;
                                        index++;
                                    }

                                    return function mapToEntries(map) {
                                        size = map.size;
                                        index = 0;
                                        var ret = new Array(map.size * 2);
                                        map.forEach(extractEntry, ret);
                                        return ret;
                                    };
                                }();

                                var entriesToMap = function entriesToMap(entries) {
                                    var ret = new Es6Map();
                                    var length = entries.length / 2 | 0;
                                    for (var i = 0; i < length; ++i) {
                                        var key = entries[length + i];
                                        var value = entries[i];
                                        ret.set(key, value);
                                    }
                                    return ret;
                                };

                                function PropertiesPromiseArray(obj) {
                                    var isMap = false;
                                    var entries;
                                    if (Es6Map !== undefined && obj instanceof Es6Map) {
                                        entries = mapToEntries(obj);
                                        isMap = true;
                                    } else {
                                        var keys = es5.keys(obj);
                                        var len = keys.length;
                                        entries = new Array(len * 2);
                                        for (var i = 0; i < len; ++i) {
                                            var key = keys[i];
                                            entries[i] = obj[key];
                                            entries[i + len] = key;
                                        }
                                    }
                                    this.constructor$(entries);
                                    this._isMap = isMap;
                                    this._init$(undefined, -3);
                                }
                                util.inherits(PropertiesPromiseArray, PromiseArray);

                                PropertiesPromiseArray.prototype._init = function () {};

                                PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
                                    this._values[index] = value;
                                    var totalResolved = ++this._totalResolved;
                                    if (totalResolved >= this._length) {
                                        var val;
                                        if (this._isMap) {
                                            val = entriesToMap(this._values);
                                        } else {
                                            val = {};
                                            var keyOffset = this.length();
                                            for (var i = 0, len = this.length(); i < len; ++i) {
                                                val[this._values[i + keyOffset]] = this._values[i];
                                            }
                                        }
                                        this._resolve(val);
                                        return true;
                                    }
                                    return false;
                                };

                                PropertiesPromiseArray.prototype.shouldCopyValues = function () {
                                    return false;
                                };

                                PropertiesPromiseArray.prototype.getActualLength = function (len) {
                                    return len >> 1;
                                };

                                function props(promises) {
                                    var ret;
                                    var castValue = tryConvertToPromise(promises);

                                    if (!isObject(castValue)) {
                                        return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
                                    } else if (castValue instanceof Promise) {
                                        ret = castValue._then(
                                        Promise.props, undefined, undefined, undefined, undefined);
                                    } else {
                                        ret = new PropertiesPromiseArray(castValue).promise();
                                    }

                                    if (castValue instanceof Promise) {
                                        ret._propagateFrom(castValue, 2);
                                    }
                                    return ret;
                                }

                                Promise.prototype.props = function () {
                                    return props(this);
                                };

                                Promise.props = function (promises) {
                                    return props(promises);
                                };
                            };

                        }, { "./es5": 13, "./util": 36 }], 26: [function (_dereq_, module, exports) {
                            "use strict";
                            function arrayMove(src, srcIndex, dst, dstIndex, len) {
                                for (var j = 0; j < len; ++j) {
                                    dst[j + dstIndex] = src[j + srcIndex];
                                    src[j + srcIndex] = void 0;
                                }
                            }

                            function Queue(capacity) {
                                this._capacity = capacity;
                                this._length = 0;
                                this._front = 0;
                            }

                            Queue.prototype._willBeOverCapacity = function (size) {
                                return this._capacity < size;
                            };

                            Queue.prototype._pushOne = function (arg) {
                                var length = this.length();
                                this._checkCapacity(length + 1);
                                var i = this._front + length & this._capacity - 1;
                                this[i] = arg;
                                this._length = length + 1;
                            };

                            Queue.prototype._unshiftOne = function (value) {
                                var capacity = this._capacity;
                                this._checkCapacity(this.length() + 1);
                                var front = this._front;
                                var i = (front - 1 &
                                capacity - 1 ^ capacity) - capacity;
                                this[i] = value;
                                this._front = i;
                                this._length = this.length() + 1;
                            };

                            Queue.prototype.unshift = function (fn, receiver, arg) {
                                this._unshiftOne(arg);
                                this._unshiftOne(receiver);
                                this._unshiftOne(fn);
                            };

                            Queue.prototype.push = function (fn, receiver, arg) {
                                var length = this.length() + 3;
                                if (this._willBeOverCapacity(length)) {
                                    this._pushOne(fn);
                                    this._pushOne(receiver);
                                    this._pushOne(arg);
                                    return;
                                }
                                var j = this._front + length - 3;
                                this._checkCapacity(length);
                                var wrapMask = this._capacity - 1;
                                this[j + 0 & wrapMask] = fn;
                                this[j + 1 & wrapMask] = receiver;
                                this[j + 2 & wrapMask] = arg;
                                this._length = length;
                            };

                            Queue.prototype.shift = function () {
                                var front = this._front,
                                ret = this[front];

                                this[front] = undefined;
                                this._front = front + 1 & this._capacity - 1;
                                this._length--;
                                return ret;
                            };

                            Queue.prototype.length = function () {
                                return this._length;
                            };

                            Queue.prototype._checkCapacity = function (size) {
                                if (this._capacity < size) {
                                    this._resizeTo(this._capacity << 1);
                                }
                            };

                            Queue.prototype._resizeTo = function (capacity) {
                                var oldCapacity = this._capacity;
                                this._capacity = capacity;
                                var front = this._front;
                                var length = this._length;
                                var moveItemsCount = front + length & oldCapacity - 1;
                                arrayMove(this, 0, this, oldCapacity, moveItemsCount);
                            };

                            module.exports = Queue;

                        }, {}], 27: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (
                            Promise, INTERNAL, tryConvertToPromise, apiRejection) {
                                var util = _dereq_("./util");

                                var raceLater = function raceLater(promise) {
                                    return promise.then(function (array) {
                                        return race(array, promise);
                                    });
                                };

                                function race(promises, parent) {
                                    var maybePromise = tryConvertToPromise(promises);

                                    if (maybePromise instanceof Promise) {
                                        return raceLater(maybePromise);
                                    } else {
                                        promises = util.asArray(promises);
                                        if (promises === null)
                                        return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
                                    }

                                    var ret = new Promise(INTERNAL);
                                    if (parent !== undefined) {
                                        ret._propagateFrom(parent, 3);
                                    }
                                    var fulfill = ret._fulfill;
                                    var reject = ret._reject;
                                    for (var i = 0, len = promises.length; i < len; ++i) {
                                        var val = promises[i];

                                        if (val === undefined && !(i in promises)) {
                                            continue;
                                        }

                                        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
                                    }
                                    return ret;
                                }

                                Promise.race = function (promises) {
                                    return race(promises, undefined);
                                };

                                Promise.prototype.race = function () {
                                    return race(this, undefined);
                                };

                            };

                        }, { "./util": 36 }], 28: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise,
                            PromiseArray,
                            apiRejection,
                            tryConvertToPromise,
                            INTERNAL,
                            debug) {
                                var getDomain = Promise._getDomain;
                                var util = _dereq_("./util");
                                var tryCatch = util.tryCatch;

                                function ReductionPromiseArray(promises, fn, initialValue, _each) {
                                    this.constructor$(promises);
                                    var domain = getDomain();
                                    this._fn = domain === null ? fn : domain.bind(fn);
                                    if (initialValue !== undefined) {
                                        initialValue = Promise.resolve(initialValue);
                                        initialValue._attachCancellationCallback(this);
                                    }
                                    this._initialValue = initialValue;
                                    this._currentCancellable = null;
                                    this._eachValues = _each === INTERNAL ? [] : undefined;
                                    this._promise._captureStackTrace();
                                    this._init$(undefined, -5);
                                }
                                util.inherits(ReductionPromiseArray, PromiseArray);

                                ReductionPromiseArray.prototype._gotAccum = function (accum) {
                                    if (this._eachValues !== undefined && accum !== INTERNAL) {
                                        this._eachValues.push(accum);
                                    }
                                };

                                ReductionPromiseArray.prototype._eachComplete = function (value) {
                                    this._eachValues.push(value);
                                    return this._eachValues;
                                };

                                ReductionPromiseArray.prototype._init = function () {};

                                ReductionPromiseArray.prototype._resolveEmptyArray = function () {
                                    this._resolve(this._eachValues !== undefined ? this._eachValues :
                                    this._initialValue);
                                };

                                ReductionPromiseArray.prototype.shouldCopyValues = function () {
                                    return false;
                                };

                                ReductionPromiseArray.prototype._resolve = function (value) {
                                    this._promise._resolveCallback(value);
                                    this._values = null;
                                };

                                ReductionPromiseArray.prototype._resultCancelled = function (sender) {
                                    if (sender === this._initialValue) return this._cancel();
                                    if (this._isResolved()) return;
                                    this._resultCancelled$();
                                    if (this._currentCancellable instanceof Promise) {
                                        this._currentCancellable.cancel();
                                    }
                                    if (this._initialValue instanceof Promise) {
                                        this._initialValue.cancel();
                                    }
                                };

                                ReductionPromiseArray.prototype._iterate = function (values) {
                                    this._values = values;
                                    var value;
                                    var i;
                                    var length = values.length;
                                    if (this._initialValue !== undefined) {
                                        value = this._initialValue;
                                        i = 0;
                                    } else {
                                        value = Promise.resolve(values[0]);
                                        i = 1;
                                    }

                                    this._currentCancellable = value;

                                    if (!value.isRejected()) {
                                        for (; i < length; ++i) {
                                            var ctx = {
                                                accum: null,
                                                value: values[i],
                                                index: i,
                                                length: length,
                                                array: this };

                                            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
                                        }
                                    }

                                    if (this._eachValues !== undefined) {
                                        value = value.
                                        _then(this._eachComplete, undefined, undefined, this, undefined);
                                    }
                                    value._then(completed, completed, undefined, value, this);
                                };

                                Promise.prototype.reduce = function (fn, initialValue) {
                                    return reduce(this, fn, initialValue, null);
                                };

                                Promise.reduce = function (promises, fn, initialValue, _each) {
                                    return reduce(promises, fn, initialValue, _each);
                                };

                                function completed(valueOrReason, array) {
                                    if (this.isFulfilled()) {
                                        array._resolve(valueOrReason);
                                    } else {
                                        array._reject(valueOrReason);
                                    }
                                }

                                function reduce(promises, fn, initialValue, _each) {
                                    if (typeof fn !== "function") {
                                        return apiRejection("expecting a function but got " + util.classString(fn));
                                    }
                                    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
                                    return array.promise();
                                }

                                function gotAccum(accum) {
                                    this.accum = accum;
                                    this.array._gotAccum(accum);
                                    var value = tryConvertToPromise(this.value, this.array._promise);
                                    if (value instanceof Promise) {
                                        this.array._currentCancellable = value;
                                        return value._then(gotValue, undefined, undefined, this, undefined);
                                    } else {
                                        return gotValue.call(this, value);
                                    }
                                }

                                function gotValue(value) {
                                    var array = this.array;
                                    var promise = array._promise;
                                    var fn = tryCatch(array._fn);
                                    promise._pushContext();
                                    var ret;
                                    if (array._eachValues !== undefined) {
                                        ret = fn.call(promise._boundValue(), value, this.index, this.length);
                                    } else {
                                        ret = fn.call(promise._boundValue(),
                                        this.accum, value, this.index, this.length);
                                    }
                                    if (ret instanceof Promise) {
                                        array._currentCancellable = ret;
                                    }
                                    var promiseCreated = promise._popContext();
                                    debug.checkForgottenReturns(
                                    ret,
                                    promiseCreated,
                                    array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
                                    promise);

                                    return ret;
                                }
                            };

                        }, { "./util": 36 }], 29: [function (_dereq_, module, exports) {
                            "use strict";
                            var util = _dereq_("./util");
                            var schedule;
                            var noAsyncScheduler = function noAsyncScheduler() {
                                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                            };
                            if (util.isNode && typeof MutationObserver === "undefined") {
                                var GlobalSetImmediate = global.setImmediate;
                                var ProcessNextTick = process.nextTick;
                                schedule = util.isRecentNode ?
                                function (fn) {GlobalSetImmediate.call(global, fn);} :
                                function (fn) {ProcessNextTick.call(process, fn);};
                            } else if (typeof MutationObserver !== "undefined" &&
                            !(typeof window !== "undefined" &&
                            window.navigator &&
                            window.navigator.standalone)) {
                                schedule = function () {
                                    var div = document.createElement("div");
                                    var opts = { attributes: true };
                                    var toggleScheduled = false;
                                    var div2 = document.createElement("div");
                                    var o2 = new MutationObserver(function () {
                                        div.classList.toggle("foo");
                                        toggleScheduled = false;
                                    });
                                    o2.observe(div2, opts);

                                    var scheduleToggle = function scheduleToggle() {
                                        if (toggleScheduled) return;
                                        toggleScheduled = true;
                                        div2.classList.toggle("foo");
                                    };

                                    return function schedule(fn) {
                                        var o = new MutationObserver(function () {
                                            o.disconnect();
                                            fn();
                                        });
                                        o.observe(div, opts);
                                        scheduleToggle();
                                    };
                                }();
                            } else if (typeof setImmediate !== "undefined") {
                                schedule = function schedule(fn) {
                                    setImmediate(fn);
                                };
                            } else if (typeof setTimeout !== "undefined") {
                                schedule = function schedule(fn) {
                                    setTimeout(fn, 0);
                                };
                            } else {
                                schedule = noAsyncScheduler;
                            }
                            module.exports = schedule;

                        }, { "./util": 36 }], 30: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports =
                            function (Promise, PromiseArray, debug) {
                                var PromiseInspection = Promise.PromiseInspection;
                                var util = _dereq_("./util");

                                function SettledPromiseArray(values) {
                                    this.constructor$(values);
                                }
                                util.inherits(SettledPromiseArray, PromiseArray);

                                SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
                                    this._values[index] = inspection;
                                    var totalResolved = ++this._totalResolved;
                                    if (totalResolved >= this._length) {
                                        this._resolve(this._values);
                                        return true;
                                    }
                                    return false;
                                };

                                SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
                                    var ret = new PromiseInspection();
                                    ret._bitField = 33554432;
                                    ret._settledValueField = value;
                                    return this._promiseResolved(index, ret);
                                };
                                SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
                                    var ret = new PromiseInspection();
                                    ret._bitField = 16777216;
                                    ret._settledValueField = reason;
                                    return this._promiseResolved(index, ret);
                                };

                                Promise.settle = function (promises) {
                                    debug.deprecated(".settle()", ".reflect()");
                                    return new SettledPromiseArray(promises).promise();
                                };

                                Promise.prototype.settle = function () {
                                    return Promise.settle(this);
                                };
                            };

                        }, { "./util": 36 }], 31: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports =
                            function (Promise, PromiseArray, apiRejection) {
                                var util = _dereq_("./util");
                                var RangeError = _dereq_("./errors").RangeError;
                                var AggregateError = _dereq_("./errors").AggregateError;
                                var isArray = util.isArray;
                                var CANCELLATION = {};


                                function SomePromiseArray(values) {
                                    this.constructor$(values);
                                    this._howMany = 0;
                                    this._unwrap = false;
                                    this._initialized = false;
                                }
                                util.inherits(SomePromiseArray, PromiseArray);

                                SomePromiseArray.prototype._init = function () {
                                    if (!this._initialized) {
                                        return;
                                    }
                                    if (this._howMany === 0) {
                                        this._resolve([]);
                                        return;
                                    }
                                    this._init$(undefined, -5);
                                    var isArrayResolved = isArray(this._values);
                                    if (!this._isResolved() &&
                                    isArrayResolved &&
                                    this._howMany > this._canPossiblyFulfill()) {
                                        this._reject(this._getRangeError(this.length()));
                                    }
                                };

                                SomePromiseArray.prototype.init = function () {
                                    this._initialized = true;
                                    this._init();
                                };

                                SomePromiseArray.prototype.setUnwrap = function () {
                                    this._unwrap = true;
                                };

                                SomePromiseArray.prototype.howMany = function () {
                                    return this._howMany;
                                };

                                SomePromiseArray.prototype.setHowMany = function (count) {
                                    this._howMany = count;
                                };

                                SomePromiseArray.prototype._promiseFulfilled = function (value) {
                                    this._addFulfilled(value);
                                    if (this._fulfilled() === this.howMany()) {
                                        this._values.length = this.howMany();
                                        if (this.howMany() === 1 && this._unwrap) {
                                            this._resolve(this._values[0]);
                                        } else {
                                            this._resolve(this._values);
                                        }
                                        return true;
                                    }
                                    return false;

                                };
                                SomePromiseArray.prototype._promiseRejected = function (reason) {
                                    this._addRejected(reason);
                                    return this._checkOutcome();
                                };

                                SomePromiseArray.prototype._promiseCancelled = function () {
                                    if (this._values instanceof Promise || this._values == null) {
                                        return this._cancel();
                                    }
                                    this._addRejected(CANCELLATION);
                                    return this._checkOutcome();
                                };

                                SomePromiseArray.prototype._checkOutcome = function () {
                                    if (this.howMany() > this._canPossiblyFulfill()) {
                                        var e = new AggregateError();
                                        for (var i = this.length(); i < this._values.length; ++i) {
                                            if (this._values[i] !== CANCELLATION) {
                                                e.push(this._values[i]);
                                            }
                                        }
                                        if (e.length > 0) {
                                            this._reject(e);
                                        } else {
                                            this._cancel();
                                        }
                                        return true;
                                    }
                                    return false;
                                };

                                SomePromiseArray.prototype._fulfilled = function () {
                                    return this._totalResolved;
                                };

                                SomePromiseArray.prototype._rejected = function () {
                                    return this._values.length - this.length();
                                };

                                SomePromiseArray.prototype._addRejected = function (reason) {
                                    this._values.push(reason);
                                };

                                SomePromiseArray.prototype._addFulfilled = function (value) {
                                    this._values[this._totalResolved++] = value;
                                };

                                SomePromiseArray.prototype._canPossiblyFulfill = function () {
                                    return this.length() - this._rejected();
                                };

                                SomePromiseArray.prototype._getRangeError = function (count) {
                                    var message = "Input array must contain at least " +
                                    this._howMany + " items but contains only " + count + " items";
                                    return new RangeError(message);
                                };

                                SomePromiseArray.prototype._resolveEmptyArray = function () {
                                    this._reject(this._getRangeError(0));
                                };

                                function some(promises, howMany) {
                                    if ((howMany | 0) !== howMany || howMany < 0) {
                                        return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    var ret = new SomePromiseArray(promises);
                                    var promise = ret.promise();
                                    ret.setHowMany(howMany);
                                    ret.init();
                                    return promise;
                                }

                                Promise.some = function (promises, howMany) {
                                    return some(promises, howMany);
                                };

                                Promise.prototype.some = function (howMany) {
                                    return some(this, howMany);
                                };

                                Promise._SomePromiseArray = SomePromiseArray;
                            };

                        }, { "./errors": 12, "./util": 36 }], 32: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise) {
                                function PromiseInspection(promise) {
                                    if (promise !== undefined) {
                                        promise = promise._target();
                                        this._bitField = promise._bitField;
                                        this._settledValueField = promise._isFateSealed() ?
                                        promise._settledValue() : undefined;
                                    } else
                                    {
                                        this._bitField = 0;
                                        this._settledValueField = undefined;
                                    }
                                }

                                PromiseInspection.prototype._settledValue = function () {
                                    return this._settledValueField;
                                };

                                var value = PromiseInspection.prototype.value = function () {
                                    if (!this.isFulfilled()) {
                                        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    return this._settledValue();
                                };

                                var reason = PromiseInspection.prototype.error =
                                PromiseInspection.prototype.reason = function () {
                                    if (!this.isRejected()) {
                                        throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                                    }
                                    return this._settledValue();
                                };

                                var isFulfilled = PromiseInspection.prototype.isFulfilled = function () {
                                    return (this._bitField & 33554432) !== 0;
                                };

                                var isRejected = PromiseInspection.prototype.isRejected = function () {
                                    return (this._bitField & 16777216) !== 0;
                                };

                                var isPending = PromiseInspection.prototype.isPending = function () {
                                    return (this._bitField & 50397184) === 0;
                                };

                                var isResolved = PromiseInspection.prototype.isResolved = function () {
                                    return (this._bitField & 50331648) !== 0;
                                };

                                PromiseInspection.prototype.isCancelled =
                                Promise.prototype._isCancelled = function () {
                                    return (this._bitField & 65536) === 65536;
                                };

                                Promise.prototype.isCancelled = function () {
                                    return this._target()._isCancelled();
                                };

                                Promise.prototype.isPending = function () {
                                    return isPending.call(this._target());
                                };

                                Promise.prototype.isRejected = function () {
                                    return isRejected.call(this._target());
                                };

                                Promise.prototype.isFulfilled = function () {
                                    return isFulfilled.call(this._target());
                                };

                                Promise.prototype.isResolved = function () {
                                    return isResolved.call(this._target());
                                };

                                Promise.prototype.value = function () {
                                    return value.call(this._target());
                                };

                                Promise.prototype.reason = function () {
                                    var target = this._target();
                                    target._unsetRejectionIsUnhandled();
                                    return reason.call(target);
                                };

                                Promise.prototype._value = function () {
                                    return this._settledValue();
                                };

                                Promise.prototype._reason = function () {
                                    this._unsetRejectionIsUnhandled();
                                    return this._settledValue();
                                };

                                Promise.PromiseInspection = PromiseInspection;
                            };

                        }, {}], 33: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL) {
                                var util = _dereq_("./util");
                                var errorObj = util.errorObj;
                                var isObject = util.isObject;

                                function tryConvertToPromise(obj, context) {
                                    if (isObject(obj)) {
                                        if (obj instanceof Promise) return obj;
                                        var then = getThen(obj);
                                        if (then === errorObj) {
                                            if (context) context._pushContext();
                                            var ret = Promise.reject(then.e);
                                            if (context) context._popContext();
                                            return ret;
                                        } else if (typeof then === "function") {
                                            if (isAnyBluebirdPromise(obj)) {
                                                var ret = new Promise(INTERNAL);
                                                obj._then(
                                                ret._fulfill,
                                                ret._reject,
                                                undefined,
                                                ret,
                                                null);

                                                return ret;
                                            }
                                            return doThenable(obj, then, context);
                                        }
                                    }
                                    return obj;
                                }

                                function doGetThen(obj) {
                                    return obj.then;
                                }

                                function getThen(obj) {
                                    try {
                                        return doGetThen(obj);
                                    } catch (e) {
                                        errorObj.e = e;
                                        return errorObj;
                                    }
                                }

                                var hasProp = {}.hasOwnProperty;
                                function isAnyBluebirdPromise(obj) {
                                    return hasProp.call(obj, "_promise0");
                                }

                                function doThenable(x, then, context) {
                                    var promise = new Promise(INTERNAL);
                                    var ret = promise;
                                    if (context) context._pushContext();
                                    promise._captureStackTrace();
                                    if (context) context._popContext();
                                    var synchronous = true;
                                    var result = util.tryCatch(then).call(x, resolve, reject);
                                    synchronous = false;

                                    if (promise && result === errorObj) {
                                        promise._rejectCallback(result.e, true, true);
                                        promise = null;
                                    }

                                    function resolve(value) {
                                        if (!promise) return;
                                        promise._resolveCallback(value);
                                        promise = null;
                                    }

                                    function reject(reason) {
                                        if (!promise) return;
                                        promise._rejectCallback(reason, synchronous, true);
                                        promise = null;
                                    }
                                    return ret;
                                }

                                return tryConvertToPromise;
                            };

                        }, { "./util": 36 }], 34: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, INTERNAL, debug) {
                                var util = _dereq_("./util");
                                var TimeoutError = Promise.TimeoutError;

                                function HandleWrapper(handle) {
                                    this.handle = handle;
                                }

                                HandleWrapper.prototype._resultCancelled = function () {
                                    clearTimeout(this.handle);
                                };

                                var afterValue = function afterValue(value) {return delay(+this).thenReturn(value);};
                                var delay = Promise.delay = function (ms, value) {
                                    var ret;
                                    var handle;
                                    if (value !== undefined) {
                                        ret = Promise.resolve(value).
                                        _then(afterValue, null, null, ms, undefined);
                                        if (debug.cancellation() && value instanceof Promise) {
                                            ret._setOnCancel(value);
                                        }
                                    } else {
                                        ret = new Promise(INTERNAL);
                                        handle = setTimeout(function () {ret._fulfill();}, +ms);
                                        if (debug.cancellation()) {
                                            ret._setOnCancel(new HandleWrapper(handle));
                                        }
                                    }
                                    ret._setAsyncGuaranteed();
                                    return ret;
                                };

                                Promise.prototype.delay = function (ms) {
                                    return delay(ms, this);
                                };

                                var afterTimeout = function afterTimeout(promise, message, parent) {
                                    var err;
                                    if (typeof message !== "string") {
                                        if (message instanceof Error) {
                                            err = message;
                                        } else {
                                            err = new TimeoutError("operation timed out");
                                        }
                                    } else {
                                        err = new TimeoutError(message);
                                    }
                                    util.markAsOriginatingFromRejection(err);
                                    promise._attachExtraTrace(err);
                                    promise._reject(err);

                                    if (parent != null) {
                                        parent.cancel();
                                    }
                                };

                                function successClear(value) {
                                    clearTimeout(this.handle);
                                    return value;
                                }

                                function failureClear(reason) {
                                    clearTimeout(this.handle);
                                    throw reason;
                                }

                                Promise.prototype.timeout = function (ms, message) {
                                    ms = +ms;
                                    var ret, parent;

                                    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
                                        if (ret.isPending()) {
                                            afterTimeout(ret, message, parent);
                                        }
                                    }, ms));

                                    if (debug.cancellation()) {
                                        parent = this.then();
                                        ret = parent._then(successClear, failureClear,
                                        undefined, handleWrapper, undefined);
                                        ret._setOnCancel(handleWrapper);
                                    } else {
                                        ret = this._then(successClear, failureClear,
                                        undefined, handleWrapper, undefined);
                                    }

                                    return ret;
                                };

                            };

                        }, { "./util": 36 }], 35: [function (_dereq_, module, exports) {
                            "use strict";
                            module.exports = function (Promise, apiRejection, tryConvertToPromise,
                            createContext, INTERNAL, debug) {
                                var util = _dereq_("./util");
                                var TypeError = _dereq_("./errors").TypeError;
                                var inherits = _dereq_("./util").inherits;
                                var errorObj = util.errorObj;
                                var tryCatch = util.tryCatch;

                                function thrower(e) {
                                    setTimeout(function () {throw e;}, 0);
                                }

                                function castPreservingDisposable(thenable) {
                                    var maybePromise = tryConvertToPromise(thenable);
                                    if (maybePromise !== thenable &&
                                    typeof thenable._isDisposable === "function" &&
                                    typeof thenable._getDisposer === "function" &&
                                    thenable._isDisposable()) {
                                        maybePromise._setDisposable(thenable._getDisposer());
                                    }
                                    return maybePromise;
                                }
                                function dispose(resources, inspection) {
                                    var i = 0;
                                    var len = resources.length;
                                    var ret = new Promise(INTERNAL);
                                    function iterator() {
                                        if (i >= len) return ret._fulfill();
                                        var maybePromise = castPreservingDisposable(resources[i++]);
                                        if (maybePromise instanceof Promise &&
                                        maybePromise._isDisposable()) {
                                            try {
                                                maybePromise = tryConvertToPromise(
                                                maybePromise._getDisposer().tryDispose(inspection),
                                                resources.promise);
                                            } catch (e) {
                                                return thrower(e);
                                            }
                                            if (maybePromise instanceof Promise) {
                                                return maybePromise._then(iterator, thrower,
                                                null, null, null);
                                            }
                                        }
                                        iterator();
                                    }
                                    iterator();
                                    return ret;
                                }

                                function Disposer(data, promise, context) {
                                    this._data = data;
                                    this._promise = promise;
                                    this._context = context;
                                }

                                Disposer.prototype.data = function () {
                                    return this._data;
                                };

                                Disposer.prototype.promise = function () {
                                    return this._promise;
                                };

                                Disposer.prototype.resource = function () {
                                    if (this.promise().isFulfilled()) {
                                        return this.promise().value();
                                    }
                                    return null;
                                };

                                Disposer.prototype.tryDispose = function (inspection) {
                                    var resource = this.resource();
                                    var context = this._context;
                                    if (context !== undefined) context._pushContext();
                                    var ret = resource !== null ?
                                    this.doDispose(resource, inspection) : null;
                                    if (context !== undefined) context._popContext();
                                    this._promise._unsetDisposable();
                                    this._data = null;
                                    return ret;
                                };

                                Disposer.isDisposer = function (d) {
                                    return d != null &&
                                    typeof d.resource === "function" &&
                                    typeof d.tryDispose === "function";
                                };

                                function FunctionDisposer(fn, promise, context) {
                                    this.constructor$(fn, promise, context);
                                }
                                inherits(FunctionDisposer, Disposer);

                                FunctionDisposer.prototype.doDispose = function (resource, inspection) {
                                    var fn = this.data();
                                    return fn.call(resource, resource, inspection);
                                };

                                function maybeUnwrapDisposer(value) {
                                    if (Disposer.isDisposer(value)) {
                                        this.resources[this.index]._setDisposable(value);
                                        return value.promise();
                                    }
                                    return value;
                                }

                                function ResourceList(length) {
                                    this.length = length;
                                    this.promise = null;
                                    this[length - 1] = null;
                                }

                                ResourceList.prototype._resultCancelled = function () {
                                    var len = this.length;
                                    for (var i = 0; i < len; ++i) {
                                        var item = this[i];
                                        if (item instanceof Promise) {
                                            item.cancel();
                                        }
                                    }
                                };

                                Promise.using = function () {
                                    var len = arguments.length;
                                    if (len < 2) return apiRejection(
                                    "you must pass at least 2 arguments to Promise.using");
                                    var fn = arguments[len - 1];
                                    if (typeof fn !== "function") {
                                        return apiRejection("expecting a function but got " + util.classString(fn));
                                    }
                                    var input;
                                    var spreadArgs = true;
                                    if (len === 2 && Array.isArray(arguments[0])) {
                                        input = arguments[0];
                                        len = input.length;
                                        spreadArgs = false;
                                    } else {
                                        input = arguments;
                                        len--;
                                    }
                                    var resources = new ResourceList(len);
                                    for (var i = 0; i < len; ++i) {
                                        var resource = input[i];
                                        if (Disposer.isDisposer(resource)) {
                                            var disposer = resource;
                                            resource = resource.promise();
                                            resource._setDisposable(disposer);
                                        } else {
                                            var maybePromise = tryConvertToPromise(resource);
                                            if (maybePromise instanceof Promise) {
                                                resource =
                                                maybePromise._then(maybeUnwrapDisposer, null, null, {
                                                    resources: resources,
                                                    index: i },
                                                undefined);
                                            }
                                        }
                                        resources[i] = resource;
                                    }

                                    var reflectedResources = new Array(resources.length);
                                    for (var i = 0; i < reflectedResources.length; ++i) {
                                        reflectedResources[i] = Promise.resolve(resources[i]).reflect();
                                    }

                                    var resultPromise = Promise.all(reflectedResources).
                                    then(function (inspections) {
                                        for (var i = 0; i < inspections.length; ++i) {
                                            var inspection = inspections[i];
                                            if (inspection.isRejected()) {
                                                errorObj.e = inspection.error();
                                                return errorObj;
                                            } else if (!inspection.isFulfilled()) {
                                                resultPromise.cancel();
                                                return;
                                            }
                                            inspections[i] = inspection.value();
                                        }
                                        promise._pushContext();

                                        fn = tryCatch(fn);
                                        var ret = spreadArgs ?
                                        fn.apply(undefined, inspections) : fn(inspections);
                                        var promiseCreated = promise._popContext();
                                        debug.checkForgottenReturns(
                                        ret, promiseCreated, "Promise.using", promise);
                                        return ret;
                                    });

                                    var promise = resultPromise.lastly(function () {
                                        var inspection = new Promise.PromiseInspection(resultPromise);
                                        return dispose(resources, inspection);
                                    });
                                    resources.promise = promise;
                                    promise._setOnCancel(resources);
                                    return promise;
                                };

                                Promise.prototype._setDisposable = function (disposer) {
                                    this._bitField = this._bitField | 131072;
                                    this._disposer = disposer;
                                };

                                Promise.prototype._isDisposable = function () {
                                    return (this._bitField & 131072) > 0;
                                };

                                Promise.prototype._getDisposer = function () {
                                    return this._disposer;
                                };

                                Promise.prototype._unsetDisposable = function () {
                                    this._bitField = this._bitField & ~131072;
                                    this._disposer = undefined;
                                };

                                Promise.prototype.disposer = function (fn) {
                                    if (typeof fn === "function") {
                                        return new FunctionDisposer(fn, this, createContext());
                                    }
                                    throw new TypeError();
                                };

                            };

                        }, { "./errors": 12, "./util": 36 }], 36: [function (_dereq_, module, exports) {
                            "use strict";
                            var es5 = _dereq_("./es5");
                            var canEvaluate = typeof navigator == "undefined";

                            var errorObj = { e: {} };
                            var tryCatchTarget;
                            var globalObject = typeof self !== "undefined" ? self :
                            typeof window !== "undefined" ? window :
                            typeof global !== "undefined" ? global :
                            this !== undefined ? this : null;

                            function tryCatcher() {
                                try {
                                    var target = tryCatchTarget;
                                    tryCatchTarget = null;
                                    return target.apply(this, arguments);
                                } catch (e) {
                                    errorObj.e = e;
                                    return errorObj;
                                }
                            }
                            function tryCatch(fn) {
                                tryCatchTarget = fn;
                                return tryCatcher;
                            }

                            var inherits = function inherits(Child, Parent) {
                                var hasProp = {}.hasOwnProperty;

                                function T() {
                                    this.constructor = Child;
                                    this.constructor$ = Parent;
                                    for (var propertyName in Parent.prototype) {
                                        if (hasProp.call(Parent.prototype, propertyName) &&
                                        propertyName.charAt(propertyName.length - 1) !== "$")
                                        {
                                            this[propertyName + "$"] = Parent.prototype[propertyName];
                                        }
                                    }
                                }
                                T.prototype = Parent.prototype;
                                Child.prototype = new T();
                                return Child.prototype;
                            };


                            function isPrimitive(val) {
                                return val == null || val === true || val === false ||
                                typeof val === "string" || typeof val === "number";

                            }

                            function isObject(value) {
                                return typeof value === "function" ||
                                (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null;
                            }

                            function maybeWrapAsError(maybeError) {
                                if (!isPrimitive(maybeError)) return maybeError;

                                return new Error(safeToString(maybeError));
                            }

                            function withAppended(target, appendee) {
                                var len = target.length;
                                var ret = new Array(len + 1);
                                var i;
                                for (i = 0; i < len; ++i) {
                                    ret[i] = target[i];
                                }
                                ret[i] = appendee;
                                return ret;
                            }

                            function getDataPropertyOrDefault(obj, key, defaultValue) {
                                if (es5.isES5) {
                                    var desc = Object.getOwnPropertyDescriptor(obj, key);

                                    if (desc != null) {
                                        return desc.get == null && desc.set == null ?
                                        desc.value :
                                        defaultValue;
                                    }
                                } else {
                                    return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
                                }
                            }

                            function notEnumerableProp(obj, name, value) {
                                if (isPrimitive(obj)) return obj;
                                var descriptor = {
                                    value: value,
                                    configurable: true,
                                    enumerable: false,
                                    writable: true };

                                es5.defineProperty(obj, name, descriptor);
                                return obj;
                            }

                            function thrower(r) {
                                throw r;
                            }

                            var inheritedDataKeys = function () {
                                var excludedPrototypes = [
                                Array.prototype,
                                Object.prototype,
                                Function.prototype];


                                var isExcludedProto = function isExcludedProto(val) {
                                    for (var i = 0; i < excludedPrototypes.length; ++i) {
                                        if (excludedPrototypes[i] === val) {
                                            return true;
                                        }
                                    }
                                    return false;
                                };

                                if (es5.isES5) {
                                    var getKeys = Object.getOwnPropertyNames;
                                    return function (obj) {
                                        var ret = [];
                                        var visitedKeys = Object.create(null);
                                        while (obj != null && !isExcludedProto(obj)) {
                                            var keys;
                                            try {
                                                keys = getKeys(obj);
                                            } catch (e) {
                                                return ret;
                                            }
                                            for (var i = 0; i < keys.length; ++i) {
                                                var key = keys[i];
                                                if (visitedKeys[key]) continue;
                                                visitedKeys[key] = true;
                                                var desc = Object.getOwnPropertyDescriptor(obj, key);
                                                if (desc != null && desc.get == null && desc.set == null) {
                                                    ret.push(key);
                                                }
                                            }
                                            obj = es5.getPrototypeOf(obj);
                                        }
                                        return ret;
                                    };
                                } else {
                                    var hasProp = {}.hasOwnProperty;
                                    return function (obj) {
                                        if (isExcludedProto(obj)) return [];
                                        var ret = [];


                                        enumeration: for (var key in obj) {
                                            if (hasProp.call(obj, key)) {
                                                ret.push(key);
                                            } else {
                                                for (var i = 0; i < excludedPrototypes.length; ++i) {
                                                    if (hasProp.call(excludedPrototypes[i], key)) {
                                                        continue enumeration;
                                                    }
                                                }
                                                ret.push(key);
                                            }
                                        }
                                        return ret;
                                    };
                                }

                            }();

                            var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
                            function isClass(fn) {
                                try {
                                    if (typeof fn === "function") {
                                        var keys = es5.names(fn.prototype);

                                        var hasMethods = es5.isES5 && keys.length > 1;
                                        var hasMethodsOtherThanConstructor = keys.length > 0 &&
                                        !(keys.length === 1 && keys[0] === "constructor");
                                        var hasThisAssignmentAndStaticMethods =
                                        thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

                                        if (hasMethods || hasMethodsOtherThanConstructor ||
                                        hasThisAssignmentAndStaticMethods) {
                                            return true;
                                        }
                                    }
                                    return false;
                                } catch (e) {
                                    return false;
                                }
                            }

                            function toFastProperties(obj) {

                                function FakeConstructor() {}
                                FakeConstructor.prototype = obj;
                                var l = 8;
                                while (l--) {new FakeConstructor();}
                                return obj;
                                eval(obj);
                            }

                            var rident = /^[a-z$_][a-z$_0-9]*$/i;
                            function isIdentifier(str) {
                                return rident.test(str);
                            }

                            function filledRange(count, prefix, suffix) {
                                var ret = new Array(count);
                                for (var i = 0; i < count; ++i) {
                                    ret[i] = prefix + i + suffix;
                                }
                                return ret;
                            }

                            function safeToString(obj) {
                                try {
                                    return obj + "";
                                } catch (e) {
                                    return "[no string representation]";
                                }
                            }

                            function isError(obj) {
                                return obj !== null &&
                                (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" &&
                                typeof obj.message === "string" &&
                                typeof obj.name === "string";
                            }

                            function markAsOriginatingFromRejection(e) {
                                try {
                                    notEnumerableProp(e, "isOperational", true);
                                }
                                catch (ignore) {}
                            }

                            function originatesFromRejection(e) {
                                if (e == null) return false;
                                return e instanceof Error["__BluebirdErrorTypes__"].OperationalError ||
                                e["isOperational"] === true;
                            }

                            function canAttachTrace(obj) {
                                return isError(obj) && es5.propertyIsWritable(obj, "stack");
                            }

                            var ensureErrorObject = function () {
                                if (!("stack" in new Error())) {
                                    return function (value) {
                                        if (canAttachTrace(value)) return value;
                                        try {throw new Error(safeToString(value));}
                                        catch (err) {return err;}
                                    };
                                } else {
                                    return function (value) {
                                        if (canAttachTrace(value)) return value;
                                        return new Error(safeToString(value));
                                    };
                                }
                            }();

                            function classString(obj) {
                                return {}.toString.call(obj);
                            }

                            function copyDescriptors(from, to, filter) {
                                var keys = es5.names(from);
                                for (var i = 0; i < keys.length; ++i) {
                                    var key = keys[i];
                                    if (filter(key)) {
                                        try {
                                            es5.defineProperty(to, key, es5.getDescriptor(from, key));
                                        } catch (ignore) {}
                                    }
                                }
                            }

                            var asArray = function asArray(v) {
                                if (es5.isArray(v)) {
                                    return v;
                                }
                                return null;
                            };

                            if (typeof Symbol !== "undefined" && (typeof Symbol === "function" ? Symbol.iterator : "@@iterator")) {
                                var ArrayFrom = typeof Array.from === "function" ? function (v) {
                                    return Array.from(v);
                                } : function (v) {
                                    var ret = [];
                                    var it = v[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
                                    var itResult;
                                    while (!(itResult = it.next()).done) {
                                        ret.push(itResult.value);
                                    }
                                    return ret;
                                };

                                asArray = function asArray(v) {
                                    if (es5.isArray(v)) {
                                        return v;
                                    } else if (v != null && typeof v[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] === "function") {
                                        return ArrayFrom(v);
                                    }
                                    return null;
                                };
                            }

                            var isNode = typeof process !== "undefined" &&
                            classString(process).toLowerCase() === "[object process]";

                            function env(key, def) {
                                return isNode ? process.env[key] : def;
                            }

                            var ret = {
                                isClass: isClass,
                                isIdentifier: isIdentifier,
                                inheritedDataKeys: inheritedDataKeys,
                                getDataPropertyOrDefault: getDataPropertyOrDefault,
                                thrower: thrower,
                                isArray: es5.isArray,
                                asArray: asArray,
                                notEnumerableProp: notEnumerableProp,
                                isPrimitive: isPrimitive,
                                isObject: isObject,
                                isError: isError,
                                canEvaluate: canEvaluate,
                                errorObj: errorObj,
                                tryCatch: tryCatch,
                                inherits: inherits,
                                withAppended: withAppended,
                                maybeWrapAsError: maybeWrapAsError,
                                toFastProperties: toFastProperties,
                                filledRange: filledRange,
                                toString: safeToString,
                                canAttachTrace: canAttachTrace,
                                ensureErrorObject: ensureErrorObject,
                                originatesFromRejection: originatesFromRejection,
                                markAsOriginatingFromRejection: markAsOriginatingFromRejection,
                                classString: classString,
                                copyDescriptors: copyDescriptors,
                                hasDevTools: typeof chrome !== "undefined" && chrome &&
                                typeof chrome.loadTimes === "function",
                                isNode: isNode,
                                env: env,
                                global: globalObject };

                            ret.isRecentNode = ret.isNode && function () {
                                var version = process.versions.node.split(".").map(Number);
                                return version[0] === 0 && version[1] > 10 || version[0] > 0;
                            }();

                            if (ret.isNode) ret.toFastProperties(process);

                            try {throw new Error();} catch (e) {ret.lastLineError = e;}
                            module.exports = ret;

                        }, { "./es5": 13 }] }, {}, [4])(4);
                });;if (typeof window !== 'undefined' && window !== null) {window.P = window.Promise;} else if (typeof self !== 'undefined' && self !== null) {self.P = self.Promise;}
            }).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

        }, { "_process": 2 }], 11: [function (require, module, exports) {
            'use strict';









            var prefix = typeof Object.create !== 'function' ? '~' : false;









            function EE(fn, context, once) {
                this.fn = fn;
                this.context = context;
                this.once = once || false;
            }








            function EventEmitter() {}







            EventEmitter.prototype._events = undefined;









            EventEmitter.prototype.listeners = function listeners(event, exists) {
                var evt = prefix ? prefix + event : event,
                available = this._events && this._events[evt];

                if (exists) return !!available;
                if (!available) return [];
                if (available.fn) return [available.fn];

                for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
                    ee[i] = available[i].fn;
                }

                return ee;
            };








            EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
                var evt = prefix ? prefix + event : event;

                if (!this._events || !this._events[evt]) return false;

                var listeners = this._events[evt],
                len = arguments.length,
                args,
                i;

                if ('function' === typeof listeners.fn) {
                    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

                    switch (len) {
                        case 1:return listeners.fn.call(listeners.context), true;
                        case 2:return listeners.fn.call(listeners.context, a1), true;
                        case 3:return listeners.fn.call(listeners.context, a1, a2), true;
                        case 4:return listeners.fn.call(listeners.context, a1, a2, a3), true;
                        case 5:return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
                        case 6:return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;}


                    for (i = 1, args = new Array(len - 1); i < len; i++) {
                        args[i - 1] = arguments[i];
                    }

                    listeners.fn.apply(listeners.context, args);
                } else {
                    var length = listeners.length,
                    j;

                    for (i = 0; i < length; i++) {
                        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

                        switch (len) {
                            case 1:listeners[i].fn.call(listeners[i].context);break;
                            case 2:listeners[i].fn.call(listeners[i].context, a1);break;
                            case 3:listeners[i].fn.call(listeners[i].context, a1, a2);break;
                            default:
                                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                                    args[j - 1] = arguments[j];
                                }

                                listeners[i].fn.apply(listeners[i].context, args);}

                    }
                }

                return true;
            };









            EventEmitter.prototype.on = function on(event, fn, context) {
                var listener = new EE(fn, context || this),
                evt = prefix ? prefix + event : event;

                if (!this._events) this._events = prefix ? {} : Object.create(null);
                if (!this._events[evt]) this._events[evt] = listener;else
                {
                    if (!this._events[evt].fn) this._events[evt].push(listener);else
                    this._events[evt] = [
                    this._events[evt], listener];

                }

                return this;
            };









            EventEmitter.prototype.once = function once(event, fn, context) {
                var listener = new EE(fn, context || this, true),
                evt = prefix ? prefix + event : event;

                if (!this._events) this._events = prefix ? {} : Object.create(null);
                if (!this._events[evt]) this._events[evt] = listener;else
                {
                    if (!this._events[evt].fn) this._events[evt].push(listener);else
                    this._events[evt] = [
                    this._events[evt], listener];

                }

                return this;
            };










            EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
                var evt = prefix ? prefix + event : event;

                if (!this._events || !this._events[evt]) return this;

                var listeners = this._events[evt],
                events = [];

                if (fn) {
                    if (listeners.fn) {
                        if (
                        listeners.fn !== fn ||
                        once && !listeners.once ||
                        context && listeners.context !== context)
                        {
                            events.push(listeners);
                        }
                    } else {
                        for (var i = 0, length = listeners.length; i < length; i++) {
                            if (
                            listeners[i].fn !== fn ||
                            once && !listeners[i].once ||
                            context && listeners[i].context !== context)
                            {
                                events.push(listeners[i]);
                            }
                        }
                    }
                }




                if (events.length) {
                    this._events[evt] = events.length === 1 ? events[0] : events;
                } else {
                    delete this._events[evt];
                }

                return this;
            };







            EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
                if (!this._events) return this;

                if (event) delete this._events[prefix ? prefix + event : event];else
                this._events = prefix ? {} : Object.create(null);

                return this;
            };




            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.addListener = EventEmitter.prototype.on;




            EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
                return this;
            };




            EventEmitter.prefixed = prefix;




            if ('undefined' !== typeof module) {
                module.exports = EventEmitter;
            }

        }, {}], 12: [function (require, module, exports) {






















            "use strict";

            var EventEmitter = require("eventemitter3");
            var Promise = require("bluebird");






            var PromiEvent = function PromiEvent(justPromise) {
                var resolve,reject,
                eventEmitter = new Promise(function () {
                    resolve = arguments[0];
                    reject = arguments[1];
                });

                if (justPromise) {
                    return {
                        resolve: resolve,
                        reject: reject,
                        eventEmitter: eventEmitter };

                }


                var emitter = new EventEmitter();


                eventEmitter._events = emitter._events;
                eventEmitter.emit = emitter.emit;
                eventEmitter.on = emitter.on;
                eventEmitter.once = emitter.once;
                eventEmitter.off = emitter.off;
                eventEmitter.listeners = emitter.listeners;
                eventEmitter.addListener = emitter.addListener;
                eventEmitter.removeListener = emitter.removeListener;
                eventEmitter.removeAllListeners = emitter.removeAllListeners;

                return {
                    resolve: resolve,
                    reject: reject,
                    eventEmitter: eventEmitter };

            };

            PromiEvent.resolve = function (value) {
                var promise = PromiEvent(true);
                promise.resolve(value);
                return promise.eventEmitter;
            };

            module.exports = PromiEvent;

        }, { "bluebird": 10, "eventemitter3": 11 }], 13: [function (require, module, exports) {
            arguments[4][3][0].apply(exports, arguments);
        }, { "dup": 3 }], 14: [function (require, module, exports) {






















            "use strict";

            var Jsonrpc = require('./jsonrpc');
            var errors = require("web3-core-helpers").errors;

            var Batch = function Batch(requestManager) {
                this.requestManager = requestManager;
                this.requests = [];
            };







            Batch.prototype.add = function (request) {
                this.requests.push(request);
            };






            Batch.prototype.execute = function () {
                var requests = this.requests;
                this.requestManager.sendBatch(requests, function (err, results) {
                    results = results || [];
                    requests.map(function (request, index) {
                        return results[index] || {};
                    }).forEach(function (result, index) {
                        if (requests[index].callback) {

                            if (result && result.error) {
                                return requests[index].callback(errors.ErrorResponse(result));
                            }

                            if (!Jsonrpc.isValidResponse(result)) {
                                return requests[index].callback(errors.InvalidResponse(result));
                            }

                            requests[index].callback(null, requests[index].format ? requests[index].format(result.result) : result.result);
                        }
                    });
                });
            };

            module.exports = Batch;


        }, { "./jsonrpc": 17, "web3-core-helpers": 7 }], 15: [function (require, module, exports) {






















            "use strict";

            var givenProvider = null;



            var global = Function('return this')();


            if (typeof global.ethereumProvider !== 'undefined') {
                givenProvider = global.ethereumProvider;


            } else if (typeof global.web3 !== 'undefined' && global.web3.currentProvider) {

                if (global.web3.currentProvider.sendAsync) {
                    global.web3.currentProvider.send = global.web3.currentProvider.sendAsync;
                    delete global.web3.currentProvider.sendAsync;
                }


                if (!global.web3.currentProvider.on &&
                global.web3.currentProvider.connection &&
                global.web3.currentProvider.connection.constructor.name === 'ipcProviderWrapper') {

                    global.web3.currentProvider.on = function (type, callback) {

                        if (typeof callback !== 'function')
                        throw new Error('The second parameter callback must be a function.');

                        switch (type) {
                            case 'data':
                                this.connection.on('data', function (data) {
                                    var result = '';

                                    data = data.toString();

                                    try {
                                        result = JSON.parse(data);
                                    } catch (e) {
                                        return callback(new Error('Couldn\'t parse response data' + data));
                                    }


                                    if (!result.id && result.method.indexOf('_subscription') !== -1) {
                                        callback(null, result);
                                    }

                                });
                                break;

                            default:
                                this.connection.on(type, callback);
                                break;}

                    };
                }

                givenProvider = global.web3.currentProvider;
            }



            module.exports = givenProvider;

        }, {}], 16: [function (require, module, exports) {






















            "use strict";


            var _ = require("underscore");
            var errors = require("web3-core-helpers").errors;
            var Jsonrpc = require('./jsonrpc.js');
            var BatchManager = require('./batch.js');
            var givenProvider = require('./givenProvider.js');









            var RequestManager = function RequestManager(provider) {
                this.provider = null;
                this.providers = RequestManager.providers;

                this.setProvider(provider);
                this.subscriptions = {};
            };



            RequestManager.givenProvider = givenProvider;

            RequestManager.providers = {
                WebsocketProvider: require("web3-providers-ws"),
                HttpProvider: require("web3-providers-http"),
                IpcProvider: require("web3-providers-ipc") };










            RequestManager.prototype.setProvider = function (p, net) {
                var _this = this;


                if (p && typeof p === 'string' && this.providers) {


                    if (/^http:\/\//i.test(p)) {
                        p = new this.providers.HttpProvider(p);


                    } else if (/^ws:\/\//i.test(p)) {
                        p = new this.providers.WebsocketProvider(p);


                    } else if (p && (typeof net === "undefined" ? "undefined" : _typeof(net)) === 'object' && typeof net.connect === 'function') {
                        p = new this.providers.IpcProvider(p, net);

                    } else if (p) {
                        throw new Error('Can\'t autodetect provider for "' + p + '"');
                    }
                }


                if (this.provider)
                this.clearSubscriptions();


                this.provider = p || null;


                if (this.provider && this.provider.on) {
                    this.provider.on('data', function requestManagerNotification(err, result) {
                        if (!err) {
                            if (_this.subscriptions[result.params.subscription] && _this.subscriptions[result.params.subscription].callback)
                            _this.subscriptions[result.params.subscription].callback(null, result.params.result);
                        } else {

                            Object.keys(_this.subscriptions).forEach(function (id) {
                                if (_this.subscriptions[id].callback)
                                _this.subscriptions[id].callback(err);
                            });
                        }
                    });
                }
            };









            RequestManager.prototype.send = function (data, callback) {
                callback = callback || function () {};

                if (!this.provider) {
                    return callback(errors.InvalidProvider());
                }

                var payload = Jsonrpc.toPayload(data.method, data.params);
                this.provider.send(payload, function (err, result) {
                    if (result && result.id && payload.id !== result.id) return callback(new Error('Wrong response id "' + result.id + '" (expected: "' + payload.id + '") in ' + JSON.stringify(payload)));

                    if (err) {
                        return callback(err);
                    }

                    if (result && result.error) {
                        return callback(errors.ErrorResponse(result));
                    }

                    if (!Jsonrpc.isValidResponse(result)) {
                        return callback(errors.InvalidResponse(result));
                    }

                    callback(null, result.result);
                });
            };








            RequestManager.prototype.sendBatch = function (data, callback) {
                if (!this.provider) {
                    return callback(errors.InvalidProvider());
                }

                var payload = Jsonrpc.toBatchPayload(data);
                this.provider.send(payload, function (err, results) {
                    if (err) {
                        return callback(err);
                    }

                    if (!_.isArray(results)) {
                        return callback(errors.InvalidResponse(results));
                    }

                    callback(null, results);
                });
            };











            RequestManager.prototype.addSubscription = function (id, name, type, callback) {
                if (this.provider.on) {
                    this.subscriptions[id] = {
                        callback: callback,
                        type: type,
                        name: name };


                } else {
                    throw new Error('The provider doesn\'t support subscriptions: ' + this.provider.constructor.name);
                }
            };








            RequestManager.prototype.removeSubscription = function (id, callback) {
                var _this = this;

                if (this.subscriptions[id]) {

                    this.send({
                        method: this.subscriptions[id].type + '_unsubscribe',
                        params: [id] },
                    callback);


                    delete _this.subscriptions[id];
                }
            };






            RequestManager.prototype.clearSubscriptions = function (keepIsSyncing) {
                var _this = this;



                Object.keys(this.subscriptions).forEach(function (id) {
                    if (!keepIsSyncing || _this.subscriptions[id].name !== 'syncing')
                    _this.removeSubscription(id);
                });



                if (this.provider.reset)
                this.provider.reset();
            };

            module.exports = {
                Manager: RequestManager,
                BatchManager: BatchManager };



        }, { "./batch.js": 14, "./givenProvider.js": 15, "./jsonrpc.js": 17, "underscore": 13, "web3-core-helpers": 7, "web3-providers-http": 28, "web3-providers-ipc": 31, "web3-providers-ws": 36 }], 17: [function (require, module, exports) {
























            "use strict";


            var Jsonrpc = {
                messageId: 0 };










            Jsonrpc.toPayload = function (method, params) {
                if (!method) {
                    throw new Error('JSONRPC method should be specified for params: "' + JSON.stringify(params) + '"!');
                }


                Jsonrpc.messageId++;

                return {
                    jsonrpc: '2.0',
                    id: Jsonrpc.messageId,
                    method: method,
                    params: params || [] };

            };








            Jsonrpc.isValidResponse = function (response) {
                return Array.isArray(response) ? response.every(validateSingleMessage) : validateSingleMessage(response);

                function validateSingleMessage(message) {
                    return !!message &&
                    !message.error &&
                    message.jsonrpc === '2.0' && (
                    typeof message.id === 'number' || typeof message.id === 'string') &&
                    message.result !== undefined;
                }
            };








            Jsonrpc.toBatchPayload = function (messages) {
                return messages.map(function (message) {
                    return Jsonrpc.toPayload(message.method, message.params);
                });
            };

            module.exports = Jsonrpc;


        }, {}], 18: [function (require, module, exports) {
            arguments[4][11][0].apply(exports, arguments);
        }, { "dup": 11 }], 19: [function (require, module, exports) {
            arguments[4][3][0].apply(exports, arguments);
        }, { "dup": 3 }], 20: [function (require, module, exports) {






















            "use strict";

            var Subscription = require('./subscription.js');


            var Subscriptions = function Subscriptions(options) {
                this.name = options.name;
                this.type = options.type;
                this.subscriptions = options.subscriptions || {};
                this.requestManager = null;
            };


            Subscriptions.prototype.setRequestManager = function (rm) {
                this.requestManager = rm;
            };


            Subscriptions.prototype.attachToObject = function (obj) {
                var func = this.buildCall();
                func.call = this.call;
                var name = this.name.split('.');
                if (name.length > 1) {
                    obj[name[0]] = obj[name[0]] || {};
                    obj[name[0]][name[1]] = func;
                } else {
                    obj[name[0]] = func;
                }
            };


            Subscriptions.prototype.buildCall = function () {
                var _this = this;

                return function () {
                    if (!_this.subscriptions[arguments[0]]) {
                        console.warn('Subscription ' + JSON.stringify(arguments[0]) + ' doesn\'t exist. Subscribing anyway.');
                    }

                    var subscription = new Subscription({
                        subscription: _this.subscriptions[arguments[0]],
                        requestManager: _this.requestManager,
                        type: _this.type });


                    return subscription.subscribe.apply(subscription, arguments);
                };
            };


            module.exports = {
                subscriptions: Subscriptions,
                subscription: Subscription };


        }, { "./subscription.js": 21 }], 21: [function (require, module, exports) {






















            "use strict";

            var _ = require("underscore");
            var errors = require("web3-core-helpers").errors;
            var EventEmitter = require("eventemitter3");


            function Subscription(options) {
                EventEmitter.call(this);

                this.id = null;
                this.callback = null;
                this.arguments = null;
                this._reconnectIntervalId = null;

                this.options = {
                    subscription: options.subscription,
                    type: options.type,
                    requestManager: options.requestManager };

            }


            Subscription.prototype = Object.create(EventEmitter.prototype);
            Subscription.prototype.constructor = Subscription;










            Subscription.prototype._extractCallback = function (args) {
                if (_.isFunction(args[args.length - 1])) {
                    return args.pop();
                }
            };









            Subscription.prototype._validateArgs = function (args) {
                var subscription = this.options.subscription;

                if (!subscription)
                subscription = {};

                if (!subscription.params)
                subscription.params = 0;

                if (args.length !== subscription.params) {
                    throw errors.InvalidNumberOfParams(args.length, subscription.params + 1, args[0]);
                }
            };









            Subscription.prototype._formatInput = function (args) {
                var subscription = this.options.subscription;

                if (!subscription) {
                    return args;
                }

                if (!subscription.inputFormatter) {
                    return args;
                }

                var formattedArgs = subscription.inputFormatter.map(function (formatter, index) {
                    return formatter ? formatter(args[index]) : args[index];
                });

                return formattedArgs;
            };









            Subscription.prototype._formatOutput = function (result) {
                var subscription = this.options.subscription;

                return subscription && subscription.outputFormatter && result ? subscription.outputFormatter(result) : result;
            };








            Subscription.prototype._toPayload = function (args) {
                var params = [];
                this.callback = this._extractCallback(args);

                if (!this.subscriptionMethod) {
                    this.subscriptionMethod = args.shift();


                    if (this.options.subscription.subscriptionName) {
                        this.subscriptionMethod = this.options.subscription.subscriptionName;
                    }
                }

                if (!this.arguments) {
                    this.arguments = this._formatInput(args);
                    this._validateArgs(this.arguments);
                    args = [];

                }


                params.push(this.subscriptionMethod);
                params = params.concat(this.arguments);


                if (args.length) {
                    throw new Error('Only a callback is allowed as parameter on an already instantiated subscription.');
                }

                return {
                    method: this.options.type + '_subscribe',
                    params: params };

            };







            Subscription.prototype.unsubscribe = function (callback) {
                this.options.requestManager.removeSubscription(this.id, callback);
                this.id = null;
                this.removeAllListeners();
                clearInterval(this._reconnectIntervalId);
            };









            Subscription.prototype.subscribe = function () {
                var _this = this;
                var args = Array.prototype.slice.call(arguments);
                var payload = this._toPayload(args);

                if (!payload) {
                    return this;
                }

                if (!this.options.requestManager.provider) {
                    var err1 = new Error('No provider set.');
                    this.callback(err1, null, this);
                    this.emit('error', err1);
                    return this;
                }


                if (!this.options.requestManager.provider.on) {
                    var err2 = new Error('The current provider doesn\'t support subscriptions: ' + this.options.requestManager.provider.constructor.name);
                    this.callback(err2, null, this);
                    this.emit('error', err2);
                    return this;
                }


                if (this.id) {
                    this.unsubscribe();
                }


                this.options.params = payload.params[1];


                if (payload.params[0] === 'logs' && _.isObject(payload.params[1]) && payload.params[1].hasOwnProperty('fromBlock') && isFinite(payload.params[1].fromBlock)) {

                    this.options.requestManager.send({
                        method: 'eth_getLogs',
                        params: [payload.params[1]] },
                    function (err, logs) {
                        if (!err) {
                            logs.forEach(function (log) {
                                var output = _this._formatOutput(log);
                                _this.callback(null, output, _this);
                                _this.emit('data', output);
                            });



                        } else {
                            _this.callback(err, null, _this);
                            _this.emit('error', err);
                        }
                    });
                }




                if (_typeof(payload.params[1]) === 'object')
                delete payload.params[1].fromBlock;

                this.options.requestManager.send(payload, function (err, result) {
                    if (!err && result) {
                        _this.id = result;


                        _this.options.requestManager.addSubscription(_this.id, payload.params[0], _this.options.type, function (err, result) {


                            if (_.isArray(result))
                            result = result[0];

                            var output = _this._formatOutput(result);

                            if (!err) {

                                if (_.isFunction(_this.options.subscription.subscriptionHandler)) {
                                    return _this.options.subscription.subscriptionHandler.call(_this, output);
                                } else {
                                    _this.emit('data', output);
                                }

                            } else {

                                _this.options.requestManager.removeSubscription(_this.id);


                                if (_this.options.requestManager.provider.once) {
                                    _this._reconnectIntervalId = setInterval(function () {

                                        _this.options.requestManager.provider.reconnect();
                                    }, 500);

                                    _this.options.requestManager.provider.once('connect', function () {
                                        clearInterval(_this._reconnectIntervalId);
                                        _this.subscribe(_this.callback);
                                    });
                                }
                                _this.emit('error', err);
                            }


                            if (_.isFunction(_this.callback)) {
                                _this.callback(err, output, _this);
                            }
                        });
                    } else if (_.isFunction(_this.callback)) {
                        _this.callback(err, null, _this);
                        _this.emit('error', err);
                    }
                });


                return this;
            };

            module.exports = Subscription;

        }, { "eventemitter3": 18, "underscore": 19, "web3-core-helpers": 7 }], 22: [function (require, module, exports) {






















            "use strict";


            var formatters = require("web3-core-helpers").formatters;
            var Method = require("web3-core-method");
            var utils = require("web3-utils");


            var extend = function extend(pckg) {

                var ex = function ex(extension) {

                    var extendedObject;
                    if (extension.property) {
                        if (!pckg[extension.property]) {
                            pckg[extension.property] = {};
                        }
                        extendedObject = pckg[extension.property];
                    } else {
                        extendedObject = pckg;
                    }

                    if (extension.methods) {
                        extension.methods.forEach(function (method) {
                            if (!(method instanceof Method)) {
                                method = new Method(method);
                            }

                            method.attachToObject(extendedObject);
                            method.setRequestManager(pckg._requestManager);
                        });
                    }

                    return pckg;
                };

                ex.formatters = formatters;
                ex.utils = utils;
                ex.Method = Method;

                return ex;
            };



            module.exports = extend;


        }, { "web3-core-helpers": 7, "web3-core-method": 9, "web3-utils": 48 }], 23: [function (require, module, exports) {






















            "use strict";


            var requestManager = require("web3-core-requestmanager");
            var extend = require('./extend.js');

            module.exports = {
                packageInit: function packageInit(pkg, args) {
                    args = Array.prototype.slice.call(args);

                    if (!pkg) {
                        throw new Error('You need to instantiate using the "new" keyword.');
                    }



                    Object.defineProperty(pkg, 'currentProvider', {
                        get: function get() {
                            return pkg._provider;
                        },
                        set: function set(value) {
                            return pkg.setProvider(value);
                        },
                        enumerable: true,
                        configurable: true });



                    if (args[0] && args[0]._requestManager) {
                        pkg._requestManager = new requestManager.Manager(args[0].currentProvider);


                    } else {
                        pkg._requestManager = new requestManager.Manager();
                        pkg._requestManager.setProvider(args[0], args[1]);
                    }


                    pkg.givenProvider = requestManager.Manager.givenProvider;
                    pkg.providers = requestManager.Manager.providers;

                    pkg._provider = pkg._requestManager.provider;


                    if (!pkg.setProvider) {
                        pkg.setProvider = function (provider, net) {
                            pkg._requestManager.setProvider(provider, net);
                            pkg._provider = pkg._requestManager.provider;
                            return true;
                        };
                    }


                    pkg.BatchRequest = requestManager.BatchManager.bind(null, pkg._requestManager);


                    pkg.extend = extend(pkg);
                },
                addProviders: function addProviders(pkg) {
                    pkg.givenProvider = requestManager.Manager.givenProvider;
                    pkg.providers = requestManager.Manager.providers;
                } };



        }, { "./extend.js": 22, "web3-core-requestmanager": 16 }], 24: [function (require, module, exports) {
            (function (module, exports) {
                'use strict';


                function assert(val, msg) {
                    if (!val) throw new Error(msg || 'Assertion failed');
                }



                function inherits(ctor, superCtor) {
                    ctor.super_ = superCtor;
                    var TempCtor = function TempCtor() {};
                    TempCtor.prototype = superCtor.prototype;
                    ctor.prototype = new TempCtor();
                    ctor.prototype.constructor = ctor;
                }



                function BN(number, base, endian) {
                    if (BN.isBN(number)) {
                        return number;
                    }

                    this.negative = 0;
                    this.words = null;
                    this.length = 0;


                    this.red = null;

                    if (number !== null) {
                        if (base === 'le' || base === 'be') {
                            endian = base;
                            base = 10;
                        }

                        this._init(number || 0, base || 10, endian || 'be');
                    }
                }
                if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
                    module.exports = BN;
                } else {
                    exports.BN = BN;
                }

                BN.BN = BN;
                BN.wordSize = 26;

                var Buffer;
                try {
                    Buffer = require("buffer").Buffer;
                } catch (e) {
                }

                BN.isBN = function isBN(num) {
                    if (num instanceof BN) {
                        return true;
                    }

                    return num !== null && (typeof num === "undefined" ? "undefined" : _typeof(num)) === 'object' &&
                    num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
                };

                BN.max = function max(left, right) {
                    if (left.cmp(right) > 0) return left;
                    return right;
                };

                BN.min = function min(left, right) {
                    if (left.cmp(right) < 0) return left;
                    return right;
                };

                BN.prototype._init = function init(number, base, endian) {
                    if (typeof number === 'number') {
                        return this._initNumber(number, base, endian);
                    }

                    if ((typeof number === "undefined" ? "undefined" : _typeof(number)) === 'object') {
                        return this._initArray(number, base, endian);
                    }

                    if (base === 'hex') {
                        base = 16;
                    }
                    assert(base === (base | 0) && base >= 2 && base <= 36);

                    number = number.toString().replace(/\s+/g, '');
                    var start = 0;
                    if (number[0] === '-') {
                        start++;
                    }

                    if (base === 16) {
                        this._parseHex(number, start);
                    } else {
                        this._parseBase(number, base, start);
                    }

                    if (number[0] === '-') {
                        this.negative = 1;
                    }

                    this.strip();

                    if (endian !== 'le') return;

                    this._initArray(this.toArray(), base, endian);
                };

                BN.prototype._initNumber = function _initNumber(number, base, endian) {
                    if (number < 0) {
                        this.negative = 1;
                        number = -number;
                    }
                    if (number < 0x4000000) {
                        this.words = [number & 0x3ffffff];
                        this.length = 1;
                    } else if (number < 0x10000000000000) {
                        this.words = [
                        number & 0x3ffffff,
                        number / 0x4000000 & 0x3ffffff];

                        this.length = 2;
                    } else {
                        assert(number < 0x20000000000000);
                        this.words = [
                        number & 0x3ffffff,
                        number / 0x4000000 & 0x3ffffff,
                        1];

                        this.length = 3;
                    }

                    if (endian !== 'le') return;


                    this._initArray(this.toArray(), base, endian);
                };

                BN.prototype._initArray = function _initArray(number, base, endian) {

                    assert(typeof number.length === 'number');
                    if (number.length <= 0) {
                        this.words = [0];
                        this.length = 1;
                        return this;
                    }

                    this.length = Math.ceil(number.length / 3);
                    this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) {
                        this.words[i] = 0;
                    }

                    var j, w;
                    var off = 0;
                    if (endian === 'be') {
                        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
                            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
                            this.words[j] |= w << off & 0x3ffffff;
                            this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
                            off += 24;
                            if (off >= 26) {
                                off -= 26;
                                j++;
                            }
                        }
                    } else if (endian === 'le') {
                        for (i = 0, j = 0; i < number.length; i += 3) {
                            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
                            this.words[j] |= w << off & 0x3ffffff;
                            this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
                            off += 24;
                            if (off >= 26) {
                                off -= 26;
                                j++;
                            }
                        }
                    }
                    return this.strip();
                };

                function parseHex(str, start, end) {
                    var r = 0;
                    var len = Math.min(str.length, end);
                    for (var i = start; i < len; i++) {
                        var c = str.charCodeAt(i) - 48;

                        r <<= 4;


                        if (c >= 49 && c <= 54) {
                            r |= c - 49 + 0xa;


                        } else if (c >= 17 && c <= 22) {
                            r |= c - 17 + 0xa;


                        } else {
                            r |= c & 0xf;
                        }
                    }
                    return r;
                }

                BN.prototype._parseHex = function _parseHex(number, start) {

                    this.length = Math.ceil((number.length - start) / 6);
                    this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) {
                        this.words[i] = 0;
                    }

                    var j, w;

                    var off = 0;
                    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
                        w = parseHex(number, i, i + 6);
                        this.words[j] |= w << off & 0x3ffffff;

                        this.words[j + 1] |= w >>> 26 - off & 0x3fffff;
                        off += 24;
                        if (off >= 26) {
                            off -= 26;
                            j++;
                        }
                    }
                    if (i + 6 !== start) {
                        w = parseHex(number, start, i + 6);
                        this.words[j] |= w << off & 0x3ffffff;
                        this.words[j + 1] |= w >>> 26 - off & 0x3fffff;
                    }
                    this.strip();
                };

                function parseBase(str, start, end, mul) {
                    var r = 0;
                    var len = Math.min(str.length, end);
                    for (var i = start; i < len; i++) {
                        var c = str.charCodeAt(i) - 48;

                        r *= mul;


                        if (c >= 49) {
                            r += c - 49 + 0xa;


                        } else if (c >= 17) {
                            r += c - 17 + 0xa;


                        } else {
                            r += c;
                        }
                    }
                    return r;
                }

                BN.prototype._parseBase = function _parseBase(number, base, start) {

                    this.words = [0];
                    this.length = 1;


                    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
                        limbLen++;
                    }
                    limbLen--;
                    limbPow = limbPow / base | 0;

                    var total = number.length - start;
                    var mod = total % limbLen;
                    var end = Math.min(total, total - mod) + start;

                    var word = 0;
                    for (var i = start; i < end; i += limbLen) {
                        word = parseBase(number, i, i + limbLen, base);

                        this.imuln(limbPow);
                        if (this.words[0] + word < 0x4000000) {
                            this.words[0] += word;
                        } else {
                            this._iaddn(word);
                        }
                    }

                    if (mod !== 0) {
                        var pow = 1;
                        word = parseBase(number, i, number.length, base);

                        for (i = 0; i < mod; i++) {
                            pow *= base;
                        }

                        this.imuln(pow);
                        if (this.words[0] + word < 0x4000000) {
                            this.words[0] += word;
                        } else {
                            this._iaddn(word);
                        }
                    }
                };

                BN.prototype.copy = function copy(dest) {
                    dest.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) {
                        dest.words[i] = this.words[i];
                    }
                    dest.length = this.length;
                    dest.negative = this.negative;
                    dest.red = this.red;
                };

                BN.prototype.clone = function clone() {
                    var r = new BN(null);
                    this.copy(r);
                    return r;
                };

                BN.prototype._expand = function _expand(size) {
                    while (this.length < size) {
                        this.words[this.length++] = 0;
                    }
                    return this;
                };


                BN.prototype.strip = function strip() {
                    while (this.length > 1 && this.words[this.length - 1] === 0) {
                        this.length--;
                    }
                    return this._normSign();
                };

                BN.prototype._normSign = function _normSign() {

                    if (this.length === 1 && this.words[0] === 0) {
                        this.negative = 0;
                    }
                    return this;
                };

                BN.prototype.inspect = function inspect() {
                    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
                };































                var zeros = [
                '',
                '0',
                '00',
                '000',
                '0000',
                '00000',
                '000000',
                '0000000',
                '00000000',
                '000000000',
                '0000000000',
                '00000000000',
                '000000000000',
                '0000000000000',
                '00000000000000',
                '000000000000000',
                '0000000000000000',
                '00000000000000000',
                '000000000000000000',
                '0000000000000000000',
                '00000000000000000000',
                '000000000000000000000',
                '0000000000000000000000',
                '00000000000000000000000',
                '000000000000000000000000',
                '0000000000000000000000000'];


                var groupSizes = [
                0, 0,
                25, 16, 12, 11, 10, 9, 8,
                8, 7, 7, 7, 7, 6, 6,
                6, 6, 6, 6, 6, 5, 5,
                5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5];


                var groupBases = [
                0, 0,
                33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
                43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
                16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
                6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
                24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];


                BN.prototype.toString = function toString(base, padding) {
                    base = base || 10;
                    padding = padding | 0 || 1;

                    var out;
                    if (base === 16 || base === 'hex') {
                        out = '';
                        var off = 0;
                        var carry = 0;
                        for (var i = 0; i < this.length; i++) {
                            var w = this.words[i];
                            var word = ((w << off | carry) & 0xffffff).toString(16);
                            carry = w >>> 24 - off & 0xffffff;
                            if (carry !== 0 || i !== this.length - 1) {
                                out = zeros[6 - word.length] + word + out;
                            } else {
                                out = word + out;
                            }
                            off += 2;
                            if (off >= 26) {
                                off -= 26;
                                i--;
                            }
                        }
                        if (carry !== 0) {
                            out = carry.toString(16) + out;
                        }
                        while (out.length % padding !== 0) {
                            out = '0' + out;
                        }
                        if (this.negative !== 0) {
                            out = '-' + out;
                        }
                        return out;
                    }

                    if (base === (base | 0) && base >= 2 && base <= 36) {

                        var groupSize = groupSizes[base];

                        var groupBase = groupBases[base];
                        out = '';
                        var c = this.clone();
                        c.negative = 0;
                        while (!c.isZero()) {
                            var r = c.modn(groupBase).toString(base);
                            c = c.idivn(groupBase);

                            if (!c.isZero()) {
                                out = zeros[groupSize - r.length] + r + out;
                            } else {
                                out = r + out;
                            }
                        }
                        if (this.isZero()) {
                            out = '0' + out;
                        }
                        while (out.length % padding !== 0) {
                            out = '0' + out;
                        }
                        if (this.negative !== 0) {
                            out = '-' + out;
                        }
                        return out;
                    }

                    assert(false, 'Base should be between 2 and 36');
                };

                BN.prototype.toNumber = function toNumber() {
                    var ret = this.words[0];
                    if (this.length === 2) {
                        ret += this.words[1] * 0x4000000;
                    } else if (this.length === 3 && this.words[2] === 0x01) {

                        ret += 0x10000000000000 + this.words[1] * 0x4000000;
                    } else if (this.length > 2) {
                        assert(false, 'Number can only safely store up to 53 bits');
                    }
                    return this.negative !== 0 ? -ret : ret;
                };

                BN.prototype.toJSON = function toJSON() {
                    return this.toString(16);
                };

                BN.prototype.toBuffer = function toBuffer(endian, length) {
                    assert(typeof Buffer !== 'undefined');
                    return this.toArrayLike(Buffer, endian, length);
                };

                BN.prototype.toArray = function toArray(endian, length) {
                    return this.toArrayLike(Array, endian, length);
                };

                BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
                    var byteLength = this.byteLength();
                    var reqLength = length || Math.max(1, byteLength);
                    assert(byteLength <= reqLength, 'byte array longer than desired length');
                    assert(reqLength > 0, 'Requested array length <= 0');

                    this.strip();
                    var littleEndian = endian === 'le';
                    var res = new ArrayType(reqLength);

                    var b, i;
                    var q = this.clone();
                    if (!littleEndian) {

                        for (i = 0; i < reqLength - byteLength; i++) {
                            res[i] = 0;
                        }

                        for (i = 0; !q.isZero(); i++) {
                            b = q.andln(0xff);
                            q.iushrn(8);

                            res[reqLength - i - 1] = b;
                        }
                    } else {
                        for (i = 0; !q.isZero(); i++) {
                            b = q.andln(0xff);
                            q.iushrn(8);

                            res[i] = b;
                        }

                        for (; i < reqLength; i++) {
                            res[i] = 0;
                        }
                    }

                    return res;
                };

                if (Math.clz32) {
                    BN.prototype._countBits = function _countBits(w) {
                        return 32 - Math.clz32(w);
                    };
                } else {
                    BN.prototype._countBits = function _countBits(w) {
                        var t = w;
                        var r = 0;
                        if (t >= 0x1000) {
                            r += 13;
                            t >>>= 13;
                        }
                        if (t >= 0x40) {
                            r += 7;
                            t >>>= 7;
                        }
                        if (t >= 0x8) {
                            r += 4;
                            t >>>= 4;
                        }
                        if (t >= 0x02) {
                            r += 2;
                            t >>>= 2;
                        }
                        return r + t;
                    };
                }

                BN.prototype._zeroBits = function _zeroBits(w) {

                    if (w === 0) return 26;

                    var t = w;
                    var r = 0;
                    if ((t & 0x1fff) === 0) {
                        r += 13;
                        t >>>= 13;
                    }
                    if ((t & 0x7f) === 0) {
                        r += 7;
                        t >>>= 7;
                    }
                    if ((t & 0xf) === 0) {
                        r += 4;
                        t >>>= 4;
                    }
                    if ((t & 0x3) === 0) {
                        r += 2;
                        t >>>= 2;
                    }
                    if ((t & 0x1) === 0) {
                        r++;
                    }
                    return r;
                };


                BN.prototype.bitLength = function bitLength() {
                    var w = this.words[this.length - 1];
                    var hi = this._countBits(w);
                    return (this.length - 1) * 26 + hi;
                };

                function toBitArray(num) {
                    var w = new Array(num.bitLength());

                    for (var bit = 0; bit < w.length; bit++) {
                        var off = bit / 26 | 0;
                        var wbit = bit % 26;

                        w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
                    }

                    return w;
                }


                BN.prototype.zeroBits = function zeroBits() {
                    if (this.isZero()) return 0;

                    var r = 0;
                    for (var i = 0; i < this.length; i++) {
                        var b = this._zeroBits(this.words[i]);
                        r += b;
                        if (b !== 26) break;
                    }
                    return r;
                };

                BN.prototype.byteLength = function byteLength() {
                    return Math.ceil(this.bitLength() / 8);
                };

                BN.prototype.toTwos = function toTwos(width) {
                    if (this.negative !== 0) {
                        return this.abs().inotn(width).iaddn(1);
                    }
                    return this.clone();
                };

                BN.prototype.fromTwos = function fromTwos(width) {
                    if (this.testn(width - 1)) {
                        return this.notn(width).iaddn(1).ineg();
                    }
                    return this.clone();
                };

                BN.prototype.isNeg = function isNeg() {
                    return this.negative !== 0;
                };


                BN.prototype.neg = function neg() {
                    return this.clone().ineg();
                };

                BN.prototype.ineg = function ineg() {
                    if (!this.isZero()) {
                        this.negative ^= 1;
                    }

                    return this;
                };


                BN.prototype.iuor = function iuor(num) {
                    while (this.length < num.length) {
                        this.words[this.length++] = 0;
                    }

                    for (var i = 0; i < num.length; i++) {
                        this.words[i] = this.words[i] | num.words[i];
                    }

                    return this.strip();
                };

                BN.prototype.ior = function ior(num) {
                    assert((this.negative | num.negative) === 0);
                    return this.iuor(num);
                };


                BN.prototype.or = function or(num) {
                    if (this.length > num.length) return this.clone().ior(num);
                    return num.clone().ior(this);
                };

                BN.prototype.uor = function uor(num) {
                    if (this.length > num.length) return this.clone().iuor(num);
                    return num.clone().iuor(this);
                };


                BN.prototype.iuand = function iuand(num) {

                    var b;
                    if (this.length > num.length) {
                        b = num;
                    } else {
                        b = this;
                    }

                    for (var i = 0; i < b.length; i++) {
                        this.words[i] = this.words[i] & num.words[i];
                    }

                    this.length = b.length;

                    return this.strip();
                };

                BN.prototype.iand = function iand(num) {
                    assert((this.negative | num.negative) === 0);
                    return this.iuand(num);
                };


                BN.prototype.and = function and(num) {
                    if (this.length > num.length) return this.clone().iand(num);
                    return num.clone().iand(this);
                };

                BN.prototype.uand = function uand(num) {
                    if (this.length > num.length) return this.clone().iuand(num);
                    return num.clone().iuand(this);
                };


                BN.prototype.iuxor = function iuxor(num) {

                    var a;
                    var b;
                    if (this.length > num.length) {
                        a = this;
                        b = num;
                    } else {
                        a = num;
                        b = this;
                    }

                    for (var i = 0; i < b.length; i++) {
                        this.words[i] = a.words[i] ^ b.words[i];
                    }

                    if (this !== a) {
                        for (; i < a.length; i++) {
                            this.words[i] = a.words[i];
                        }
                    }

                    this.length = a.length;

                    return this.strip();
                };

                BN.prototype.ixor = function ixor(num) {
                    assert((this.negative | num.negative) === 0);
                    return this.iuxor(num);
                };


                BN.prototype.xor = function xor(num) {
                    if (this.length > num.length) return this.clone().ixor(num);
                    return num.clone().ixor(this);
                };

                BN.prototype.uxor = function uxor(num) {
                    if (this.length > num.length) return this.clone().iuxor(num);
                    return num.clone().iuxor(this);
                };


                BN.prototype.inotn = function inotn(width) {
                    assert(typeof width === 'number' && width >= 0);

                    var bytesNeeded = Math.ceil(width / 26) | 0;
                    var bitsLeft = width % 26;


                    this._expand(bytesNeeded);

                    if (bitsLeft > 0) {
                        bytesNeeded--;
                    }


                    for (var i = 0; i < bytesNeeded; i++) {
                        this.words[i] = ~this.words[i] & 0x3ffffff;
                    }


                    if (bitsLeft > 0) {
                        this.words[i] = ~this.words[i] & 0x3ffffff >> 26 - bitsLeft;
                    }


                    return this.strip();
                };

                BN.prototype.notn = function notn(width) {
                    return this.clone().inotn(width);
                };


                BN.prototype.setn = function setn(bit, val) {
                    assert(typeof bit === 'number' && bit >= 0);

                    var off = bit / 26 | 0;
                    var wbit = bit % 26;

                    this._expand(off + 1);

                    if (val) {
                        this.words[off] = this.words[off] | 1 << wbit;
                    } else {
                        this.words[off] = this.words[off] & ~(1 << wbit);
                    }

                    return this.strip();
                };


                BN.prototype.iadd = function iadd(num) {
                    var r;


                    if (this.negative !== 0 && num.negative === 0) {
                        this.negative = 0;
                        r = this.isub(num);
                        this.negative ^= 1;
                        return this._normSign();


                    } else if (this.negative === 0 && num.negative !== 0) {
                        num.negative = 0;
                        r = this.isub(num);
                        num.negative = 1;
                        return r._normSign();
                    }


                    var a, b;
                    if (this.length > num.length) {
                        a = this;
                        b = num;
                    } else {
                        a = num;
                        b = this;
                    }

                    var carry = 0;
                    for (var i = 0; i < b.length; i++) {
                        r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
                        this.words[i] = r & 0x3ffffff;
                        carry = r >>> 26;
                    }
                    for (; carry !== 0 && i < a.length; i++) {
                        r = (a.words[i] | 0) + carry;
                        this.words[i] = r & 0x3ffffff;
                        carry = r >>> 26;
                    }

                    this.length = a.length;
                    if (carry !== 0) {
                        this.words[this.length] = carry;
                        this.length++;

                    } else if (a !== this) {
                        for (; i < a.length; i++) {
                            this.words[i] = a.words[i];
                        }
                    }

                    return this;
                };


                BN.prototype.add = function add(num) {
                    var res;
                    if (num.negative !== 0 && this.negative === 0) {
                        num.negative = 0;
                        res = this.sub(num);
                        num.negative ^= 1;
                        return res;
                    } else if (num.negative === 0 && this.negative !== 0) {
                        this.negative = 0;
                        res = num.sub(this);
                        this.negative = 1;
                        return res;
                    }

                    if (this.length > num.length) return this.clone().iadd(num);

                    return num.clone().iadd(this);
                };


                BN.prototype.isub = function isub(num) {

                    if (num.negative !== 0) {
                        num.negative = 0;
                        var r = this.iadd(num);
                        num.negative = 1;
                        return r._normSign();


                    } else if (this.negative !== 0) {
                        this.negative = 0;
                        this.iadd(num);
                        this.negative = 1;
                        return this._normSign();
                    }


                    var cmp = this.cmp(num);


                    if (cmp === 0) {
                        this.negative = 0;
                        this.length = 1;
                        this.words[0] = 0;
                        return this;
                    }


                    var a, b;
                    if (cmp > 0) {
                        a = this;
                        b = num;
                    } else {
                        a = num;
                        b = this;
                    }

                    var carry = 0;
                    for (var i = 0; i < b.length; i++) {
                        r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
                        carry = r >> 26;
                        this.words[i] = r & 0x3ffffff;
                    }
                    for (; carry !== 0 && i < a.length; i++) {
                        r = (a.words[i] | 0) + carry;
                        carry = r >> 26;
                        this.words[i] = r & 0x3ffffff;
                    }


                    if (carry === 0 && i < a.length && a !== this) {
                        for (; i < a.length; i++) {
                            this.words[i] = a.words[i];
                        }
                    }

                    this.length = Math.max(this.length, i);

                    if (a !== this) {
                        this.negative = 1;
                    }

                    return this.strip();
                };


                BN.prototype.sub = function sub(num) {
                    return this.clone().isub(num);
                };

                function smallMulTo(self, num, out) {
                    out.negative = num.negative ^ self.negative;
                    var len = self.length + num.length | 0;
                    out.length = len;
                    len = len - 1 | 0;


                    var a = self.words[0] | 0;
                    var b = num.words[0] | 0;
                    var r = a * b;

                    var lo = r & 0x3ffffff;
                    var carry = r / 0x4000000 | 0;
                    out.words[0] = lo;

                    for (var k = 1; k < len; k++) {


                        var ncarry = carry >>> 26;
                        var rword = carry & 0x3ffffff;
                        var maxJ = Math.min(k, num.length - 1);
                        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
                            var i = k - j | 0;
                            a = self.words[i] | 0;
                            b = num.words[j] | 0;
                            r = a * b + rword;
                            ncarry += r / 0x4000000 | 0;
                            rword = r & 0x3ffffff;
                        }
                        out.words[k] = rword | 0;
                        carry = ncarry | 0;
                    }
                    if (carry !== 0) {
                        out.words[k] = carry | 0;
                    } else {
                        out.length--;
                    }

                    return out.strip();
                }




                var comb10MulTo = function comb10MulTo(self, num, out) {
                    var a = self.words;
                    var b = num.words;
                    var o = out.words;
                    var c = 0;
                    var lo;
                    var mid;
                    var hi;
                    var a0 = a[0] | 0;
                    var al0 = a0 & 0x1fff;
                    var ah0 = a0 >>> 13;
                    var a1 = a[1] | 0;
                    var al1 = a1 & 0x1fff;
                    var ah1 = a1 >>> 13;
                    var a2 = a[2] | 0;
                    var al2 = a2 & 0x1fff;
                    var ah2 = a2 >>> 13;
                    var a3 = a[3] | 0;
                    var al3 = a3 & 0x1fff;
                    var ah3 = a3 >>> 13;
                    var a4 = a[4] | 0;
                    var al4 = a4 & 0x1fff;
                    var ah4 = a4 >>> 13;
                    var a5 = a[5] | 0;
                    var al5 = a5 & 0x1fff;
                    var ah5 = a5 >>> 13;
                    var a6 = a[6] | 0;
                    var al6 = a6 & 0x1fff;
                    var ah6 = a6 >>> 13;
                    var a7 = a[7] | 0;
                    var al7 = a7 & 0x1fff;
                    var ah7 = a7 >>> 13;
                    var a8 = a[8] | 0;
                    var al8 = a8 & 0x1fff;
                    var ah8 = a8 >>> 13;
                    var a9 = a[9] | 0;
                    var al9 = a9 & 0x1fff;
                    var ah9 = a9 >>> 13;
                    var b0 = b[0] | 0;
                    var bl0 = b0 & 0x1fff;
                    var bh0 = b0 >>> 13;
                    var b1 = b[1] | 0;
                    var bl1 = b1 & 0x1fff;
                    var bh1 = b1 >>> 13;
                    var b2 = b[2] | 0;
                    var bl2 = b2 & 0x1fff;
                    var bh2 = b2 >>> 13;
                    var b3 = b[3] | 0;
                    var bl3 = b3 & 0x1fff;
                    var bh3 = b3 >>> 13;
                    var b4 = b[4] | 0;
                    var bl4 = b4 & 0x1fff;
                    var bh4 = b4 >>> 13;
                    var b5 = b[5] | 0;
                    var bl5 = b5 & 0x1fff;
                    var bh5 = b5 >>> 13;
                    var b6 = b[6] | 0;
                    var bl6 = b6 & 0x1fff;
                    var bh6 = b6 >>> 13;
                    var b7 = b[7] | 0;
                    var bl7 = b7 & 0x1fff;
                    var bh7 = b7 >>> 13;
                    var b8 = b[8] | 0;
                    var bl8 = b8 & 0x1fff;
                    var bh8 = b8 >>> 13;
                    var b9 = b[9] | 0;
                    var bl9 = b9 & 0x1fff;
                    var bh9 = b9 >>> 13;

                    out.negative = self.negative ^ num.negative;
                    out.length = 19;

                    lo = Math.imul(al0, bl0);
                    mid = Math.imul(al0, bh0);
                    mid = mid + Math.imul(ah0, bl0) | 0;
                    hi = Math.imul(ah0, bh0);
                    var w0 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
                    w0 &= 0x3ffffff;

                    lo = Math.imul(al1, bl0);
                    mid = Math.imul(al1, bh0);
                    mid = mid + Math.imul(ah1, bl0) | 0;
                    hi = Math.imul(ah1, bh0);
                    lo = lo + Math.imul(al0, bl1) | 0;
                    mid = mid + Math.imul(al0, bh1) | 0;
                    mid = mid + Math.imul(ah0, bl1) | 0;
                    hi = hi + Math.imul(ah0, bh1) | 0;
                    var w1 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
                    w1 &= 0x3ffffff;

                    lo = Math.imul(al2, bl0);
                    mid = Math.imul(al2, bh0);
                    mid = mid + Math.imul(ah2, bl0) | 0;
                    hi = Math.imul(ah2, bh0);
                    lo = lo + Math.imul(al1, bl1) | 0;
                    mid = mid + Math.imul(al1, bh1) | 0;
                    mid = mid + Math.imul(ah1, bl1) | 0;
                    hi = hi + Math.imul(ah1, bh1) | 0;
                    lo = lo + Math.imul(al0, bl2) | 0;
                    mid = mid + Math.imul(al0, bh2) | 0;
                    mid = mid + Math.imul(ah0, bl2) | 0;
                    hi = hi + Math.imul(ah0, bh2) | 0;
                    var w2 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
                    w2 &= 0x3ffffff;

                    lo = Math.imul(al3, bl0);
                    mid = Math.imul(al3, bh0);
                    mid = mid + Math.imul(ah3, bl0) | 0;
                    hi = Math.imul(ah3, bh0);
                    lo = lo + Math.imul(al2, bl1) | 0;
                    mid = mid + Math.imul(al2, bh1) | 0;
                    mid = mid + Math.imul(ah2, bl1) | 0;
                    hi = hi + Math.imul(ah2, bh1) | 0;
                    lo = lo + Math.imul(al1, bl2) | 0;
                    mid = mid + Math.imul(al1, bh2) | 0;
                    mid = mid + Math.imul(ah1, bl2) | 0;
                    hi = hi + Math.imul(ah1, bh2) | 0;
                    lo = lo + Math.imul(al0, bl3) | 0;
                    mid = mid + Math.imul(al0, bh3) | 0;
                    mid = mid + Math.imul(ah0, bl3) | 0;
                    hi = hi + Math.imul(ah0, bh3) | 0;
                    var w3 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
                    w3 &= 0x3ffffff;

                    lo = Math.imul(al4, bl0);
                    mid = Math.imul(al4, bh0);
                    mid = mid + Math.imul(ah4, bl0) | 0;
                    hi = Math.imul(ah4, bh0);
                    lo = lo + Math.imul(al3, bl1) | 0;
                    mid = mid + Math.imul(al3, bh1) | 0;
                    mid = mid + Math.imul(ah3, bl1) | 0;
                    hi = hi + Math.imul(ah3, bh1) | 0;
                    lo = lo + Math.imul(al2, bl2) | 0;
                    mid = mid + Math.imul(al2, bh2) | 0;
                    mid = mid + Math.imul(ah2, bl2) | 0;
                    hi = hi + Math.imul(ah2, bh2) | 0;
                    lo = lo + Math.imul(al1, bl3) | 0;
                    mid = mid + Math.imul(al1, bh3) | 0;
                    mid = mid + Math.imul(ah1, bl3) | 0;
                    hi = hi + Math.imul(ah1, bh3) | 0;
                    lo = lo + Math.imul(al0, bl4) | 0;
                    mid = mid + Math.imul(al0, bh4) | 0;
                    mid = mid + Math.imul(ah0, bl4) | 0;
                    hi = hi + Math.imul(ah0, bh4) | 0;
                    var w4 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
                    w4 &= 0x3ffffff;

                    lo = Math.imul(al5, bl0);
                    mid = Math.imul(al5, bh0);
                    mid = mid + Math.imul(ah5, bl0) | 0;
                    hi = Math.imul(ah5, bh0);
                    lo = lo + Math.imul(al4, bl1) | 0;
                    mid = mid + Math.imul(al4, bh1) | 0;
                    mid = mid + Math.imul(ah4, bl1) | 0;
                    hi = hi + Math.imul(ah4, bh1) | 0;
                    lo = lo + Math.imul(al3, bl2) | 0;
                    mid = mid + Math.imul(al3, bh2) | 0;
                    mid = mid + Math.imul(ah3, bl2) | 0;
                    hi = hi + Math.imul(ah3, bh2) | 0;
                    lo = lo + Math.imul(al2, bl3) | 0;
                    mid = mid + Math.imul(al2, bh3) | 0;
                    mid = mid + Math.imul(ah2, bl3) | 0;
                    hi = hi + Math.imul(ah2, bh3) | 0;
                    lo = lo + Math.imul(al1, bl4) | 0;
                    mid = mid + Math.imul(al1, bh4) | 0;
                    mid = mid + Math.imul(ah1, bl4) | 0;
                    hi = hi + Math.imul(ah1, bh4) | 0;
                    lo = lo + Math.imul(al0, bl5) | 0;
                    mid = mid + Math.imul(al0, bh5) | 0;
                    mid = mid + Math.imul(ah0, bl5) | 0;
                    hi = hi + Math.imul(ah0, bh5) | 0;
                    var w5 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
                    w5 &= 0x3ffffff;

                    lo = Math.imul(al6, bl0);
                    mid = Math.imul(al6, bh0);
                    mid = mid + Math.imul(ah6, bl0) | 0;
                    hi = Math.imul(ah6, bh0);
                    lo = lo + Math.imul(al5, bl1) | 0;
                    mid = mid + Math.imul(al5, bh1) | 0;
                    mid = mid + Math.imul(ah5, bl1) | 0;
                    hi = hi + Math.imul(ah5, bh1) | 0;
                    lo = lo + Math.imul(al4, bl2) | 0;
                    mid = mid + Math.imul(al4, bh2) | 0;
                    mid = mid + Math.imul(ah4, bl2) | 0;
                    hi = hi + Math.imul(ah4, bh2) | 0;
                    lo = lo + Math.imul(al3, bl3) | 0;
                    mid = mid + Math.imul(al3, bh3) | 0;
                    mid = mid + Math.imul(ah3, bl3) | 0;
                    hi = hi + Math.imul(ah3, bh3) | 0;
                    lo = lo + Math.imul(al2, bl4) | 0;
                    mid = mid + Math.imul(al2, bh4) | 0;
                    mid = mid + Math.imul(ah2, bl4) | 0;
                    hi = hi + Math.imul(ah2, bh4) | 0;
                    lo = lo + Math.imul(al1, bl5) | 0;
                    mid = mid + Math.imul(al1, bh5) | 0;
                    mid = mid + Math.imul(ah1, bl5) | 0;
                    hi = hi + Math.imul(ah1, bh5) | 0;
                    lo = lo + Math.imul(al0, bl6) | 0;
                    mid = mid + Math.imul(al0, bh6) | 0;
                    mid = mid + Math.imul(ah0, bl6) | 0;
                    hi = hi + Math.imul(ah0, bh6) | 0;
                    var w6 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
                    w6 &= 0x3ffffff;

                    lo = Math.imul(al7, bl0);
                    mid = Math.imul(al7, bh0);
                    mid = mid + Math.imul(ah7, bl0) | 0;
                    hi = Math.imul(ah7, bh0);
                    lo = lo + Math.imul(al6, bl1) | 0;
                    mid = mid + Math.imul(al6, bh1) | 0;
                    mid = mid + Math.imul(ah6, bl1) | 0;
                    hi = hi + Math.imul(ah6, bh1) | 0;
                    lo = lo + Math.imul(al5, bl2) | 0;
                    mid = mid + Math.imul(al5, bh2) | 0;
                    mid = mid + Math.imul(ah5, bl2) | 0;
                    hi = hi + Math.imul(ah5, bh2) | 0;
                    lo = lo + Math.imul(al4, bl3) | 0;
                    mid = mid + Math.imul(al4, bh3) | 0;
                    mid = mid + Math.imul(ah4, bl3) | 0;
                    hi = hi + Math.imul(ah4, bh3) | 0;
                    lo = lo + Math.imul(al3, bl4) | 0;
                    mid = mid + Math.imul(al3, bh4) | 0;
                    mid = mid + Math.imul(ah3, bl4) | 0;
                    hi = hi + Math.imul(ah3, bh4) | 0;
                    lo = lo + Math.imul(al2, bl5) | 0;
                    mid = mid + Math.imul(al2, bh5) | 0;
                    mid = mid + Math.imul(ah2, bl5) | 0;
                    hi = hi + Math.imul(ah2, bh5) | 0;
                    lo = lo + Math.imul(al1, bl6) | 0;
                    mid = mid + Math.imul(al1, bh6) | 0;
                    mid = mid + Math.imul(ah1, bl6) | 0;
                    hi = hi + Math.imul(ah1, bh6) | 0;
                    lo = lo + Math.imul(al0, bl7) | 0;
                    mid = mid + Math.imul(al0, bh7) | 0;
                    mid = mid + Math.imul(ah0, bl7) | 0;
                    hi = hi + Math.imul(ah0, bh7) | 0;
                    var w7 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
                    w7 &= 0x3ffffff;

                    lo = Math.imul(al8, bl0);
                    mid = Math.imul(al8, bh0);
                    mid = mid + Math.imul(ah8, bl0) | 0;
                    hi = Math.imul(ah8, bh0);
                    lo = lo + Math.imul(al7, bl1) | 0;
                    mid = mid + Math.imul(al7, bh1) | 0;
                    mid = mid + Math.imul(ah7, bl1) | 0;
                    hi = hi + Math.imul(ah7, bh1) | 0;
                    lo = lo + Math.imul(al6, bl2) | 0;
                    mid = mid + Math.imul(al6, bh2) | 0;
                    mid = mid + Math.imul(ah6, bl2) | 0;
                    hi = hi + Math.imul(ah6, bh2) | 0;
                    lo = lo + Math.imul(al5, bl3) | 0;
                    mid = mid + Math.imul(al5, bh3) | 0;
                    mid = mid + Math.imul(ah5, bl3) | 0;
                    hi = hi + Math.imul(ah5, bh3) | 0;
                    lo = lo + Math.imul(al4, bl4) | 0;
                    mid = mid + Math.imul(al4, bh4) | 0;
                    mid = mid + Math.imul(ah4, bl4) | 0;
                    hi = hi + Math.imul(ah4, bh4) | 0;
                    lo = lo + Math.imul(al3, bl5) | 0;
                    mid = mid + Math.imul(al3, bh5) | 0;
                    mid = mid + Math.imul(ah3, bl5) | 0;
                    hi = hi + Math.imul(ah3, bh5) | 0;
                    lo = lo + Math.imul(al2, bl6) | 0;
                    mid = mid + Math.imul(al2, bh6) | 0;
                    mid = mid + Math.imul(ah2, bl6) | 0;
                    hi = hi + Math.imul(ah2, bh6) | 0;
                    lo = lo + Math.imul(al1, bl7) | 0;
                    mid = mid + Math.imul(al1, bh7) | 0;
                    mid = mid + Math.imul(ah1, bl7) | 0;
                    hi = hi + Math.imul(ah1, bh7) | 0;
                    lo = lo + Math.imul(al0, bl8) | 0;
                    mid = mid + Math.imul(al0, bh8) | 0;
                    mid = mid + Math.imul(ah0, bl8) | 0;
                    hi = hi + Math.imul(ah0, bh8) | 0;
                    var w8 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
                    w8 &= 0x3ffffff;

                    lo = Math.imul(al9, bl0);
                    mid = Math.imul(al9, bh0);
                    mid = mid + Math.imul(ah9, bl0) | 0;
                    hi = Math.imul(ah9, bh0);
                    lo = lo + Math.imul(al8, bl1) | 0;
                    mid = mid + Math.imul(al8, bh1) | 0;
                    mid = mid + Math.imul(ah8, bl1) | 0;
                    hi = hi + Math.imul(ah8, bh1) | 0;
                    lo = lo + Math.imul(al7, bl2) | 0;
                    mid = mid + Math.imul(al7, bh2) | 0;
                    mid = mid + Math.imul(ah7, bl2) | 0;
                    hi = hi + Math.imul(ah7, bh2) | 0;
                    lo = lo + Math.imul(al6, bl3) | 0;
                    mid = mid + Math.imul(al6, bh3) | 0;
                    mid = mid + Math.imul(ah6, bl3) | 0;
                    hi = hi + Math.imul(ah6, bh3) | 0;
                    lo = lo + Math.imul(al5, bl4) | 0;
                    mid = mid + Math.imul(al5, bh4) | 0;
                    mid = mid + Math.imul(ah5, bl4) | 0;
                    hi = hi + Math.imul(ah5, bh4) | 0;
                    lo = lo + Math.imul(al4, bl5) | 0;
                    mid = mid + Math.imul(al4, bh5) | 0;
                    mid = mid + Math.imul(ah4, bl5) | 0;
                    hi = hi + Math.imul(ah4, bh5) | 0;
                    lo = lo + Math.imul(al3, bl6) | 0;
                    mid = mid + Math.imul(al3, bh6) | 0;
                    mid = mid + Math.imul(ah3, bl6) | 0;
                    hi = hi + Math.imul(ah3, bh6) | 0;
                    lo = lo + Math.imul(al2, bl7) | 0;
                    mid = mid + Math.imul(al2, bh7) | 0;
                    mid = mid + Math.imul(ah2, bl7) | 0;
                    hi = hi + Math.imul(ah2, bh7) | 0;
                    lo = lo + Math.imul(al1, bl8) | 0;
                    mid = mid + Math.imul(al1, bh8) | 0;
                    mid = mid + Math.imul(ah1, bl8) | 0;
                    hi = hi + Math.imul(ah1, bh8) | 0;
                    lo = lo + Math.imul(al0, bl9) | 0;
                    mid = mid + Math.imul(al0, bh9) | 0;
                    mid = mid + Math.imul(ah0, bl9) | 0;
                    hi = hi + Math.imul(ah0, bh9) | 0;
                    var w9 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
                    w9 &= 0x3ffffff;

                    lo = Math.imul(al9, bl1);
                    mid = Math.imul(al9, bh1);
                    mid = mid + Math.imul(ah9, bl1) | 0;
                    hi = Math.imul(ah9, bh1);
                    lo = lo + Math.imul(al8, bl2) | 0;
                    mid = mid + Math.imul(al8, bh2) | 0;
                    mid = mid + Math.imul(ah8, bl2) | 0;
                    hi = hi + Math.imul(ah8, bh2) | 0;
                    lo = lo + Math.imul(al7, bl3) | 0;
                    mid = mid + Math.imul(al7, bh3) | 0;
                    mid = mid + Math.imul(ah7, bl3) | 0;
                    hi = hi + Math.imul(ah7, bh3) | 0;
                    lo = lo + Math.imul(al6, bl4) | 0;
                    mid = mid + Math.imul(al6, bh4) | 0;
                    mid = mid + Math.imul(ah6, bl4) | 0;
                    hi = hi + Math.imul(ah6, bh4) | 0;
                    lo = lo + Math.imul(al5, bl5) | 0;
                    mid = mid + Math.imul(al5, bh5) | 0;
                    mid = mid + Math.imul(ah5, bl5) | 0;
                    hi = hi + Math.imul(ah5, bh5) | 0;
                    lo = lo + Math.imul(al4, bl6) | 0;
                    mid = mid + Math.imul(al4, bh6) | 0;
                    mid = mid + Math.imul(ah4, bl6) | 0;
                    hi = hi + Math.imul(ah4, bh6) | 0;
                    lo = lo + Math.imul(al3, bl7) | 0;
                    mid = mid + Math.imul(al3, bh7) | 0;
                    mid = mid + Math.imul(ah3, bl7) | 0;
                    hi = hi + Math.imul(ah3, bh7) | 0;
                    lo = lo + Math.imul(al2, bl8) | 0;
                    mid = mid + Math.imul(al2, bh8) | 0;
                    mid = mid + Math.imul(ah2, bl8) | 0;
                    hi = hi + Math.imul(ah2, bh8) | 0;
                    lo = lo + Math.imul(al1, bl9) | 0;
                    mid = mid + Math.imul(al1, bh9) | 0;
                    mid = mid + Math.imul(ah1, bl9) | 0;
                    hi = hi + Math.imul(ah1, bh9) | 0;
                    var w10 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
                    w10 &= 0x3ffffff;

                    lo = Math.imul(al9, bl2);
                    mid = Math.imul(al9, bh2);
                    mid = mid + Math.imul(ah9, bl2) | 0;
                    hi = Math.imul(ah9, bh2);
                    lo = lo + Math.imul(al8, bl3) | 0;
                    mid = mid + Math.imul(al8, bh3) | 0;
                    mid = mid + Math.imul(ah8, bl3) | 0;
                    hi = hi + Math.imul(ah8, bh3) | 0;
                    lo = lo + Math.imul(al7, bl4) | 0;
                    mid = mid + Math.imul(al7, bh4) | 0;
                    mid = mid + Math.imul(ah7, bl4) | 0;
                    hi = hi + Math.imul(ah7, bh4) | 0;
                    lo = lo + Math.imul(al6, bl5) | 0;
                    mid = mid + Math.imul(al6, bh5) | 0;
                    mid = mid + Math.imul(ah6, bl5) | 0;
                    hi = hi + Math.imul(ah6, bh5) | 0;
                    lo = lo + Math.imul(al5, bl6) | 0;
                    mid = mid + Math.imul(al5, bh6) | 0;
                    mid = mid + Math.imul(ah5, bl6) | 0;
                    hi = hi + Math.imul(ah5, bh6) | 0;
                    lo = lo + Math.imul(al4, bl7) | 0;
                    mid = mid + Math.imul(al4, bh7) | 0;
                    mid = mid + Math.imul(ah4, bl7) | 0;
                    hi = hi + Math.imul(ah4, bh7) | 0;
                    lo = lo + Math.imul(al3, bl8) | 0;
                    mid = mid + Math.imul(al3, bh8) | 0;
                    mid = mid + Math.imul(ah3, bl8) | 0;
                    hi = hi + Math.imul(ah3, bh8) | 0;
                    lo = lo + Math.imul(al2, bl9) | 0;
                    mid = mid + Math.imul(al2, bh9) | 0;
                    mid = mid + Math.imul(ah2, bl9) | 0;
                    hi = hi + Math.imul(ah2, bh9) | 0;
                    var w11 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
                    w11 &= 0x3ffffff;

                    lo = Math.imul(al9, bl3);
                    mid = Math.imul(al9, bh3);
                    mid = mid + Math.imul(ah9, bl3) | 0;
                    hi = Math.imul(ah9, bh3);
                    lo = lo + Math.imul(al8, bl4) | 0;
                    mid = mid + Math.imul(al8, bh4) | 0;
                    mid = mid + Math.imul(ah8, bl4) | 0;
                    hi = hi + Math.imul(ah8, bh4) | 0;
                    lo = lo + Math.imul(al7, bl5) | 0;
                    mid = mid + Math.imul(al7, bh5) | 0;
                    mid = mid + Math.imul(ah7, bl5) | 0;
                    hi = hi + Math.imul(ah7, bh5) | 0;
                    lo = lo + Math.imul(al6, bl6) | 0;
                    mid = mid + Math.imul(al6, bh6) | 0;
                    mid = mid + Math.imul(ah6, bl6) | 0;
                    hi = hi + Math.imul(ah6, bh6) | 0;
                    lo = lo + Math.imul(al5, bl7) | 0;
                    mid = mid + Math.imul(al5, bh7) | 0;
                    mid = mid + Math.imul(ah5, bl7) | 0;
                    hi = hi + Math.imul(ah5, bh7) | 0;
                    lo = lo + Math.imul(al4, bl8) | 0;
                    mid = mid + Math.imul(al4, bh8) | 0;
                    mid = mid + Math.imul(ah4, bl8) | 0;
                    hi = hi + Math.imul(ah4, bh8) | 0;
                    lo = lo + Math.imul(al3, bl9) | 0;
                    mid = mid + Math.imul(al3, bh9) | 0;
                    mid = mid + Math.imul(ah3, bl9) | 0;
                    hi = hi + Math.imul(ah3, bh9) | 0;
                    var w12 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
                    w12 &= 0x3ffffff;

                    lo = Math.imul(al9, bl4);
                    mid = Math.imul(al9, bh4);
                    mid = mid + Math.imul(ah9, bl4) | 0;
                    hi = Math.imul(ah9, bh4);
                    lo = lo + Math.imul(al8, bl5) | 0;
                    mid = mid + Math.imul(al8, bh5) | 0;
                    mid = mid + Math.imul(ah8, bl5) | 0;
                    hi = hi + Math.imul(ah8, bh5) | 0;
                    lo = lo + Math.imul(al7, bl6) | 0;
                    mid = mid + Math.imul(al7, bh6) | 0;
                    mid = mid + Math.imul(ah7, bl6) | 0;
                    hi = hi + Math.imul(ah7, bh6) | 0;
                    lo = lo + Math.imul(al6, bl7) | 0;
                    mid = mid + Math.imul(al6, bh7) | 0;
                    mid = mid + Math.imul(ah6, bl7) | 0;
                    hi = hi + Math.imul(ah6, bh7) | 0;
                    lo = lo + Math.imul(al5, bl8) | 0;
                    mid = mid + Math.imul(al5, bh8) | 0;
                    mid = mid + Math.imul(ah5, bl8) | 0;
                    hi = hi + Math.imul(ah5, bh8) | 0;
                    lo = lo + Math.imul(al4, bl9) | 0;
                    mid = mid + Math.imul(al4, bh9) | 0;
                    mid = mid + Math.imul(ah4, bl9) | 0;
                    hi = hi + Math.imul(ah4, bh9) | 0;
                    var w13 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
                    w13 &= 0x3ffffff;

                    lo = Math.imul(al9, bl5);
                    mid = Math.imul(al9, bh5);
                    mid = mid + Math.imul(ah9, bl5) | 0;
                    hi = Math.imul(ah9, bh5);
                    lo = lo + Math.imul(al8, bl6) | 0;
                    mid = mid + Math.imul(al8, bh6) | 0;
                    mid = mid + Math.imul(ah8, bl6) | 0;
                    hi = hi + Math.imul(ah8, bh6) | 0;
                    lo = lo + Math.imul(al7, bl7) | 0;
                    mid = mid + Math.imul(al7, bh7) | 0;
                    mid = mid + Math.imul(ah7, bl7) | 0;
                    hi = hi + Math.imul(ah7, bh7) | 0;
                    lo = lo + Math.imul(al6, bl8) | 0;
                    mid = mid + Math.imul(al6, bh8) | 0;
                    mid = mid + Math.imul(ah6, bl8) | 0;
                    hi = hi + Math.imul(ah6, bh8) | 0;
                    lo = lo + Math.imul(al5, bl9) | 0;
                    mid = mid + Math.imul(al5, bh9) | 0;
                    mid = mid + Math.imul(ah5, bl9) | 0;
                    hi = hi + Math.imul(ah5, bh9) | 0;
                    var w14 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
                    w14 &= 0x3ffffff;

                    lo = Math.imul(al9, bl6);
                    mid = Math.imul(al9, bh6);
                    mid = mid + Math.imul(ah9, bl6) | 0;
                    hi = Math.imul(ah9, bh6);
                    lo = lo + Math.imul(al8, bl7) | 0;
                    mid = mid + Math.imul(al8, bh7) | 0;
                    mid = mid + Math.imul(ah8, bl7) | 0;
                    hi = hi + Math.imul(ah8, bh7) | 0;
                    lo = lo + Math.imul(al7, bl8) | 0;
                    mid = mid + Math.imul(al7, bh8) | 0;
                    mid = mid + Math.imul(ah7, bl8) | 0;
                    hi = hi + Math.imul(ah7, bh8) | 0;
                    lo = lo + Math.imul(al6, bl9) | 0;
                    mid = mid + Math.imul(al6, bh9) | 0;
                    mid = mid + Math.imul(ah6, bl9) | 0;
                    hi = hi + Math.imul(ah6, bh9) | 0;
                    var w15 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
                    w15 &= 0x3ffffff;

                    lo = Math.imul(al9, bl7);
                    mid = Math.imul(al9, bh7);
                    mid = mid + Math.imul(ah9, bl7) | 0;
                    hi = Math.imul(ah9, bh7);
                    lo = lo + Math.imul(al8, bl8) | 0;
                    mid = mid + Math.imul(al8, bh8) | 0;
                    mid = mid + Math.imul(ah8, bl8) | 0;
                    hi = hi + Math.imul(ah8, bh8) | 0;
                    lo = lo + Math.imul(al7, bl9) | 0;
                    mid = mid + Math.imul(al7, bh9) | 0;
                    mid = mid + Math.imul(ah7, bl9) | 0;
                    hi = hi + Math.imul(ah7, bh9) | 0;
                    var w16 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
                    w16 &= 0x3ffffff;

                    lo = Math.imul(al9, bl8);
                    mid = Math.imul(al9, bh8);
                    mid = mid + Math.imul(ah9, bl8) | 0;
                    hi = Math.imul(ah9, bh8);
                    lo = lo + Math.imul(al8, bl9) | 0;
                    mid = mid + Math.imul(al8, bh9) | 0;
                    mid = mid + Math.imul(ah8, bl9) | 0;
                    hi = hi + Math.imul(ah8, bh9) | 0;
                    var w17 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
                    w17 &= 0x3ffffff;

                    lo = Math.imul(al9, bl9);
                    mid = Math.imul(al9, bh9);
                    mid = mid + Math.imul(ah9, bl9) | 0;
                    hi = Math.imul(ah9, bh9);
                    var w18 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
                    w18 &= 0x3ffffff;
                    o[0] = w0;
                    o[1] = w1;
                    o[2] = w2;
                    o[3] = w3;
                    o[4] = w4;
                    o[5] = w5;
                    o[6] = w6;
                    o[7] = w7;
                    o[8] = w8;
                    o[9] = w9;
                    o[10] = w10;
                    o[11] = w11;
                    o[12] = w12;
                    o[13] = w13;
                    o[14] = w14;
                    o[15] = w15;
                    o[16] = w16;
                    o[17] = w17;
                    o[18] = w18;
                    if (c !== 0) {
                        o[19] = c;
                        out.length++;
                    }
                    return out;
                };


                if (!Math.imul) {
                    comb10MulTo = smallMulTo;
                }

                function bigMulTo(self, num, out) {
                    out.negative = num.negative ^ self.negative;
                    out.length = self.length + num.length;

                    var carry = 0;
                    var hncarry = 0;
                    for (var k = 0; k < out.length - 1; k++) {


                        var ncarry = hncarry;
                        hncarry = 0;
                        var rword = carry & 0x3ffffff;
                        var maxJ = Math.min(k, num.length - 1);
                        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
                            var i = k - j;
                            var a = self.words[i] | 0;
                            var b = num.words[j] | 0;
                            var r = a * b;

                            var lo = r & 0x3ffffff;
                            ncarry = ncarry + (r / 0x4000000 | 0) | 0;
                            lo = lo + rword | 0;
                            rword = lo & 0x3ffffff;
                            ncarry = ncarry + (lo >>> 26) | 0;

                            hncarry += ncarry >>> 26;
                            ncarry &= 0x3ffffff;
                        }
                        out.words[k] = rword;
                        carry = ncarry;
                        ncarry = hncarry;
                    }
                    if (carry !== 0) {
                        out.words[k] = carry;
                    } else {
                        out.length--;
                    }

                    return out.strip();
                }

                function jumboMulTo(self, num, out) {
                    var fftm = new FFTM();
                    return fftm.mulp(self, num, out);
                }

                BN.prototype.mulTo = function mulTo(num, out) {
                    var res;
                    var len = this.length + num.length;
                    if (this.length === 10 && num.length === 10) {
                        res = comb10MulTo(this, num, out);
                    } else if (len < 63) {
                        res = smallMulTo(this, num, out);
                    } else if (len < 1024) {
                        res = bigMulTo(this, num, out);
                    } else {
                        res = jumboMulTo(this, num, out);
                    }

                    return res;
                };




                function FFTM(x, y) {
                    this.x = x;
                    this.y = y;
                }

                FFTM.prototype.makeRBT = function makeRBT(N) {
                    var t = new Array(N);
                    var l = BN.prototype._countBits(N) - 1;
                    for (var i = 0; i < N; i++) {
                        t[i] = this.revBin(i, l, N);
                    }

                    return t;
                };


                FFTM.prototype.revBin = function revBin(x, l, N) {
                    if (x === 0 || x === N - 1) return x;

                    var rb = 0;
                    for (var i = 0; i < l; i++) {
                        rb |= (x & 1) << l - i - 1;
                        x >>= 1;
                    }

                    return rb;
                };



                FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
                    for (var i = 0; i < N; i++) {
                        rtws[i] = rws[rbt[i]];
                        itws[i] = iws[rbt[i]];
                    }
                };

                FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
                    this.permute(rbt, rws, iws, rtws, itws, N);

                    for (var s = 1; s < N; s <<= 1) {
                        var l = s << 1;

                        var rtwdf = Math.cos(2 * Math.PI / l);
                        var itwdf = Math.sin(2 * Math.PI / l);

                        for (var p = 0; p < N; p += l) {
                            var rtwdf_ = rtwdf;
                            var itwdf_ = itwdf;

                            for (var j = 0; j < s; j++) {
                                var re = rtws[p + j];
                                var ie = itws[p + j];

                                var ro = rtws[p + j + s];
                                var io = itws[p + j + s];

                                var rx = rtwdf_ * ro - itwdf_ * io;

                                io = rtwdf_ * io + itwdf_ * ro;
                                ro = rx;

                                rtws[p + j] = re + ro;
                                itws[p + j] = ie + io;

                                rtws[p + j + s] = re - ro;
                                itws[p + j + s] = ie - io;


                                if (j !== l) {
                                    rx = rtwdf * rtwdf_ - itwdf * itwdf_;

                                    itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                                    rtwdf_ = rx;
                                }
                            }
                        }
                    }
                };

                FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
                    var N = Math.max(m, n) | 1;
                    var odd = N & 1;
                    var i = 0;
                    for (N = N / 2 | 0; N; N = N >>> 1) {
                        i++;
                    }

                    return 1 << i + 1 + odd;
                };

                FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
                    if (N <= 1) return;

                    for (var i = 0; i < N / 2; i++) {
                        var t = rws[i];

                        rws[i] = rws[N - i - 1];
                        rws[N - i - 1] = t;

                        t = iws[i];

                        iws[i] = -iws[N - i - 1];
                        iws[N - i - 1] = -t;
                    }
                };

                FFTM.prototype.normalize13b = function normalize13b(ws, N) {
                    var carry = 0;
                    for (var i = 0; i < N / 2; i++) {
                        var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
                        Math.round(ws[2 * i] / N) +
                        carry;

                        ws[i] = w & 0x3ffffff;

                        if (w < 0x4000000) {
                            carry = 0;
                        } else {
                            carry = w / 0x4000000 | 0;
                        }
                    }

                    return ws;
                };

                FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
                    var carry = 0;
                    for (var i = 0; i < len; i++) {
                        carry = carry + (ws[i] | 0);

                        rws[2 * i] = carry & 0x1fff;carry = carry >>> 13;
                        rws[2 * i + 1] = carry & 0x1fff;carry = carry >>> 13;
                    }


                    for (i = 2 * len; i < N; ++i) {
                        rws[i] = 0;
                    }

                    assert(carry === 0);
                    assert((carry & ~0x1fff) === 0);
                };

                FFTM.prototype.stub = function stub(N) {
                    var ph = new Array(N);
                    for (var i = 0; i < N; i++) {
                        ph[i] = 0;
                    }

                    return ph;
                };

                FFTM.prototype.mulp = function mulp(x, y, out) {
                    var N = 2 * this.guessLen13b(x.length, y.length);

                    var rbt = this.makeRBT(N);

                    var _ = this.stub(N);

                    var rws = new Array(N);
                    var rwst = new Array(N);
                    var iwst = new Array(N);

                    var nrws = new Array(N);
                    var nrwst = new Array(N);
                    var niwst = new Array(N);

                    var rmws = out.words;
                    rmws.length = N;

                    this.convert13b(x.words, x.length, rws, N);
                    this.convert13b(y.words, y.length, nrws, N);

                    this.transform(rws, _, rwst, iwst, N, rbt);
                    this.transform(nrws, _, nrwst, niwst, N, rbt);

                    for (var i = 0; i < N; i++) {
                        var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
                        iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
                        rwst[i] = rx;
                    }

                    this.conjugate(rwst, iwst, N);
                    this.transform(rwst, iwst, rmws, _, N, rbt);
                    this.conjugate(rmws, _, N);
                    this.normalize13b(rmws, N);

                    out.negative = x.negative ^ y.negative;
                    out.length = x.length + y.length;
                    return out.strip();
                };


                BN.prototype.mul = function mul(num) {
                    var out = new BN(null);
                    out.words = new Array(this.length + num.length);
                    return this.mulTo(num, out);
                };


                BN.prototype.mulf = function mulf(num) {
                    var out = new BN(null);
                    out.words = new Array(this.length + num.length);
                    return jumboMulTo(this, num, out);
                };


                BN.prototype.imul = function imul(num) {
                    return this.clone().mulTo(num, this);
                };

                BN.prototype.imuln = function imuln(num) {
                    assert(typeof num === 'number');
                    assert(num < 0x4000000);


                    var carry = 0;
                    for (var i = 0; i < this.length; i++) {
                        var w = (this.words[i] | 0) * num;
                        var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
                        carry >>= 26;
                        carry += w / 0x4000000 | 0;

                        carry += lo >>> 26;
                        this.words[i] = lo & 0x3ffffff;
                    }

                    if (carry !== 0) {
                        this.words[i] = carry;
                        this.length++;
                    }

                    return this;
                };

                BN.prototype.muln = function muln(num) {
                    return this.clone().imuln(num);
                };


                BN.prototype.sqr = function sqr() {
                    return this.mul(this);
                };


                BN.prototype.isqr = function isqr() {
                    return this.imul(this.clone());
                };


                BN.prototype.pow = function pow(num) {
                    var w = toBitArray(num);
                    if (w.length === 0) return new BN(1);


                    var res = this;
                    for (var i = 0; i < w.length; i++, res = res.sqr()) {
                        if (w[i] !== 0) break;
                    }

                    if (++i < w.length) {
                        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
                            if (w[i] === 0) continue;

                            res = res.mul(q);
                        }
                    }

                    return res;
                };


                BN.prototype.iushln = function iushln(bits) {
                    assert(typeof bits === 'number' && bits >= 0);
                    var r = bits % 26;
                    var s = (bits - r) / 26;
                    var carryMask = 0x3ffffff >>> 26 - r << 26 - r;
                    var i;

                    if (r !== 0) {
                        var carry = 0;

                        for (i = 0; i < this.length; i++) {
                            var newCarry = this.words[i] & carryMask;
                            var c = (this.words[i] | 0) - newCarry << r;
                            this.words[i] = c | carry;
                            carry = newCarry >>> 26 - r;
                        }

                        if (carry) {
                            this.words[i] = carry;
                            this.length++;
                        }
                    }

                    if (s !== 0) {
                        for (i = this.length - 1; i >= 0; i--) {
                            this.words[i + s] = this.words[i];
                        }

                        for (i = 0; i < s; i++) {
                            this.words[i] = 0;
                        }

                        this.length += s;
                    }

                    return this.strip();
                };

                BN.prototype.ishln = function ishln(bits) {

                    assert(this.negative === 0);
                    return this.iushln(bits);
                };




                BN.prototype.iushrn = function iushrn(bits, hint, extended) {
                    assert(typeof bits === 'number' && bits >= 0);
                    var h;
                    if (hint) {
                        h = (hint - hint % 26) / 26;
                    } else {
                        h = 0;
                    }

                    var r = bits % 26;
                    var s = Math.min((bits - r) / 26, this.length);
                    var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
                    var maskedWords = extended;

                    h -= s;
                    h = Math.max(0, h);


                    if (maskedWords) {
                        for (var i = 0; i < s; i++) {
                            maskedWords.words[i] = this.words[i];
                        }
                        maskedWords.length = s;
                    }

                    if (s === 0) {

                    } else if (this.length > s) {
                        this.length -= s;
                        for (i = 0; i < this.length; i++) {
                            this.words[i] = this.words[i + s];
                        }
                    } else {
                        this.words[0] = 0;
                        this.length = 1;
                    }

                    var carry = 0;
                    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
                        var word = this.words[i] | 0;
                        this.words[i] = carry << 26 - r | word >>> r;
                        carry = word & mask;
                    }


                    if (maskedWords && carry !== 0) {
                        maskedWords.words[maskedWords.length++] = carry;
                    }

                    if (this.length === 0) {
                        this.words[0] = 0;
                        this.length = 1;
                    }

                    return this.strip();
                };

                BN.prototype.ishrn = function ishrn(bits, hint, extended) {

                    assert(this.negative === 0);
                    return this.iushrn(bits, hint, extended);
                };


                BN.prototype.shln = function shln(bits) {
                    return this.clone().ishln(bits);
                };

                BN.prototype.ushln = function ushln(bits) {
                    return this.clone().iushln(bits);
                };


                BN.prototype.shrn = function shrn(bits) {
                    return this.clone().ishrn(bits);
                };

                BN.prototype.ushrn = function ushrn(bits) {
                    return this.clone().iushrn(bits);
                };


                BN.prototype.testn = function testn(bit) {
                    assert(typeof bit === 'number' && bit >= 0);
                    var r = bit % 26;
                    var s = (bit - r) / 26;
                    var q = 1 << r;


                    if (this.length <= s) return false;


                    var w = this.words[s];

                    return !!(w & q);
                };


                BN.prototype.imaskn = function imaskn(bits) {
                    assert(typeof bits === 'number' && bits >= 0);
                    var r = bits % 26;
                    var s = (bits - r) / 26;

                    assert(this.negative === 0, 'imaskn works only with positive numbers');

                    if (this.length <= s) {
                        return this;
                    }

                    if (r !== 0) {
                        s++;
                    }
                    this.length = Math.min(s, this.length);

                    if (r !== 0) {
                        var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
                        this.words[this.length - 1] &= mask;
                    }

                    return this.strip();
                };


                BN.prototype.maskn = function maskn(bits) {
                    return this.clone().imaskn(bits);
                };


                BN.prototype.iaddn = function iaddn(num) {
                    assert(typeof num === 'number');
                    assert(num < 0x4000000);
                    if (num < 0) return this.isubn(-num);


                    if (this.negative !== 0) {
                        if (this.length === 1 && (this.words[0] | 0) < num) {
                            this.words[0] = num - (this.words[0] | 0);
                            this.negative = 0;
                            return this;
                        }

                        this.negative = 0;
                        this.isubn(num);
                        this.negative = 1;
                        return this;
                    }


                    return this._iaddn(num);
                };

                BN.prototype._iaddn = function _iaddn(num) {
                    this.words[0] += num;


                    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
                        this.words[i] -= 0x4000000;
                        if (i === this.length - 1) {
                            this.words[i + 1] = 1;
                        } else {
                            this.words[i + 1]++;
                        }
                    }
                    this.length = Math.max(this.length, i + 1);

                    return this;
                };


                BN.prototype.isubn = function isubn(num) {
                    assert(typeof num === 'number');
                    assert(num < 0x4000000);
                    if (num < 0) return this.iaddn(-num);

                    if (this.negative !== 0) {
                        this.negative = 0;
                        this.iaddn(num);
                        this.negative = 1;
                        return this;
                    }

                    this.words[0] -= num;

                    if (this.length === 1 && this.words[0] < 0) {
                        this.words[0] = -this.words[0];
                        this.negative = 1;
                    } else {

                        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
                            this.words[i] += 0x4000000;
                            this.words[i + 1] -= 1;
                        }
                    }

                    return this.strip();
                };

                BN.prototype.addn = function addn(num) {
                    return this.clone().iaddn(num);
                };

                BN.prototype.subn = function subn(num) {
                    return this.clone().isubn(num);
                };

                BN.prototype.iabs = function iabs() {
                    this.negative = 0;

                    return this;
                };

                BN.prototype.abs = function abs() {
                    return this.clone().iabs();
                };

                BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
                    var len = num.length + shift;
                    var i;

                    this._expand(len);

                    var w;
                    var carry = 0;
                    for (i = 0; i < num.length; i++) {
                        w = (this.words[i + shift] | 0) + carry;
                        var right = (num.words[i] | 0) * mul;
                        w -= right & 0x3ffffff;
                        carry = (w >> 26) - (right / 0x4000000 | 0);
                        this.words[i + shift] = w & 0x3ffffff;
                    }
                    for (; i < this.length - shift; i++) {
                        w = (this.words[i + shift] | 0) + carry;
                        carry = w >> 26;
                        this.words[i + shift] = w & 0x3ffffff;
                    }

                    if (carry === 0) return this.strip();


                    assert(carry === -1);
                    carry = 0;
                    for (i = 0; i < this.length; i++) {
                        w = -(this.words[i] | 0) + carry;
                        carry = w >> 26;
                        this.words[i] = w & 0x3ffffff;
                    }
                    this.negative = 1;

                    return this.strip();
                };

                BN.prototype._wordDiv = function _wordDiv(num, mode) {
                    var shift = this.length - num.length;

                    var a = this.clone();
                    var b = num;


                    var bhi = b.words[b.length - 1] | 0;
                    var bhiBits = this._countBits(bhi);
                    shift = 26 - bhiBits;
                    if (shift !== 0) {
                        b = b.ushln(shift);
                        a.iushln(shift);
                        bhi = b.words[b.length - 1] | 0;
                    }


                    var m = a.length - b.length;
                    var q;

                    if (mode !== 'mod') {
                        q = new BN(null);
                        q.length = m + 1;
                        q.words = new Array(q.length);
                        for (var i = 0; i < q.length; i++) {
                            q.words[i] = 0;
                        }
                    }

                    var diff = a.clone()._ishlnsubmul(b, 1, m);
                    if (diff.negative === 0) {
                        a = diff;
                        if (q) {
                            q.words[m] = 1;
                        }
                    }

                    for (var j = m - 1; j >= 0; j--) {
                        var qj = (a.words[b.length + j] | 0) * 0x4000000 + (
                        a.words[b.length + j - 1] | 0);



                        qj = Math.min(qj / bhi | 0, 0x3ffffff);

                        a._ishlnsubmul(b, qj, j);
                        while (a.negative !== 0) {
                            qj--;
                            a.negative = 0;
                            a._ishlnsubmul(b, 1, j);
                            if (!a.isZero()) {
                                a.negative ^= 1;
                            }
                        }
                        if (q) {
                            q.words[j] = qj;
                        }
                    }
                    if (q) {
                        q.strip();
                    }
                    a.strip();


                    if (mode !== 'div' && shift !== 0) {
                        a.iushrn(shift);
                    }

                    return {
                        div: q || null,
                        mod: a };

                };





                BN.prototype.divmod = function divmod(num, mode, positive) {
                    assert(!num.isZero());

                    if (this.isZero()) {
                        return {
                            div: new BN(0),
                            mod: new BN(0) };

                    }

                    var div, mod, res;
                    if (this.negative !== 0 && num.negative === 0) {
                        res = this.neg().divmod(num, mode);

                        if (mode !== 'mod') {
                            div = res.div.neg();
                        }

                        if (mode !== 'div') {
                            mod = res.mod.neg();
                            if (positive && mod.negative !== 0) {
                                mod.iadd(num);
                            }
                        }

                        return {
                            div: div,
                            mod: mod };

                    }

                    if (this.negative === 0 && num.negative !== 0) {
                        res = this.divmod(num.neg(), mode);

                        if (mode !== 'mod') {
                            div = res.div.neg();
                        }

                        return {
                            div: div,
                            mod: res.mod };

                    }

                    if ((this.negative & num.negative) !== 0) {
                        res = this.neg().divmod(num.neg(), mode);

                        if (mode !== 'div') {
                            mod = res.mod.neg();
                            if (positive && mod.negative !== 0) {
                                mod.isub(num);
                            }
                        }

                        return {
                            div: res.div,
                            mod: mod };

                    }




                    if (num.length > this.length || this.cmp(num) < 0) {
                        return {
                            div: new BN(0),
                            mod: this };

                    }


                    if (num.length === 1) {
                        if (mode === 'div') {
                            return {
                                div: this.divn(num.words[0]),
                                mod: null };

                        }

                        if (mode === 'mod') {
                            return {
                                div: null,
                                mod: new BN(this.modn(num.words[0])) };

                        }

                        return {
                            div: this.divn(num.words[0]),
                            mod: new BN(this.modn(num.words[0])) };

                    }

                    return this._wordDiv(num, mode);
                };


                BN.prototype.div = function div(num) {
                    return this.divmod(num, 'div', false).div;
                };


                BN.prototype.mod = function mod(num) {
                    return this.divmod(num, 'mod', false).mod;
                };

                BN.prototype.umod = function umod(num) {
                    return this.divmod(num, 'mod', true).mod;
                };


                BN.prototype.divRound = function divRound(num) {
                    var dm = this.divmod(num);


                    if (dm.mod.isZero()) return dm.div;

                    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

                    var half = num.ushrn(1);
                    var r2 = num.andln(1);
                    var cmp = mod.cmp(half);


                    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;


                    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
                };

                BN.prototype.modn = function modn(num) {
                    assert(num <= 0x3ffffff);
                    var p = (1 << 26) % num;

                    var acc = 0;
                    for (var i = this.length - 1; i >= 0; i--) {
                        acc = (p * acc + (this.words[i] | 0)) % num;
                    }

                    return acc;
                };


                BN.prototype.idivn = function idivn(num) {
                    assert(num <= 0x3ffffff);

                    var carry = 0;
                    for (var i = this.length - 1; i >= 0; i--) {
                        var w = (this.words[i] | 0) + carry * 0x4000000;
                        this.words[i] = w / num | 0;
                        carry = w % num;
                    }

                    return this.strip();
                };

                BN.prototype.divn = function divn(num) {
                    return this.clone().idivn(num);
                };

                BN.prototype.egcd = function egcd(p) {
                    assert(p.negative === 0);
                    assert(!p.isZero());

                    var x = this;
                    var y = p.clone();

                    if (x.negative !== 0) {
                        x = x.umod(p);
                    } else {
                        x = x.clone();
                    }


                    var A = new BN(1);
                    var B = new BN(0);


                    var C = new BN(0);
                    var D = new BN(1);

                    var g = 0;

                    while (x.isEven() && y.isEven()) {
                        x.iushrn(1);
                        y.iushrn(1);
                        ++g;
                    }

                    var yp = y.clone();
                    var xp = x.clone();

                    while (!x.isZero()) {
                        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) {}
                        if (i > 0) {
                            x.iushrn(i);
                            while (i-- > 0) {
                                if (A.isOdd() || B.isOdd()) {
                                    A.iadd(yp);
                                    B.isub(xp);
                                }

                                A.iushrn(1);
                                B.iushrn(1);
                            }
                        }

                        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) {}
                        if (j > 0) {
                            y.iushrn(j);
                            while (j-- > 0) {
                                if (C.isOdd() || D.isOdd()) {
                                    C.iadd(yp);
                                    D.isub(xp);
                                }

                                C.iushrn(1);
                                D.iushrn(1);
                            }
                        }

                        if (x.cmp(y) >= 0) {
                            x.isub(y);
                            A.isub(C);
                            B.isub(D);
                        } else {
                            y.isub(x);
                            C.isub(A);
                            D.isub(B);
                        }
                    }

                    return {
                        a: C,
                        b: D,
                        gcd: y.iushln(g) };

                };




                BN.prototype._invmp = function _invmp(p) {
                    assert(p.negative === 0);
                    assert(!p.isZero());

                    var a = this;
                    var b = p.clone();

                    if (a.negative !== 0) {
                        a = a.umod(p);
                    } else {
                        a = a.clone();
                    }

                    var x1 = new BN(1);
                    var x2 = new BN(0);

                    var delta = b.clone();

                    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
                        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) {}
                        if (i > 0) {
                            a.iushrn(i);
                            while (i-- > 0) {
                                if (x1.isOdd()) {
                                    x1.iadd(delta);
                                }

                                x1.iushrn(1);
                            }
                        }

                        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) {}
                        if (j > 0) {
                            b.iushrn(j);
                            while (j-- > 0) {
                                if (x2.isOdd()) {
                                    x2.iadd(delta);
                                }

                                x2.iushrn(1);
                            }
                        }

                        if (a.cmp(b) >= 0) {
                            a.isub(b);
                            x1.isub(x2);
                        } else {
                            b.isub(a);
                            x2.isub(x1);
                        }
                    }

                    var res;
                    if (a.cmpn(1) === 0) {
                        res = x1;
                    } else {
                        res = x2;
                    }

                    if (res.cmpn(0) < 0) {
                        res.iadd(p);
                    }

                    return res;
                };

                BN.prototype.gcd = function gcd(num) {
                    if (this.isZero()) return num.abs();
                    if (num.isZero()) return this.abs();

                    var a = this.clone();
                    var b = num.clone();
                    a.negative = 0;
                    b.negative = 0;


                    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
                        a.iushrn(1);
                        b.iushrn(1);
                    }

                    do {
                        while (a.isEven()) {
                            a.iushrn(1);
                        }
                        while (b.isEven()) {
                            b.iushrn(1);
                        }

                        var r = a.cmp(b);
                        if (r < 0) {

                            var t = a;
                            a = b;
                            b = t;
                        } else if (r === 0 || b.cmpn(1) === 0) {
                            break;
                        }

                        a.isub(b);
                    } while (true);

                    return b.iushln(shift);
                };


                BN.prototype.invm = function invm(num) {
                    return this.egcd(num).a.umod(num);
                };

                BN.prototype.isEven = function isEven() {
                    return (this.words[0] & 1) === 0;
                };

                BN.prototype.isOdd = function isOdd() {
                    return (this.words[0] & 1) === 1;
                };


                BN.prototype.andln = function andln(num) {
                    return this.words[0] & num;
                };


                BN.prototype.bincn = function bincn(bit) {
                    assert(typeof bit === 'number');
                    var r = bit % 26;
                    var s = (bit - r) / 26;
                    var q = 1 << r;


                    if (this.length <= s) {
                        this._expand(s + 1);
                        this.words[s] |= q;
                        return this;
                    }


                    var carry = q;
                    for (var i = s; carry !== 0 && i < this.length; i++) {
                        var w = this.words[i] | 0;
                        w += carry;
                        carry = w >>> 26;
                        w &= 0x3ffffff;
                        this.words[i] = w;
                    }
                    if (carry !== 0) {
                        this.words[i] = carry;
                        this.length++;
                    }
                    return this;
                };

                BN.prototype.isZero = function isZero() {
                    return this.length === 1 && this.words[0] === 0;
                };

                BN.prototype.cmpn = function cmpn(num) {
                    var negative = num < 0;

                    if (this.negative !== 0 && !negative) return -1;
                    if (this.negative === 0 && negative) return 1;

                    this.strip();

                    var res;
                    if (this.length > 1) {
                        res = 1;
                    } else {
                        if (negative) {
                            num = -num;
                        }

                        assert(num <= 0x3ffffff, 'Number is too big');

                        var w = this.words[0] | 0;
                        res = w === num ? 0 : w < num ? -1 : 1;
                    }
                    if (this.negative !== 0) return -res | 0;
                    return res;
                };





                BN.prototype.cmp = function cmp(num) {
                    if (this.negative !== 0 && num.negative === 0) return -1;
                    if (this.negative === 0 && num.negative !== 0) return 1;

                    var res = this.ucmp(num);
                    if (this.negative !== 0) return -res | 0;
                    return res;
                };


                BN.prototype.ucmp = function ucmp(num) {

                    if (this.length > num.length) return 1;
                    if (this.length < num.length) return -1;

                    var res = 0;
                    for (var i = this.length - 1; i >= 0; i--) {
                        var a = this.words[i] | 0;
                        var b = num.words[i] | 0;

                        if (a === b) continue;
                        if (a < b) {
                            res = -1;
                        } else if (a > b) {
                            res = 1;
                        }
                        break;
                    }
                    return res;
                };

                BN.prototype.gtn = function gtn(num) {
                    return this.cmpn(num) === 1;
                };

                BN.prototype.gt = function gt(num) {
                    return this.cmp(num) === 1;
                };

                BN.prototype.gten = function gten(num) {
                    return this.cmpn(num) >= 0;
                };

                BN.prototype.gte = function gte(num) {
                    return this.cmp(num) >= 0;
                };

                BN.prototype.ltn = function ltn(num) {
                    return this.cmpn(num) === -1;
                };

                BN.prototype.lt = function lt(num) {
                    return this.cmp(num) === -1;
                };

                BN.prototype.lten = function lten(num) {
                    return this.cmpn(num) <= 0;
                };

                BN.prototype.lte = function lte(num) {
                    return this.cmp(num) <= 0;
                };

                BN.prototype.eqn = function eqn(num) {
                    return this.cmpn(num) === 0;
                };

                BN.prototype.eq = function eq(num) {
                    return this.cmp(num) === 0;
                };





                BN.red = function red(num) {
                    return new Red(num);
                };

                BN.prototype.toRed = function toRed(ctx) {
                    assert(!this.red, 'Already a number in reduction context');
                    assert(this.negative === 0, 'red works only with positives');
                    return ctx.convertTo(this)._forceRed(ctx);
                };

                BN.prototype.fromRed = function fromRed() {
                    assert(this.red, 'fromRed works only with numbers in reduction context');
                    return this.red.convertFrom(this);
                };

                BN.prototype._forceRed = function _forceRed(ctx) {
                    this.red = ctx;
                    return this;
                };

                BN.prototype.forceRed = function forceRed(ctx) {
                    assert(!this.red, 'Already a number in reduction context');
                    return this._forceRed(ctx);
                };

                BN.prototype.redAdd = function redAdd(num) {
                    assert(this.red, 'redAdd works only with red numbers');
                    return this.red.add(this, num);
                };

                BN.prototype.redIAdd = function redIAdd(num) {
                    assert(this.red, 'redIAdd works only with red numbers');
                    return this.red.iadd(this, num);
                };

                BN.prototype.redSub = function redSub(num) {
                    assert(this.red, 'redSub works only with red numbers');
                    return this.red.sub(this, num);
                };

                BN.prototype.redISub = function redISub(num) {
                    assert(this.red, 'redISub works only with red numbers');
                    return this.red.isub(this, num);
                };

                BN.prototype.redShl = function redShl(num) {
                    assert(this.red, 'redShl works only with red numbers');
                    return this.red.shl(this, num);
                };

                BN.prototype.redMul = function redMul(num) {
                    assert(this.red, 'redMul works only with red numbers');
                    this.red._verify2(this, num);
                    return this.red.mul(this, num);
                };

                BN.prototype.redIMul = function redIMul(num) {
                    assert(this.red, 'redMul works only with red numbers');
                    this.red._verify2(this, num);
                    return this.red.imul(this, num);
                };

                BN.prototype.redSqr = function redSqr() {
                    assert(this.red, 'redSqr works only with red numbers');
                    this.red._verify1(this);
                    return this.red.sqr(this);
                };

                BN.prototype.redISqr = function redISqr() {
                    assert(this.red, 'redISqr works only with red numbers');
                    this.red._verify1(this);
                    return this.red.isqr(this);
                };


                BN.prototype.redSqrt = function redSqrt() {
                    assert(this.red, 'redSqrt works only with red numbers');
                    this.red._verify1(this);
                    return this.red.sqrt(this);
                };

                BN.prototype.redInvm = function redInvm() {
                    assert(this.red, 'redInvm works only with red numbers');
                    this.red._verify1(this);
                    return this.red.invm(this);
                };


                BN.prototype.redNeg = function redNeg() {
                    assert(this.red, 'redNeg works only with red numbers');
                    this.red._verify1(this);
                    return this.red.neg(this);
                };

                BN.prototype.redPow = function redPow(num) {
                    assert(this.red && !num.red, 'redPow(normalNum)');
                    this.red._verify1(this);
                    return this.red.pow(this, num);
                };


                var primes = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null };



                function MPrime(name, p) {

                    this.name = name;
                    this.p = new BN(p, 16);
                    this.n = this.p.bitLength();
                    this.k = new BN(1).iushln(this.n).isub(this.p);

                    this.tmp = this._tmp();
                }

                MPrime.prototype._tmp = function _tmp() {
                    var tmp = new BN(null);
                    tmp.words = new Array(Math.ceil(this.n / 13));
                    return tmp;
                };

                MPrime.prototype.ireduce = function ireduce(num) {


                    var r = num;
                    var rlen;

                    do {
                        this.split(r, this.tmp);
                        r = this.imulK(r);
                        r = r.iadd(this.tmp);
                        rlen = r.bitLength();
                    } while (rlen > this.n);

                    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
                    if (cmp === 0) {
                        r.words[0] = 0;
                        r.length = 1;
                    } else if (cmp > 0) {
                        r.isub(this.p);
                    } else {
                        r.strip();
                    }

                    return r;
                };

                MPrime.prototype.split = function split(input, out) {
                    input.iushrn(this.n, 0, out);
                };

                MPrime.prototype.imulK = function imulK(num) {
                    return num.imul(this.k);
                };

                function K256() {
                    MPrime.call(
                    this,
                    'k256',
                    'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
                }
                inherits(K256, MPrime);

                K256.prototype.split = function split(input, output) {

                    var mask = 0x3fffff;

                    var outLen = Math.min(input.length, 9);
                    for (var i = 0; i < outLen; i++) {
                        output.words[i] = input.words[i];
                    }
                    output.length = outLen;

                    if (input.length <= 9) {
                        input.words[0] = 0;
                        input.length = 1;
                        return;
                    }


                    var prev = input.words[9];
                    output.words[output.length++] = prev & mask;

                    for (i = 10; i < input.length; i++) {
                        var next = input.words[i] | 0;
                        input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
                        prev = next;
                    }
                    prev >>>= 22;
                    input.words[i - 10] = prev;
                    if (prev === 0 && input.length > 10) {
                        input.length -= 10;
                    } else {
                        input.length -= 9;
                    }
                };

                K256.prototype.imulK = function imulK(num) {

                    num.words[num.length] = 0;
                    num.words[num.length + 1] = 0;
                    num.length += 2;


                    var lo = 0;
                    for (var i = 0; i < num.length; i++) {
                        var w = num.words[i] | 0;
                        lo += w * 0x3d1;
                        num.words[i] = lo & 0x3ffffff;
                        lo = w * 0x40 + (lo / 0x4000000 | 0);
                    }


                    if (num.words[num.length - 1] === 0) {
                        num.length--;
                        if (num.words[num.length - 1] === 0) {
                            num.length--;
                        }
                    }
                    return num;
                };

                function P224() {
                    MPrime.call(
                    this,
                    'p224',
                    'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
                }
                inherits(P224, MPrime);

                function P192() {
                    MPrime.call(
                    this,
                    'p192',
                    'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
                }
                inherits(P192, MPrime);

                function P25519() {

                    MPrime.call(
                    this,
                    '25519',
                    '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
                }
                inherits(P25519, MPrime);

                P25519.prototype.imulK = function imulK(num) {

                    var carry = 0;
                    for (var i = 0; i < num.length; i++) {
                        var hi = (num.words[i] | 0) * 0x13 + carry;
                        var lo = hi & 0x3ffffff;
                        hi >>>= 26;

                        num.words[i] = lo;
                        carry = hi;
                    }
                    if (carry !== 0) {
                        num.words[num.length++] = carry;
                    }
                    return num;
                };


                BN._prime = function prime(name) {

                    if (primes[name]) return primes[name];

                    var prime;
                    if (name === 'k256') {
                        prime = new K256();
                    } else if (name === 'p224') {
                        prime = new P224();
                    } else if (name === 'p192') {
                        prime = new P192();
                    } else if (name === 'p25519') {
                        prime = new P25519();
                    } else {
                        throw new Error('Unknown prime ' + name);
                    }
                    primes[name] = prime;

                    return prime;
                };




                function Red(m) {
                    if (typeof m === 'string') {
                        var prime = BN._prime(m);
                        this.m = prime.p;
                        this.prime = prime;
                    } else {
                        assert(m.gtn(1), 'modulus must be greater than 1');
                        this.m = m;
                        this.prime = null;
                    }
                }

                Red.prototype._verify1 = function _verify1(a) {
                    assert(a.negative === 0, 'red works only with positives');
                    assert(a.red, 'red works only with red numbers');
                };

                Red.prototype._verify2 = function _verify2(a, b) {
                    assert((a.negative | b.negative) === 0, 'red works only with positives');
                    assert(a.red && a.red === b.red,
                    'red works only with red numbers');
                };

                Red.prototype.imod = function imod(a) {
                    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
                    return a.umod(this.m)._forceRed(this);
                };

                Red.prototype.neg = function neg(a) {
                    if (a.isZero()) {
                        return a.clone();
                    }

                    return this.m.sub(a)._forceRed(this);
                };

                Red.prototype.add = function add(a, b) {
                    this._verify2(a, b);

                    var res = a.add(b);
                    if (res.cmp(this.m) >= 0) {
                        res.isub(this.m);
                    }
                    return res._forceRed(this);
                };

                Red.prototype.iadd = function iadd(a, b) {
                    this._verify2(a, b);

                    var res = a.iadd(b);
                    if (res.cmp(this.m) >= 0) {
                        res.isub(this.m);
                    }
                    return res;
                };

                Red.prototype.sub = function sub(a, b) {
                    this._verify2(a, b);

                    var res = a.sub(b);
                    if (res.cmpn(0) < 0) {
                        res.iadd(this.m);
                    }
                    return res._forceRed(this);
                };

                Red.prototype.isub = function isub(a, b) {
                    this._verify2(a, b);

                    var res = a.isub(b);
                    if (res.cmpn(0) < 0) {
                        res.iadd(this.m);
                    }
                    return res;
                };

                Red.prototype.shl = function shl(a, num) {
                    this._verify1(a);
                    return this.imod(a.ushln(num));
                };

                Red.prototype.imul = function imul(a, b) {
                    this._verify2(a, b);
                    return this.imod(a.imul(b));
                };

                Red.prototype.mul = function mul(a, b) {
                    this._verify2(a, b);
                    return this.imod(a.mul(b));
                };

                Red.prototype.isqr = function isqr(a) {
                    return this.imul(a, a.clone());
                };

                Red.prototype.sqr = function sqr(a) {
                    return this.mul(a, a);
                };

                Red.prototype.sqrt = function sqrt(a) {
                    if (a.isZero()) return a.clone();

                    var mod3 = this.m.andln(3);
                    assert(mod3 % 2 === 1);


                    if (mod3 === 3) {
                        var pow = this.m.add(new BN(1)).iushrn(2);
                        return this.pow(a, pow);
                    }




                    var q = this.m.subn(1);
                    var s = 0;
                    while (!q.isZero() && q.andln(1) === 0) {
                        s++;
                        q.iushrn(1);
                    }
                    assert(!q.isZero());

                    var one = new BN(1).toRed(this);
                    var nOne = one.redNeg();



                    var lpow = this.m.subn(1).iushrn(1);
                    var z = this.m.bitLength();
                    z = new BN(2 * z * z).toRed(this);

                    while (this.pow(z, lpow).cmp(nOne) !== 0) {
                        z.redIAdd(nOne);
                    }

                    var c = this.pow(z, q);
                    var r = this.pow(a, q.addn(1).iushrn(1));
                    var t = this.pow(a, q);
                    var m = s;
                    while (t.cmp(one) !== 0) {
                        var tmp = t;
                        for (var i = 0; tmp.cmp(one) !== 0; i++) {
                            tmp = tmp.redSqr();
                        }
                        assert(i < m);
                        var b = this.pow(c, new BN(1).iushln(m - i - 1));

                        r = r.redMul(b);
                        c = b.redSqr();
                        t = t.redMul(c);
                        m = i;
                    }

                    return r;
                };

                Red.prototype.invm = function invm(a) {
                    var inv = a._invmp(this.m);
                    if (inv.negative !== 0) {
                        inv.negative = 0;
                        return this.imod(inv).redNeg();
                    } else {
                        return this.imod(inv);
                    }
                };

                Red.prototype.pow = function pow(a, num) {
                    if (num.isZero()) return new BN(1).toRed(this);
                    if (num.cmpn(1) === 0) return a.clone();

                    var windowSize = 4;
                    var wnd = new Array(1 << windowSize);
                    wnd[0] = new BN(1).toRed(this);
                    wnd[1] = a;
                    for (var i = 2; i < wnd.length; i++) {
                        wnd[i] = this.mul(wnd[i - 1], a);
                    }

                    var res = wnd[0];
                    var current = 0;
                    var currentLen = 0;
                    var start = num.bitLength() % 26;
                    if (start === 0) {
                        start = 26;
                    }

                    for (i = num.length - 1; i >= 0; i--) {
                        var word = num.words[i];
                        for (var j = start - 1; j >= 0; j--) {
                            var bit = word >> j & 1;
                            if (res !== wnd[0]) {
                                res = this.sqr(res);
                            }

                            if (bit === 0 && current === 0) {
                                currentLen = 0;
                                continue;
                            }

                            current <<= 1;
                            current |= bit;
                            currentLen++;
                            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

                            res = this.mul(res, wnd[current]);
                            currentLen = 0;
                            current = 0;
                        }
                        start = 26;
                    }

                    return res;
                };

                Red.prototype.convertTo = function convertTo(num) {
                    var r = num.umod(this.m);

                    return r === num ? r.clone() : r;
                };

                Red.prototype.convertFrom = function convertFrom(num) {
                    var res = num.clone();
                    res.red = null;
                    return res;
                };





                BN.mont = function mont(num) {
                    return new Mont(num);
                };

                function Mont(m) {
                    Red.call(this, m);

                    this.shift = this.m.bitLength();
                    if (this.shift % 26 !== 0) {
                        this.shift += 26 - this.shift % 26;
                    }

                    this.r = new BN(1).iushln(this.shift);
                    this.r2 = this.imod(this.r.sqr());
                    this.rinv = this.r._invmp(this.m);

                    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
                    this.minv = this.minv.umod(this.r);
                    this.minv = this.r.sub(this.minv);
                }
                inherits(Mont, Red);

                Mont.prototype.convertTo = function convertTo(num) {
                    return this.imod(num.ushln(this.shift));
                };

                Mont.prototype.convertFrom = function convertFrom(num) {
                    var r = this.imod(num.mul(this.rinv));
                    r.red = null;
                    return r;
                };

                Mont.prototype.imul = function imul(a, b) {
                    if (a.isZero() || b.isZero()) {
                        a.words[0] = 0;
                        a.length = 1;
                        return a;
                    }

                    var t = a.imul(b);
                    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
                    var u = t.isub(c).iushrn(this.shift);
                    var res = u;

                    if (u.cmp(this.m) >= 0) {
                        res = u.isub(this.m);
                    } else if (u.cmpn(0) < 0) {
                        res = u.iadd(this.m);
                    }

                    return res._forceRed(this);
                };

                Mont.prototype.mul = function mul(a, b) {
                    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

                    var t = a.mul(b);
                    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
                    var u = t.isub(c).iushrn(this.shift);
                    var res = u;
                    if (u.cmp(this.m) >= 0) {
                        res = u.isub(this.m);
                    } else if (u.cmpn(0) < 0) {
                        res = u.iadd(this.m);
                    }

                    return res._forceRed(this);
                };

                Mont.prototype.invm = function invm(a) {

                    var res = this.imod(a._invmp(this.m).mul(this.r2));
                    return res._forceRed(this);
                };
            })(typeof module === 'undefined' || module, this);

        }, { "buffer": 1 }], 25: [function (require, module, exports) {

























            "use strict";

            var utils = require("web3-utils");
            var BigNumber = require("bn.js");


            var leftPad = function leftPad(string, bytes) {
                var result = string;
                while (result.length < bytes * 2) {
                    result = '0' + result;
                }
                return result;
            };









            var iso13616Prepare = function iso13616Prepare(iban) {
                var A = 'A'.charCodeAt(0);
                var Z = 'Z'.charCodeAt(0);

                iban = iban.toUpperCase();
                iban = iban.substr(4) + iban.substr(0, 4);

                return iban.split('').map(function (n) {
                    var code = n.charCodeAt(0);
                    if (code >= A && code <= Z) {

                        return code - A + 10;
                    } else {
                        return n;
                    }
                }).join('');
            };








            var mod9710 = function mod9710(iban) {
                var remainder = iban,
                block;

                while (remainder.length > 2) {
                    block = remainder.slice(0, 9);
                    remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
                }

                return parseInt(remainder, 10) % 97;
            };






            var Iban = function Iban(iban) {
                this._iban = iban;
            };








            Iban.toAddress = function (ib) {
                ib = new Iban(ib);

                if (!ib.isDirect()) {
                    throw new Error('IBAN is indirect and can\'t be converted');
                }

                return ib.toAddress();
            };








            Iban.toIban = function (address) {
                return Iban.fromAddress(address).toString();
            };








            Iban.fromAddress = function (address) {
                if (!utils.isAddress(address)) {
                    throw new Error('Provided address is not a valid address: ' + address);
                }

                address = address.replace('0x', '').replace('0X', '');

                var asBn = new BigNumber(address, 16);
                var base36 = asBn.toString(36);
                var padded = leftPad(base36, 15);
                return Iban.fromBban(padded.toUpperCase());
            };










            Iban.fromBban = function (bban) {
                var countryCode = 'XE';

                var remainder = mod9710(iso13616Prepare(countryCode + '00' + bban));
                var checkDigit = ('0' + (98 - remainder)).slice(-2);

                return new Iban(countryCode + checkDigit + bban);
            };








            Iban.createIndirect = function (options) {
                return Iban.fromBban('ETH' + options.institution + options.identifier);
            };








            Iban.isValid = function (iban) {
                var i = new Iban(iban);
                return i.isValid();
            };







            Iban.prototype.isValid = function () {
                return (/^XE[0-9]{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) &&
                    mod9710(iso13616Prepare(this._iban)) === 1);
            };







            Iban.prototype.isDirect = function () {
                return this._iban.length === 34 || this._iban.length === 35;
            };







            Iban.prototype.isIndirect = function () {
                return this._iban.length === 20;
            };








            Iban.prototype.checksum = function () {
                return this._iban.substr(2, 2);
            };








            Iban.prototype.institution = function () {
                return this.isIndirect() ? this._iban.substr(7, 4) : '';
            };








            Iban.prototype.client = function () {
                return this.isIndirect() ? this._iban.substr(11) : '';
            };







            Iban.prototype.toAddress = function () {
                if (this.isDirect()) {
                    var base36 = this._iban.substr(4);
                    var asBn = new BigNumber(base36, 36);
                    return utils.toChecksumAddress(asBn.toString(16, 20));
                }

                return '';
            };

            Iban.prototype.toString = function () {
                return this._iban;
            };

            module.exports = Iban;

        }, { "bn.js": 24, "web3-utils": 48 }], 26: [function (require, module, exports) {






















            "use strict";

            var core = require("web3-core");
            var Method = require("web3-core-method");
            var utils = require("web3-utils");


            var Net = function Net() {
                var _this = this;


                core.packageInit(this, arguments);


                methods().forEach(function (method) {
                    method.attachToObject(_this);
                    method.setRequestManager(_this._requestManager);
                });

            };

            core.addProviders(Net);


            var methods = function methods() {

                return [
                new Method({
                    name: 'getId',
                    call: 'net_version',
                    params: 0,
                    outputFormatter: utils.hexToNumber }),

                new Method({
                    name: 'isListening',
                    call: 'net_listening',
                    params: 0 }),

                new Method({
                    name: 'getPeerCount',
                    call: 'net_peerCount',
                    params: 0,
                    outputFormatter: utils.hexToNumber })];


            };


            module.exports = Net;



        }, { "web3-core": 23, "web3-core-method": 9, "web3-utils": 48 }], 27: [function (require, module, exports) {
            module.exports = XMLHttpRequest;

        }, {}], 28: [function (require, module, exports) {
























            var errors = require("web3-core-helpers").errors;
            var XHR2 = require("xhr2");




            var HttpProvider = function HttpProvider(host, timeout) {
                this.host = host || 'http://localhost:8545';
                this.timeout = timeout || 0;
                this.connected = false;
            };









            HttpProvider.prototype.send = function (payload, callback) {
                var _this = this;
                var request = new XHR2();

                request.open('POST', this.host, true);
                request.setRequestHeader('Content-Type', 'application/json');

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.timeout !== 1) {
                        var result = request.responseText;
                        var error = null;

                        try {
                            result = JSON.parse(result);
                        } catch (e) {
                            error = errors.InvalidResponse(request.responseText);
                        }

                        _this.connected = true;
                        callback(error, result);
                    }
                };

                request.ontimeout = function () {
                    _this.connected = false;
                    callback(errors.ConnectionTimeout(this.timeout));
                };

                try {
                    request.send(JSON.stringify(payload));
                } catch (error) {
                    this.connected = false;
                    callback(errors.InvalidConnection(this.host));
                }
            };


            module.exports = HttpProvider;

        }, { "web3-core-helpers": 7, "xhr2": 27 }], 29: [function (require, module, exports) {




            (function (window, Object, Array, Error, JSON, undefined) {
















































                var partialComplete = varArgs(function (fn, args) {





                    var numBoundArgs = args.length;

                    return varArgs(function (callArgs) {

                        for (var i = 0; i < callArgs.length; i++) {
                            args[numBoundArgs + i] = callArgs[i];
                        }

                        args.length = numBoundArgs + callArgs.length;

                        return fn.apply(this, args);
                    });
                }),










                compose = varArgs(function (fns) {

                    var fnsList = arrayAsList(fns);

                    function next(params, curFn) {
                        return [apply(params, curFn)];
                    }

                    return varArgs(function (startParams) {

                        return foldR(next, startParams, fnsList)[0];
                    });
                });






                function compose2(f1, f2) {
                    return function () {
                        return f1.call(this, f2.apply(this, arguments));
                    };
                }














                function attr(key) {
                    return function (o) {return o[key];};
                }















                var lazyUnion = varArgs(function (fns) {

                    return varArgs(function (params) {

                        var maybeValue;

                        for (var i = 0; i < len(fns); i++) {

                            maybeValue = apply(params, fns[i]);

                            if (maybeValue) {
                                return maybeValue;
                            }
                        }
                    });
                });
















                function apply(args, fn) {
                    return fn.apply(undefined, args);
                }























                function varArgs(fn) {

                    var numberOfFixedArguments = fn.length - 1,
                    slice = Array.prototype.slice;


                    if (numberOfFixedArguments == 0) {


                        return function () {
                            return fn.call(this, slice.call(arguments));
                        };

                    } else if (numberOfFixedArguments == 1) {


                        return function () {
                            return fn.call(this, arguments[0], slice.call(arguments, 1));
                        };
                    }






                    var argsHolder = Array(fn.length);

                    return function () {

                        for (var i = 0; i < numberOfFixedArguments; i++) {
                            argsHolder[i] = arguments[i];
                        }

                        argsHolder[numberOfFixedArguments] =
                        slice.call(arguments, numberOfFixedArguments);

                        return fn.apply(this, argsHolder);
                    };
                }







                function flip(fn) {
                    return function (a, b) {
                        return fn(b, a);
                    };
                }








                function lazyIntersection(fn1, fn2) {

                    return function (param) {

                        return fn1(param) && fn2(param);
                    };
                }




                function noop() {}




                function always() {return true;}











                function functor(val) {
                    return function () {
                        return val;
                    };
                }










                function isOfType(T, maybeSomething) {
                    return maybeSomething && maybeSomething.constructor === T;
                }

                var len = attr('length'),
                isString = partialComplete(isOfType, String);












                function defined(value) {
                    return value !== undefined;
                }






                function hasAllProperties(fieldList, o) {

                    return o instanceof Object &&

                    all(function (field) {
                        return field in o;
                    }, fieldList);
                }



                function cons(x, xs) {













                    return [x, xs];
                }




                var emptyList = null,






                head = attr(0),






                tail = attr(1);











                function arrayAsList(inputArray) {

                    return reverseList(
                    inputArray.reduce(
                    flip(cons),
                    emptyList));


                }











                var list = varArgs(arrayAsList);




                function listAsArray(list) {

                    return foldR(function (arraySoFar, listItem) {

                        arraySoFar.unshift(listItem);
                        return arraySoFar;

                    }, [], list);

                }




                function map(fn, list) {

                    return list ?
                    cons(fn(head(list)), map(fn, tail(list))) :
                    emptyList;

                }






                function foldR(fn, startValue, list) {

                    return list ?
                    fn(foldR(fn, startValue, tail(list)), head(list)) :
                    startValue;

                }






                function foldR1(fn, list) {

                    return tail(list) ?
                    fn(foldR1(fn, tail(list)), head(list)) :
                    head(list);

                }






                function without(list, test, removedFn) {

                    return withoutInner(list, removedFn || noop);

                    function withoutInner(subList, removedFn) {
                        return subList ?
                        test(head(subList)) ? (
                        removedFn(head(subList)), tail(subList)) :
                        cons(head(subList), withoutInner(tail(subList), removedFn)) :

                        emptyList;

                    }
                }





                function all(fn, list) {

                    return !list ||
                    fn(head(list)) && all(fn, tail(list));
                }








                function applyEach(fnList, args) {

                    if (fnList) {
                        head(fnList).apply(null, args);

                        applyEach(tail(fnList), args);
                    }
                }




                function reverseList(list) {



                    function reverseInner(list, reversedAlready) {
                        if (!list) {
                            return reversedAlready;
                        }

                        return reverseInner(tail(list), cons(head(list), reversedAlready));
                    }

                    return reverseInner(list, emptyList);
                }

                function first(test, list) {
                    return list && (
                    test(head(list)) ?
                    head(list) :
                    first(test, tail(list)));
                }






















                function clarinet(eventBus) {
                    "use strict";

                    var

                    emitSaxKey = eventBus(SAX_KEY).emit,
                    emitValueOpen = eventBus(SAX_VALUE_OPEN).emit,
                    emitValueClose = eventBus(SAX_VALUE_CLOSE).emit,
                    emitFail = eventBus(FAIL_EVENT).emit,

                    MAX_BUFFER_LENGTH = 64 * 1024,
                    stringTokenPattern = /[\\"\n]/g,
                    _n = 0,


                    BEGIN = _n++,
                    VALUE = _n++,
                    OPEN_OBJECT = _n++,
                    CLOSE_OBJECT = _n++,
                    OPEN_ARRAY = _n++,
                    CLOSE_ARRAY = _n++,
                    STRING = _n++,
                    OPEN_KEY = _n++,
                    CLOSE_KEY = _n++,
                    TRUE = _n++,
                    TRUE2 = _n++,
                    TRUE3 = _n++,
                    FALSE = _n++,
                    FALSE2 = _n++,
                    FALSE3 = _n++,
                    FALSE4 = _n++,
                    NULL = _n++,
                    NULL2 = _n++,
                    NULL3 = _n++,
                    NUMBER_DECIMAL_POINT = _n++,
                    NUMBER_DIGIT = _n,


                    bufferCheckPosition = MAX_BUFFER_LENGTH,
                    latestError,
                    c,
                    p,
                    textNode = undefined,
                    numberNode = "",
                    slashed = false,
                    closed = false,
                    state = BEGIN,
                    stack = [],
                    unicodeS = null,
                    unicodeI = 0,
                    depth = 0,
                    position = 0,
                    column = 0,
                    line = 1;


                    function checkBufferLength() {

                        var maxActual = 0;

                        if (textNode !== undefined && textNode.length > MAX_BUFFER_LENGTH) {
                            emitError("Max buffer length exceeded: textNode");
                            maxActual = Math.max(maxActual, textNode.length);
                        }
                        if (numberNode.length > MAX_BUFFER_LENGTH) {
                            emitError("Max buffer length exceeded: numberNode");
                            maxActual = Math.max(maxActual, numberNode.length);
                        }

                        bufferCheckPosition = MAX_BUFFER_LENGTH - maxActual +
                        position;
                    }

                    eventBus(STREAM_DATA).on(handleData);




                    eventBus(STREAM_END).on(handleStreamEnd);

                    function emitError(errorString) {
                        if (textNode !== undefined) {
                            emitValueOpen(textNode);
                            emitValueClose();
                            textNode = undefined;
                        }

                        latestError = Error(errorString + "\nLn: " + line +
                        "\nCol: " + column +
                        "\nChr: " + c);

                        emitFail(errorReport(undefined, undefined, latestError));
                    }

                    function handleStreamEnd() {
                        if (state == BEGIN) {













                            emitValueOpen({});
                            emitValueClose();

                            closed = true;
                            return;
                        }

                        if (state !== VALUE || depth !== 0)
                        emitError("Unexpected end");

                        if (textNode !== undefined) {
                            emitValueOpen(textNode);
                            emitValueClose();
                            textNode = undefined;
                        }

                        closed = true;
                    }

                    function whitespace(c) {
                        return c == '\r' || c == '\n' || c == ' ' || c == '\t';
                    }

                    function handleData(chunk) {




                        if (latestError)
                        return;

                        if (closed) {
                            return emitError("Cannot write after close");
                        }

                        var i = 0;
                        c = chunk[0];

                        while (c) {
                            p = c;
                            c = chunk[i++];
                            if (!c) break;

                            position++;
                            if (c == "\n") {
                                line++;
                                column = 0;
                            } else column++;
                            switch (state) {

                                case BEGIN:
                                    if (c === "{") state = OPEN_OBJECT;else
                                    if (c === "[") state = OPEN_ARRAY;else
                                    if (!whitespace(c))
                                    return emitError("Non-whitespace before {[.");
                                    continue;

                                case OPEN_KEY:
                                case OPEN_OBJECT:
                                    if (whitespace(c)) continue;
                                    if (state === OPEN_KEY) stack.push(CLOSE_KEY);else
                                    {
                                        if (c === '}') {
                                            emitValueOpen({});
                                            emitValueClose();
                                            state = stack.pop() || VALUE;
                                            continue;
                                        } else stack.push(CLOSE_OBJECT);
                                    }
                                    if (c === '"')
                                    state = STRING;else

                                    return emitError("Malformed object key should start with \" ");
                                    continue;

                                case CLOSE_KEY:
                                case CLOSE_OBJECT:
                                    if (whitespace(c)) continue;

                                    if (c === ':') {
                                        if (state === CLOSE_OBJECT) {
                                            stack.push(CLOSE_OBJECT);

                                            if (textNode !== undefined) {


                                                emitValueOpen({});
                                                emitSaxKey(textNode);
                                                textNode = undefined;
                                            }
                                            depth++;
                                        } else {
                                            if (textNode !== undefined) {
                                                emitSaxKey(textNode);
                                                textNode = undefined;
                                            }
                                        }
                                        state = VALUE;
                                    } else if (c === '}') {
                                        if (textNode !== undefined) {
                                            emitValueOpen(textNode);
                                            emitValueClose();
                                            textNode = undefined;
                                        }
                                        emitValueClose();
                                        depth--;
                                        state = stack.pop() || VALUE;
                                    } else if (c === ',') {
                                        if (state === CLOSE_OBJECT)
                                        stack.push(CLOSE_OBJECT);
                                        if (textNode !== undefined) {
                                            emitValueOpen(textNode);
                                            emitValueClose();
                                            textNode = undefined;
                                        }
                                        state = OPEN_KEY;
                                    } else
                                    return emitError('Bad object');
                                    continue;

                                case OPEN_ARRAY:
                                case VALUE:
                                    if (whitespace(c)) continue;
                                    if (state === OPEN_ARRAY) {
                                        emitValueOpen([]);
                                        depth++;
                                        state = VALUE;
                                        if (c === ']') {
                                            emitValueClose();
                                            depth--;
                                            state = stack.pop() || VALUE;
                                            continue;
                                        } else {
                                            stack.push(CLOSE_ARRAY);
                                        }
                                    }
                                    if (c === '"') state = STRING;else
                                    if (c === '{') state = OPEN_OBJECT;else
                                    if (c === '[') state = OPEN_ARRAY;else
                                    if (c === 't') state = TRUE;else
                                    if (c === 'f') state = FALSE;else
                                    if (c === 'n') state = NULL;else
                                    if (c === '-') {
                                        numberNode += c;
                                    } else if (c === '0') {
                                        numberNode += c;
                                        state = NUMBER_DIGIT;
                                    } else if ('123456789'.indexOf(c) !== -1) {
                                        numberNode += c;
                                        state = NUMBER_DIGIT;
                                    } else
                                    return emitError("Bad value");
                                    continue;

                                case CLOSE_ARRAY:
                                    if (c === ',') {
                                        stack.push(CLOSE_ARRAY);
                                        if (textNode !== undefined) {
                                            emitValueOpen(textNode);
                                            emitValueClose();
                                            textNode = undefined;
                                        }
                                        state = VALUE;
                                    } else if (c === ']') {
                                        if (textNode !== undefined) {
                                            emitValueOpen(textNode);
                                            emitValueClose();
                                            textNode = undefined;
                                        }
                                        emitValueClose();
                                        depth--;
                                        state = stack.pop() || VALUE;
                                    } else if (whitespace(c))
                                    continue;else

                                    return emitError('Bad array');
                                    continue;

                                case STRING:
                                    if (textNode === undefined) {
                                        textNode = "";
                                    }


                                    var starti = i - 1;

                                    STRING_BIGLOOP: while (true) {


                                        while (unicodeI > 0) {
                                            unicodeS += c;
                                            c = chunk.charAt(i++);
                                            if (unicodeI === 4) {

                                                textNode += String.fromCharCode(parseInt(unicodeS, 16));
                                                unicodeI = 0;
                                                starti = i - 1;
                                            } else {
                                                unicodeI++;
                                            }

                                            if (!c) break STRING_BIGLOOP;
                                        }
                                        if (c === '"' && !slashed) {
                                            state = stack.pop() || VALUE;
                                            textNode += chunk.substring(starti, i - 1);
                                            break;
                                        }
                                        if (c === '\\' && !slashed) {
                                            slashed = true;
                                            textNode += chunk.substring(starti, i - 1);
                                            c = chunk.charAt(i++);
                                            if (!c) break;
                                        }
                                        if (slashed) {
                                            slashed = false;
                                            if (c === 'n') {textNode += '\n';} else
                                            if (c === 'r') {textNode += '\r';} else
                                            if (c === 't') {textNode += '\t';} else
                                            if (c === 'f') {textNode += '\f';} else
                                            if (c === 'b') {textNode += '\b';} else
                                            if (c === 'u') {

                                                unicodeI = 1;
                                                unicodeS = '';
                                            } else {
                                                textNode += c;
                                            }
                                            c = chunk.charAt(i++);
                                            starti = i - 1;
                                            if (!c) break;else
                                            continue;
                                        }

                                        stringTokenPattern.lastIndex = i;
                                        var reResult = stringTokenPattern.exec(chunk);
                                        if (!reResult) {
                                            i = chunk.length + 1;
                                            textNode += chunk.substring(starti, i - 1);
                                            break;
                                        }
                                        i = reResult.index + 1;
                                        c = chunk.charAt(reResult.index);
                                        if (!c) {
                                            textNode += chunk.substring(starti, i - 1);
                                            break;
                                        }
                                    }
                                    continue;

                                case TRUE:
                                    if (!c) continue;
                                    if (c === 'r') state = TRUE2;else

                                    return emitError('Invalid true started with t' + c);
                                    continue;

                                case TRUE2:
                                    if (!c) continue;
                                    if (c === 'u') state = TRUE3;else

                                    return emitError('Invalid true started with tr' + c);
                                    continue;

                                case TRUE3:
                                    if (!c) continue;
                                    if (c === 'e') {
                                        emitValueOpen(true);
                                        emitValueClose();
                                        state = stack.pop() || VALUE;
                                    } else
                                    return emitError('Invalid true started with tru' + c);
                                    continue;

                                case FALSE:
                                    if (!c) continue;
                                    if (c === 'a') state = FALSE2;else

                                    return emitError('Invalid false started with f' + c);
                                    continue;

                                case FALSE2:
                                    if (!c) continue;
                                    if (c === 'l') state = FALSE3;else

                                    return emitError('Invalid false started with fa' + c);
                                    continue;

                                case FALSE3:
                                    if (!c) continue;
                                    if (c === 's') state = FALSE4;else

                                    return emitError('Invalid false started with fal' + c);
                                    continue;

                                case FALSE4:
                                    if (!c) continue;
                                    if (c === 'e') {
                                        emitValueOpen(false);
                                        emitValueClose();
                                        state = stack.pop() || VALUE;
                                    } else
                                    return emitError('Invalid false started with fals' + c);
                                    continue;

                                case NULL:
                                    if (!c) continue;
                                    if (c === 'u') state = NULL2;else

                                    return emitError('Invalid null started with n' + c);
                                    continue;

                                case NULL2:
                                    if (!c) continue;
                                    if (c === 'l') state = NULL3;else

                                    return emitError('Invalid null started with nu' + c);
                                    continue;

                                case NULL3:
                                    if (!c) continue;
                                    if (c === 'l') {
                                        emitValueOpen(null);
                                        emitValueClose();
                                        state = stack.pop() || VALUE;
                                    } else
                                    return emitError('Invalid null started with nul' + c);
                                    continue;

                                case NUMBER_DECIMAL_POINT:
                                    if (c === '.') {
                                        numberNode += c;
                                        state = NUMBER_DIGIT;
                                    } else
                                    return emitError('Leading zero not followed by .');
                                    continue;

                                case NUMBER_DIGIT:
                                    if ('0123456789'.indexOf(c) !== -1) numberNode += c;else
                                    if (c === '.') {
                                        if (numberNode.indexOf('.') !== -1)
                                        return emitError('Invalid number has two dots');
                                        numberNode += c;
                                    } else if (c === 'e' || c === 'E') {
                                        if (numberNode.indexOf('e') !== -1 ||
                                        numberNode.indexOf('E') !== -1)
                                        return emitError('Invalid number has two exponential');
                                        numberNode += c;
                                    } else if (c === "+" || c === "-") {
                                        if (!(p === 'e' || p === 'E'))
                                        return emitError('Invalid symbol in number');
                                        numberNode += c;
                                    } else {
                                        if (numberNode) {
                                            emitValueOpen(parseFloat(numberNode));
                                            emitValueClose();
                                            numberNode = "";
                                        }
                                        i--;
                                        state = stack.pop() || VALUE;
                                    }
                                    continue;

                                default:
                                    return emitError("Unknown state: " + state);}

                        }
                        if (position >= bufferCheckPosition)
                        checkBufferLength();
                    }
                }












                function ascentManager(oboeBus, handlers) {
                    "use strict";

                    var listenerId = {},
                    ascent;

                    function stateAfter(handler) {
                        return function (param) {
                            ascent = handler(ascent, param);
                        };
                    }

                    for (var eventName in handlers) {

                        oboeBus(eventName).on(stateAfter(handlers[eventName]), listenerId);
                    }

                    oboeBus(NODE_SWAP).on(function (newNode) {

                        var oldHead = head(ascent),
                        key = keyOf(oldHead),
                        ancestors = tail(ascent),
                        parentNode;

                        if (ancestors) {
                            parentNode = nodeOf(head(ancestors));
                            parentNode[key] = newNode;
                        }
                    });

                    oboeBus(NODE_DROP).on(function () {

                        var oldHead = head(ascent),
                        key = keyOf(oldHead),
                        ancestors = tail(ascent),
                        parentNode;

                        if (ancestors) {
                            parentNode = nodeOf(head(ancestors));

                            delete parentNode[key];
                        }
                    });

                    oboeBus(ABORTING).on(function () {

                        for (var eventName in handlers) {
                            oboeBus(eventName).un(listenerId);
                        }
                    });
                }









                function parseResponseHeaders(headerStr) {
                    var headers = {};

                    headerStr && headerStr.split("\r\n").
                    forEach(function (headerPair) {



                        var index = headerPair.indexOf(": ");

                        headers[headerPair.substring(0, index)] =
                        headerPair.substring(index + 2);
                    });

                    return headers;
                }











                function isCrossOrigin(pageLocation, ajaxHost) {





                    function defaultPort(protocol) {
                        return { 'http:': 80, 'https:': 443 }[protocol];
                    }

                    function portOf(location) {



                        return location.port || defaultPort(location.protocol || pageLocation.protocol);
                    }





                    return !!(ajaxHost.protocol && ajaxHost.protocol != pageLocation.protocol ||
                    ajaxHost.host && ajaxHost.host != pageLocation.host ||
                    ajaxHost.host && portOf(ajaxHost) != portOf(pageLocation));

                }


                function parseUrlOrigin(url) {












                    var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/,





                    urlHostMatch = URL_HOST_PATTERN.exec(url) || [];

                    return {
                        protocol: urlHostMatch[1] || '',
                        host: urlHostMatch[2] || '',
                        port: urlHostMatch[3] || '' };

                }

                function httpTransport() {
                    return new XMLHttpRequest();
                }





















                function streamingHttp(oboeBus, xhr, method, url, data, headers, withCredentials) {

                    "use strict";

                    var emitStreamData = oboeBus(STREAM_DATA).emit,
                    emitFail = oboeBus(FAIL_EVENT).emit,
                    numberOfCharsAlreadyGivenToCallback = 0,
                    stillToSendStartEvent = true;



                    oboeBus(ABORTING).on(function () {




                        xhr.onreadystatechange = null;

                        xhr.abort();
                    });





                    function handleProgress() {

                        var textSoFar = xhr.responseText,
                        newText = textSoFar.substr(numberOfCharsAlreadyGivenToCallback);








                        if (newText) {
                            emitStreamData(newText);
                        }

                        numberOfCharsAlreadyGivenToCallback = len(textSoFar);
                    }


                    if ('onprogress' in xhr) {
                        xhr.onprogress = handleProgress;
                    }

                    xhr.onreadystatechange = function () {

                        function sendStartIfNotAlready() {



                            try {
                                stillToSendStartEvent && oboeBus(HTTP_START).emit(
                                xhr.status,
                                parseResponseHeaders(xhr.getAllResponseHeaders()));
                                stillToSendStartEvent = false;
                            } catch (e) {}
                        }

                        switch (xhr.readyState) {

                            case 2:
                            case 3:
                                return sendStartIfNotAlready();

                            case 4:
                                sendStartIfNotAlready();


                                var successful = String(xhr.status)[0] == 2;

                                if (successful) {






                                    handleProgress();

                                    oboeBus(STREAM_END).emit();
                                } else {

                                    emitFail(errorReport(
                                    xhr.status,
                                    xhr.responseText));

                                }}

                    };

                    try {

                        xhr.open(method, url, true);

                        for (var headerName in headers) {
                            xhr.setRequestHeader(headerName, headers[headerName]);
                        }

                        if (!isCrossOrigin(window.location, parseUrlOrigin(url))) {
                            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        }

                        xhr.withCredentials = withCredentials;

                        xhr.send(data);

                    } catch (e) {







                        window.setTimeout(
                        partialComplete(emitFail, errorReport(undefined, undefined, e)),
                        0);

                    }
                }

                var jsonPathSyntax = function () {

                    var














                    regexDescriptor = function regexDescriptor(regex) {
                        return regex.exec.bind(regex);
                    },







                    jsonPathClause = varArgs(function (componentRegexes) {




                        componentRegexes.unshift(/^/);

                        return regexDescriptor(
                        RegExp(
                        componentRegexes.map(attr('source')).join('')));


                    }),

                    possiblyCapturing = /(\$?)/,
                    namedNode = /([\w-_]+|\*)/,
                    namePlaceholder = /()/,
                    nodeInArrayNotation = /\["([^"]+)"\]/,
                    numberedNodeInArrayNotation = /\[(\d+|\*)\]/,
                    fieldList = /{([\w ]*?)}/,
                    optionalFieldList = /(?:{([\w ]*?)})?/,



                    jsonPathNamedNodeInObjectNotation = jsonPathClause(
                    possiblyCapturing,
                    namedNode,
                    optionalFieldList),



                    jsonPathNamedNodeInArrayNotation = jsonPathClause(
                    possiblyCapturing,
                    nodeInArrayNotation,
                    optionalFieldList),



                    jsonPathNumberedNodeInArrayNotation = jsonPathClause(
                    possiblyCapturing,
                    numberedNodeInArrayNotation,
                    optionalFieldList),



                    jsonPathPureDuckTyping = jsonPathClause(
                    possiblyCapturing,
                    namePlaceholder,
                    fieldList),



                    jsonPathDoubleDot = jsonPathClause(/\.\./),


                    jsonPathDot = jsonPathClause(/\./),


                    jsonPathBang = jsonPathClause(
                    possiblyCapturing,
                    /!/),



                    emptyString = jsonPathClause(/$/);







                    return function (fn) {
                        return fn(
                        lazyUnion(
                        jsonPathNamedNodeInObjectNotation,
                        jsonPathNamedNodeInArrayNotation,
                        jsonPathNumberedNodeInArrayNotation,
                        jsonPathPureDuckTyping),

                        jsonPathDoubleDot,
                        jsonPathDot,
                        jsonPathBang,
                        emptyString);

                    };

                }();






                function namedNode(key, node) {
                    return { key: key, node: node };
                }


                var keyOf = attr('key');


                var nodeOf = attr('node');

























                var ROOT_PATH = {};






                function incrementalContentBuilder(oboeBus) {

                    var emitNodeOpened = oboeBus(NODE_OPENED).emit,
                    emitNodeClosed = oboeBus(NODE_CLOSED).emit,
                    emitRootOpened = oboeBus(ROOT_PATH_FOUND).emit,
                    emitRootClosed = oboeBus(ROOT_NODE_FOUND).emit;

                    function arrayIndicesAreKeys(possiblyInconsistentAscent, newDeepestNode) {







                        var parentNode = nodeOf(head(possiblyInconsistentAscent));

                        return isOfType(Array, parentNode) ?

                        keyFound(possiblyInconsistentAscent,
                        len(parentNode),
                        newDeepestNode) :



                        possiblyInconsistentAscent;

                    }

                    function nodeOpened(ascent, newDeepestNode) {

                        if (!ascent) {

                            emitRootOpened(newDeepestNode);

                            return keyFound(ascent, ROOT_PATH, newDeepestNode);
                        }



                        var arrayConsistentAscent = arrayIndicesAreKeys(ascent, newDeepestNode),
                        ancestorBranches = tail(arrayConsistentAscent),
                        previouslyUnmappedName = keyOf(head(arrayConsistentAscent));

                        appendBuiltContent(
                        ancestorBranches,
                        previouslyUnmappedName,
                        newDeepestNode);


                        return cons(
                        namedNode(previouslyUnmappedName, newDeepestNode),
                        ancestorBranches);

                    }






                    function appendBuiltContent(ancestorBranches, key, node) {

                        nodeOf(head(ancestorBranches))[key] = node;
                    }













                    function keyFound(ascent, newDeepestName, maybeNewDeepestNode) {

                        if (ascent) {



                            appendBuiltContent(ascent, newDeepestName, maybeNewDeepestNode);
                        }

                        var ascentWithNewPath = cons(
                        namedNode(newDeepestName,
                        maybeNewDeepestNode),
                        ascent);


                        emitNodeOpened(ascentWithNewPath);

                        return ascentWithNewPath;
                    }





                    function nodeClosed(ascent) {

                        emitNodeClosed(ascent);

                        return tail(ascent) ||


                        emitRootClosed(nodeOf(head(ascent)));
                    }

                    var contentBuilderHandlers = {};
                    contentBuilderHandlers[SAX_VALUE_OPEN] = nodeOpened;
                    contentBuilderHandlers[SAX_VALUE_CLOSE] = nodeClosed;
                    contentBuilderHandlers[SAX_KEY] = keyFound;
                    return contentBuilderHandlers;
                }















                var jsonPathCompiler = jsonPathSyntax(function (pathNodeSyntax,
                doubleDotSyntax,
                dotSyntax,
                bangSyntax,
                emptySyntax) {

                    var CAPTURING_INDEX = 1;
                    var NAME_INDEX = 2;
                    var FIELD_LIST_INDEX = 3;

                    var headKey = compose2(keyOf, head),
                    headNode = compose2(nodeOf, head);








                    function nameClause(previousExpr, detection) {

                        var name = detection[NAME_INDEX],

                        matchesName = !name || name == '*' ?
                        always :
                        function (ascent) {return headKey(ascent) == name;};


                        return lazyIntersection(matchesName, previousExpr);
                    }








                    function duckTypeClause(previousExpr, detection) {

                        var fieldListStr = detection[FIELD_LIST_INDEX];

                        if (!fieldListStr)
                        return previousExpr;

                        var hasAllrequiredFields = partialComplete(
                        hasAllProperties,
                        arrayAsList(fieldListStr.split(/\W+/))),


                        isMatch = compose2(
                        hasAllrequiredFields,
                        headNode);


                        return lazyIntersection(isMatch, previousExpr);
                    }




                    function capture(previousExpr, detection) {


                        var capturing = !!detection[CAPTURING_INDEX];

                        if (!capturing)
                        return previousExpr;

                        return lazyIntersection(previousExpr, head);

                    }








                    function skip1(previousExpr) {


                        if (previousExpr == always) {





                            return always;
                        }




                        function notAtRoot(ascent) {
                            return headKey(ascent) != ROOT_PATH;
                        }

                        return lazyIntersection(







                        notAtRoot,




                        compose2(previousExpr, tail));


                    }






                    function skipMany(previousExpr) {

                        if (previousExpr == always) {





                            return always;
                        }

                        var



                        terminalCaseWhenArrivingAtRoot = rootExpr(),
                        terminalCaseWhenPreviousExpressionIsSatisfied = previousExpr,
                        recursiveCase = skip1(function (ascent) {
                            return cases(ascent);
                        }),

                        cases = lazyUnion(
                        terminalCaseWhenArrivingAtRoot,
                        terminalCaseWhenPreviousExpressionIsSatisfied,
                        recursiveCase);


                        return cases;
                    }





                    function rootExpr() {

                        return function (ascent) {
                            return headKey(ascent) == ROOT_PATH;
                        };
                    }








                    function statementExpr(lastClause) {

                        return function (ascent) {


                            var exprMatch = lastClause(ascent);

                            return exprMatch === true ? head(ascent) : exprMatch;
                        };
                    }












                    function expressionsReader(exprs, parserGeneratedSoFar, detection) {





                        return foldR(
                        function (parserGeneratedSoFar, expr) {

                            return expr(parserGeneratedSoFar, detection);
                        },
                        parserGeneratedSoFar,
                        exprs);


                    }

















                    function generateClauseReaderIfTokenFound(

                    tokenDetector, clauseEvaluatorGenerators,

                    jsonPath, parserGeneratedSoFar, onSuccess) {

                        var detected = tokenDetector(jsonPath);

                        if (detected) {
                            var compiledParser = expressionsReader(
                            clauseEvaluatorGenerators,
                            parserGeneratedSoFar,
                            detected),


                            remainingUnparsedJsonPath = jsonPath.substr(len(detected[0]));

                            return onSuccess(remainingUnparsedJsonPath, compiledParser);
                        }
                    }




                    function clauseMatcher(tokenDetector, exprs) {

                        return partialComplete(
                        generateClauseReaderIfTokenFound,
                        tokenDetector,
                        exprs);

                    }










                    var clauseForJsonPath = lazyUnion(

                    clauseMatcher(pathNodeSyntax, list(capture,
                    duckTypeClause,
                    nameClause,
                    skip1)),

                    clauseMatcher(doubleDotSyntax, list(skipMany)),




                    clauseMatcher(dotSyntax, list()),

                    clauseMatcher(bangSyntax, list(capture,
                    rootExpr)),

                    clauseMatcher(emptySyntax, list(statementExpr)),

                    function (jsonPath) {
                        throw Error('"' + jsonPath + '" could not be tokenised');
                    });











                    function returnFoundParser(_remainingJsonPath, compiledParser) {
                        return compiledParser;
                    }









                    function compileJsonPathToFunction(uncompiledJsonPath,
                    parserGeneratedSoFar) {







                        var onFind = uncompiledJsonPath ?
                        compileJsonPathToFunction :
                        returnFoundParser;

                        return clauseForJsonPath(
                        uncompiledJsonPath,
                        parserGeneratedSoFar,
                        onFind);

                    }




                    return function (jsonPath) {

                        try {

                            return compileJsonPathToFunction(jsonPath, always);

                        } catch (e) {
                            throw Error('Could not compile "' + jsonPath +
                            '" because ' + e.message);

                        }
                    };

                });













                function singleEventPubSub(eventType, newListener, removeListener) {






                    var listenerTupleList,
                    listenerList;

                    function hasId(id) {
                        return function (tuple) {
                            return tuple.id == id;
                        };
                    }

                    return {







                        on: function on(listener, listenerId) {

                            var tuple = {
                                listener: listener,
                                id: listenerId || listener };



                            if (newListener) {
                                newListener.emit(eventType, listener, tuple.id);
                            }

                            listenerTupleList = cons(tuple, listenerTupleList);
                            listenerList = cons(listener, listenerList);

                            return this;
                        },

                        emit: function emit() {
                            applyEach(listenerList, arguments);
                        },

                        un: function un(listenerId) {

                            var removed;

                            listenerTupleList = without(
                            listenerTupleList,
                            hasId(listenerId),
                            function (tuple) {
                                removed = tuple;
                            });


                            if (removed) {
                                listenerList = without(listenerList, function (listener) {
                                    return listener == removed.listener;
                                });

                                if (removeListener) {
                                    removeListener.emit(eventType, removed.listener, removed.id);
                                }
                            }
                        },

                        listeners: function listeners() {

                            return listenerList;
                        },

                        hasListener: function hasListener(listenerId) {
                            var test = listenerId ? hasId(listenerId) : always;

                            return defined(first(test, listenerTupleList));
                        } };

                }


































                function pubSub() {

                    var singles = {},
                    newListener = newSingle('newListener'),
                    removeListener = newSingle('removeListener');

                    function newSingle(eventName) {
                        return singles[eventName] = singleEventPubSub(
                        eventName,
                        newListener,
                        removeListener);

                    }


                    function pubSubInstance(eventName) {

                        return singles[eventName] || newSingle(eventName);
                    }


                    ['emit', 'on', 'un'].forEach(function (methodName) {

                        pubSubInstance[methodName] = varArgs(function (eventName, parameters) {
                            apply(parameters, pubSubInstance(eventName)[methodName]);
                        });
                    });

                    return pubSubInstance;
                }





                var

                _S = 1,


                NODE_OPENED = _S++,


                NODE_CLOSED = _S++,


                NODE_SWAP = _S++,
                NODE_DROP = _S++,

                FAIL_EVENT = 'fail',

                ROOT_NODE_FOUND = _S++,
                ROOT_PATH_FOUND = _S++,

                HTTP_START = 'start',
                STREAM_DATA = 'data',
                STREAM_END = 'end',
                ABORTING = _S++,


                SAX_KEY = _S++,
                SAX_VALUE_OPEN = _S++,
                SAX_VALUE_CLOSE = _S++;

                function errorReport(statusCode, body, error) {
                    try {
                        var jsonBody = JSON.parse(body);
                    } catch (e) {}

                    return {
                        statusCode: statusCode,
                        body: body,
                        jsonBody: jsonBody,
                        thrown: error };

                }










                function patternAdapter(oboeBus, jsonPathCompiler) {

                    var predicateEventMap = {
                        node: oboeBus(NODE_CLOSED),
                        path: oboeBus(NODE_OPENED) };


                    function emitMatchingNode(emitMatch, node, ascent) {







                        var descent = reverseList(ascent);

                        emitMatch(
                        node,



                        listAsArray(tail(map(keyOf, descent))),
                        listAsArray(map(nodeOf, descent)));

                    }












                    function addUnderlyingListener(fullEventName, predicateEvent, compiledJsonPath) {

                        var emitMatch = oboeBus(fullEventName).emit;

                        predicateEvent.on(function (ascent) {

                            var maybeMatchingMapping = compiledJsonPath(ascent);















                            if (maybeMatchingMapping !== false) {

                                emitMatchingNode(
                                emitMatch,
                                nodeOf(maybeMatchingMapping),
                                ascent);

                            }
                        }, fullEventName);

                        oboeBus('removeListener').on(function (removedEventName) {




                            if (removedEventName == fullEventName) {

                                if (!oboeBus(removedEventName).listeners()) {
                                    predicateEvent.un(fullEventName);
                                }
                            }
                        });
                    }

                    oboeBus('newListener').on(function (fullEventName) {

                        var match = /(node|path):(.*)/.exec(fullEventName);

                        if (match) {
                            var predicateEvent = predicateEventMap[match[1]];

                            if (!predicateEvent.hasListener(fullEventName)) {

                                addUnderlyingListener(
                                fullEventName,
                                predicateEvent,
                                jsonPathCompiler(match[2]));

                            }
                        }
                    });

                }








                function instanceApi(oboeBus, contentSource) {

                    var oboeApi,
                    fullyQualifiedNamePattern = /^(node|path):./,
                    rootNodeFinishedEvent = oboeBus(ROOT_NODE_FOUND),
                    emitNodeDrop = oboeBus(NODE_DROP).emit,
                    emitNodeSwap = oboeBus(NODE_SWAP).emit,




                    addListener = varArgs(function (eventId, parameters) {

                        if (oboeApi[eventId]) {




                            apply(parameters, oboeApi[eventId]);
                        } else {



                            var event = oboeBus(eventId),
                            listener = parameters[0];

                            if (fullyQualifiedNamePattern.test(eventId)) {



                                addForgettableCallback(event, listener);
                            } else {



                                event.on(listener);
                            }
                        }

                        return oboeApi;
                    }),




                    removeListener = function removeListener(eventId, p2, p3) {

                        if (eventId == 'done') {

                            rootNodeFinishedEvent.un(p2);

                        } else if (eventId == 'node' || eventId == 'path') {


                            oboeBus.un(eventId + ':' + p2, p3);
                        } else {





                            var listener = p2;

                            oboeBus(eventId).un(listener);
                        }

                        return oboeApi;
                    };









                    function addProtectedCallback(eventName, callback) {
                        oboeBus(eventName).on(protectedCallback(callback), callback);
                        return oboeApi;
                    }





                    function addForgettableCallback(event, callback, listenerId) {



                        listenerId = listenerId || callback;

                        var safeCallback = protectedCallback(callback);

                        event.on(function () {

                            var discard = false;

                            oboeApi.forget = function () {
                                discard = true;
                            };

                            apply(arguments, safeCallback);

                            delete oboeApi.forget;

                            if (discard) {
                                event.un(listenerId);
                            }
                        }, listenerId);

                        return oboeApi;
                    }





                    function protectedCallback(callback) {
                        return function () {
                            try {
                                return callback.apply(oboeApi, arguments);
                            } catch (e) {
                                setTimeout(function () {
                                    throw e;
                                });
                            }
                        };
                    }







                    function fullyQualifiedPatternMatchEvent(type, pattern) {
                        return oboeBus(type + ':' + pattern);
                    }

                    function wrapCallbackToSwapNodeIfSomethingReturned(callback) {
                        return function () {
                            var returnValueFromCallback = callback.apply(this, arguments);

                            if (defined(returnValueFromCallback)) {

                                if (returnValueFromCallback == oboe.drop) {
                                    emitNodeDrop();
                                } else {
                                    emitNodeSwap(returnValueFromCallback);
                                }
                            }
                        };
                    }

                    function addSingleNodeOrPathListener(eventId, pattern, callback) {

                        var effectiveCallback;

                        if (eventId == 'node') {
                            effectiveCallback = wrapCallbackToSwapNodeIfSomethingReturned(callback);
                        } else {
                            effectiveCallback = callback;
                        }

                        addForgettableCallback(
                        fullyQualifiedPatternMatchEvent(eventId, pattern),
                        effectiveCallback,
                        callback);

                    }




                    function addMultipleNodeOrPathListeners(eventId, listenerMap) {

                        for (var pattern in listenerMap) {
                            addSingleNodeOrPathListener(eventId, pattern, listenerMap[pattern]);
                        }
                    }




                    function addNodeOrPathListenerApi(eventId, jsonPathOrListenerMap, callback) {

                        if (isString(jsonPathOrListenerMap)) {
                            addSingleNodeOrPathListener(eventId, jsonPathOrListenerMap, callback);

                        } else {
                            addMultipleNodeOrPathListeners(eventId, jsonPathOrListenerMap);
                        }

                        return oboeApi;
                    }




                    oboeBus(ROOT_PATH_FOUND).on(function (rootNode) {
                        oboeApi.root = functor(rootNode);
                    });





                    oboeBus(HTTP_START).on(function (_statusCode, headers) {

                        oboeApi.header = function (name) {
                            return name ? headers[name] :
                            headers;

                        };
                    });





                    return oboeApi = {
                        on: addListener,
                        addListener: addListener,
                        removeListener: removeListener,
                        emit: oboeBus.emit,

                        node: partialComplete(addNodeOrPathListenerApi, 'node'),
                        path: partialComplete(addNodeOrPathListenerApi, 'path'),

                        done: partialComplete(addForgettableCallback, rootNodeFinishedEvent),
                        start: partialComplete(addProtectedCallback, HTTP_START),



                        fail: oboeBus(FAIL_EVENT).on,


                        abort: oboeBus(ABORTING).emit,


                        header: noop,
                        root: noop,

                        source: contentSource };

                }







                function wire(httpMethodName, contentSource, body, headers, withCredentials) {

                    var oboeBus = pubSub();





                    if (contentSource) {

                        streamingHttp(oboeBus,
                        httpTransport(),
                        httpMethodName,
                        contentSource,
                        body,
                        headers,
                        withCredentials);

                    }

                    clarinet(oboeBus);

                    ascentManager(oboeBus, incrementalContentBuilder(oboeBus));

                    patternAdapter(oboeBus, jsonPathCompiler);

                    return instanceApi(oboeBus, contentSource);
                }

                function applyDefaults(passthrough, url, httpMethodName, body, headers, withCredentials, cached) {

                    headers = headers ?



                    JSON.parse(JSON.stringify(headers)) :
                    {};

                    if (body) {
                        if (!isString(body)) {



                            body = JSON.stringify(body);


                            headers['Content-Type'] = headers['Content-Type'] || 'application/json';
                        }
                    } else {
                        body = null;
                    }


                    function modifiedUrl(baseUrl, cached) {

                        if (cached === false) {

                            if (baseUrl.indexOf('?') == -1) {
                                baseUrl += '?';
                            } else {
                                baseUrl += '&';
                            }

                            baseUrl += '_=' + new Date().getTime();
                        }
                        return baseUrl;
                    }

                    return passthrough(httpMethodName || 'GET', modifiedUrl(url, cached), body, headers, withCredentials || false);
                }


                function oboe(arg1) {







                    var nodeStreamMethodNames = list('resume', 'pause', 'pipe'),
                    isStream = partialComplete(
                    hasAllProperties,
                    nodeStreamMethodNames);


                    if (arg1) {
                        if (isStream(arg1) || isString(arg1)) {





                            return applyDefaults(
                            wire,
                            arg1);


                        } else {




                            return applyDefaults(
                            wire,
                            arg1.url,
                            arg1.method,
                            arg1.body,
                            arg1.headers,
                            arg1.withCredentials,
                            arg1.cached);


                        }
                    } else {


                        return wire();
                    }
                }




                oboe.drop = function () {
                    return oboe.drop;
                };


                if (typeof define === "function" && define.amd) {
                    define("oboe", [], function () {return oboe;});
                } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
                    module.exports = oboe;
                } else {
                    window.oboe = oboe;
                }
            })(function () {


                try {
                    return window;
                } catch (e) {
                    return self;
                }
            }(), Object, Array, Error, JSON);

        }, {}], 30: [function (require, module, exports) {
            arguments[4][3][0].apply(exports, arguments);
        }, { "dup": 3 }], 31: [function (require, module, exports) {






















            "use strict";

            var _ = require("underscore");
            var errors = require("web3-core-helpers").errors;
            var oboe = require("oboe");


            var IpcProvider = function IpcProvider(path, net) {
                var _this = this;
                this.responseCallbacks = {};
                this.notificationCallbacks = [];
                this.path = path;

                this.connection = net.connect({ path: this.path });

                this.addDefaultEvents();


                var callback = function callback(result) {


                    var id = null;


                    if (_.isArray(result)) {
                        result.forEach(function (load) {
                            if (_this.responseCallbacks[load.id])
                            id = load.id;
                        });
                    } else {
                        id = result.id;
                    }


                    if (!id && result.method.indexOf('_subscription') !== -1) {
                        _this.notificationCallbacks.forEach(function (callback) {
                            if (_.isFunction(callback))
                            callback(null, result);
                        });


                    } else if (_this.responseCallbacks[id]) {
                        _this.responseCallbacks[id](null, result);
                        delete _this.responseCallbacks[id];
                    }
                };


                if (net.constructor.name === 'Socket') {
                    oboe(this.connection).
                    done(callback);
                } else {
                    this.connection.on('data', function (data) {
                        _this._parseResponse(data.toString()).forEach(callback);
                    });
                }
            };






            IpcProvider.prototype.addDefaultEvents = function () {
                var _this = this;

                this.connection.on('connect', function () {
                });

                this.connection.on('error', function () {
                    _this._timeout();
                });

                this.connection.on('end', function () {
                    _this._timeout();


                    _this.notificationCallbacks.forEach(function (callback) {
                        if (_.isFunction(callback))
                        callback(new Error('IPC socket connection closed'));
                    });
                });

                this.connection.on('timeout', function () {
                    _this._timeout();
                });
            };










            IpcProvider.prototype._parseResponse = function (data) {
                var _this = this,
                returnValues = [];


                var dechunkedData = data.
                replace(/\}[\n\r]?\{/g, '}|--|{').
                replace(/\}\][\n\r]?\[\{/g, '}]|--|[{').
                replace(/\}[\n\r]?\[\{/g, '}|--|[{').
                replace(/\}\][\n\r]?\{/g, '}]|--|{').
                split('|--|');

                dechunkedData.forEach(function (data) {


                    if (_this.lastChunk)
                    data = _this.lastChunk + data;

                    var result = null;

                    try {
                        result = JSON.parse(data);

                    } catch (e) {

                        _this.lastChunk = data;


                        clearTimeout(_this.lastChunkTimeout);
                        _this.lastChunkTimeout = setTimeout(function () {
                            _this._timeout();
                            throw errors.InvalidResponse(data);
                        }, 1000 * 15);

                        return;
                    }


                    clearTimeout(_this.lastChunkTimeout);
                    _this.lastChunk = null;

                    if (result)
                    returnValues.push(result);
                });

                return returnValues;
            };








            IpcProvider.prototype._addResponseCallback = function (payload, callback) {
                var id = payload.id || payload[0].id;
                var method = payload.method || payload[0].method;

                this.responseCallbacks[id] = callback;
                this.responseCallbacks[id].method = method;
            };






            IpcProvider.prototype._timeout = function () {
                for (var key in this.responseCallbacks) {
                    if (this.responseCallbacks.hasOwnProperty(key)) {
                        this.responseCallbacks[key](errors.InvalidConnection('on IPC'));
                        delete this.responseCallbacks[key];
                    }
                }
            };






            IpcProvider.prototype.reconnect = function () {
                this.connection.connect({ path: this.path });
            };


            IpcProvider.prototype.send = function (payload, callback) {

                if (!this.connection.writable)
                this.connection.connect({ path: this.path });


                this.connection.write(JSON.stringify(payload));
                this._addResponseCallback(payload, callback);
            };








            IpcProvider.prototype.on = function (type, callback) {

                if (typeof callback !== 'function')
                throw new Error('The second parameter callback must be a function.');

                switch (type) {
                    case 'data':
                        this.notificationCallbacks.push(callback);
                        break;

                    default:
                        this.connection.on(type, callback);
                        break;}

            };








            IpcProvider.prototype.once = function (type, callback) {

                if (typeof callback !== 'function')
                throw new Error('The second parameter callback must be a function.');

                this.connection.once(type, callback);
            };








            IpcProvider.prototype.removeListener = function (type, callback) {
                var _this = this;

                switch (type) {
                    case 'data':
                        this.notificationCallbacks.forEach(function (cb, index) {
                            if (cb === callback)
                            _this.notificationCallbacks.splice(index, 1);
                        });
                        break;

                    default:
                        this.connection.removeListener(type, callback);
                        break;}

            };







            IpcProvider.prototype.removeAllListeners = function (type) {
                switch (type) {
                    case 'data':
                        this.notificationCallbacks = [];
                        break;

                    default:
                        this.connection.removeAllListeners(type);
                        break;}

            };






            IpcProvider.prototype.reset = function () {
                this._timeout();
                this.notificationCallbacks = [];

                this.connection.removeAllListeners('error');
                this.connection.removeAllListeners('end');
                this.connection.removeAllListeners('timeout');

                this.addDefaultEvents();
            };

            module.exports = IpcProvider;


        }, { "oboe": 29, "underscore": 30, "web3-core-helpers": 7 }], 32: [function (require, module, exports) {
            arguments[4][3][0].apply(exports, arguments);
        }, { "dup": 3 }], 33: [function (require, module, exports) {
            var _global = function () {return this || {};}();
            var NativeWebSocket = _global.WebSocket || _global.MozWebSocket;
            var websocket_version = require('./version');





            function W3CWebSocket(uri, protocols) {
                var native_instance;

                if (protocols) {
                    native_instance = new NativeWebSocket(uri, protocols);
                } else
                {
                    native_instance = new NativeWebSocket(uri);
                }








                return native_instance;
            }





            module.exports = {
                'w3cwebsocket': NativeWebSocket ? W3CWebSocket : null,
                'version': websocket_version };


        }, { "./version": 34 }], 34: [function (require, module, exports) {
            module.exports = require('../package.json').version;

        }, { "../package.json": 35 }], 35: [function (require, module, exports) {
            module.exports = {
                "_from": "git://github.com/frozeman/WebSocket-Node.git#browserifyCompatible",
                "_id": "websocket@1.0.24",
                "_inBundle": false,
                "_integrity": "sha1-LIAUVTxFQYLcGpCtyBMRNdJdi08=",
                "_location": "/websocket",
                "_phantomChildren": {},
                "_requested": {
                    "type": "git",
                    "raw": "websocket@git://github.com/frozeman/WebSocket-Node.git#browserifyCompatible",
                    "name": "websocket",
                    "escapedName": "websocket",
                    "rawSpec": "git://github.com/frozeman/WebSocket-Node.git#browserifyCompatible",
                    "saveSpec": "git://github.com/frozeman/WebSocket-Node.git#browserifyCompatible",
                    "fetchSpec": "git://github.com/frozeman/WebSocket-Node.git",
                    "gitCommittish": "browserifyCompatible" },

                "_requiredBy": [
                "/"],

                "_resolved": "git://github.com/frozeman/WebSocket-Node.git#7004c39c42ac98875ab61126e5b4a925430f592c",
                "_spec": "websocket@git://github.com/frozeman/WebSocket-Node.git#browserifyCompatible",
                "_where": "/Users/jon/Projects/lifeid/lifeidmobile/node_modules/web3/packages/web3-providers-ws",
                "author": {
                    "name": "Brian McKelvey",
                    "email": "brian@worlize.com",
                    "url": "https://www.worlize.com/" },

                "browser": "lib/browser.js",
                "bugs": {
                    "url": "https://github.com/theturtle32/WebSocket-Node/issues" },

                "bundleDependencies": false,
                "config": {
                    "verbose": false },

                "contributors": [
                {
                    "name": "Iñaki Baz Castillo",
                    "email": "ibc@aliax.net",
                    "url": "http://dev.sipdoc.net" }],


                "dependencies": {
                    "debug": "^2.2.0",
                    "nan": "^2.3.3",
                    "typedarray-to-buffer": "^3.1.2",
                    "yaeti": "^0.0.6" },

                "deprecated": false,
                "description": "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
                "devDependencies": {
                    "buffer-equal": "^1.0.0",
                    "faucet": "^0.0.1",
                    "gulp": "git+https://github.com/gulpjs/gulp.git#4.0",
                    "gulp-jshint": "^2.0.4",
                    "jshint": "^2.0.0",
                    "jshint-stylish": "^2.2.1",
                    "tape": "^4.0.1" },

                "directories": {
                    "lib": "./lib" },

                "engines": {
                    "node": ">=0.8.0" },

                "homepage": "https://github.com/theturtle32/WebSocket-Node",
                "keywords": [
                "websocket",
                "websockets",
                "socket",
                "networking",
                "comet",
                "push",
                "RFC-6455",
                "realtime",
                "server",
                "client"],

                "license": "Apache-2.0",
                "main": "index",
                "name": "websocket",
                "repository": {
                    "type": "git",
                    "url": "git+https://github.com/theturtle32/WebSocket-Node.git" },

                "scripts": {
                    "gulp": "gulp",
                    "install": "(node-gyp rebuild 2> builderror.log) || (exit 0)",
                    "test": "faucet test/unit" },

                "version": "1.0.24" };


        }, {}], 36: [function (require, module, exports) {






















            "use strict";

            var _ = require("underscore");
            var errors = require("web3-core-helpers").errors;

            var Ws = null;
            if (typeof window !== 'undefined') {
                Ws = window.WebSocket;
            } else {
                Ws = require("websocket").w3cwebsocket;
            }




            var WebsocketProvider = function WebsocketProvider(url) {
                var _this = this;
                this.responseCallbacks = {};
                this.notificationCallbacks = [];
                this.connection = new Ws(url);


                this.addDefaultEvents();



                this.connection.onmessage = function (e) {

                    var data = typeof e.data === 'string' ? e.data : '';

                    _this._parseResponse(data).forEach(function (result) {

                        var id = null;


                        if (_.isArray(result)) {
                            result.forEach(function (load) {
                                if (_this.responseCallbacks[load.id])
                                id = load.id;
                            });
                        } else {
                            id = result.id;
                        }


                        if (!id && result.method.indexOf('_subscription') !== -1) {
                            _this.notificationCallbacks.forEach(function (callback) {
                                if (_.isFunction(callback))
                                callback(null, result);
                            });


                        } else if (_this.responseCallbacks[id]) {
                            _this.responseCallbacks[id](null, result);
                            delete _this.responseCallbacks[id];
                        }
                    });
                };
            };






            WebsocketProvider.prototype.addDefaultEvents = function () {
                var _this = this;

                this.connection.onerror = function () {
                    _this._timeout();
                };

                this.connection.onclose = function (e) {
                    _this._timeout();

                    var noteCb = _this.notificationCallbacks;


                    _this.reset();


                    noteCb.forEach(function (callback) {
                        if (_.isFunction(callback))
                        callback(e);
                    });
                };




            };







            WebsocketProvider.prototype._parseResponse = function (data) {
                var _this = this,
                returnValues = [];


                var dechunkedData = data.
                replace(/\}[\n\r]?\{/g, '}|--|{').
                replace(/\}\][\n\r]?\[\{/g, '}]|--|[{').
                replace(/\}[\n\r]?\[\{/g, '}|--|[{').
                replace(/\}\][\n\r]?\{/g, '}]|--|{').
                split('|--|');

                dechunkedData.forEach(function (data) {


                    if (_this.lastChunk)
                    data = _this.lastChunk + data;

                    var result = null;

                    try {
                        result = JSON.parse(data);

                    } catch (e) {

                        _this.lastChunk = data;


                        clearTimeout(_this.lastChunkTimeout);
                        _this.lastChunkTimeout = setTimeout(function () {
                            _this._timeout();
                            throw errors.InvalidResponse(data);
                        }, 1000 * 15);

                        return;
                    }


                    clearTimeout(_this.lastChunkTimeout);
                    _this.lastChunk = null;

                    if (result)
                    returnValues.push(result);
                });

                return returnValues;
            };








            WebsocketProvider.prototype._addResponseCallback = function (payload, callback) {
                var id = payload.id || payload[0].id;
                var method = payload.method || payload[0].method;

                this.responseCallbacks[id] = callback;
                this.responseCallbacks[id].method = method;
            };






            WebsocketProvider.prototype._timeout = function () {
                for (var key in this.responseCallbacks) {
                    if (this.responseCallbacks.hasOwnProperty(key)) {
                        this.responseCallbacks[key](errors.InvalidConnection('on IPC'));
                        delete this.responseCallbacks[key];
                    }
                }
            };


            WebsocketProvider.prototype.send = function (payload, callback) {
                var _this = this;

                if (this.connection.readyState === this.connection.CONNECTING) {
                    setTimeout(function () {
                        _this.send(payload, callback);
                    }, 10);
                    return;
                }





                this.connection.send(JSON.stringify(payload));
                this._addResponseCallback(payload, callback);
            };








            WebsocketProvider.prototype.on = function (type, callback) {

                if (typeof callback !== 'function')
                throw new Error('The second parameter callback must be a function.');

                switch (type) {
                    case 'data':
                        this.notificationCallbacks.push(callback);
                        break;

                    case 'connect':
                        this.connection.onopen = callback;
                        break;

                    case 'end':
                        this.connection.onclose = callback;
                        break;

                    case 'error':
                        this.connection.onerror = callback;
                        break;}





            };










            WebsocketProvider.prototype.removeListener = function (type, callback) {
                var _this = this;

                switch (type) {
                    case 'data':
                        this.notificationCallbacks.forEach(function (cb, index) {
                            if (cb === callback)
                            _this.notificationCallbacks.splice(index, 1);
                        });
                        break;}







            };







            WebsocketProvider.prototype.removeAllListeners = function (type) {
                switch (type) {
                    case 'data':
                        this.notificationCallbacks = [];
                        break;



                    case 'connect':
                        this.connection.onopen = null;
                        break;

                    case 'end':
                        this.connection.onclose = null;
                        break;

                    case 'error':
                        this.connection.onerror = null;
                        break;

                    default:

                        break;}

            };






            WebsocketProvider.prototype.reset = function () {
                this._timeout();
                this.notificationCallbacks = [];





                this.addDefaultEvents();
            };

            module.exports = WebsocketProvider;


        }, { "underscore": 32, "web3-core-helpers": 7, "websocket": 33 }], 37: [function (require, module, exports) {
            (function (module, exports) {
                'use strict';


                function assert(val, msg) {
                    if (!val) throw new Error(msg || 'Assertion failed');
                }



                function inherits(ctor, superCtor) {
                    ctor.super_ = superCtor;
                    var TempCtor = function TempCtor() {};
                    TempCtor.prototype = superCtor.prototype;
                    ctor.prototype = new TempCtor();
                    ctor.prototype.constructor = ctor;
                }



                function BN(number, base, endian) {
                    if (BN.isBN(number)) {
                        return number;
                    }

                    this.negative = 0;
                    this.words = null;
                    this.length = 0;


                    this.red = null;

                    if (number !== null) {
                        if (base === 'le' || base === 'be') {
                            endian = base;
                            base = 10;
                        }

                        this._init(number || 0, base || 10, endian || 'be');
                    }
                }
                if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
                    module.exports = BN;
                } else {
                    exports.BN = BN;
                }

                BN.BN = BN;
                BN.wordSize = 26;

                var Buffer;
                try {
                    Buffer = require('buf' + 'fer').Buffer;
                } catch (e) {
                }

                BN.isBN = function isBN(num) {
                    if (num instanceof BN) {
                        return true;
                    }

                    return num !== null && (typeof num === "undefined" ? "undefined" : _typeof(num)) === 'object' &&
                    num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
                };

                BN.max = function max(left, right) {
                    if (left.cmp(right) > 0) return left;
                    return right;
                };

                BN.min = function min(left, right) {
                    if (left.cmp(right) < 0) return left;
                    return right;
                };

                BN.prototype._init = function init(number, base, endian) {
                    if (typeof number === 'number') {
                        return this._initNumber(number, base, endian);
                    }

                    if ((typeof number === "undefined" ? "undefined" : _typeof(number)) === 'object') {
                        return this._initArray(number, base, endian);
                    }

                    if (base === 'hex') {
                        base = 16;
                    }
                    assert(base === (base | 0) && base >= 2 && base <= 36);

                    number = number.toString().replace(/\s+/g, '');
                    var start = 0;
                    if (number[0] === '-') {
                        start++;
                    }

                    if (base === 16) {
                        this._parseHex(number, start);
                    } else {
                        this._parseBase(number, base, start);
                    }

                    if (number[0] === '-') {
                        this.negative = 1;
                    }

                    this.strip();

                    if (endian !== 'le') return;

                    this._initArray(this.toArray(), base, endian);
                };

                BN.prototype._initNumber = function _initNumber(number, base, endian) {
                    if (number < 0) {
                        this.negative = 1;
                        number = -number;
                    }
                    if (number < 0x4000000) {
                        this.words = [number & 0x3ffffff];
                        this.length = 1;
                    } else if (number < 0x10000000000000) {
                        this.words = [
                        number & 0x3ffffff,
                        number / 0x4000000 & 0x3ffffff];

                        this.length = 2;
                    } else {
                        assert(number < 0x20000000000000);
                        this.words = [
                        number & 0x3ffffff,
                        number / 0x4000000 & 0x3ffffff,
                        1];

                        this.length = 3;
                    }

                    if (endian !== 'le') return;


                    this._initArray(this.toArray(), base, endian);
                };

                BN.prototype._initArray = function _initArray(number, base, endian) {

                    assert(typeof number.length === 'number');
                    if (number.length <= 0) {
                        this.words = [0];
                        this.length = 1;
                        return this;
                    }

                    this.length = Math.ceil(number.length / 3);
                    this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) {
                        this.words[i] = 0;
                    }

                    var j, w;
                    var off = 0;
                    if (endian === 'be') {
                        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
                            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
                            this.words[j] |= w << off & 0x3ffffff;
                            this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
                            off += 24;
                            if (off >= 26) {
                                off -= 26;
                                j++;
                            }
                        }
                    } else if (endian === 'le') {
                        for (i = 0, j = 0; i < number.length; i += 3) {
                            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
                            this.words[j] |= w << off & 0x3ffffff;
                            this.words[j + 1] = w >>> 26 - off & 0x3ffffff;
                            off += 24;
                            if (off >= 26) {
                                off -= 26;
                                j++;
                            }
                        }
                    }
                    return this.strip();
                };

                function parseHex(str, start, end) {
                    var r = 0;
                    var len = Math.min(str.length, end);
                    for (var i = start; i < len; i++) {
                        var c = str.charCodeAt(i) - 48;

                        r <<= 4;


                        if (c >= 49 && c <= 54) {
                            r |= c - 49 + 0xa;


                        } else if (c >= 17 && c <= 22) {
                            r |= c - 17 + 0xa;


                        } else {
                            r |= c & 0xf;
                        }
                    }
                    return r;
                }

                BN.prototype._parseHex = function _parseHex(number, start) {

                    this.length = Math.ceil((number.length - start) / 6);
                    this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) {
                        this.words[i] = 0;
                    }

                    var j, w;

                    var off = 0;
                    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
                        w = parseHex(number, i, i + 6);
                        this.words[j] |= w << off & 0x3ffffff;

                        this.words[j + 1] |= w >>> 26 - off & 0x3fffff;
                        off += 24;
                        if (off >= 26) {
                            off -= 26;
                            j++;
                        }
                    }
                    if (i + 6 !== start) {
                        w = parseHex(number, start, i + 6);
                        this.words[j] |= w << off & 0x3ffffff;
                        this.words[j + 1] |= w >>> 26 - off & 0x3fffff;
                    }
                    this.strip();
                };

                function parseBase(str, start, end, mul) {
                    var r = 0;
                    var len = Math.min(str.length, end);
                    for (var i = start; i < len; i++) {
                        var c = str.charCodeAt(i) - 48;

                        r *= mul;


                        if (c >= 49) {
                            r += c - 49 + 0xa;


                        } else if (c >= 17) {
                            r += c - 17 + 0xa;


                        } else {
                            r += c;
                        }
                    }
                    return r;
                }

                BN.prototype._parseBase = function _parseBase(number, base, start) {

                    this.words = [0];
                    this.length = 1;


                    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
                        limbLen++;
                    }
                    limbLen--;
                    limbPow = limbPow / base | 0;

                    var total = number.length - start;
                    var mod = total % limbLen;
                    var end = Math.min(total, total - mod) + start;

                    var word = 0;
                    for (var i = start; i < end; i += limbLen) {
                        word = parseBase(number, i, i + limbLen, base);

                        this.imuln(limbPow);
                        if (this.words[0] + word < 0x4000000) {
                            this.words[0] += word;
                        } else {
                            this._iaddn(word);
                        }
                    }

                    if (mod !== 0) {
                        var pow = 1;
                        word = parseBase(number, i, number.length, base);

                        for (i = 0; i < mod; i++) {
                            pow *= base;
                        }

                        this.imuln(pow);
                        if (this.words[0] + word < 0x4000000) {
                            this.words[0] += word;
                        } else {
                            this._iaddn(word);
                        }
                    }
                };

                BN.prototype.copy = function copy(dest) {
                    dest.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) {
                        dest.words[i] = this.words[i];
                    }
                    dest.length = this.length;
                    dest.negative = this.negative;
                    dest.red = this.red;
                };

                BN.prototype.clone = function clone() {
                    var r = new BN(null);
                    this.copy(r);
                    return r;
                };

                BN.prototype._expand = function _expand(size) {
                    while (this.length < size) {
                        this.words[this.length++] = 0;
                    }
                    return this;
                };


                BN.prototype.strip = function strip() {
                    while (this.length > 1 && this.words[this.length - 1] === 0) {
                        this.length--;
                    }
                    return this._normSign();
                };

                BN.prototype._normSign = function _normSign() {

                    if (this.length === 1 && this.words[0] === 0) {
                        this.negative = 0;
                    }
                    return this;
                };

                BN.prototype.inspect = function inspect() {
                    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
                };































                var zeros = [
                '',
                '0',
                '00',
                '000',
                '0000',
                '00000',
                '000000',
                '0000000',
                '00000000',
                '000000000',
                '0000000000',
                '00000000000',
                '000000000000',
                '0000000000000',
                '00000000000000',
                '000000000000000',
                '0000000000000000',
                '00000000000000000',
                '000000000000000000',
                '0000000000000000000',
                '00000000000000000000',
                '000000000000000000000',
                '0000000000000000000000',
                '00000000000000000000000',
                '000000000000000000000000',
                '0000000000000000000000000'];


                var groupSizes = [
                0, 0,
                25, 16, 12, 11, 10, 9, 8,
                8, 7, 7, 7, 7, 6, 6,
                6, 6, 6, 6, 6, 5, 5,
                5, 5, 5, 5, 5, 5, 5,
                5, 5, 5, 5, 5, 5, 5];


                var groupBases = [
                0, 0,
                33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
                43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
                16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
                6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
                24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];


                BN.prototype.toString = function toString(base, padding) {
                    base = base || 10;
                    padding = padding | 0 || 1;

                    var out;
                    if (base === 16 || base === 'hex') {
                        out = '';
                        var off = 0;
                        var carry = 0;
                        for (var i = 0; i < this.length; i++) {
                            var w = this.words[i];
                            var word = ((w << off | carry) & 0xffffff).toString(16);
                            carry = w >>> 24 - off & 0xffffff;
                            if (carry !== 0 || i !== this.length - 1) {
                                out = zeros[6 - word.length] + word + out;
                            } else {
                                out = word + out;
                            }
                            off += 2;
                            if (off >= 26) {
                                off -= 26;
                                i--;
                            }
                        }
                        if (carry !== 0) {
                            out = carry.toString(16) + out;
                        }
                        while (out.length % padding !== 0) {
                            out = '0' + out;
                        }
                        if (this.negative !== 0) {
                            out = '-' + out;
                        }
                        return out;
                    }

                    if (base === (base | 0) && base >= 2 && base <= 36) {

                        var groupSize = groupSizes[base];

                        var groupBase = groupBases[base];
                        out = '';
                        var c = this.clone();
                        c.negative = 0;
                        while (!c.isZero()) {
                            var r = c.modn(groupBase).toString(base);
                            c = c.idivn(groupBase);

                            if (!c.isZero()) {
                                out = zeros[groupSize - r.length] + r + out;
                            } else {
                                out = r + out;
                            }
                        }
                        if (this.isZero()) {
                            out = '0' + out;
                        }
                        while (out.length % padding !== 0) {
                            out = '0' + out;
                        }
                        if (this.negative !== 0) {
                            out = '-' + out;
                        }
                        return out;
                    }

                    assert(false, 'Base should be between 2 and 36');
                };

                BN.prototype.toNumber = function toNumber() {
                    var ret = this.words[0];
                    if (this.length === 2) {
                        ret += this.words[1] * 0x4000000;
                    } else if (this.length === 3 && this.words[2] === 0x01) {

                        ret += 0x10000000000000 + this.words[1] * 0x4000000;
                    } else if (this.length > 2) {
                        assert(false, 'Number can only safely store up to 53 bits');
                    }
                    return this.negative !== 0 ? -ret : ret;
                };

                BN.prototype.toJSON = function toJSON() {
                    return this.toString(16);
                };

                BN.prototype.toBuffer = function toBuffer(endian, length) {
                    assert(typeof Buffer !== 'undefined');
                    return this.toArrayLike(Buffer, endian, length);
                };

                BN.prototype.toArray = function toArray(endian, length) {
                    return this.toArrayLike(Array, endian, length);
                };

                BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
                    var byteLength = this.byteLength();
                    var reqLength = length || Math.max(1, byteLength);
                    assert(byteLength <= reqLength, 'byte array longer than desired length');
                    assert(reqLength > 0, 'Requested array length <= 0');

                    this.strip();
                    var littleEndian = endian === 'le';
                    var res = new ArrayType(reqLength);

                    var b, i;
                    var q = this.clone();
                    if (!littleEndian) {

                        for (i = 0; i < reqLength - byteLength; i++) {
                            res[i] = 0;
                        }

                        for (i = 0; !q.isZero(); i++) {
                            b = q.andln(0xff);
                            q.iushrn(8);

                            res[reqLength - i - 1] = b;
                        }
                    } else {
                        for (i = 0; !q.isZero(); i++) {
                            b = q.andln(0xff);
                            q.iushrn(8);

                            res[i] = b;
                        }

                        for (; i < reqLength; i++) {
                            res[i] = 0;
                        }
                    }

                    return res;
                };

                if (Math.clz32) {
                    BN.prototype._countBits = function _countBits(w) {
                        return 32 - Math.clz32(w);
                    };
                } else {
                    BN.prototype._countBits = function _countBits(w) {
                        var t = w;
                        var r = 0;
                        if (t >= 0x1000) {
                            r += 13;
                            t >>>= 13;
                        }
                        if (t >= 0x40) {
                            r += 7;
                            t >>>= 7;
                        }
                        if (t >= 0x8) {
                            r += 4;
                            t >>>= 4;
                        }
                        if (t >= 0x02) {
                            r += 2;
                            t >>>= 2;
                        }
                        return r + t;
                    };
                }

                BN.prototype._zeroBits = function _zeroBits(w) {

                    if (w === 0) return 26;

                    var t = w;
                    var r = 0;
                    if ((t & 0x1fff) === 0) {
                        r += 13;
                        t >>>= 13;
                    }
                    if ((t & 0x7f) === 0) {
                        r += 7;
                        t >>>= 7;
                    }
                    if ((t & 0xf) === 0) {
                        r += 4;
                        t >>>= 4;
                    }
                    if ((t & 0x3) === 0) {
                        r += 2;
                        t >>>= 2;
                    }
                    if ((t & 0x1) === 0) {
                        r++;
                    }
                    return r;
                };


                BN.prototype.bitLength = function bitLength() {
                    var w = this.words[this.length - 1];
                    var hi = this._countBits(w);
                    return (this.length - 1) * 26 + hi;
                };

                function toBitArray(num) {
                    var w = new Array(num.bitLength());

                    for (var bit = 0; bit < w.length; bit++) {
                        var off = bit / 26 | 0;
                        var wbit = bit % 26;

                        w[bit] = (num.words[off] & 1 << wbit) >>> wbit;
                    }

                    return w;
                }


                BN.prototype.zeroBits = function zeroBits() {
                    if (this.isZero()) return 0;

                    var r = 0;
                    for (var i = 0; i < this.length; i++) {
                        var b = this._zeroBits(this.words[i]);
                        r += b;
                        if (b !== 26) break;
                    }
                    return r;
                };

                BN.prototype.byteLength = function byteLength() {
                    return Math.ceil(this.bitLength() / 8);
                };

                BN.prototype.toTwos = function toTwos(width) {
                    if (this.negative !== 0) {
                        return this.abs().inotn(width).iaddn(1);
                    }
                    return this.clone();
                };

                BN.prototype.fromTwos = function fromTwos(width) {
                    if (this.testn(width - 1)) {
                        return this.notn(width).iaddn(1).ineg();
                    }
                    return this.clone();
                };

                BN.prototype.isNeg = function isNeg() {
                    return this.negative !== 0;
                };


                BN.prototype.neg = function neg() {
                    return this.clone().ineg();
                };

                BN.prototype.ineg = function ineg() {
                    if (!this.isZero()) {
                        this.negative ^= 1;
                    }

                    return this;
                };


                BN.prototype.iuor = function iuor(num) {
                    while (this.length < num.length) {
                        this.words[this.length++] = 0;
                    }

                    for (var i = 0; i < num.length; i++) {
                        this.words[i] = this.words[i] | num.words[i];
                    }

                    return this.strip();
                };

                BN.prototype.ior = function ior(num) {
                    assert((this.negative | num.negative) === 0);
                    return this.iuor(num);
                };


                BN.prototype.or = function or(num) {
                    if (this.length > num.length) return this.clone().ior(num);
                    return num.clone().ior(this);
                };

                BN.prototype.uor = function uor(num) {
                    if (this.length > num.length) return this.clone().iuor(num);
                    return num.clone().iuor(this);
                };


                BN.prototype.iuand = function iuand(num) {

                    var b;
                    if (this.length > num.length) {
                        b = num;
                    } else {
                        b = this;
                    }

                    for (var i = 0; i < b.length; i++) {
                        this.words[i] = this.words[i] & num.words[i];
                    }

                    this.length = b.length;

                    return this.strip();
                };

                BN.prototype.iand = function iand(num) {
                    assert((this.negative | num.negative) === 0);
                    return this.iuand(num);
                };


                BN.prototype.and = function and(num) {
                    if (this.length > num.length) return this.clone().iand(num);
                    return num.clone().iand(this);
                };

                BN.prototype.uand = function uand(num) {
                    if (this.length > num.length) return this.clone().iuand(num);
                    return num.clone().iuand(this);
                };


                BN.prototype.iuxor = function iuxor(num) {

                    var a;
                    var b;
                    if (this.length > num.length) {
                        a = this;
                        b = num;
                    } else {
                        a = num;
                        b = this;
                    }

                    for (var i = 0; i < b.length; i++) {
                        this.words[i] = a.words[i] ^ b.words[i];
                    }

                    if (this !== a) {
                        for (; i < a.length; i++) {
                            this.words[i] = a.words[i];
                        }
                    }

                    this.length = a.length;

                    return this.strip();
                };

                BN.prototype.ixor = function ixor(num) {
                    assert((this.negative | num.negative) === 0);
                    return this.iuxor(num);
                };


                BN.prototype.xor = function xor(num) {
                    if (this.length > num.length) return this.clone().ixor(num);
                    return num.clone().ixor(this);
                };

                BN.prototype.uxor = function uxor(num) {
                    if (this.length > num.length) return this.clone().iuxor(num);
                    return num.clone().iuxor(this);
                };


                BN.prototype.inotn = function inotn(width) {
                    assert(typeof width === 'number' && width >= 0);

                    var bytesNeeded = Math.ceil(width / 26) | 0;
                    var bitsLeft = width % 26;


                    this._expand(bytesNeeded);

                    if (bitsLeft > 0) {
                        bytesNeeded--;
                    }


                    for (var i = 0; i < bytesNeeded; i++) {
                        this.words[i] = ~this.words[i] & 0x3ffffff;
                    }


                    if (bitsLeft > 0) {
                        this.words[i] = ~this.words[i] & 0x3ffffff >> 26 - bitsLeft;
                    }


                    return this.strip();
                };

                BN.prototype.notn = function notn(width) {
                    return this.clone().inotn(width);
                };


                BN.prototype.setn = function setn(bit, val) {
                    assert(typeof bit === 'number' && bit >= 0);

                    var off = bit / 26 | 0;
                    var wbit = bit % 26;

                    this._expand(off + 1);

                    if (val) {
                        this.words[off] = this.words[off] | 1 << wbit;
                    } else {
                        this.words[off] = this.words[off] & ~(1 << wbit);
                    }

                    return this.strip();
                };


                BN.prototype.iadd = function iadd(num) {
                    var r;


                    if (this.negative !== 0 && num.negative === 0) {
                        this.negative = 0;
                        r = this.isub(num);
                        this.negative ^= 1;
                        return this._normSign();


                    } else if (this.negative === 0 && num.negative !== 0) {
                        num.negative = 0;
                        r = this.isub(num);
                        num.negative = 1;
                        return r._normSign();
                    }


                    var a, b;
                    if (this.length > num.length) {
                        a = this;
                        b = num;
                    } else {
                        a = num;
                        b = this;
                    }

                    var carry = 0;
                    for (var i = 0; i < b.length; i++) {
                        r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
                        this.words[i] = r & 0x3ffffff;
                        carry = r >>> 26;
                    }
                    for (; carry !== 0 && i < a.length; i++) {
                        r = (a.words[i] | 0) + carry;
                        this.words[i] = r & 0x3ffffff;
                        carry = r >>> 26;
                    }

                    this.length = a.length;
                    if (carry !== 0) {
                        this.words[this.length] = carry;
                        this.length++;

                    } else if (a !== this) {
                        for (; i < a.length; i++) {
                            this.words[i] = a.words[i];
                        }
                    }

                    return this;
                };


                BN.prototype.add = function add(num) {
                    var res;
                    if (num.negative !== 0 && this.negative === 0) {
                        num.negative = 0;
                        res = this.sub(num);
                        num.negative ^= 1;
                        return res;
                    } else if (num.negative === 0 && this.negative !== 0) {
                        this.negative = 0;
                        res = num.sub(this);
                        this.negative = 1;
                        return res;
                    }

                    if (this.length > num.length) return this.clone().iadd(num);

                    return num.clone().iadd(this);
                };


                BN.prototype.isub = function isub(num) {

                    if (num.negative !== 0) {
                        num.negative = 0;
                        var r = this.iadd(num);
                        num.negative = 1;
                        return r._normSign();


                    } else if (this.negative !== 0) {
                        this.negative = 0;
                        this.iadd(num);
                        this.negative = 1;
                        return this._normSign();
                    }


                    var cmp = this.cmp(num);


                    if (cmp === 0) {
                        this.negative = 0;
                        this.length = 1;
                        this.words[0] = 0;
                        return this;
                    }


                    var a, b;
                    if (cmp > 0) {
                        a = this;
                        b = num;
                    } else {
                        a = num;
                        b = this;
                    }

                    var carry = 0;
                    for (var i = 0; i < b.length; i++) {
                        r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
                        carry = r >> 26;
                        this.words[i] = r & 0x3ffffff;
                    }
                    for (; carry !== 0 && i < a.length; i++) {
                        r = (a.words[i] | 0) + carry;
                        carry = r >> 26;
                        this.words[i] = r & 0x3ffffff;
                    }


                    if (carry === 0 && i < a.length && a !== this) {
                        for (; i < a.length; i++) {
                            this.words[i] = a.words[i];
                        }
                    }

                    this.length = Math.max(this.length, i);

                    if (a !== this) {
                        this.negative = 1;
                    }

                    return this.strip();
                };


                BN.prototype.sub = function sub(num) {
                    return this.clone().isub(num);
                };

                function smallMulTo(self, num, out) {
                    out.negative = num.negative ^ self.negative;
                    var len = self.length + num.length | 0;
                    out.length = len;
                    len = len - 1 | 0;


                    var a = self.words[0] | 0;
                    var b = num.words[0] | 0;
                    var r = a * b;

                    var lo = r & 0x3ffffff;
                    var carry = r / 0x4000000 | 0;
                    out.words[0] = lo;

                    for (var k = 1; k < len; k++) {


                        var ncarry = carry >>> 26;
                        var rword = carry & 0x3ffffff;
                        var maxJ = Math.min(k, num.length - 1);
                        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
                            var i = k - j | 0;
                            a = self.words[i] | 0;
                            b = num.words[j] | 0;
                            r = a * b + rword;
                            ncarry += r / 0x4000000 | 0;
                            rword = r & 0x3ffffff;
                        }
                        out.words[k] = rword | 0;
                        carry = ncarry | 0;
                    }
                    if (carry !== 0) {
                        out.words[k] = carry | 0;
                    } else {
                        out.length--;
                    }

                    return out.strip();
                }




                var comb10MulTo = function comb10MulTo(self, num, out) {
                    var a = self.words;
                    var b = num.words;
                    var o = out.words;
                    var c = 0;
                    var lo;
                    var mid;
                    var hi;
                    var a0 = a[0] | 0;
                    var al0 = a0 & 0x1fff;
                    var ah0 = a0 >>> 13;
                    var a1 = a[1] | 0;
                    var al1 = a1 & 0x1fff;
                    var ah1 = a1 >>> 13;
                    var a2 = a[2] | 0;
                    var al2 = a2 & 0x1fff;
                    var ah2 = a2 >>> 13;
                    var a3 = a[3] | 0;
                    var al3 = a3 & 0x1fff;
                    var ah3 = a3 >>> 13;
                    var a4 = a[4] | 0;
                    var al4 = a4 & 0x1fff;
                    var ah4 = a4 >>> 13;
                    var a5 = a[5] | 0;
                    var al5 = a5 & 0x1fff;
                    var ah5 = a5 >>> 13;
                    var a6 = a[6] | 0;
                    var al6 = a6 & 0x1fff;
                    var ah6 = a6 >>> 13;
                    var a7 = a[7] | 0;
                    var al7 = a7 & 0x1fff;
                    var ah7 = a7 >>> 13;
                    var a8 = a[8] | 0;
                    var al8 = a8 & 0x1fff;
                    var ah8 = a8 >>> 13;
                    var a9 = a[9] | 0;
                    var al9 = a9 & 0x1fff;
                    var ah9 = a9 >>> 13;
                    var b0 = b[0] | 0;
                    var bl0 = b0 & 0x1fff;
                    var bh0 = b0 >>> 13;
                    var b1 = b[1] | 0;
                    var bl1 = b1 & 0x1fff;
                    var bh1 = b1 >>> 13;
                    var b2 = b[2] | 0;
                    var bl2 = b2 & 0x1fff;
                    var bh2 = b2 >>> 13;
                    var b3 = b[3] | 0;
                    var bl3 = b3 & 0x1fff;
                    var bh3 = b3 >>> 13;
                    var b4 = b[4] | 0;
                    var bl4 = b4 & 0x1fff;
                    var bh4 = b4 >>> 13;
                    var b5 = b[5] | 0;
                    var bl5 = b5 & 0x1fff;
                    var bh5 = b5 >>> 13;
                    var b6 = b[6] | 0;
                    var bl6 = b6 & 0x1fff;
                    var bh6 = b6 >>> 13;
                    var b7 = b[7] | 0;
                    var bl7 = b7 & 0x1fff;
                    var bh7 = b7 >>> 13;
                    var b8 = b[8] | 0;
                    var bl8 = b8 & 0x1fff;
                    var bh8 = b8 >>> 13;
                    var b9 = b[9] | 0;
                    var bl9 = b9 & 0x1fff;
                    var bh9 = b9 >>> 13;

                    out.negative = self.negative ^ num.negative;
                    out.length = 19;

                    lo = Math.imul(al0, bl0);
                    mid = Math.imul(al0, bh0);
                    mid = mid + Math.imul(ah0, bl0) | 0;
                    hi = Math.imul(ah0, bh0);
                    var w0 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
                    w0 &= 0x3ffffff;

                    lo = Math.imul(al1, bl0);
                    mid = Math.imul(al1, bh0);
                    mid = mid + Math.imul(ah1, bl0) | 0;
                    hi = Math.imul(ah1, bh0);
                    lo = lo + Math.imul(al0, bl1) | 0;
                    mid = mid + Math.imul(al0, bh1) | 0;
                    mid = mid + Math.imul(ah0, bl1) | 0;
                    hi = hi + Math.imul(ah0, bh1) | 0;
                    var w1 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
                    w1 &= 0x3ffffff;

                    lo = Math.imul(al2, bl0);
                    mid = Math.imul(al2, bh0);
                    mid = mid + Math.imul(ah2, bl0) | 0;
                    hi = Math.imul(ah2, bh0);
                    lo = lo + Math.imul(al1, bl1) | 0;
                    mid = mid + Math.imul(al1, bh1) | 0;
                    mid = mid + Math.imul(ah1, bl1) | 0;
                    hi = hi + Math.imul(ah1, bh1) | 0;
                    lo = lo + Math.imul(al0, bl2) | 0;
                    mid = mid + Math.imul(al0, bh2) | 0;
                    mid = mid + Math.imul(ah0, bl2) | 0;
                    hi = hi + Math.imul(ah0, bh2) | 0;
                    var w2 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
                    w2 &= 0x3ffffff;

                    lo = Math.imul(al3, bl0);
                    mid = Math.imul(al3, bh0);
                    mid = mid + Math.imul(ah3, bl0) | 0;
                    hi = Math.imul(ah3, bh0);
                    lo = lo + Math.imul(al2, bl1) | 0;
                    mid = mid + Math.imul(al2, bh1) | 0;
                    mid = mid + Math.imul(ah2, bl1) | 0;
                    hi = hi + Math.imul(ah2, bh1) | 0;
                    lo = lo + Math.imul(al1, bl2) | 0;
                    mid = mid + Math.imul(al1, bh2) | 0;
                    mid = mid + Math.imul(ah1, bl2) | 0;
                    hi = hi + Math.imul(ah1, bh2) | 0;
                    lo = lo + Math.imul(al0, bl3) | 0;
                    mid = mid + Math.imul(al0, bh3) | 0;
                    mid = mid + Math.imul(ah0, bl3) | 0;
                    hi = hi + Math.imul(ah0, bh3) | 0;
                    var w3 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
                    w3 &= 0x3ffffff;

                    lo = Math.imul(al4, bl0);
                    mid = Math.imul(al4, bh0);
                    mid = mid + Math.imul(ah4, bl0) | 0;
                    hi = Math.imul(ah4, bh0);
                    lo = lo + Math.imul(al3, bl1) | 0;
                    mid = mid + Math.imul(al3, bh1) | 0;
                    mid = mid + Math.imul(ah3, bl1) | 0;
                    hi = hi + Math.imul(ah3, bh1) | 0;
                    lo = lo + Math.imul(al2, bl2) | 0;
                    mid = mid + Math.imul(al2, bh2) | 0;
                    mid = mid + Math.imul(ah2, bl2) | 0;
                    hi = hi + Math.imul(ah2, bh2) | 0;
                    lo = lo + Math.imul(al1, bl3) | 0;
                    mid = mid + Math.imul(al1, bh3) | 0;
                    mid = mid + Math.imul(ah1, bl3) | 0;
                    hi = hi + Math.imul(ah1, bh3) | 0;
                    lo = lo + Math.imul(al0, bl4) | 0;
                    mid = mid + Math.imul(al0, bh4) | 0;
                    mid = mid + Math.imul(ah0, bl4) | 0;
                    hi = hi + Math.imul(ah0, bh4) | 0;
                    var w4 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
                    w4 &= 0x3ffffff;

                    lo = Math.imul(al5, bl0);
                    mid = Math.imul(al5, bh0);
                    mid = mid + Math.imul(ah5, bl0) | 0;
                    hi = Math.imul(ah5, bh0);
                    lo = lo + Math.imul(al4, bl1) | 0;
                    mid = mid + Math.imul(al4, bh1) | 0;
                    mid = mid + Math.imul(ah4, bl1) | 0;
                    hi = hi + Math.imul(ah4, bh1) | 0;
                    lo = lo + Math.imul(al3, bl2) | 0;
                    mid = mid + Math.imul(al3, bh2) | 0;
                    mid = mid + Math.imul(ah3, bl2) | 0;
                    hi = hi + Math.imul(ah3, bh2) | 0;
                    lo = lo + Math.imul(al2, bl3) | 0;
                    mid = mid + Math.imul(al2, bh3) | 0;
                    mid = mid + Math.imul(ah2, bl3) | 0;
                    hi = hi + Math.imul(ah2, bh3) | 0;
                    lo = lo + Math.imul(al1, bl4) | 0;
                    mid = mid + Math.imul(al1, bh4) | 0;
                    mid = mid + Math.imul(ah1, bl4) | 0;
                    hi = hi + Math.imul(ah1, bh4) | 0;
                    lo = lo + Math.imul(al0, bl5) | 0;
                    mid = mid + Math.imul(al0, bh5) | 0;
                    mid = mid + Math.imul(ah0, bl5) | 0;
                    hi = hi + Math.imul(ah0, bh5) | 0;
                    var w5 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
                    w5 &= 0x3ffffff;

                    lo = Math.imul(al6, bl0);
                    mid = Math.imul(al6, bh0);
                    mid = mid + Math.imul(ah6, bl0) | 0;
                    hi = Math.imul(ah6, bh0);
                    lo = lo + Math.imul(al5, bl1) | 0;
                    mid = mid + Math.imul(al5, bh1) | 0;
                    mid = mid + Math.imul(ah5, bl1) | 0;
                    hi = hi + Math.imul(ah5, bh1) | 0;
                    lo = lo + Math.imul(al4, bl2) | 0;
                    mid = mid + Math.imul(al4, bh2) | 0;
                    mid = mid + Math.imul(ah4, bl2) | 0;
                    hi = hi + Math.imul(ah4, bh2) | 0;
                    lo = lo + Math.imul(al3, bl3) | 0;
                    mid = mid + Math.imul(al3, bh3) | 0;
                    mid = mid + Math.imul(ah3, bl3) | 0;
                    hi = hi + Math.imul(ah3, bh3) | 0;
                    lo = lo + Math.imul(al2, bl4) | 0;
                    mid = mid + Math.imul(al2, bh4) | 0;
                    mid = mid + Math.imul(ah2, bl4) | 0;
                    hi = hi + Math.imul(ah2, bh4) | 0;
                    lo = lo + Math.imul(al1, bl5) | 0;
                    mid = mid + Math.imul(al1, bh5) | 0;
                    mid = mid + Math.imul(ah1, bl5) | 0;
                    hi = hi + Math.imul(ah1, bh5) | 0;
                    lo = lo + Math.imul(al0, bl6) | 0;
                    mid = mid + Math.imul(al0, bh6) | 0;
                    mid = mid + Math.imul(ah0, bl6) | 0;
                    hi = hi + Math.imul(ah0, bh6) | 0;
                    var w6 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
                    w6 &= 0x3ffffff;

                    lo = Math.imul(al7, bl0);
                    mid = Math.imul(al7, bh0);
                    mid = mid + Math.imul(ah7, bl0) | 0;
                    hi = Math.imul(ah7, bh0);
                    lo = lo + Math.imul(al6, bl1) | 0;
                    mid = mid + Math.imul(al6, bh1) | 0;
                    mid = mid + Math.imul(ah6, bl1) | 0;
                    hi = hi + Math.imul(ah6, bh1) | 0;
                    lo = lo + Math.imul(al5, bl2) | 0;
                    mid = mid + Math.imul(al5, bh2) | 0;
                    mid = mid + Math.imul(ah5, bl2) | 0;
                    hi = hi + Math.imul(ah5, bh2) | 0;
                    lo = lo + Math.imul(al4, bl3) | 0;
                    mid = mid + Math.imul(al4, bh3) | 0;
                    mid = mid + Math.imul(ah4, bl3) | 0;
                    hi = hi + Math.imul(ah4, bh3) | 0;
                    lo = lo + Math.imul(al3, bl4) | 0;
                    mid = mid + Math.imul(al3, bh4) | 0;
                    mid = mid + Math.imul(ah3, bl4) | 0;
                    hi = hi + Math.imul(ah3, bh4) | 0;
                    lo = lo + Math.imul(al2, bl5) | 0;
                    mid = mid + Math.imul(al2, bh5) | 0;
                    mid = mid + Math.imul(ah2, bl5) | 0;
                    hi = hi + Math.imul(ah2, bh5) | 0;
                    lo = lo + Math.imul(al1, bl6) | 0;
                    mid = mid + Math.imul(al1, bh6) | 0;
                    mid = mid + Math.imul(ah1, bl6) | 0;
                    hi = hi + Math.imul(ah1, bh6) | 0;
                    lo = lo + Math.imul(al0, bl7) | 0;
                    mid = mid + Math.imul(al0, bh7) | 0;
                    mid = mid + Math.imul(ah0, bl7) | 0;
                    hi = hi + Math.imul(ah0, bh7) | 0;
                    var w7 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
                    w7 &= 0x3ffffff;

                    lo = Math.imul(al8, bl0);
                    mid = Math.imul(al8, bh0);
                    mid = mid + Math.imul(ah8, bl0) | 0;
                    hi = Math.imul(ah8, bh0);
                    lo = lo + Math.imul(al7, bl1) | 0;
                    mid = mid + Math.imul(al7, bh1) | 0;
                    mid = mid + Math.imul(ah7, bl1) | 0;
                    hi = hi + Math.imul(ah7, bh1) | 0;
                    lo = lo + Math.imul(al6, bl2) | 0;
                    mid = mid + Math.imul(al6, bh2) | 0;
                    mid = mid + Math.imul(ah6, bl2) | 0;
                    hi = hi + Math.imul(ah6, bh2) | 0;
                    lo = lo + Math.imul(al5, bl3) | 0;
                    mid = mid + Math.imul(al5, bh3) | 0;
                    mid = mid + Math.imul(ah5, bl3) | 0;
                    hi = hi + Math.imul(ah5, bh3) | 0;
                    lo = lo + Math.imul(al4, bl4) | 0;
                    mid = mid + Math.imul(al4, bh4) | 0;
                    mid = mid + Math.imul(ah4, bl4) | 0;
                    hi = hi + Math.imul(ah4, bh4) | 0;
                    lo = lo + Math.imul(al3, bl5) | 0;
                    mid = mid + Math.imul(al3, bh5) | 0;
                    mid = mid + Math.imul(ah3, bl5) | 0;
                    hi = hi + Math.imul(ah3, bh5) | 0;
                    lo = lo + Math.imul(al2, bl6) | 0;
                    mid = mid + Math.imul(al2, bh6) | 0;
                    mid = mid + Math.imul(ah2, bl6) | 0;
                    hi = hi + Math.imul(ah2, bh6) | 0;
                    lo = lo + Math.imul(al1, bl7) | 0;
                    mid = mid + Math.imul(al1, bh7) | 0;
                    mid = mid + Math.imul(ah1, bl7) | 0;
                    hi = hi + Math.imul(ah1, bh7) | 0;
                    lo = lo + Math.imul(al0, bl8) | 0;
                    mid = mid + Math.imul(al0, bh8) | 0;
                    mid = mid + Math.imul(ah0, bl8) | 0;
                    hi = hi + Math.imul(ah0, bh8) | 0;
                    var w8 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
                    w8 &= 0x3ffffff;

                    lo = Math.imul(al9, bl0);
                    mid = Math.imul(al9, bh0);
                    mid = mid + Math.imul(ah9, bl0) | 0;
                    hi = Math.imul(ah9, bh0);
                    lo = lo + Math.imul(al8, bl1) | 0;
                    mid = mid + Math.imul(al8, bh1) | 0;
                    mid = mid + Math.imul(ah8, bl1) | 0;
                    hi = hi + Math.imul(ah8, bh1) | 0;
                    lo = lo + Math.imul(al7, bl2) | 0;
                    mid = mid + Math.imul(al7, bh2) | 0;
                    mid = mid + Math.imul(ah7, bl2) | 0;
                    hi = hi + Math.imul(ah7, bh2) | 0;
                    lo = lo + Math.imul(al6, bl3) | 0;
                    mid = mid + Math.imul(al6, bh3) | 0;
                    mid = mid + Math.imul(ah6, bl3) | 0;
                    hi = hi + Math.imul(ah6, bh3) | 0;
                    lo = lo + Math.imul(al5, bl4) | 0;
                    mid = mid + Math.imul(al5, bh4) | 0;
                    mid = mid + Math.imul(ah5, bl4) | 0;
                    hi = hi + Math.imul(ah5, bh4) | 0;
                    lo = lo + Math.imul(al4, bl5) | 0;
                    mid = mid + Math.imul(al4, bh5) | 0;
                    mid = mid + Math.imul(ah4, bl5) | 0;
                    hi = hi + Math.imul(ah4, bh5) | 0;
                    lo = lo + Math.imul(al3, bl6) | 0;
                    mid = mid + Math.imul(al3, bh6) | 0;
                    mid = mid + Math.imul(ah3, bl6) | 0;
                    hi = hi + Math.imul(ah3, bh6) | 0;
                    lo = lo + Math.imul(al2, bl7) | 0;
                    mid = mid + Math.imul(al2, bh7) | 0;
                    mid = mid + Math.imul(ah2, bl7) | 0;
                    hi = hi + Math.imul(ah2, bh7) | 0;
                    lo = lo + Math.imul(al1, bl8) | 0;
                    mid = mid + Math.imul(al1, bh8) | 0;
                    mid = mid + Math.imul(ah1, bl8) | 0;
                    hi = hi + Math.imul(ah1, bh8) | 0;
                    lo = lo + Math.imul(al0, bl9) | 0;
                    mid = mid + Math.imul(al0, bh9) | 0;
                    mid = mid + Math.imul(ah0, bl9) | 0;
                    hi = hi + Math.imul(ah0, bh9) | 0;
                    var w9 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
                    w9 &= 0x3ffffff;

                    lo = Math.imul(al9, bl1);
                    mid = Math.imul(al9, bh1);
                    mid = mid + Math.imul(ah9, bl1) | 0;
                    hi = Math.imul(ah9, bh1);
                    lo = lo + Math.imul(al8, bl2) | 0;
                    mid = mid + Math.imul(al8, bh2) | 0;
                    mid = mid + Math.imul(ah8, bl2) | 0;
                    hi = hi + Math.imul(ah8, bh2) | 0;
                    lo = lo + Math.imul(al7, bl3) | 0;
                    mid = mid + Math.imul(al7, bh3) | 0;
                    mid = mid + Math.imul(ah7, bl3) | 0;
                    hi = hi + Math.imul(ah7, bh3) | 0;
                    lo = lo + Math.imul(al6, bl4) | 0;
                    mid = mid + Math.imul(al6, bh4) | 0;
                    mid = mid + Math.imul(ah6, bl4) | 0;
                    hi = hi + Math.imul(ah6, bh4) | 0;
                    lo = lo + Math.imul(al5, bl5) | 0;
                    mid = mid + Math.imul(al5, bh5) | 0;
                    mid = mid + Math.imul(ah5, bl5) | 0;
                    hi = hi + Math.imul(ah5, bh5) | 0;
                    lo = lo + Math.imul(al4, bl6) | 0;
                    mid = mid + Math.imul(al4, bh6) | 0;
                    mid = mid + Math.imul(ah4, bl6) | 0;
                    hi = hi + Math.imul(ah4, bh6) | 0;
                    lo = lo + Math.imul(al3, bl7) | 0;
                    mid = mid + Math.imul(al3, bh7) | 0;
                    mid = mid + Math.imul(ah3, bl7) | 0;
                    hi = hi + Math.imul(ah3, bh7) | 0;
                    lo = lo + Math.imul(al2, bl8) | 0;
                    mid = mid + Math.imul(al2, bh8) | 0;
                    mid = mid + Math.imul(ah2, bl8) | 0;
                    hi = hi + Math.imul(ah2, bh8) | 0;
                    lo = lo + Math.imul(al1, bl9) | 0;
                    mid = mid + Math.imul(al1, bh9) | 0;
                    mid = mid + Math.imul(ah1, bl9) | 0;
                    hi = hi + Math.imul(ah1, bh9) | 0;
                    var w10 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
                    w10 &= 0x3ffffff;

                    lo = Math.imul(al9, bl2);
                    mid = Math.imul(al9, bh2);
                    mid = mid + Math.imul(ah9, bl2) | 0;
                    hi = Math.imul(ah9, bh2);
                    lo = lo + Math.imul(al8, bl3) | 0;
                    mid = mid + Math.imul(al8, bh3) | 0;
                    mid = mid + Math.imul(ah8, bl3) | 0;
                    hi = hi + Math.imul(ah8, bh3) | 0;
                    lo = lo + Math.imul(al7, bl4) | 0;
                    mid = mid + Math.imul(al7, bh4) | 0;
                    mid = mid + Math.imul(ah7, bl4) | 0;
                    hi = hi + Math.imul(ah7, bh4) | 0;
                    lo = lo + Math.imul(al6, bl5) | 0;
                    mid = mid + Math.imul(al6, bh5) | 0;
                    mid = mid + Math.imul(ah6, bl5) | 0;
                    hi = hi + Math.imul(ah6, bh5) | 0;
                    lo = lo + Math.imul(al5, bl6) | 0;
                    mid = mid + Math.imul(al5, bh6) | 0;
                    mid = mid + Math.imul(ah5, bl6) | 0;
                    hi = hi + Math.imul(ah5, bh6) | 0;
                    lo = lo + Math.imul(al4, bl7) | 0;
                    mid = mid + Math.imul(al4, bh7) | 0;
                    mid = mid + Math.imul(ah4, bl7) | 0;
                    hi = hi + Math.imul(ah4, bh7) | 0;
                    lo = lo + Math.imul(al3, bl8) | 0;
                    mid = mid + Math.imul(al3, bh8) | 0;
                    mid = mid + Math.imul(ah3, bl8) | 0;
                    hi = hi + Math.imul(ah3, bh8) | 0;
                    lo = lo + Math.imul(al2, bl9) | 0;
                    mid = mid + Math.imul(al2, bh9) | 0;
                    mid = mid + Math.imul(ah2, bl9) | 0;
                    hi = hi + Math.imul(ah2, bh9) | 0;
                    var w11 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
                    w11 &= 0x3ffffff;

                    lo = Math.imul(al9, bl3);
                    mid = Math.imul(al9, bh3);
                    mid = mid + Math.imul(ah9, bl3) | 0;
                    hi = Math.imul(ah9, bh3);
                    lo = lo + Math.imul(al8, bl4) | 0;
                    mid = mid + Math.imul(al8, bh4) | 0;
                    mid = mid + Math.imul(ah8, bl4) | 0;
                    hi = hi + Math.imul(ah8, bh4) | 0;
                    lo = lo + Math.imul(al7, bl5) | 0;
                    mid = mid + Math.imul(al7, bh5) | 0;
                    mid = mid + Math.imul(ah7, bl5) | 0;
                    hi = hi + Math.imul(ah7, bh5) | 0;
                    lo = lo + Math.imul(al6, bl6) | 0;
                    mid = mid + Math.imul(al6, bh6) | 0;
                    mid = mid + Math.imul(ah6, bl6) | 0;
                    hi = hi + Math.imul(ah6, bh6) | 0;
                    lo = lo + Math.imul(al5, bl7) | 0;
                    mid = mid + Math.imul(al5, bh7) | 0;
                    mid = mid + Math.imul(ah5, bl7) | 0;
                    hi = hi + Math.imul(ah5, bh7) | 0;
                    lo = lo + Math.imul(al4, bl8) | 0;
                    mid = mid + Math.imul(al4, bh8) | 0;
                    mid = mid + Math.imul(ah4, bl8) | 0;
                    hi = hi + Math.imul(ah4, bh8) | 0;
                    lo = lo + Math.imul(al3, bl9) | 0;
                    mid = mid + Math.imul(al3, bh9) | 0;
                    mid = mid + Math.imul(ah3, bl9) | 0;
                    hi = hi + Math.imul(ah3, bh9) | 0;
                    var w12 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
                    w12 &= 0x3ffffff;

                    lo = Math.imul(al9, bl4);
                    mid = Math.imul(al9, bh4);
                    mid = mid + Math.imul(ah9, bl4) | 0;
                    hi = Math.imul(ah9, bh4);
                    lo = lo + Math.imul(al8, bl5) | 0;
                    mid = mid + Math.imul(al8, bh5) | 0;
                    mid = mid + Math.imul(ah8, bl5) | 0;
                    hi = hi + Math.imul(ah8, bh5) | 0;
                    lo = lo + Math.imul(al7, bl6) | 0;
                    mid = mid + Math.imul(al7, bh6) | 0;
                    mid = mid + Math.imul(ah7, bl6) | 0;
                    hi = hi + Math.imul(ah7, bh6) | 0;
                    lo = lo + Math.imul(al6, bl7) | 0;
                    mid = mid + Math.imul(al6, bh7) | 0;
                    mid = mid + Math.imul(ah6, bl7) | 0;
                    hi = hi + Math.imul(ah6, bh7) | 0;
                    lo = lo + Math.imul(al5, bl8) | 0;
                    mid = mid + Math.imul(al5, bh8) | 0;
                    mid = mid + Math.imul(ah5, bl8) | 0;
                    hi = hi + Math.imul(ah5, bh8) | 0;
                    lo = lo + Math.imul(al4, bl9) | 0;
                    mid = mid + Math.imul(al4, bh9) | 0;
                    mid = mid + Math.imul(ah4, bl9) | 0;
                    hi = hi + Math.imul(ah4, bh9) | 0;
                    var w13 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
                    w13 &= 0x3ffffff;

                    lo = Math.imul(al9, bl5);
                    mid = Math.imul(al9, bh5);
                    mid = mid + Math.imul(ah9, bl5) | 0;
                    hi = Math.imul(ah9, bh5);
                    lo = lo + Math.imul(al8, bl6) | 0;
                    mid = mid + Math.imul(al8, bh6) | 0;
                    mid = mid + Math.imul(ah8, bl6) | 0;
                    hi = hi + Math.imul(ah8, bh6) | 0;
                    lo = lo + Math.imul(al7, bl7) | 0;
                    mid = mid + Math.imul(al7, bh7) | 0;
                    mid = mid + Math.imul(ah7, bl7) | 0;
                    hi = hi + Math.imul(ah7, bh7) | 0;
                    lo = lo + Math.imul(al6, bl8) | 0;
                    mid = mid + Math.imul(al6, bh8) | 0;
                    mid = mid + Math.imul(ah6, bl8) | 0;
                    hi = hi + Math.imul(ah6, bh8) | 0;
                    lo = lo + Math.imul(al5, bl9) | 0;
                    mid = mid + Math.imul(al5, bh9) | 0;
                    mid = mid + Math.imul(ah5, bl9) | 0;
                    hi = hi + Math.imul(ah5, bh9) | 0;
                    var w14 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
                    w14 &= 0x3ffffff;

                    lo = Math.imul(al9, bl6);
                    mid = Math.imul(al9, bh6);
                    mid = mid + Math.imul(ah9, bl6) | 0;
                    hi = Math.imul(ah9, bh6);
                    lo = lo + Math.imul(al8, bl7) | 0;
                    mid = mid + Math.imul(al8, bh7) | 0;
                    mid = mid + Math.imul(ah8, bl7) | 0;
                    hi = hi + Math.imul(ah8, bh7) | 0;
                    lo = lo + Math.imul(al7, bl8) | 0;
                    mid = mid + Math.imul(al7, bh8) | 0;
                    mid = mid + Math.imul(ah7, bl8) | 0;
                    hi = hi + Math.imul(ah7, bh8) | 0;
                    lo = lo + Math.imul(al6, bl9) | 0;
                    mid = mid + Math.imul(al6, bh9) | 0;
                    mid = mid + Math.imul(ah6, bl9) | 0;
                    hi = hi + Math.imul(ah6, bh9) | 0;
                    var w15 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
                    w15 &= 0x3ffffff;

                    lo = Math.imul(al9, bl7);
                    mid = Math.imul(al9, bh7);
                    mid = mid + Math.imul(ah9, bl7) | 0;
                    hi = Math.imul(ah9, bh7);
                    lo = lo + Math.imul(al8, bl8) | 0;
                    mid = mid + Math.imul(al8, bh8) | 0;
                    mid = mid + Math.imul(ah8, bl8) | 0;
                    hi = hi + Math.imul(ah8, bh8) | 0;
                    lo = lo + Math.imul(al7, bl9) | 0;
                    mid = mid + Math.imul(al7, bh9) | 0;
                    mid = mid + Math.imul(ah7, bl9) | 0;
                    hi = hi + Math.imul(ah7, bh9) | 0;
                    var w16 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
                    w16 &= 0x3ffffff;

                    lo = Math.imul(al9, bl8);
                    mid = Math.imul(al9, bh8);
                    mid = mid + Math.imul(ah9, bl8) | 0;
                    hi = Math.imul(ah9, bh8);
                    lo = lo + Math.imul(al8, bl9) | 0;
                    mid = mid + Math.imul(al8, bh9) | 0;
                    mid = mid + Math.imul(ah8, bl9) | 0;
                    hi = hi + Math.imul(ah8, bh9) | 0;
                    var w17 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
                    w17 &= 0x3ffffff;

                    lo = Math.imul(al9, bl9);
                    mid = Math.imul(al9, bh9);
                    mid = mid + Math.imul(ah9, bl9) | 0;
                    hi = Math.imul(ah9, bh9);
                    var w18 = (c + lo | 0) + ((mid & 0x1fff) << 13) | 0;
                    c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
                    w18 &= 0x3ffffff;
                    o[0] = w0;
                    o[1] = w1;
                    o[2] = w2;
                    o[3] = w3;
                    o[4] = w4;
                    o[5] = w5;
                    o[6] = w6;
                    o[7] = w7;
                    o[8] = w8;
                    o[9] = w9;
                    o[10] = w10;
                    o[11] = w11;
                    o[12] = w12;
                    o[13] = w13;
                    o[14] = w14;
                    o[15] = w15;
                    o[16] = w16;
                    o[17] = w17;
                    o[18] = w18;
                    if (c !== 0) {
                        o[19] = c;
                        out.length++;
                    }
                    return out;
                };


                if (!Math.imul) {
                    comb10MulTo = smallMulTo;
                }

                function bigMulTo(self, num, out) {
                    out.negative = num.negative ^ self.negative;
                    out.length = self.length + num.length;

                    var carry = 0;
                    var hncarry = 0;
                    for (var k = 0; k < out.length - 1; k++) {


                        var ncarry = hncarry;
                        hncarry = 0;
                        var rword = carry & 0x3ffffff;
                        var maxJ = Math.min(k, num.length - 1);
                        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
                            var i = k - j;
                            var a = self.words[i] | 0;
                            var b = num.words[j] | 0;
                            var r = a * b;

                            var lo = r & 0x3ffffff;
                            ncarry = ncarry + (r / 0x4000000 | 0) | 0;
                            lo = lo + rword | 0;
                            rword = lo & 0x3ffffff;
                            ncarry = ncarry + (lo >>> 26) | 0;

                            hncarry += ncarry >>> 26;
                            ncarry &= 0x3ffffff;
                        }
                        out.words[k] = rword;
                        carry = ncarry;
                        ncarry = hncarry;
                    }
                    if (carry !== 0) {
                        out.words[k] = carry;
                    } else {
                        out.length--;
                    }

                    return out.strip();
                }

                function jumboMulTo(self, num, out) {
                    var fftm = new FFTM();
                    return fftm.mulp(self, num, out);
                }

                BN.prototype.mulTo = function mulTo(num, out) {
                    var res;
                    var len = this.length + num.length;
                    if (this.length === 10 && num.length === 10) {
                        res = comb10MulTo(this, num, out);
                    } else if (len < 63) {
                        res = smallMulTo(this, num, out);
                    } else if (len < 1024) {
                        res = bigMulTo(this, num, out);
                    } else {
                        res = jumboMulTo(this, num, out);
                    }

                    return res;
                };




                function FFTM(x, y) {
                    this.x = x;
                    this.y = y;
                }

                FFTM.prototype.makeRBT = function makeRBT(N) {
                    var t = new Array(N);
                    var l = BN.prototype._countBits(N) - 1;
                    for (var i = 0; i < N; i++) {
                        t[i] = this.revBin(i, l, N);
                    }

                    return t;
                };


                FFTM.prototype.revBin = function revBin(x, l, N) {
                    if (x === 0 || x === N - 1) return x;

                    var rb = 0;
                    for (var i = 0; i < l; i++) {
                        rb |= (x & 1) << l - i - 1;
                        x >>= 1;
                    }

                    return rb;
                };



                FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
                    for (var i = 0; i < N; i++) {
                        rtws[i] = rws[rbt[i]];
                        itws[i] = iws[rbt[i]];
                    }
                };

                FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
                    this.permute(rbt, rws, iws, rtws, itws, N);

                    for (var s = 1; s < N; s <<= 1) {
                        var l = s << 1;

                        var rtwdf = Math.cos(2 * Math.PI / l);
                        var itwdf = Math.sin(2 * Math.PI / l);

                        for (var p = 0; p < N; p += l) {
                            var rtwdf_ = rtwdf;
                            var itwdf_ = itwdf;

                            for (var j = 0; j < s; j++) {
                                var re = rtws[p + j];
                                var ie = itws[p + j];

                                var ro = rtws[p + j + s];
                                var io = itws[p + j + s];

                                var rx = rtwdf_ * ro - itwdf_ * io;

                                io = rtwdf_ * io + itwdf_ * ro;
                                ro = rx;

                                rtws[p + j] = re + ro;
                                itws[p + j] = ie + io;

                                rtws[p + j + s] = re - ro;
                                itws[p + j + s] = ie - io;


                                if (j !== l) {
                                    rx = rtwdf * rtwdf_ - itwdf * itwdf_;

                                    itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                                    rtwdf_ = rx;
                                }
                            }
                        }
                    }
                };

                FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
                    var N = Math.max(m, n) | 1;
                    var odd = N & 1;
                    var i = 0;
                    for (N = N / 2 | 0; N; N = N >>> 1) {
                        i++;
                    }

                    return 1 << i + 1 + odd;
                };

                FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
                    if (N <= 1) return;

                    for (var i = 0; i < N / 2; i++) {
                        var t = rws[i];

                        rws[i] = rws[N - i - 1];
                        rws[N - i - 1] = t;

                        t = iws[i];

                        iws[i] = -iws[N - i - 1];
                        iws[N - i - 1] = -t;
                    }
                };

                FFTM.prototype.normalize13b = function normalize13b(ws, N) {
                    var carry = 0;
                    for (var i = 0; i < N / 2; i++) {
                        var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
                        Math.round(ws[2 * i] / N) +
                        carry;

                        ws[i] = w & 0x3ffffff;

                        if (w < 0x4000000) {
                            carry = 0;
                        } else {
                            carry = w / 0x4000000 | 0;
                        }
                    }

                    return ws;
                };

                FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
                    var carry = 0;
                    for (var i = 0; i < len; i++) {
                        carry = carry + (ws[i] | 0);

                        rws[2 * i] = carry & 0x1fff;carry = carry >>> 13;
                        rws[2 * i + 1] = carry & 0x1fff;carry = carry >>> 13;
                    }


                    for (i = 2 * len; i < N; ++i) {
                        rws[i] = 0;
                    }

                    assert(carry === 0);
                    assert((carry & ~0x1fff) === 0);
                };

                FFTM.prototype.stub = function stub(N) {
                    var ph = new Array(N);
                    for (var i = 0; i < N; i++) {
                        ph[i] = 0;
                    }

                    return ph;
                };

                FFTM.prototype.mulp = function mulp(x, y, out) {
                    var N = 2 * this.guessLen13b(x.length, y.length);

                    var rbt = this.makeRBT(N);

                    var _ = this.stub(N);

                    var rws = new Array(N);
                    var rwst = new Array(N);
                    var iwst = new Array(N);

                    var nrws = new Array(N);
                    var nrwst = new Array(N);
                    var niwst = new Array(N);

                    var rmws = out.words;
                    rmws.length = N;

                    this.convert13b(x.words, x.length, rws, N);
                    this.convert13b(y.words, y.length, nrws, N);

                    this.transform(rws, _, rwst, iwst, N, rbt);
                    this.transform(nrws, _, nrwst, niwst, N, rbt);

                    for (var i = 0; i < N; i++) {
                        var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
                        iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
                        rwst[i] = rx;
                    }

                    this.conjugate(rwst, iwst, N);
                    this.transform(rwst, iwst, rmws, _, N, rbt);
                    this.conjugate(rmws, _, N);
                    this.normalize13b(rmws, N);

                    out.negative = x.negative ^ y.negative;
                    out.length = x.length + y.length;
                    return out.strip();
                };


                BN.prototype.mul = function mul(num) {
                    var out = new BN(null);
                    out.words = new Array(this.length + num.length);
                    return this.mulTo(num, out);
                };


                BN.prototype.mulf = function mulf(num) {
                    var out = new BN(null);
                    out.words = new Array(this.length + num.length);
                    return jumboMulTo(this, num, out);
                };


                BN.prototype.imul = function imul(num) {
                    return this.clone().mulTo(num, this);
                };

                BN.prototype.imuln = function imuln(num) {
                    assert(typeof num === 'number');
                    assert(num < 0x4000000);


                    var carry = 0;
                    for (var i = 0; i < this.length; i++) {
                        var w = (this.words[i] | 0) * num;
                        var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
                        carry >>= 26;
                        carry += w / 0x4000000 | 0;

                        carry += lo >>> 26;
                        this.words[i] = lo & 0x3ffffff;
                    }

                    if (carry !== 0) {
                        this.words[i] = carry;
                        this.length++;
                    }

                    return this;
                };

                BN.prototype.muln = function muln(num) {
                    return this.clone().imuln(num);
                };


                BN.prototype.sqr = function sqr() {
                    return this.mul(this);
                };


                BN.prototype.isqr = function isqr() {
                    return this.imul(this.clone());
                };


                BN.prototype.pow = function pow(num) {
                    var w = toBitArray(num);
                    if (w.length === 0) return new BN(1);


                    var res = this;
                    for (var i = 0; i < w.length; i++, res = res.sqr()) {
                        if (w[i] !== 0) break;
                    }

                    if (++i < w.length) {
                        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
                            if (w[i] === 0) continue;

                            res = res.mul(q);
                        }
                    }

                    return res;
                };


                BN.prototype.iushln = function iushln(bits) {
                    assert(typeof bits === 'number' && bits >= 0);
                    var r = bits % 26;
                    var s = (bits - r) / 26;
                    var carryMask = 0x3ffffff >>> 26 - r << 26 - r;
                    var i;

                    if (r !== 0) {
                        var carry = 0;

                        for (i = 0; i < this.length; i++) {
                            var newCarry = this.words[i] & carryMask;
                            var c = (this.words[i] | 0) - newCarry << r;
                            this.words[i] = c | carry;
                            carry = newCarry >>> 26 - r;
                        }

                        if (carry) {
                            this.words[i] = carry;
                            this.length++;
                        }
                    }

                    if (s !== 0) {
                        for (i = this.length - 1; i >= 0; i--) {
                            this.words[i + s] = this.words[i];
                        }

                        for (i = 0; i < s; i++) {
                            this.words[i] = 0;
                        }

                        this.length += s;
                    }

                    return this.strip();
                };

                BN.prototype.ishln = function ishln(bits) {

                    assert(this.negative === 0);
                    return this.iushln(bits);
                };




                BN.prototype.iushrn = function iushrn(bits, hint, extended) {
                    assert(typeof bits === 'number' && bits >= 0);
                    var h;
                    if (hint) {
                        h = (hint - hint % 26) / 26;
                    } else {
                        h = 0;
                    }

                    var r = bits % 26;
                    var s = Math.min((bits - r) / 26, this.length);
                    var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
                    var maskedWords = extended;

                    h -= s;
                    h = Math.max(0, h);


                    if (maskedWords) {
                        for (var i = 0; i < s; i++) {
                            maskedWords.words[i] = this.words[i];
                        }
                        maskedWords.length = s;
                    }

                    if (s === 0) {

                    } else if (this.length > s) {
                        this.length -= s;
                        for (i = 0; i < this.length; i++) {
                            this.words[i] = this.words[i + s];
                        }
                    } else {
                        this.words[0] = 0;
                        this.length = 1;
                    }

                    var carry = 0;
                    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
                        var word = this.words[i] | 0;
                        this.words[i] = carry << 26 - r | word >>> r;
                        carry = word & mask;
                    }


                    if (maskedWords && carry !== 0) {
                        maskedWords.words[maskedWords.length++] = carry;
                    }

                    if (this.length === 0) {
                        this.words[0] = 0;
                        this.length = 1;
                    }

                    return this.strip();
                };

                BN.prototype.ishrn = function ishrn(bits, hint, extended) {

                    assert(this.negative === 0);
                    return this.iushrn(bits, hint, extended);
                };


                BN.prototype.shln = function shln(bits) {
                    return this.clone().ishln(bits);
                };

                BN.prototype.ushln = function ushln(bits) {
                    return this.clone().iushln(bits);
                };


                BN.prototype.shrn = function shrn(bits) {
                    return this.clone().ishrn(bits);
                };

                BN.prototype.ushrn = function ushrn(bits) {
                    return this.clone().iushrn(bits);
                };


                BN.prototype.testn = function testn(bit) {
                    assert(typeof bit === 'number' && bit >= 0);
                    var r = bit % 26;
                    var s = (bit - r) / 26;
                    var q = 1 << r;


                    if (this.length <= s) return false;


                    var w = this.words[s];

                    return !!(w & q);
                };


                BN.prototype.imaskn = function imaskn(bits) {
                    assert(typeof bits === 'number' && bits >= 0);
                    var r = bits % 26;
                    var s = (bits - r) / 26;

                    assert(this.negative === 0, 'imaskn works only with positive numbers');

                    if (this.length <= s) {
                        return this;
                    }

                    if (r !== 0) {
                        s++;
                    }
                    this.length = Math.min(s, this.length);

                    if (r !== 0) {
                        var mask = 0x3ffffff ^ 0x3ffffff >>> r << r;
                        this.words[this.length - 1] &= mask;
                    }

                    return this.strip();
                };


                BN.prototype.maskn = function maskn(bits) {
                    return this.clone().imaskn(bits);
                };


                BN.prototype.iaddn = function iaddn(num) {
                    assert(typeof num === 'number');
                    assert(num < 0x4000000);
                    if (num < 0) return this.isubn(-num);


                    if (this.negative !== 0) {
                        if (this.length === 1 && (this.words[0] | 0) < num) {
                            this.words[0] = num - (this.words[0] | 0);
                            this.negative = 0;
                            return this;
                        }

                        this.negative = 0;
                        this.isubn(num);
                        this.negative = 1;
                        return this;
                    }


                    return this._iaddn(num);
                };

                BN.prototype._iaddn = function _iaddn(num) {
                    this.words[0] += num;


                    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
                        this.words[i] -= 0x4000000;
                        if (i === this.length - 1) {
                            this.words[i + 1] = 1;
                        } else {
                            this.words[i + 1]++;
                        }
                    }
                    this.length = Math.max(this.length, i + 1);

                    return this;
                };


                BN.prototype.isubn = function isubn(num) {
                    assert(typeof num === 'number');
                    assert(num < 0x4000000);
                    if (num < 0) return this.iaddn(-num);

                    if (this.negative !== 0) {
                        this.negative = 0;
                        this.iaddn(num);
                        this.negative = 1;
                        return this;
                    }

                    this.words[0] -= num;

                    if (this.length === 1 && this.words[0] < 0) {
                        this.words[0] = -this.words[0];
                        this.negative = 1;
                    } else {

                        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
                            this.words[i] += 0x4000000;
                            this.words[i + 1] -= 1;
                        }
                    }

                    return this.strip();
                };

                BN.prototype.addn = function addn(num) {
                    return this.clone().iaddn(num);
                };

                BN.prototype.subn = function subn(num) {
                    return this.clone().isubn(num);
                };

                BN.prototype.iabs = function iabs() {
                    this.negative = 0;

                    return this;
                };

                BN.prototype.abs = function abs() {
                    return this.clone().iabs();
                };

                BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
                    var len = num.length + shift;
                    var i;

                    this._expand(len);

                    var w;
                    var carry = 0;
                    for (i = 0; i < num.length; i++) {
                        w = (this.words[i + shift] | 0) + carry;
                        var right = (num.words[i] | 0) * mul;
                        w -= right & 0x3ffffff;
                        carry = (w >> 26) - (right / 0x4000000 | 0);
                        this.words[i + shift] = w & 0x3ffffff;
                    }
                    for (; i < this.length - shift; i++) {
                        w = (this.words[i + shift] | 0) + carry;
                        carry = w >> 26;
                        this.words[i + shift] = w & 0x3ffffff;
                    }

                    if (carry === 0) return this.strip();


                    assert(carry === -1);
                    carry = 0;
                    for (i = 0; i < this.length; i++) {
                        w = -(this.words[i] | 0) + carry;
                        carry = w >> 26;
                        this.words[i] = w & 0x3ffffff;
                    }
                    this.negative = 1;

                    return this.strip();
                };

                BN.prototype._wordDiv = function _wordDiv(num, mode) {
                    var shift = this.length - num.length;

                    var a = this.clone();
                    var b = num;


                    var bhi = b.words[b.length - 1] | 0;
                    var bhiBits = this._countBits(bhi);
                    shift = 26 - bhiBits;
                    if (shift !== 0) {
                        b = b.ushln(shift);
                        a.iushln(shift);
                        bhi = b.words[b.length - 1] | 0;
                    }


                    var m = a.length - b.length;
                    var q;

                    if (mode !== 'mod') {
                        q = new BN(null);
                        q.length = m + 1;
                        q.words = new Array(q.length);
                        for (var i = 0; i < q.length; i++) {
                            q.words[i] = 0;
                        }
                    }

                    var diff = a.clone()._ishlnsubmul(b, 1, m);
                    if (diff.negative === 0) {
                        a = diff;
                        if (q) {
                            q.words[m] = 1;
                        }
                    }

                    for (var j = m - 1; j >= 0; j--) {
                        var qj = (a.words[b.length + j] | 0) * 0x4000000 + (
                        a.words[b.length + j - 1] | 0);



                        qj = Math.min(qj / bhi | 0, 0x3ffffff);

                        a._ishlnsubmul(b, qj, j);
                        while (a.negative !== 0) {
                            qj--;
                            a.negative = 0;
                            a._ishlnsubmul(b, 1, j);
                            if (!a.isZero()) {
                                a.negative ^= 1;
                            }
                        }
                        if (q) {
                            q.words[j] = qj;
                        }
                    }
                    if (q) {
                        q.strip();
                    }
                    a.strip();


                    if (mode !== 'div' && shift !== 0) {
                        a.iushrn(shift);
                    }

                    return {
                        div: q || null,
                        mod: a };

                };





                BN.prototype.divmod = function divmod(num, mode, positive) {
                    assert(!num.isZero());

                    if (this.isZero()) {
                        return {
                            div: new BN(0),
                            mod: new BN(0) };

                    }

                    var div, mod, res;
                    if (this.negative !== 0 && num.negative === 0) {
                        res = this.neg().divmod(num, mode);

                        if (mode !== 'mod') {
                            div = res.div.neg();
                        }

                        if (mode !== 'div') {
                            mod = res.mod.neg();
                            if (positive && mod.negative !== 0) {
                                mod.iadd(num);
                            }
                        }

                        return {
                            div: div,
                            mod: mod };

                    }

                    if (this.negative === 0 && num.negative !== 0) {
                        res = this.divmod(num.neg(), mode);

                        if (mode !== 'mod') {
                            div = res.div.neg();
                        }

                        return {
                            div: div,
                            mod: res.mod };

                    }

                    if ((this.negative & num.negative) !== 0) {
                        res = this.neg().divmod(num.neg(), mode);

                        if (mode !== 'div') {
                            mod = res.mod.neg();
                            if (positive && mod.negative !== 0) {
                                mod.isub(num);
                            }
                        }

                        return {
                            div: res.div,
                            mod: mod };

                    }




                    if (num.length > this.length || this.cmp(num) < 0) {
                        return {
                            div: new BN(0),
                            mod: this };

                    }


                    if (num.length === 1) {
                        if (mode === 'div') {
                            return {
                                div: this.divn(num.words[0]),
                                mod: null };

                        }

                        if (mode === 'mod') {
                            return {
                                div: null,
                                mod: new BN(this.modn(num.words[0])) };

                        }

                        return {
                            div: this.divn(num.words[0]),
                            mod: new BN(this.modn(num.words[0])) };

                    }

                    return this._wordDiv(num, mode);
                };


                BN.prototype.div = function div(num) {
                    return this.divmod(num, 'div', false).div;
                };


                BN.prototype.mod = function mod(num) {
                    return this.divmod(num, 'mod', false).mod;
                };

                BN.prototype.umod = function umod(num) {
                    return this.divmod(num, 'mod', true).mod;
                };


                BN.prototype.divRound = function divRound(num) {
                    var dm = this.divmod(num);


                    if (dm.mod.isZero()) return dm.div;

                    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

                    var half = num.ushrn(1);
                    var r2 = num.andln(1);
                    var cmp = mod.cmp(half);


                    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;


                    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
                };

                BN.prototype.modn = function modn(num) {
                    assert(num <= 0x3ffffff);
                    var p = (1 << 26) % num;

                    var acc = 0;
                    for (var i = this.length - 1; i >= 0; i--) {
                        acc = (p * acc + (this.words[i] | 0)) % num;
                    }

                    return acc;
                };


                BN.prototype.idivn = function idivn(num) {
                    assert(num <= 0x3ffffff);

                    var carry = 0;
                    for (var i = this.length - 1; i >= 0; i--) {
                        var w = (this.words[i] | 0) + carry * 0x4000000;
                        this.words[i] = w / num | 0;
                        carry = w % num;
                    }

                    return this.strip();
                };

                BN.prototype.divn = function divn(num) {
                    return this.clone().idivn(num);
                };

                BN.prototype.egcd = function egcd(p) {
                    assert(p.negative === 0);
                    assert(!p.isZero());

                    var x = this;
                    var y = p.clone();

                    if (x.negative !== 0) {
                        x = x.umod(p);
                    } else {
                        x = x.clone();
                    }


                    var A = new BN(1);
                    var B = new BN(0);


                    var C = new BN(0);
                    var D = new BN(1);

                    var g = 0;

                    while (x.isEven() && y.isEven()) {
                        x.iushrn(1);
                        y.iushrn(1);
                        ++g;
                    }

                    var yp = y.clone();
                    var xp = x.clone();

                    while (!x.isZero()) {
                        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1) {}
                        if (i > 0) {
                            x.iushrn(i);
                            while (i-- > 0) {
                                if (A.isOdd() || B.isOdd()) {
                                    A.iadd(yp);
                                    B.isub(xp);
                                }

                                A.iushrn(1);
                                B.iushrn(1);
                            }
                        }

                        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) {}
                        if (j > 0) {
                            y.iushrn(j);
                            while (j-- > 0) {
                                if (C.isOdd() || D.isOdd()) {
                                    C.iadd(yp);
                                    D.isub(xp);
                                }

                                C.iushrn(1);
                                D.iushrn(1);
                            }
                        }

                        if (x.cmp(y) >= 0) {
                            x.isub(y);
                            A.isub(C);
                            B.isub(D);
                        } else {
                            y.isub(x);
                            C.isub(A);
                            D.isub(B);
                        }
                    }

                    return {
                        a: C,
                        b: D,
                        gcd: y.iushln(g) };

                };




                BN.prototype._invmp = function _invmp(p) {
                    assert(p.negative === 0);
                    assert(!p.isZero());

                    var a = this;
                    var b = p.clone();

                    if (a.negative !== 0) {
                        a = a.umod(p);
                    } else {
                        a = a.clone();
                    }

                    var x1 = new BN(1);
                    var x2 = new BN(0);

                    var delta = b.clone();

                    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
                        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1) {}
                        if (i > 0) {
                            a.iushrn(i);
                            while (i-- > 0) {
                                if (x1.isOdd()) {
                                    x1.iadd(delta);
                                }

                                x1.iushrn(1);
                            }
                        }

                        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1) {}
                        if (j > 0) {
                            b.iushrn(j);
                            while (j-- > 0) {
                                if (x2.isOdd()) {
                                    x2.iadd(delta);
                                }

                                x2.iushrn(1);
                            }
                        }

                        if (a.cmp(b) >= 0) {
                            a.isub(b);
                            x1.isub(x2);
                        } else {
                            b.isub(a);
                            x2.isub(x1);
                        }
                    }

                    var res;
                    if (a.cmpn(1) === 0) {
                        res = x1;
                    } else {
                        res = x2;
                    }

                    if (res.cmpn(0) < 0) {
                        res.iadd(p);
                    }

                    return res;
                };

                BN.prototype.gcd = function gcd(num) {
                    if (this.isZero()) return num.abs();
                    if (num.isZero()) return this.abs();

                    var a = this.clone();
                    var b = num.clone();
                    a.negative = 0;
                    b.negative = 0;


                    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
                        a.iushrn(1);
                        b.iushrn(1);
                    }

                    do {
                        while (a.isEven()) {
                            a.iushrn(1);
                        }
                        while (b.isEven()) {
                            b.iushrn(1);
                        }

                        var r = a.cmp(b);
                        if (r < 0) {

                            var t = a;
                            a = b;
                            b = t;
                        } else if (r === 0 || b.cmpn(1) === 0) {
                            break;
                        }

                        a.isub(b);
                    } while (true);

                    return b.iushln(shift);
                };


                BN.prototype.invm = function invm(num) {
                    return this.egcd(num).a.umod(num);
                };

                BN.prototype.isEven = function isEven() {
                    return (this.words[0] & 1) === 0;
                };

                BN.prototype.isOdd = function isOdd() {
                    return (this.words[0] & 1) === 1;
                };


                BN.prototype.andln = function andln(num) {
                    return this.words[0] & num;
                };


                BN.prototype.bincn = function bincn(bit) {
                    assert(typeof bit === 'number');
                    var r = bit % 26;
                    var s = (bit - r) / 26;
                    var q = 1 << r;


                    if (this.length <= s) {
                        this._expand(s + 1);
                        this.words[s] |= q;
                        return this;
                    }


                    var carry = q;
                    for (var i = s; carry !== 0 && i < this.length; i++) {
                        var w = this.words[i] | 0;
                        w += carry;
                        carry = w >>> 26;
                        w &= 0x3ffffff;
                        this.words[i] = w;
                    }
                    if (carry !== 0) {
                        this.words[i] = carry;
                        this.length++;
                    }
                    return this;
                };

                BN.prototype.isZero = function isZero() {
                    return this.length === 1 && this.words[0] === 0;
                };

                BN.prototype.cmpn = function cmpn(num) {
                    var negative = num < 0;

                    if (this.negative !== 0 && !negative) return -1;
                    if (this.negative === 0 && negative) return 1;

                    this.strip();

                    var res;
                    if (this.length > 1) {
                        res = 1;
                    } else {
                        if (negative) {
                            num = -num;
                        }

                        assert(num <= 0x3ffffff, 'Number is too big');

                        var w = this.words[0] | 0;
                        res = w === num ? 0 : w < num ? -1 : 1;
                    }
                    if (this.negative !== 0) return -res | 0;
                    return res;
                };





                BN.prototype.cmp = function cmp(num) {
                    if (this.negative !== 0 && num.negative === 0) return -1;
                    if (this.negative === 0 && num.negative !== 0) return 1;

                    var res = this.ucmp(num);
                    if (this.negative !== 0) return -res | 0;
                    return res;
                };


                BN.prototype.ucmp = function ucmp(num) {

                    if (this.length > num.length) return 1;
                    if (this.length < num.length) return -1;

                    var res = 0;
                    for (var i = this.length - 1; i >= 0; i--) {
                        var a = this.words[i] | 0;
                        var b = num.words[i] | 0;

                        if (a === b) continue;
                        if (a < b) {
                            res = -1;
                        } else if (a > b) {
                            res = 1;
                        }
                        break;
                    }
                    return res;
                };

                BN.prototype.gtn = function gtn(num) {
                    return this.cmpn(num) === 1;
                };

                BN.prototype.gt = function gt(num) {
                    return this.cmp(num) === 1;
                };

                BN.prototype.gten = function gten(num) {
                    return this.cmpn(num) >= 0;
                };

                BN.prototype.gte = function gte(num) {
                    return this.cmp(num) >= 0;
                };

                BN.prototype.ltn = function ltn(num) {
                    return this.cmpn(num) === -1;
                };

                BN.prototype.lt = function lt(num) {
                    return this.cmp(num) === -1;
                };

                BN.prototype.lten = function lten(num) {
                    return this.cmpn(num) <= 0;
                };

                BN.prototype.lte = function lte(num) {
                    return this.cmp(num) <= 0;
                };

                BN.prototype.eqn = function eqn(num) {
                    return this.cmpn(num) === 0;
                };

                BN.prototype.eq = function eq(num) {
                    return this.cmp(num) === 0;
                };





                BN.red = function red(num) {
                    return new Red(num);
                };

                BN.prototype.toRed = function toRed(ctx) {
                    assert(!this.red, 'Already a number in reduction context');
                    assert(this.negative === 0, 'red works only with positives');
                    return ctx.convertTo(this)._forceRed(ctx);
                };

                BN.prototype.fromRed = function fromRed() {
                    assert(this.red, 'fromRed works only with numbers in reduction context');
                    return this.red.convertFrom(this);
                };

                BN.prototype._forceRed = function _forceRed(ctx) {
                    this.red = ctx;
                    return this;
                };

                BN.prototype.forceRed = function forceRed(ctx) {
                    assert(!this.red, 'Already a number in reduction context');
                    return this._forceRed(ctx);
                };

                BN.prototype.redAdd = function redAdd(num) {
                    assert(this.red, 'redAdd works only with red numbers');
                    return this.red.add(this, num);
                };

                BN.prototype.redIAdd = function redIAdd(num) {
                    assert(this.red, 'redIAdd works only with red numbers');
                    return this.red.iadd(this, num);
                };

                BN.prototype.redSub = function redSub(num) {
                    assert(this.red, 'redSub works only with red numbers');
                    return this.red.sub(this, num);
                };

                BN.prototype.redISub = function redISub(num) {
                    assert(this.red, 'redISub works only with red numbers');
                    return this.red.isub(this, num);
                };

                BN.prototype.redShl = function redShl(num) {
                    assert(this.red, 'redShl works only with red numbers');
                    return this.red.shl(this, num);
                };

                BN.prototype.redMul = function redMul(num) {
                    assert(this.red, 'redMul works only with red numbers');
                    this.red._verify2(this, num);
                    return this.red.mul(this, num);
                };

                BN.prototype.redIMul = function redIMul(num) {
                    assert(this.red, 'redMul works only with red numbers');
                    this.red._verify2(this, num);
                    return this.red.imul(this, num);
                };

                BN.prototype.redSqr = function redSqr() {
                    assert(this.red, 'redSqr works only with red numbers');
                    this.red._verify1(this);
                    return this.red.sqr(this);
                };

                BN.prototype.redISqr = function redISqr() {
                    assert(this.red, 'redISqr works only with red numbers');
                    this.red._verify1(this);
                    return this.red.isqr(this);
                };


                BN.prototype.redSqrt = function redSqrt() {
                    assert(this.red, 'redSqrt works only with red numbers');
                    this.red._verify1(this);
                    return this.red.sqrt(this);
                };

                BN.prototype.redInvm = function redInvm() {
                    assert(this.red, 'redInvm works only with red numbers');
                    this.red._verify1(this);
                    return this.red.invm(this);
                };


                BN.prototype.redNeg = function redNeg() {
                    assert(this.red, 'redNeg works only with red numbers');
                    this.red._verify1(this);
                    return this.red.neg(this);
                };

                BN.prototype.redPow = function redPow(num) {
                    assert(this.red && !num.red, 'redPow(normalNum)');
                    this.red._verify1(this);
                    return this.red.pow(this, num);
                };


                var primes = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null };



                function MPrime(name, p) {

                    this.name = name;
                    this.p = new BN(p, 16);
                    this.n = this.p.bitLength();
                    this.k = new BN(1).iushln(this.n).isub(this.p);

                    this.tmp = this._tmp();
                }

                MPrime.prototype._tmp = function _tmp() {
                    var tmp = new BN(null);
                    tmp.words = new Array(Math.ceil(this.n / 13));
                    return tmp;
                };

                MPrime.prototype.ireduce = function ireduce(num) {


                    var r = num;
                    var rlen;

                    do {
                        this.split(r, this.tmp);
                        r = this.imulK(r);
                        r = r.iadd(this.tmp);
                        rlen = r.bitLength();
                    } while (rlen > this.n);

                    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
                    if (cmp === 0) {
                        r.words[0] = 0;
                        r.length = 1;
                    } else if (cmp > 0) {
                        r.isub(this.p);
                    } else {
                        r.strip();
                    }

                    return r;
                };

                MPrime.prototype.split = function split(input, out) {
                    input.iushrn(this.n, 0, out);
                };

                MPrime.prototype.imulK = function imulK(num) {
                    return num.imul(this.k);
                };

                function K256() {
                    MPrime.call(
                    this,
                    'k256',
                    'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
                }
                inherits(K256, MPrime);

                K256.prototype.split = function split(input, output) {

                    var mask = 0x3fffff;

                    var outLen = Math.min(input.length, 9);
                    for (var i = 0; i < outLen; i++) {
                        output.words[i] = input.words[i];
                    }
                    output.length = outLen;

                    if (input.length <= 9) {
                        input.words[0] = 0;
                        input.length = 1;
                        return;
                    }


                    var prev = input.words[9];
                    output.words[output.length++] = prev & mask;

                    for (i = 10; i < input.length; i++) {
                        var next = input.words[i] | 0;
                        input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
                        prev = next;
                    }
                    prev >>>= 22;
                    input.words[i - 10] = prev;
                    if (prev === 0 && input.length > 10) {
                        input.length -= 10;
                    } else {
                        input.length -= 9;
                    }
                };

                K256.prototype.imulK = function imulK(num) {

                    num.words[num.length] = 0;
                    num.words[num.length + 1] = 0;
                    num.length += 2;


                    var lo = 0;
                    for (var i = 0; i < num.length; i++) {
                        var w = num.words[i] | 0;
                        lo += w * 0x3d1;
                        num.words[i] = lo & 0x3ffffff;
                        lo = w * 0x40 + (lo / 0x4000000 | 0);
                    }


                    if (num.words[num.length - 1] === 0) {
                        num.length--;
                        if (num.words[num.length - 1] === 0) {
                            num.length--;
                        }
                    }
                    return num;
                };

                function P224() {
                    MPrime.call(
                    this,
                    'p224',
                    'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
                }
                inherits(P224, MPrime);

                function P192() {
                    MPrime.call(
                    this,
                    'p192',
                    'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
                }
                inherits(P192, MPrime);

                function P25519() {

                    MPrime.call(
                    this,
                    '25519',
                    '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
                }
                inherits(P25519, MPrime);

                P25519.prototype.imulK = function imulK(num) {

                    var carry = 0;
                    for (var i = 0; i < num.length; i++) {
                        var hi = (num.words[i] | 0) * 0x13 + carry;
                        var lo = hi & 0x3ffffff;
                        hi >>>= 26;

                        num.words[i] = lo;
                        carry = hi;
                    }
                    if (carry !== 0) {
                        num.words[num.length++] = carry;
                    }
                    return num;
                };


                BN._prime = function prime(name) {

                    if (primes[name]) return primes[name];

                    var prime;
                    if (name === 'k256') {
                        prime = new K256();
                    } else if (name === 'p224') {
                        prime = new P224();
                    } else if (name === 'p192') {
                        prime = new P192();
                    } else if (name === 'p25519') {
                        prime = new P25519();
                    } else {
                        throw new Error('Unknown prime ' + name);
                    }
                    primes[name] = prime;

                    return prime;
                };




                function Red(m) {
                    if (typeof m === 'string') {
                        var prime = BN._prime(m);
                        this.m = prime.p;
                        this.prime = prime;
                    } else {
                        assert(m.gtn(1), 'modulus must be greater than 1');
                        this.m = m;
                        this.prime = null;
                    }
                }

                Red.prototype._verify1 = function _verify1(a) {
                    assert(a.negative === 0, 'red works only with positives');
                    assert(a.red, 'red works only with red numbers');
                };

                Red.prototype._verify2 = function _verify2(a, b) {
                    assert((a.negative | b.negative) === 0, 'red works only with positives');
                    assert(a.red && a.red === b.red,
                    'red works only with red numbers');
                };

                Red.prototype.imod = function imod(a) {
                    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
                    return a.umod(this.m)._forceRed(this);
                };

                Red.prototype.neg = function neg(a) {
                    if (a.isZero()) {
                        return a.clone();
                    }

                    return this.m.sub(a)._forceRed(this);
                };

                Red.prototype.add = function add(a, b) {
                    this._verify2(a, b);

                    var res = a.add(b);
                    if (res.cmp(this.m) >= 0) {
                        res.isub(this.m);
                    }
                    return res._forceRed(this);
                };

                Red.prototype.iadd = function iadd(a, b) {
                    this._verify2(a, b);

                    var res = a.iadd(b);
                    if (res.cmp(this.m) >= 0) {
                        res.isub(this.m);
                    }
                    return res;
                };

                Red.prototype.sub = function sub(a, b) {
                    this._verify2(a, b);

                    var res = a.sub(b);
                    if (res.cmpn(0) < 0) {
                        res.iadd(this.m);
                    }
                    return res._forceRed(this);
                };

                Red.prototype.isub = function isub(a, b) {
                    this._verify2(a, b);

                    var res = a.isub(b);
                    if (res.cmpn(0) < 0) {
                        res.iadd(this.m);
                    }
                    return res;
                };

                Red.prototype.shl = function shl(a, num) {
                    this._verify1(a);
                    return this.imod(a.ushln(num));
                };

                Red.prototype.imul = function imul(a, b) {
                    this._verify2(a, b);
                    return this.imod(a.imul(b));
                };

                Red.prototype.mul = function mul(a, b) {
                    this._verify2(a, b);
                    return this.imod(a.mul(b));
                };

                Red.prototype.isqr = function isqr(a) {
                    return this.imul(a, a.clone());
                };

                Red.prototype.sqr = function sqr(a) {
                    return this.mul(a, a);
                };

                Red.prototype.sqrt = function sqrt(a) {
                    if (a.isZero()) return a.clone();

                    var mod3 = this.m.andln(3);
                    assert(mod3 % 2 === 1);


                    if (mod3 === 3) {
                        var pow = this.m.add(new BN(1)).iushrn(2);
                        return this.pow(a, pow);
                    }




                    var q = this.m.subn(1);
                    var s = 0;
                    while (!q.isZero() && q.andln(1) === 0) {
                        s++;
                        q.iushrn(1);
                    }
                    assert(!q.isZero());

                    var one = new BN(1).toRed(this);
                    var nOne = one.redNeg();



                    var lpow = this.m.subn(1).iushrn(1);
                    var z = this.m.bitLength();
                    z = new BN(2 * z * z).toRed(this);

                    while (this.pow(z, lpow).cmp(nOne) !== 0) {
                        z.redIAdd(nOne);
                    }

                    var c = this.pow(z, q);
                    var r = this.pow(a, q.addn(1).iushrn(1));
                    var t = this.pow(a, q);
                    var m = s;
                    while (t.cmp(one) !== 0) {
                        var tmp = t;
                        for (var i = 0; tmp.cmp(one) !== 0; i++) {
                            tmp = tmp.redSqr();
                        }
                        assert(i < m);
                        var b = this.pow(c, new BN(1).iushln(m - i - 1));

                        r = r.redMul(b);
                        c = b.redSqr();
                        t = t.redMul(c);
                        m = i;
                    }

                    return r;
                };

                Red.prototype.invm = function invm(a) {
                    var inv = a._invmp(this.m);
                    if (inv.negative !== 0) {
                        inv.negative = 0;
                        return this.imod(inv).redNeg();
                    } else {
                        return this.imod(inv);
                    }
                };

                Red.prototype.pow = function pow(a, num) {
                    if (num.isZero()) return new BN(1);
                    if (num.cmpn(1) === 0) return a.clone();

                    var windowSize = 4;
                    var wnd = new Array(1 << windowSize);
                    wnd[0] = new BN(1).toRed(this);
                    wnd[1] = a;
                    for (var i = 2; i < wnd.length; i++) {
                        wnd[i] = this.mul(wnd[i - 1], a);
                    }

                    var res = wnd[0];
                    var current = 0;
                    var currentLen = 0;
                    var start = num.bitLength() % 26;
                    if (start === 0) {
                        start = 26;
                    }

                    for (i = num.length - 1; i >= 0; i--) {
                        var word = num.words[i];
                        for (var j = start - 1; j >= 0; j--) {
                            var bit = word >> j & 1;
                            if (res !== wnd[0]) {
                                res = this.sqr(res);
                            }

                            if (bit === 0 && current === 0) {
                                currentLen = 0;
                                continue;
                            }

                            current <<= 1;
                            current |= bit;
                            currentLen++;
                            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

                            res = this.mul(res, wnd[current]);
                            currentLen = 0;
                            current = 0;
                        }
                        start = 26;
                    }

                    return res;
                };

                Red.prototype.convertTo = function convertTo(num) {
                    var r = num.umod(this.m);

                    return r === num ? r.clone() : r;
                };

                Red.prototype.convertFrom = function convertFrom(num) {
                    var res = num.clone();
                    res.red = null;
                    return res;
                };





                BN.mont = function mont(num) {
                    return new Mont(num);
                };

                function Mont(m) {
                    Red.call(this, m);

                    this.shift = this.m.bitLength();
                    if (this.shift % 26 !== 0) {
                        this.shift += 26 - this.shift % 26;
                    }

                    this.r = new BN(1).iushln(this.shift);
                    this.r2 = this.imod(this.r.sqr());
                    this.rinv = this.r._invmp(this.m);

                    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
                    this.minv = this.minv.umod(this.r);
                    this.minv = this.r.sub(this.minv);
                }
                inherits(Mont, Red);

                Mont.prototype.convertTo = function convertTo(num) {
                    return this.imod(num.ushln(this.shift));
                };

                Mont.prototype.convertFrom = function convertFrom(num) {
                    var r = this.imod(num.mul(this.rinv));
                    r.red = null;
                    return r;
                };

                Mont.prototype.imul = function imul(a, b) {
                    if (a.isZero() || b.isZero()) {
                        a.words[0] = 0;
                        a.length = 1;
                        return a;
                    }

                    var t = a.imul(b);
                    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
                    var u = t.isub(c).iushrn(this.shift);
                    var res = u;

                    if (u.cmp(this.m) >= 0) {
                        res = u.isub(this.m);
                    } else if (u.cmpn(0) < 0) {
                        res = u.iadd(this.m);
                    }

                    return res._forceRed(this);
                };

                Mont.prototype.mul = function mul(a, b) {
                    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

                    var t = a.mul(b);
                    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
                    var u = t.isub(c).iushrn(this.shift);
                    var res = u;
                    if (u.cmp(this.m) >= 0) {
                        res = u.isub(this.m);
                    } else if (u.cmpn(0) < 0) {
                        res = u.iadd(this.m);
                    }

                    return res._forceRed(this);
                };

                Mont.prototype.invm = function invm(a) {

                    var res = this.imod(a._invmp(this.m).mul(this.r2));
                    return res._forceRed(this);
                };
            })(typeof module === 'undefined' || module, this);

        }, {}], 38: [function (require, module, exports) {
























            var HEX_CHARS = '0123456789abcdef'.split('');
            var KECCAK_PADDING = [1, 256, 65536, 16777216];
            var SHIFT = [0, 8, 16, 24];
            var RC = [
            1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
            0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
            2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
            2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
            2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];

            var Keccak = function Keccak(bits) {return {
                    blocks: [],
                    reset: true,
                    block: 0,
                    start: 0,
                    blockCount: 1600 - (bits << 1) >> 5,
                    outputBlocks: bits >> 5,
                    s: function (s) {return [].concat(s, s, s, s, s);}([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) };};


            var update = function update(state, message) {
                var length = message.length,
                blocks = state.blocks,
                byteCount = state.blockCount << 2,
                blockCount = state.blockCount,
                outputBlocks = state.outputBlocks,
                s = state.s,
                index = 0,
                i,
                code;


                while (index < length) {
                    if (state.reset) {
                        state.reset = false;
                        blocks[0] = state.block;
                        for (i = 1; i < blockCount + 1; ++i) {
                            blocks[i] = 0;
                        }
                    }
                    if (typeof message !== "string") {
                        for (i = state.start; index < length && i < byteCount; ++index) {
                            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                        }
                    } else {
                        for (i = state.start; index < length && i < byteCount; ++index) {
                            code = message.charCodeAt(index);
                            if (code < 0x80) {
                                blocks[i >> 2] |= code << SHIFT[i++ & 3];
                            } else if (code < 0x800) {
                                blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
                                blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                            } else if (code < 0xd800 || code >= 0xe000) {
                                blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
                                blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                                blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                            } else {
                                code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                                blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
                                blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
                                blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                                blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                            }
                        }
                    }
                    state.lastByteIndex = i;
                    if (i >= byteCount) {
                        state.start = i - byteCount;
                        state.block = blocks[blockCount];
                        for (i = 0; i < blockCount; ++i) {
                            s[i] ^= blocks[i];
                        }
                        f(s);
                        state.reset = true;
                    } else {
                        state.start = i;
                    }
                }


                i = state.lastByteIndex;
                blocks[i >> 2] |= KECCAK_PADDING[i & 3];
                if (state.lastByteIndex === byteCount) {
                    blocks[0] = blocks[blockCount];
                    for (i = 1; i < blockCount + 1; ++i) {
                        blocks[i] = 0;
                    }
                }
                blocks[blockCount - 1] |= 0x80000000;
                for (i = 0; i < blockCount; ++i) {
                    s[i] ^= blocks[i];
                }
                f(s);


                var hex = '',i = 0,j = 0,block;
                while (j < outputBlocks) {
                    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                        block = s[i];
                        hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] +
                        HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] +
                        HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] +
                        HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
                    }
                    if (j % blockCount === 0) {
                        f(s);
                        i = 0;
                    }
                }
                return "0x" + hex;
            };

            var f = function f(s) {
                var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
                b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
                b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
                b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;

                for (n = 0; n < 48; n += 2) {
                    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
                    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
                    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
                    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
                    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
                    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
                    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
                    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
                    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
                    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

                    h = c8 ^ (c2 << 1 | c3 >>> 31);
                    l = c9 ^ (c3 << 1 | c2 >>> 31);
                    s[0] ^= h;
                    s[1] ^= l;
                    s[10] ^= h;
                    s[11] ^= l;
                    s[20] ^= h;
                    s[21] ^= l;
                    s[30] ^= h;
                    s[31] ^= l;
                    s[40] ^= h;
                    s[41] ^= l;
                    h = c0 ^ (c4 << 1 | c5 >>> 31);
                    l = c1 ^ (c5 << 1 | c4 >>> 31);
                    s[2] ^= h;
                    s[3] ^= l;
                    s[12] ^= h;
                    s[13] ^= l;
                    s[22] ^= h;
                    s[23] ^= l;
                    s[32] ^= h;
                    s[33] ^= l;
                    s[42] ^= h;
                    s[43] ^= l;
                    h = c2 ^ (c6 << 1 | c7 >>> 31);
                    l = c3 ^ (c7 << 1 | c6 >>> 31);
                    s[4] ^= h;
                    s[5] ^= l;
                    s[14] ^= h;
                    s[15] ^= l;
                    s[24] ^= h;
                    s[25] ^= l;
                    s[34] ^= h;
                    s[35] ^= l;
                    s[44] ^= h;
                    s[45] ^= l;
                    h = c4 ^ (c8 << 1 | c9 >>> 31);
                    l = c5 ^ (c9 << 1 | c8 >>> 31);
                    s[6] ^= h;
                    s[7] ^= l;
                    s[16] ^= h;
                    s[17] ^= l;
                    s[26] ^= h;
                    s[27] ^= l;
                    s[36] ^= h;
                    s[37] ^= l;
                    s[46] ^= h;
                    s[47] ^= l;
                    h = c6 ^ (c0 << 1 | c1 >>> 31);
                    l = c7 ^ (c1 << 1 | c0 >>> 31);
                    s[8] ^= h;
                    s[9] ^= l;
                    s[18] ^= h;
                    s[19] ^= l;
                    s[28] ^= h;
                    s[29] ^= l;
                    s[38] ^= h;
                    s[39] ^= l;
                    s[48] ^= h;
                    s[49] ^= l;

                    b0 = s[0];
                    b1 = s[1];
                    b32 = s[11] << 4 | s[10] >>> 28;
                    b33 = s[10] << 4 | s[11] >>> 28;
                    b14 = s[20] << 3 | s[21] >>> 29;
                    b15 = s[21] << 3 | s[20] >>> 29;
                    b46 = s[31] << 9 | s[30] >>> 23;
                    b47 = s[30] << 9 | s[31] >>> 23;
                    b28 = s[40] << 18 | s[41] >>> 14;
                    b29 = s[41] << 18 | s[40] >>> 14;
                    b20 = s[2] << 1 | s[3] >>> 31;
                    b21 = s[3] << 1 | s[2] >>> 31;
                    b2 = s[13] << 12 | s[12] >>> 20;
                    b3 = s[12] << 12 | s[13] >>> 20;
                    b34 = s[22] << 10 | s[23] >>> 22;
                    b35 = s[23] << 10 | s[22] >>> 22;
                    b16 = s[33] << 13 | s[32] >>> 19;
                    b17 = s[32] << 13 | s[33] >>> 19;
                    b48 = s[42] << 2 | s[43] >>> 30;
                    b49 = s[43] << 2 | s[42] >>> 30;
                    b40 = s[5] << 30 | s[4] >>> 2;
                    b41 = s[4] << 30 | s[5] >>> 2;
                    b22 = s[14] << 6 | s[15] >>> 26;
                    b23 = s[15] << 6 | s[14] >>> 26;
                    b4 = s[25] << 11 | s[24] >>> 21;
                    b5 = s[24] << 11 | s[25] >>> 21;
                    b36 = s[34] << 15 | s[35] >>> 17;
                    b37 = s[35] << 15 | s[34] >>> 17;
                    b18 = s[45] << 29 | s[44] >>> 3;
                    b19 = s[44] << 29 | s[45] >>> 3;
                    b10 = s[6] << 28 | s[7] >>> 4;
                    b11 = s[7] << 28 | s[6] >>> 4;
                    b42 = s[17] << 23 | s[16] >>> 9;
                    b43 = s[16] << 23 | s[17] >>> 9;
                    b24 = s[26] << 25 | s[27] >>> 7;
                    b25 = s[27] << 25 | s[26] >>> 7;
                    b6 = s[36] << 21 | s[37] >>> 11;
                    b7 = s[37] << 21 | s[36] >>> 11;
                    b38 = s[47] << 24 | s[46] >>> 8;
                    b39 = s[46] << 24 | s[47] >>> 8;
                    b30 = s[8] << 27 | s[9] >>> 5;
                    b31 = s[9] << 27 | s[8] >>> 5;
                    b12 = s[18] << 20 | s[19] >>> 12;
                    b13 = s[19] << 20 | s[18] >>> 12;
                    b44 = s[29] << 7 | s[28] >>> 25;
                    b45 = s[28] << 7 | s[29] >>> 25;
                    b26 = s[38] << 8 | s[39] >>> 24;
                    b27 = s[39] << 8 | s[38] >>> 24;
                    b8 = s[48] << 14 | s[49] >>> 18;
                    b9 = s[49] << 14 | s[48] >>> 18;

                    s[0] = b0 ^ ~b2 & b4;
                    s[1] = b1 ^ ~b3 & b5;
                    s[10] = b10 ^ ~b12 & b14;
                    s[11] = b11 ^ ~b13 & b15;
                    s[20] = b20 ^ ~b22 & b24;
                    s[21] = b21 ^ ~b23 & b25;
                    s[30] = b30 ^ ~b32 & b34;
                    s[31] = b31 ^ ~b33 & b35;
                    s[40] = b40 ^ ~b42 & b44;
                    s[41] = b41 ^ ~b43 & b45;
                    s[2] = b2 ^ ~b4 & b6;
                    s[3] = b3 ^ ~b5 & b7;
                    s[12] = b12 ^ ~b14 & b16;
                    s[13] = b13 ^ ~b15 & b17;
                    s[22] = b22 ^ ~b24 & b26;
                    s[23] = b23 ^ ~b25 & b27;
                    s[32] = b32 ^ ~b34 & b36;
                    s[33] = b33 ^ ~b35 & b37;
                    s[42] = b42 ^ ~b44 & b46;
                    s[43] = b43 ^ ~b45 & b47;
                    s[4] = b4 ^ ~b6 & b8;
                    s[5] = b5 ^ ~b7 & b9;
                    s[14] = b14 ^ ~b16 & b18;
                    s[15] = b15 ^ ~b17 & b19;
                    s[24] = b24 ^ ~b26 & b28;
                    s[25] = b25 ^ ~b27 & b29;
                    s[34] = b34 ^ ~b36 & b38;
                    s[35] = b35 ^ ~b37 & b39;
                    s[44] = b44 ^ ~b46 & b48;
                    s[45] = b45 ^ ~b47 & b49;
                    s[6] = b6 ^ ~b8 & b0;
                    s[7] = b7 ^ ~b9 & b1;
                    s[16] = b16 ^ ~b18 & b10;
                    s[17] = b17 ^ ~b19 & b11;
                    s[26] = b26 ^ ~b28 & b20;
                    s[27] = b27 ^ ~b29 & b21;
                    s[36] = b36 ^ ~b38 & b30;
                    s[37] = b37 ^ ~b39 & b31;
                    s[46] = b46 ^ ~b48 & b40;
                    s[47] = b47 ^ ~b49 & b41;
                    s[8] = b8 ^ ~b0 & b2;
                    s[9] = b9 ^ ~b1 & b3;
                    s[18] = b18 ^ ~b10 & b12;
                    s[19] = b19 ^ ~b11 & b13;
                    s[28] = b28 ^ ~b20 & b22;
                    s[29] = b29 ^ ~b21 & b23;
                    s[38] = b38 ^ ~b30 & b32;
                    s[39] = b39 ^ ~b31 & b33;
                    s[48] = b48 ^ ~b40 & b42;
                    s[49] = b49 ^ ~b41 & b43;

                    s[0] ^= RC[n];
                    s[1] ^= RC[n + 1];
                }
            };

            var keccak = function keccak(bits) {return function (str) {
                    var msg;
                    if (str.slice(0, 2) === "0x") {
                        msg = [];
                        for (var i = 2, l = str.length; i < l; i += 2) {
                            msg.push(parseInt(str.slice(i, i + 2), 16));}
                    } else {
                        msg = str;
                    }
                    return update(Keccak(bits, bits), msg);
                };};

            module.exports = {
                keccak256: keccak(256),
                keccak512: keccak(512),
                keccak256s: keccak(256),
                keccak512s: keccak(512) };


        }, {}], 39: [function (require, module, exports) {
            'use strict';

            var BN = require("bn.js");
            var numberToBN = require("number-to-bn");

            var zero = new BN(0);
            var negative1 = new BN(-1);


            var unitMap = {
                'noether': '0',
                'wei': '1',
                'kwei': '1000',
                'Kwei': '1000',
                'babbage': '1000',
                'femtoether': '1000',
                'mwei': '1000000',
                'Mwei': '1000000',
                'lovelace': '1000000',
                'picoether': '1000000',
                'gwei': '1000000000',
                'Gwei': '1000000000',
                'shannon': '1000000000',
                'nanoether': '1000000000',
                'nano': '1000000000',
                'szabo': '1000000000000',
                'microether': '1000000000000',
                'micro': '1000000000000',
                'finney': '1000000000000000',
                'milliether': '1000000000000000',
                'milli': '1000000000000000',
                'ether': '1000000000000000000',
                'kether': '1000000000000000000000',
                'grand': '1000000000000000000000',
                'mether': '1000000000000000000000000',
                'gether': '1000000000000000000000000000',
                'tether': '1000000000000000000000000000000' };









            function getValueOfUnit(unitInput) {
                var unit = unitInput ? unitInput.toLowerCase() : 'ether';
                var unitValue = unitMap[unit];

                if (typeof unitValue !== 'string') {
                    throw new Error('[ethjs-unit] the unit provided ' + unitInput + ' doesn\'t exists, please use the one of the following units ' + JSON.stringify(unitMap, null, 2));
                }

                return new BN(unitValue, 10);
            }

            function numberToString(arg) {
                if (typeof arg === 'string') {
                    if (!arg.match(/^-?[0-9.]+$/)) {
                        throw new Error('while converting number to string, invalid number value \'' + arg + '\', should be a number matching (^-?[0-9.]+).');
                    }
                    return arg;
                } else if (typeof arg === 'number') {
                    return String(arg);
                } else if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
                    if (arg.toPrecision) {
                        return String(arg.toPrecision());
                    } else {

                        return arg.toString(10);
                    }
                }
                throw new Error('while converting number to string, invalid number value \'' + arg + '\' type ' + (typeof arg === "undefined" ? "undefined" : _typeof(arg)) + '.');
            }

            function fromWei(weiInput, unit, optionsInput) {
                var wei = numberToBN(weiInput);
                var negative = wei.lt(zero);
                var base = getValueOfUnit(unit);
                var baseLength = unitMap[unit].length - 1 || 1;
                var options = optionsInput || {};

                if (negative) {
                    wei = wei.mul(negative1);
                }

                var fraction = wei.mod(base).toString(10);

                while (fraction.length < baseLength) {
                    fraction = '0' + fraction;
                }

                if (!options.pad) {
                    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
                }

                var whole = wei.div(base).toString(10);

                if (options.commify) {
                    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }

                var value = '' + whole + (fraction == '0' ? '' : '.' + fraction);

                if (negative) {
                    value = '-' + value;
                }

                return value;
            }

            function toWei(etherInput, unit) {
                var ether = numberToString(etherInput);
                var base = getValueOfUnit(unit);
                var baseLength = unitMap[unit].length - 1 || 1;


                var negative = ether.substring(0, 1) === '-';
                if (negative) {
                    ether = ether.substring(1);
                }

                if (ether === '.') {
                    throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei, invalid value');
                }


                var comps = ether.split('.');
                if (comps.length > 2) {
                    throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei,  too many decimal points');
                }

                var whole = comps[0],
                fraction = comps[1];

                if (!whole) {
                    whole = '0';
                }
                if (!fraction) {
                    fraction = '0';
                }
                if (fraction.length > baseLength) {
                    throw new Error('[ethjs-unit] while converting number ' + etherInput + ' to wei, too many decimal places');
                }

                while (fraction.length < baseLength) {
                    fraction += '0';
                }

                whole = new BN(whole);
                fraction = new BN(fraction);
                var wei = whole.mul(base).add(fraction);

                if (negative) {
                    wei = wei.mul(negative1);
                }

                return new BN(wei.toString(10), 10);
            }

            module.exports = {
                unitMap: unitMap,
                numberToString: numberToString,
                getValueOfUnit: getValueOfUnit,
                fromWei: fromWei,
                toWei: toWei };

        }, { "bn.js": 37, "number-to-bn": 41 }], 40: [function (require, module, exports) {






            module.exports = function isHexPrefixed(str) {
                if (typeof str !== 'string') {
                    throw new Error("[is-hex-prefixed] value must be type 'string', is currently type " + (typeof str === "undefined" ? "undefined" : _typeof(str)) + ", while checking isHexPrefixed.");
                }

                return str.slice(0, 2) === '0x';
            };

        }, {}], 41: [function (require, module, exports) {
            var BN = require("bn.js");
            var stripHexPrefix = require("strip-hex-prefix");







            module.exports = function numberToBN(arg) {
                if (typeof arg === 'string' || typeof arg === 'number') {
                    var multiplier = new BN(1);
                    var formattedString = String(arg).toLowerCase().trim();
                    var isHexPrefixed = formattedString.substr(0, 2) === '0x' || formattedString.substr(0, 3) === '-0x';
                    var stringArg = stripHexPrefix(formattedString);
                    if (stringArg.substr(0, 1) === '-') {
                        stringArg = stripHexPrefix(stringArg.slice(1));
                        multiplier = new BN(-1, 10);
                    }
                    stringArg = stringArg === '' ? '0' : stringArg;

                    if (!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/) ||
                    stringArg.match(/^[a-fA-F]+$/) ||
                    isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/)) {
                        return new BN(stringArg, 16).mul(multiplier);
                    }

                    if ((stringArg.match(/^-?[0-9]+$/) || stringArg === '') && isHexPrefixed === false) {
                        return new BN(stringArg, 10).mul(multiplier);
                    }
                } else if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object' && arg.toString && !arg.pop && !arg.push) {
                    if (arg.toString(10).match(/^-?[0-9]+$/) && (arg.mul || arg.dividedToIntegerBy)) {
                        return new BN(arg.toString(10), 10);
                    }
                }

                throw new Error('[number-to-bn] while converting number ' + JSON.stringify(arg) + ' to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.');
            };

        }, { "bn.js": 37, "strip-hex-prefix": 45 }], 42: [function (require, module, exports) {
            module.exports = window.crypto;
        }, {}], 43: [function (require, module, exports) {
            module.exports = require("crypto");
        }, { "crypto": 42 }], 44: [function (require, module, exports) {
            var randomHex = function randomHex(size, callback) {
                var crypto = require('./crypto.js');
                var isCallback = typeof callback === 'function';


                if (size > 65536) {
                    if (isCallback) {
                        callback(new Error('Requested too many random bytes.'));
                    } else {
                        throw new Error('Requested too many random bytes.');
                    }
                };



                if (typeof crypto !== 'undefined' && crypto.randomBytes) {

                    if (isCallback) {
                        crypto.randomBytes(size, function (err, result) {
                            if (!err) {
                                callback(null, '0x' + result.toString('hex'));
                            } else {
                                callback(error);
                            }
                        });
                    } else {
                        return '0x' + crypto.randomBytes(size).toString('hex');
                    }


                } else {
                    var cryptoLib;

                    if (typeof crypto !== 'undefined') {
                        cryptoLib = crypto;
                    } else if (typeof msCrypto !== 'undefined') {
                        cryptoLib = msCrypto;
                    }

                    if (cryptoLib && cryptoLib.getRandomValues) {
                        var randomBytes = cryptoLib.getRandomValues(new Uint8Array(size));
                        var returnValue = '0x' + Array.from(randomBytes).map(function (arr) {return arr.toString(16);}).join('');

                        if (isCallback) {
                            callback(null, returnValue);
                        } else {
                            return returnValue;
                        }


                    } else {
                        var error = new Error('No "crypto" object available. This Browser doesn\'t support generating secure random bytes.');

                        if (isCallback) {
                            callback(error);
                        } else {
                            throw error;
                        }
                    }
                }
            };


            module.exports = randomHex;

        }, { "./crypto.js": 43 }], 45: [function (require, module, exports) {
            var isHexPrefixed = require("is-hex-prefixed");






            module.exports = function stripHexPrefix(str) {
                if (typeof str !== 'string') {
                    return str;
                }

                return isHexPrefixed(str) ? str.slice(2) : str;
            };

        }, { "is-hex-prefixed": 40 }], 46: [function (require, module, exports) {
            arguments[4][3][0].apply(exports, arguments);
        }, { "dup": 3 }], 47: [function (require, module, exports) {
            (function (global) {

                ;(function (root) {


                    var freeExports = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports;


                    var freeModule = (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module &&
                    module.exports == freeExports && module;



                    var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global;
                    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
                        root = freeGlobal;
                    }



                    var stringFromCharCode = String.fromCharCode;


                    function ucs2decode(string) {
                        var output = [];
                        var counter = 0;
                        var length = string.length;
                        var value;
                        var extra;
                        while (counter < length) {
                            value = string.charCodeAt(counter++);
                            if (value >= 0xD800 && value <= 0xDBFF && counter < length) {

                                extra = string.charCodeAt(counter++);
                                if ((extra & 0xFC00) == 0xDC00) {
                                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                                } else {


                                    output.push(value);
                                    counter--;
                                }
                            } else {
                                output.push(value);
                            }
                        }
                        return output;
                    }


                    function ucs2encode(array) {
                        var length = array.length;
                        var index = -1;
                        var value;
                        var output = '';
                        while (++index < length) {
                            value = array[index];
                            if (value > 0xFFFF) {
                                value -= 0x10000;
                                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                                value = 0xDC00 | value & 0x3FF;
                            }
                            output += stringFromCharCode(value);
                        }
                        return output;
                    }

                    function checkScalarValue(codePoint) {
                        if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                            throw Error(
                            'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
                            ' is not a scalar value');

                        }
                    }


                    function createByte(codePoint, shift) {
                        return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
                    }

                    function encodeCodePoint(codePoint) {
                        if ((codePoint & 0xFFFFFF80) == 0) {
                            return stringFromCharCode(codePoint);
                        }
                        var symbol = '';
                        if ((codePoint & 0xFFFFF800) == 0) {
                            symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
                        } else
                        if ((codePoint & 0xFFFF0000) == 0) {
                            checkScalarValue(codePoint);
                            symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
                            symbol += createByte(codePoint, 6);
                        } else
                        if ((codePoint & 0xFFE00000) == 0) {
                            symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
                            symbol += createByte(codePoint, 12);
                            symbol += createByte(codePoint, 6);
                        }
                        symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
                        return symbol;
                    }

                    function utf8encode(string) {
                        var codePoints = ucs2decode(string);
                        var length = codePoints.length;
                        var index = -1;
                        var codePoint;
                        var byteString = '';
                        while (++index < length) {
                            codePoint = codePoints[index];
                            byteString += encodeCodePoint(codePoint);
                        }
                        return byteString;
                    }



                    function readContinuationByte() {
                        if (byteIndex >= byteCount) {
                            throw Error('Invalid byte index');
                        }

                        var continuationByte = byteArray[byteIndex] & 0xFF;
                        byteIndex++;

                        if ((continuationByte & 0xC0) == 0x80) {
                            return continuationByte & 0x3F;
                        }


                        throw Error('Invalid continuation byte');
                    }

                    function decodeSymbol() {
                        var byte1;
                        var byte2;
                        var byte3;
                        var byte4;
                        var codePoint;

                        if (byteIndex > byteCount) {
                            throw Error('Invalid byte index');
                        }

                        if (byteIndex == byteCount) {
                            return false;
                        }


                        byte1 = byteArray[byteIndex] & 0xFF;
                        byteIndex++;


                        if ((byte1 & 0x80) == 0) {
                            return byte1;
                        }


                        if ((byte1 & 0xE0) == 0xC0) {
                            var byte2 = readContinuationByte();
                            codePoint = (byte1 & 0x1F) << 6 | byte2;
                            if (codePoint >= 0x80) {
                                return codePoint;
                            } else {
                                throw Error('Invalid continuation byte');
                            }
                        }


                        if ((byte1 & 0xF0) == 0xE0) {
                            byte2 = readContinuationByte();
                            byte3 = readContinuationByte();
                            codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
                            if (codePoint >= 0x0800) {
                                checkScalarValue(codePoint);
                                return codePoint;
                            } else {
                                throw Error('Invalid continuation byte');
                            }
                        }


                        if ((byte1 & 0xF8) == 0xF0) {
                            byte2 = readContinuationByte();
                            byte3 = readContinuationByte();
                            byte4 = readContinuationByte();
                            codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C |
                            byte3 << 0x06 | byte4;
                            if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                                return codePoint;
                            }
                        }

                        throw Error('Invalid UTF-8 detected');
                    }

                    var byteArray;
                    var byteCount;
                    var byteIndex;
                    function utf8decode(byteString) {
                        byteArray = ucs2decode(byteString);
                        byteCount = byteArray.length;
                        byteIndex = 0;
                        var codePoints = [];
                        var tmp;
                        while ((tmp = decodeSymbol()) !== false) {
                            codePoints.push(tmp);
                        }
                        return ucs2encode(codePoints);
                    }



                    var utf8 = {
                        'version': '2.0.0',
                        'encode': utf8encode,
                        'decode': utf8decode };




                    if (
                    typeof define == 'function' &&
                    _typeof(define.amd) == 'object' &&
                    define.amd)
                    {
                        define(function () {
                            return utf8;
                        });
                    } else if (freeExports && !freeExports.nodeType) {
                        if (freeModule) {
                            freeModule.exports = utf8;
                        } else {
                            var object = {};
                            var hasOwnProperty = object.hasOwnProperty;
                            for (var key in utf8) {
                                hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
                            }
                        }
                    } else {
                        root.utf8 = utf8;
                    }

                })(this);

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});

        }, {}], 48: [function (require, module, exports) {
























            var _ = require("underscore");
            var ethjsUnit = require("ethjs-unit");
            var utils = require('./utils.js');
            var soliditySha3 = require('./soliditySha3.js');
            var randomHex = require("randomhex");













            var _fireError = function _fireError(error, emitter, reject, callback) {



                if (_.isObject(error) && !(error instanceof Error) && error.data) {
                    if (_.isObject(error.data) || _.isArray(error.data)) {
                        error.data = JSON.stringify(error.data, null, 2);
                    }

                    error = error.message + "\n" + error.data;
                }

                if (_.isString(error)) {
                    error = new Error(error);
                }

                if (_.isFunction(callback)) {
                    callback(error);
                }
                if (_.isFunction(reject)) {

                    if (emitter &&
                    _.isFunction(emitter.listeners) &&
                    emitter.listeners('error').length &&
                    _.isFunction(emitter.suppressUnhandledRejections)) {
                        emitter.suppressUnhandledRejections();
                    }

                    setTimeout(function () {
                        reject(error);
                    }, 1);
                }

                if (emitter && _.isFunction(emitter.emit)) {

                    setTimeout(function () {
                        emitter.emit('error', error);
                        emitter.removeAllListeners();
                    }, 1);
                }

                return emitter;
            };








            var _jsonInterfaceMethodToString = function _jsonInterfaceMethodToString(json) {
                if (_.isObject(json) && json.name && json.name.indexOf('(') !== -1) {
                    return json.name;
                }

                var typeName = json.inputs.map(function (i) {return i.type;}).join(',');
                return json.name + '(' + typeName + ')';
            };










            var hexToAscii = function hexToAscii(hex) {
                if (!utils.isHex(hex))
                throw new Error('The parameter must be a valid HEX string.');

                var str = "";
                var i = 0,l = hex.length;
                if (hex.substring(0, 2) === '0x') {
                    i = 2;
                }
                for (; i < l; i += 2) {
                    var code = parseInt(hex.substr(i, 2), 16);
                    str += String.fromCharCode(code);
                }

                return str;
            };








            var asciiToHex = function asciiToHex(str) {
                var hex = "";
                for (var i = 0; i < str.length; i++) {
                    var code = str.charCodeAt(i);
                    var n = code.toString(16);
                    hex += n.length < 2 ? '0' + n : n;
                }

                return "0x" + hex;
            };











            var getUnitValue = function getUnitValue(unit) {
                unit = unit ? unit.toLowerCase() : 'ether';
                if (!ethjsUnit.unitMap[unit]) {
                    throw new Error('This unit "' + unit + '" doesn\'t exist, please use the one of the following units' + JSON.stringify(ethjsUnit.unitMap, null, 2));
                }
                return unit;
            };






















            var fromWei = function fromWei(number, unit) {
                unit = getUnitValue(unit);

                return utils.isBN(number) ? ethjsUnit.fromWei(number, unit) : ethjsUnit.fromWei(number, unit).toString(10);
            };























            var toWei = function toWei(number, unit) {
                unit = getUnitValue(unit);

                return utils.isBN(number) ? ethjsUnit.toWei(number, unit) : ethjsUnit.toWei(number, unit).toString(10);
            };











            var toChecksumAddress = function toChecksumAddress(address) {
                if (typeof address === 'undefined') return '';

                if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
                throw new Error('Given address "' + address + '" is not a valid Ethereum address.');



                address = address.toLowerCase().replace(/^0x/i, '');
                var addressHash = utils.sha3(address).replace(/^0x/i, '');
                var checksumAddress = '0x';

                for (var i = 0; i < address.length; i++) {

                    if (parseInt(addressHash[i], 16) > 7) {
                        checksumAddress += address[i].toUpperCase();
                    } else {
                        checksumAddress += address[i];
                    }
                }
                return checksumAddress;
            };



            module.exports = {
                _fireError: _fireError,
                _jsonInterfaceMethodToString: _jsonInterfaceMethodToString,


                randomHex: randomHex,
                _: _,
                BN: utils.BN,
                isBN: utils.isBN,
                isBigNumber: utils.isBigNumber,
                isHex: utils.isHex,
                sha3: utils.sha3,
                keccak256: utils.sha3,
                soliditySha3: soliditySha3,
                isAddress: utils.isAddress,
                checkAddressChecksum: utils.checkAddressChecksum,
                toChecksumAddress: toChecksumAddress,
                toHex: utils.toHex,
                toBN: utils.toBN,

                bytesToHex: utils.bytesToHex,
                hexToBytes: utils.hexToBytes,

                hexToNumberString: utils.hexToNumberString,

                hexToNumber: utils.hexToNumber,
                toDecimal: utils.hexToNumber,

                numberToHex: utils.numberToHex,
                fromDecimal: utils.numberToHex,

                hexToUtf8: utils.hexToUtf8,
                hexToString: utils.hexToUtf8,
                toUtf8: utils.hexToUtf8,

                utf8ToHex: utils.utf8ToHex,
                stringToHex: utils.utf8ToHex,
                fromUtf8: utils.utf8ToHex,

                hexToAscii: hexToAscii,
                toAscii: hexToAscii,
                asciiToHex: asciiToHex,
                fromAscii: asciiToHex,

                unitMap: ethjsUnit.unitMap,
                toWei: toWei,
                fromWei: fromWei,

                padLeft: utils.leftPad,
                leftPad: utils.leftPad,
                padRight: utils.rightPad,
                rightPad: utils.rightPad };



        }, { "./soliditySha3.js": 49, "./utils.js": 50, "ethjs-unit": 39, "randomhex": 44, "underscore": 46 }], 49: [function (require, module, exports) {






















            var _ = require("underscore");
            var BN = require("bn.js");
            var utils = require('./utils.js');


            var _elementaryName = function _elementaryName(name) {


                if (name.startsWith('int[')) {
                    return 'int256' + name.slice(3);
                } else if (name === 'int') {
                    return 'int256';
                } else if (name.startsWith('uint[')) {
                    return 'uint256' + name.slice(4);
                } else if (name === 'uint') {
                    return 'uint256';
                } else if (name.startsWith('fixed[')) {
                    return 'fixed128x128' + name.slice(5);
                } else if (name === 'fixed') {
                    return 'fixed128x128';
                } else if (name.startsWith('ufixed[')) {
                    return 'ufixed128x128' + name.slice(6);
                } else if (name === 'ufixed') {
                    return 'ufixed128x128';
                }
                return name;
            };


            var _parseTypeN = function _parseTypeN(type) {
                var typesize = /^\D+(\d+).*$/.exec(type);
                return typesize ? parseInt(typesize[1], 10) : null;
            };


            var _parseTypeNArray = function _parseTypeNArray(type) {
                var arraySize = /^\D+\d*\[(\d+)\]$/.exec(type);
                return arraySize ? parseInt(arraySize[1], 10) : null;
            };

            var _parseNumber = function _parseNumber(arg) {
                var type = typeof arg === "undefined" ? "undefined" : _typeof(arg);
                if (type === 'string') {
                    if (utils.isHex(arg)) {
                        return new BN(arg.replace(/0x/i, ''), 16);
                    } else {
                        return new BN(arg, 10);
                    }
                } else if (type === 'number') {
                    return new BN(arg);
                } else if (utils.isBigNumber(arg)) {
                    return new BN(arg.toString(10));
                } else if (utils.isBN(arg)) {
                    return arg;
                } else {
                    throw new Error(arg + ' is not a number');
                }
            };

            var _solidityPack = function _solidityPack(type, value, arraySize) {


                var size, num;
                type = _elementaryName(type);


                if (type === 'bytes') {

                    if (value.replace(/^0x/i, '').length % 2 !== 0) {
                        throw new Error('Invalid bytes characters ' + value.length);
                    }

                    return value;
                } else if (type === 'string') {
                    return utils.utf8ToHex(value);
                } else if (type === 'bool') {
                    return value ? '01' : '00';
                } else if (type.startsWith('address')) {
                    if (arraySize) {
                        size = 64;
                    } else {
                        size = 40;
                    }

                    if (!utils.isAddress(value)) {
                        throw new Error(value + ' is not a valid address, or the checksum is invalid.');
                    }

                    return utils.leftPad(value.toLowerCase(), size);
                }

                size = _parseTypeN(type);

                if (type.startsWith('bytes')) {

                    if (!size) {
                        throw new Error('bytes[] not yet supported in solidity');
                    }


                    if (arraySize) {
                        size = 32;
                    }

                    if (size < 1 || size > 32 || size < value.replace(/^0x/i, '').length / 2) {
                        throw new Error('Invalid bytes' + size + ' for ' + value);
                    }

                    return utils.rightPad(value, size * 2);
                } else if (type.startsWith('uint')) {

                    if (size % 8 || size < 8 || size > 256) {
                        throw new Error('Invalid uint' + size + ' size');
                    }

                    num = _parseNumber(value);
                    if (num.bitLength() > size) {
                        throw new Error('Supplied uint exceeds width: ' + size + ' vs ' + num.bitLength());
                    }

                    if (num.lt(new BN(0))) {
                        throw new Error('Supplied uint ' + num.toString() + ' is negative');
                    }

                    return size ? utils.leftPad(num.toString('hex'), size / 8 * 2) : num;
                } else if (type.startsWith('int')) {

                    if (size % 8 || size < 8 || size > 256) {
                        throw new Error('Invalid int' + size + ' size');
                    }

                    num = _parseNumber(value);
                    if (num.bitLength() > size) {
                        throw new Error('Supplied int exceeds width: ' + size + ' vs ' + num.bitLength());
                    }

                    if (num.lt(new BN(0))) {
                        return num.toTwos(size).toString('hex');
                    } else {
                        return size ? utils.leftPad(num.toString('hex'), size / 8 * 2) : num;
                    }

                } else {

                    throw new Error('Unsupported or invalid type: ' + type);
                }
            };


            var _processSoliditySha3Args = function _processSoliditySha3Args(arg) {


                if (_.isArray(arg)) {
                    throw new Error('Autodetection of array types is not supported.');
                }

                var type,value = '';
                var hexArg, arraySize;


                if (_.isObject(arg) && (arg.hasOwnProperty('v') || arg.hasOwnProperty('t') || arg.hasOwnProperty('value') || arg.hasOwnProperty('type'))) {
                    type = arg.t || arg.type;
                    value = arg.v || arg.value;


                } else {

                    type = utils.toHex(arg, true);
                    value = utils.toHex(arg);

                    if (!type.startsWith('int') && !type.startsWith('uint')) {
                        type = 'bytes';
                    }
                }

                if ((type.startsWith('int') || type.startsWith('uint')) && typeof value === 'string' && !/^(-)?0x/i.test(value)) {
                    value = new BN(value);
                }


                if (_.isArray(value)) {
                    arraySize = _parseTypeNArray(type);
                    if (arraySize && value.length !== arraySize) {
                        throw new Error(type + ' is not matching the given array ' + JSON.stringify(value));
                    } else {
                        arraySize = value.length;
                    }
                }


                if (_.isArray(value)) {
                    hexArg = value.map(function (val) {
                        return _solidityPack(type, val, arraySize).toString('hex').replace('0x', '');
                    });
                    return hexArg.join('');
                } else {
                    hexArg = _solidityPack(type, value, arraySize);
                    return hexArg.toString('hex').replace('0x', '');
                }

            };







            var soliditySha3 = function soliditySha3() {


                var args = Array.prototype.slice.call(arguments);

                var hexArgs = _.map(args, _processSoliditySha3Args);




                return utils.sha3('0x' + hexArgs.join(''));
            };


            module.exports = soliditySha3;

        }, { "./utils.js": 50, "bn.js": 37, "underscore": 46 }], 50: [function (require, module, exports) {






















            var _ = require("underscore");
            var BN = require("bn.js");
            var numberToBN = require("number-to-bn");
            var utf8 = require("utf8");
            var Hash = require("eth-lib/src/hash");









            var isBN = function isBN(object) {
                return object instanceof BN ||
                object && object.constructor && object.constructor.name === 'BN';
            };








            var isBigNumber = function isBigNumber(object) {
                return object && object.constructor && object.constructor.name === 'BigNumber';
            };








            var toBN = function toBN(number) {
                try {
                    return numberToBN.apply(null, arguments);
                } catch (e) {
                    throw new Error(e + ' Given value: "' + number + '"');
                }
            };









            var isAddress = function isAddress(address) {

                if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
                    return false;

                } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
                    return true;

                } else {
                    return checkAddressChecksum(address);
                }
            };










            var checkAddressChecksum = function checkAddressChecksum(address) {

                address = address.replace(/^0x/i, '');
                var addressHash = sha3(address.toLowerCase()).replace(/^0x/i, '');

                for (var i = 0; i < 40; i++) {

                    if (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i] || parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i]) {
                        return false;
                    }
                }
                return true;
            };










            var leftPad = function leftPad(string, chars, sign) {
                var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
                string = string.toString(16).replace(/^0x/i, '');

                var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;

                return (hasPrefix ? '0x' : '') + new Array(padding).join(sign ? sign : "0") + string;
            };










            var rightPad = function rightPad(string, chars, sign) {
                var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
                string = string.toString(16).replace(/^0x/i, '');

                var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;

                return (hasPrefix ? '0x' : '') + string + new Array(padding).join(sign ? sign : "0");
            };









            var utf8ToHex = function utf8ToHex(str) {
                str = utf8.encode(str);
                var hex = "";


                str = str.replace(/^(?:\u0000)*/, '');
                str = str.split("").reverse().join("");
                str = str.replace(/^(?:\u0000)*/, '');
                str = str.split("").reverse().join("");

                for (var i = 0; i < str.length; i++) {
                    var code = str.charCodeAt(i);

                    var n = code.toString(16);
                    hex += n.length < 2 ? '0' + n : n;

                }

                return "0x" + hex;
            };








            var hexToUtf8 = function hexToUtf8(hex) {
                if (!isHex(hex))
                throw new Error('The parameter "' + hex + '" must be a valid HEX string.');

                var str = "";
                var code = 0;
                hex = hex.replace(/^0x/i, '');


                hex = hex.replace(/^(?:00)*/, '');
                hex = hex.split("").reverse().join("");
                hex = hex.replace(/^(?:00)*/, '');
                hex = hex.split("").reverse().join("");

                var l = hex.length;

                for (var i = 0; i < l; i += 2) {
                    code = parseInt(hex.substr(i, 2), 16);

                    str += String.fromCharCode(code);

                }

                return utf8.decode(str);
            };









            var hexToNumber = function hexToNumber(value) {
                if (!value) {
                    return value;
                }

                return toBN(value).toNumber();
            };








            var hexToNumberString = function hexToNumberString(value) {
                if (!value) return value;

                return toBN(value).toString(10);
            };









            var numberToHex = function numberToHex(value) {
                if (!isFinite(value) && !_.isString(value)) {
                    return value;
                }

                var number = toBN(value);
                var result = number.toString(16);

                return number.lt(new BN(0)) ? '-0x' + result.substr(1) : '0x' + result;
            };











            var bytesToHex = function bytesToHex(bytes) {
                for (var hex = [], i = 0; i < bytes.length; i++) {

                    hex.push((bytes[i] >>> 4).toString(16));
                    hex.push((bytes[i] & 0xF).toString(16));

                }
                return '0x' + hex.join("");
            };










            var hexToBytes = function hexToBytes(hex) {
                hex = hex.toString(16);

                if (!isHex(hex)) {
                    throw new Error('Given value "' + hex + '" is not a valid hex string.');
                }

                hex = hex.replace(/^0x/i, '');

                for (var bytes = [], c = 0; c < hex.length; c += 2) {
                    bytes.push(parseInt(hex.substr(c, 2), 16));}
                return bytes;
            };











            var toHex = function toHex(value, returnType) {


                if (isAddress(value)) {
                    return returnType ? 'address' : '0x' + value.toLowerCase().replace(/^0x/i, '');
                }

                if (_.isBoolean(value)) {
                    return returnType ? 'bool' : value ? '0x01' : '0x00';
                }


                if (_.isObject(value) && !isBigNumber(value) && !isBN(value)) {
                    return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
                }


                if (_.isString(value)) {
                    if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
                        return returnType ? 'int256' : numberToHex(value);
                    } else if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
                        return returnType ? 'bytes' : value;
                    } else if (!isFinite(value)) {
                        return returnType ? 'string' : utf8ToHex(value);
                    }
                }

                return returnType ? value < 0 ? 'int256' : 'uint256' : numberToHex(value);
            };









            var isHex = function isHex(hex) {
                return (_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]+$/i.test(hex);
            };











            var isBloom = function isBloom(bloom) {
                if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
                    return false;
                } else if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
                    return true;
                }
                return false;
            };










            var isTopic = function isTopic(topic) {
                if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
                    return false;
                } else if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
                    return true;
                }
                return false;
            };










            var SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

            var sha3 = function sha3(value) {
                if (isHex(value) && /^0x/i.test(value.toString())) {
                    value = hexToBytes(value);
                }

                var returnValue = Hash.keccak256(value);

                if (returnValue === SHA3_NULL_S) {
                    return null;
                } else {
                    return returnValue;
                }
            };

            sha3._Hash = Hash;


            module.exports = {
                BN: BN,
                isBN: isBN,
                isBigNumber: isBigNumber,
                toBN: toBN,
                isAddress: isAddress,
                isBloom: isBloom,
                isTopic: isTopic,
                checkAddressChecksum: checkAddressChecksum,
                utf8ToHex: utf8ToHex,
                hexToUtf8: hexToUtf8,
                hexToNumber: hexToNumber,
                hexToNumberString: hexToNumberString,
                numberToHex: numberToHex,
                toHex: toHex,
                hexToBytes: hexToBytes,
                bytesToHex: bytesToHex,
                isHex: isHex,
                leftPad: leftPad,
                rightPad: rightPad,
                sha3: sha3 };


        }, { "bn.js": 37, "eth-lib/src/hash": 38, "number-to-bn": 41, "underscore": 46, "utf8": 47 }], "BN": [function (require, module, exports) {
            arguments[4][24][0].apply(exports, arguments);
        }, { "buffer": 1, "dup": 24 }], "Web3Shh": [function (require, module, exports) {






















            "use strict";

            var core = require("web3-core");
            var Subscriptions = require("web3-core-subscriptions").subscriptions;
            var Method = require("web3-core-method");

            var Net = require("web3-net");


            var Shh = function Shh() {
                var _this = this;


                core.packageInit(this, arguments);


                var setProvider = this.setProvider;
                this.setProvider = function () {
                    setProvider.apply(_this, arguments);
                    _this.net.setProvider.apply(_this, arguments);
                };

                this.clearSubscriptions = _this._requestManager.clearSubscriptions;

                methods().forEach(function (method) {
                    method.attachToObject(_this);
                    method.setRequestManager(_this._requestManager);
                });

                this.net = new Net(this.currentProvider);
            };

            core.addProviders(Shh);


            var methods = function methods() {

                return [
                new Subscriptions({
                    name: 'subscribe',
                    type: 'shh',
                    subscriptions: {
                        'messages': {
                            params: 1 } } }),






                new Method({
                    name: 'getVersion',
                    call: 'shh_version',
                    params: 0 }),

                new Method({
                    name: 'getInfo',
                    call: 'shh_info',
                    params: 0 }),

                new Method({
                    name: 'setMaxMessageSize',
                    call: 'shh_setMaxMessageSize',
                    params: 1 }),

                new Method({
                    name: 'setMinPoW',
                    call: 'shh_setMinPoW',
                    params: 1 }),

                new Method({
                    name: 'markTrustedPeer',
                    call: 'shh_markTrustedPeer',
                    params: 1 }),

                new Method({
                    name: 'newKeyPair',
                    call: 'shh_newKeyPair',
                    params: 0 }),

                new Method({
                    name: 'addPrivateKey',
                    call: 'shh_addPrivateKey',
                    params: 1 }),

                new Method({
                    name: 'deleteKeyPair',
                    call: 'shh_deleteKeyPair',
                    params: 1 }),

                new Method({
                    name: 'hasKeyPair',
                    call: 'shh_hasKeyPair',
                    params: 1 }),

                new Method({
                    name: 'getPublicKey',
                    call: 'shh_getPublicKey',
                    params: 1 }),

                new Method({
                    name: 'getPrivateKey',
                    call: 'shh_getPrivateKey',
                    params: 1 }),

                new Method({
                    name: 'newSymKey',
                    call: 'shh_newSymKey',
                    params: 0 }),

                new Method({
                    name: 'addSymKey',
                    call: 'shh_addSymKey',
                    params: 1 }),

                new Method({
                    name: 'generateSymKeyFromPassword',
                    call: 'shh_generateSymKeyFromPassword',
                    params: 1 }),

                new Method({
                    name: 'hasSymKey',
                    call: 'shh_hasSymKey',
                    params: 1 }),

                new Method({
                    name: 'getSymKey',
                    call: 'shh_getSymKey',
                    params: 1 }),

                new Method({
                    name: 'deleteSymKey',
                    call: 'shh_deleteSymKey',
                    params: 1 }),


                new Method({
                    name: 'newMessageFilter',
                    call: 'shh_newMessageFilter',
                    params: 1 }),

                new Method({
                    name: 'getFilterMessages',
                    call: 'shh_getFilterMessages',
                    params: 1 }),

                new Method({
                    name: 'deleteMessageFilter',
                    call: 'shh_deleteMessageFilter',
                    params: 1 }),


                new Method({
                    name: 'post',
                    call: 'shh_post',
                    params: 1,
                    inputFormatter: [null] })];


            };

            module.exports = Shh;



        }, { "web3-core": 23, "web3-core-method": 9, "web3-core-subscriptions": 20, "web3-net": 26 }] }, {}, ["Web3Shh"])("Web3Shh");
});