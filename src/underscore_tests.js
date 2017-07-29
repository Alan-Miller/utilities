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
    var newArr = [];
    if (n === undefined) {
      return array[0];
    }
    n > array.length ? n = array.length : n;
    for (var i = 0; i < n; i++) {
      newArr.push(array[i]);
    }
    return newArr;
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var newArr = [];
    if (n === undefined) {
      return array[array.length - 1];
    }
    n > array.length ? n = array.length : n;
    for (var i = array.length - n; i < array.length; i++) {
      newArr.push(array[i]);
    }
    console.log(newArr);
    return newArr;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  };



  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var newArr = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var newArr = [];
    for (var i = 0; i < collection.length; i++) {
      if (!iterator(collection[i])) {
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      if (newArr.indexOf(array[i]) === -1) {
        newArr.push(array[i]);
      }
    }
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push(iterator(array[i]));
    }
    return newArr;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push(array[i][propertyName]);
    }
    return newArr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    // var newArr = [];
    if (typeof methodName === "string") {         // methodName could be string, which needs bracket notation
      for (var i = 0; i < list.length; i++) {
        list[i][methodName]();                    // args optional?
      }
    }
    else {
      for (var j = 0; j < list.length; j++) {     // methodName could be variable, which needs dot notation
        methodName.call(list[j], args);           // args optional?
      }
    }
    return list;
    // return newArr;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    initialValue ? initialValue : initialValue = 0;
    for (var i = 0; i < collection.length; i++) {
      initialValue = iterator(initialValue, collection[i]);
    }
    return initialValue;
  };




  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var result = false;
    for (var potato in collection) {
      if (collection[potato] === target) {
        result = true;
      }
    }
    return result;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var result = true;
  	if (!iterator) {
      return true;
    }
  	for (var i = 0; i < collection.length; i++) {
  		if (!iterator(collection[i])) {
  			result = false;
  		}
  	}
  	return result;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
//   _.some = function(collection, iterator) {
//
//   	if (!iterator) {
//   		return false;
//   	}
//     for (var i = 0; i < collection.length; i++) {
//   		if (iterator(collection[i])) {
//   			return true;
//   		}
//   	}
//   	return false;
// };

_.some = function(collection, iterator) {
  var result = false;
  if (collection === []) {
    return result;
  }
  if (!iterator) {
    return result;
  }
  for (var i = 0; i < collection.length; i++) {
    if (iterator(collection[i])) {
      result = true;
      break;
    }
  }
  return result;
};


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {

      this[frog] = obj[frog];

  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var firstTime = true;
      return function() {
        if (firstTime === true) {
          firstTime = false;
          console.log('potato');
        }
      };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(prim) {
    var memo = [];
    var func = function() {
      console.log(prim);
    };
    return function() {
		    return memo.indexOf(func) !== -1 ? func : func(prim);
	  };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, a, b) {
    setTimeout(function() {
      func(a, b);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var newArr = [];
    for (var i = 1; i <= array.length; i++) {
      rando();
    }
    function rando() {
      var randomIndex = Math.floor(Math.random() * array.length);
      newArr.push(array.splice(randomIndex));
    }
    return newArr;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(iterator);
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(arr1, arr2) {
    var longest = 0;
  	for (var i = 0; i < arguments.length; i++) {
  		if (arguments[i].length > longest) {
  			longest = arguments[i].length;
  		} else {
  			longest = longest;
  		}
  	}
  	var finalArr = [];
  	for (var num = 0; num < longest; num++) {
  		var tempArr = [];
  		for (var elem = 0; elem < arguments.length; elem++) {
  			tempArr.push(arguments[elem][num]);
  		}
  		finalArr.push(tempArr);
  	}
  	return finalArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var newArr = [];
    for (var i = 0; i < nestedArray.length; i++) {
      for (var j = 0; i < nestedArray[i].length; j++) {
        newArr.push(nestedArray[i][j]);
      }
    }
    // for (var index in nestedArray) {
    //   newArr.push(nestedArray[index]);
    // }
    return newArr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var args = Array.from(arguments);
    var newArr = [];
    args[0].forEach(function(item) {
      for (var i = 1; i < args.length; i++) {
        if (args[i].indexOf(item) !== -1) {
          newArr.push(item);
        }
      }
    });
    newArr = newArr.filter(function(thing) {
      return newArr.join(',').split(thing).length === args.length;
    });
    return newArr;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    for (var f = arguments[0].length - 1; f >= 0; f--) {
  		for (var a = 1; a < arguments.length; a++) {
  			if (arguments[a].indexOf(arguments[0][f]) !== -1) {
  				arguments[0].splice(f, 1);
  			}
  		}
  	}
  	return arguments[0];
  };

}).call(this);

















// FIN
