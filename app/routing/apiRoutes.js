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
        // req.body is the returned object
        // console.log(req.body.scores);
        // console.log("res:");
        // console.log(res);
        var friendCompatability = [0,0,0,0,0,0,0,0,0,0];
        var index = [0,0,0,0,0,0];

        for(var i = 0; i < friendData.length; i++) {
            console.log("Friends being compared:");
            console.log(friendData[i].name);
            for (var j = 0; j < friendData[i].scores.length; j++) {
                console.log("Comp friend: " + friendData[i].scores[j] + " res friend: " + req.body.scores[j]);
                friendCompatability[j] += Math.abs(friendData[i].scores[j] - req.body.scores[j]);
            }

            // add the results for the friend
            for (var k = 0; k < friendCompatability.length; k++){
                index[i] += friendCompatability[k]
            }

            // Compatability Check
            // console.log("--------------------------")
            // console.log("compatability Score:");
            // console.log(friendCompatability);

            // clear friend compatability
            friendCompatability = [0,0,0,0,0,0,0,0,0,0];

        }

        // Compatability Check
        console.log("--------------------------")
        // console.log("compatability Score:");
        // console.log(friendCompatability);
        console.log("index Totals:");
        console.log(index);
        console.log("");

        //sort which position in the friendCompatability array has the lowest value
        var min = 0;
        var temp = index[0];
        for (var i = 1; i < index.length; i++) {
            if (index[i] < temp) {
                temp = index[i];
                min = i;
            }
        }
        console.log("friend Data Result");
        console.log(friendData[min].name);

        //return the value

        res.json(friendData[min]);

    });

    // ---------------------------------------------------------------------------
    // The code below clears the friend database

    app.post("/api/clear", function() {
        // Empty out the arrays of data
        friendData = [];

        console.log(friendData);
    });
};