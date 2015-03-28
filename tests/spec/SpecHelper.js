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
}
    });
});
