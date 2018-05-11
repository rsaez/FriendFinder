// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friendData DB
// ===============================================================================

var friendData = require("../data/friend");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the array)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friendData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users which friend they match with the best.
        // It will do this by subtracting the question values
        // and choosing the friend with the least differences
        // req.body is available since we're using the body-parser middleware
        var friendCompatability = [0,0,0,0,0,0];
        for(var i = 0; i < friendData.length; i++) {
            for (var j = 0; friendData[i].scores[j]; j++) {
                friendCompatability[0] = +Math.abs(friendData[i].scores[j] - res[j]);
            }
        }

        //sort which position in the friendCompatability array has the lowest value
        var min = 0;
        var temp = friendCompatability[0];
        for (var i = 1; i < friendCompatability.length; i++) {
            if (friendCompatability[i] < temp) {
                temp = friendCompatability[i];
                min = i;
            }
        }

        //return the value
        friendData[min].push(req.body);
        res.json(true);

    });

    // ---------------------------------------------------------------------------
    // The code below clears the friend database

    app.post("/api/clear", function() {
        // Empty out the arrays of data
        friendData = [];

        console.log(friendData);
    });
};