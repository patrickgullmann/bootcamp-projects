const { getAlbumNames } = require("./albums");
const spotify = require("./spotify");

jest.mock("./spotify");

test("album names are in alphabetical order", () => {
    spotify.search.mockResolvedValue({
        albums: {
            items: [
                {
                    name: "Hell In A Handbasket",
                },
                {
                    name: "Braver Than We Are",
                },
                {
                    name: "Midnight At The Lost And Found",
                },
                {
                    name: "A Best Of",
                },
            ],
        },
    });

    return getAlbumNames("meat loaf").then((albumNames) => {
        expect(albumNames).toEqual(albumNames.slice().sort());
    });
});

// ------------- COMMENT: ----------------------------------->
//Call function and also have csl in albums.js to see what actually "data" is
// to build the perfect structure for the mock

// getAlbumNames("meat loaf").then((albumNames) => {
//     console.log(albumNames);
// });

// ------------- STRUCTURE: -------------------------------->
/* 

{
  albums: {
    href: 'https://api.spotify.com/v1/search?query=meat+loaf&type=album&offset=0&limit=20',
    items: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ],
    limit: 20,
    next: 'https://api.spotify.com/v1/search?query=meat+loaf&type=album&offset=20&limit=20',
    offset: 0,
    previous: null,
    total: 109
  }
}

*/
