// fix for PhantomJS not implementing Number.isInteger
Number.isInteger = Number.isInteger && Number.isInteger || function(x) { return typeof x == 'number' && x % 1 === 0; };

beforeEach(function () {
    jasmine.addMatchers({

        // checks an item exists in an array
        toBeInArray: function () {
            return {
                compare: function (item, array) {
                    return {
                        pass: Array.isArray(array) && array.indexOf(item) !== -1
                    };
                }
            };
        },

        // checks an integer is between (or equal to one of) two values
        toBeIntBetween: function () {
            return {
                compare: function (actual, min, max) {
                    return {
                        pass: (
                            Number.isInteger(actual) &&
                            Number.isInteger(min) &&
                            Number.isInteger(max)) &&
                            (actual >= min && actual <= max)
                    };
                }
            };
        }
    });
});
