const spotify = require("./spotify");

exports.getAlbumNames = function (q) {
    return spotify.search(q, "album").then(function (data) {
        // console.log(data); //helped me to understand what is the structure of data for the Mock
        const albumNames = [];
        for (var i = 0; i < data.albums.items.length; i++) {
            albumNames.push(data.albums.items[i].name);
        }
        albumNames.sort();
        return albumNames;
    });
};
