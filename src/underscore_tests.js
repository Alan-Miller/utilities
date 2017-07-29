/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (!n) return array[0];
    n = n > array.length ? array.length : n;
    var newArr = [];
    for (var i = 0; i < n; i++) {
      newArr.push(array[i])
    }
    return newArr;
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (!n) return array[array.length - 1];
    n = n > array.length ? array.length : n;
    var newArr = [];
    for (var i = array.length - n; i < array.length; i++) {
      newArr.push(array[i])
    }
    return newArr;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var key in collection) {
      iterator(collection[key], key, collection)
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) return i;
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var arr = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) arr.push(collection[i]);
    }
    return arr;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var arr = [];
    for (var i = 0; i < collection.length; i++) {
      if (!iterator(collection[i])) arr.push(collection[i]);
    }
    return arr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    for (var i = 0; i < array.length; i++) {
      var remainder = array.slice(i + 1, array.length);
      for (var k = 0; k < remainder.length; k++) {
        if (array[i] === remainder[k]) {
          array.splice(i + 1);
          remainder.splice(k, 1);
          array = array.concat(remainder)
        }
      }
    }
    return array;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push(iterator(array[i]))
    }
    return newArr;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var arr = []
    for (var i = 0; i < array.length; i++) {
      arr.push(array[i][propertyName]);
    }
    return arr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    
    var results = [];
    for (var i = 0; i < list.length; i++) {
      if (typeof methodName !== 'string') results.push(methodName['call'](list[i], args))
      else results.push(list[i][methodName](args))
    }
    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if (!initialValue) var previousValue = 0;
    else var previousValue = initialValue;

    for (var key in collection) {
      previousValue = iterator(previousValue, collection[key])
    }
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var key in collection) {
      if (collection[key] === target) return true;
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (!iterator) return true;
    for (var key in collection) {
      if (!iterator(collection[key])) return false;
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (!iterator) iterator = (item) => item;
    for (var key in collection) {
      if (iterator(collection[key])) return true;
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in object(s).
  _.extend = function(obj) {
    var argArray = [];
    // Create array to hold all arguments (including the original object)
    for (var key in arguments) {
      argArray.push(arguments[key]);
    }
    // For each item in the array, assign those properties and values to the original
    for (var i = 1; i < argArray.length; i++) { // var = 1 to skip over first object
      for(var prop in argArray[i]) {
        obj[prop] = argArray[i][prop];
      }
    };
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already exists in obj
  _.defaults = function(obj) {
    var argArray = [];
    // Create array to hold all arguments (including the original object)
    for (var key in arguments) {
      argArray.push(arguments[key]);
    }
    // For each item in the array, assign those properties and values to the original
    for (var i = 1; i < argArray.length; i++) { // var = 1 to skip over first object
      for(var prop in argArray[i]) {
        if (!obj.hasOwnProperty(prop)) obj[prop] = argArray[i][prop];
      }
    };
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var called = 0;

    return function() {
      if (called) return;
      else {
        called = 1;
        return func();
      }
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};

    return function(x) {
      if (x in memo) return memo[x];
      else return memo[x] = func(x)
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, a, b) {
    setTimeout(function() {
      func(a, b)
    }, wait)
  };



  // Shuffle an array.
  _.shuffle = function (array) {
    var newA = [], 
      a = Array.from(array);
    while(a.length) {
      var randomIndex = Math.floor(Math.random() * a.length);
      newA.push(a.splice(randomIndex, 1)[0]);
    }
    return newA;
  }

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'string') return collection.sort((a, b) => a[iterator] - b[iterator])
    else return collection.sort((a, b) => iterator(a) - iterator(b));
    return collection;
  };



  // Zip together two or more arrays with elements of the same index going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zippedArray = []                              // Final array
    var args = Array.from(arguments),                 // Array of all arguments
        numArgs = args.length;                        
    var lengths = args.map((item) => item.length),    
        max = Math.max(...lengths);                   // Find max length of any argument. This is num of items in final.
    
    for (var i = 0; i < max; i++) {                   // Create items in final array, one at a time.
      var zipItem = [];                               // zipItem represents each item in final array
      for (var j = 0; j < numArgs; j++) {             // For each item in final, push in item from each argument
        zipItem.push(args[j][i])
      }
      zippedArray.push(zipItem)                       // Push each zipItem to final zippedArray
    }
    return zippedArray;                               // Return zippedArray
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var flattenedArray = [];
    for (var i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        nestedArray.splice(i, 1, ...nestedArray[i]);
        i--;
      }
      else flattenedArray.push(nestedArray[i]);
    }
    return flattenedArray
  };
  // Solution #2: flatten with JSON
  // _.flatten = function(nestedArray, result) {
  //   var str = JSON.stringify(nestedArray);
  //   var noBrackets = str.replace(/[\[\]]/g, '');
  //   var flat = JSON.parse('[' + noBrackets + ']');
  //   return flat;
  // };



  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.from(arguments),
      numTimes = args.length - 1;
    for (var i = 0; i < numTimes; i++) {
      let first = args[0], second = args[1];
      let newFirst = first.filter((item) => second.indexOf(item) !== -1);
      args.splice(0, 2, newFirst);
    }
    return args[0];
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.from(arguments),
      numTimes = args.length - 1;
    for (var i = 0; i < numTimes; i++) {
      let first = args[0], second = args[1];
      let newFirst = first.filter((item) => second.indexOf(item) === -1);
      args.splice(0, 2, newFirst);
    }
    return args[0];
  };

}).call(this);
