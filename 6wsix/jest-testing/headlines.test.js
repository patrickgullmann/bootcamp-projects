//need to get also twApi bc headlines function relies on it

const headlines = require("./headlines");
const twApi = require("./twApi");

jest.mock("./twApi"); // pass in the module you want to mock
// this is basically us saying hey yo jest, can you go and check what
// the export object of twApi looks like, and create
// an object that looks extacly like that but with none of the actual funcitonality please!

test("headlines filters out tweets that do no have exactly one link", () => {
    // mock the values we normally would get from twitter
    twApi.getTweets.mockResolvedValue([
        {
            entities: {
                urls: [
                    {
                        url: "http://spiced-academy.com",
                    },
                ],
            },
            full_text: "I will make it through the filter",
        },
        {
            entities: {},
            full_text: "I will NOT make it through the filter",
        },
        {
            entities: {
                urls: [
                    {
                        url: "http://spiced-academy.com",
                    },
                    {
                        url: "http://spiced-academy.com",
                    },
                ],
            },
            full_text: "I will NOT make it through the filter",
        },
    ]);
    return headlines().then((tweets) => {
        console.log("Tweets in test:", tweets);
        // write my actual test
        expect(tweets.length).toBe(1);
        expect(tweets[0]).toEqual({
            text: "I will make it through the filter",
            href: "http://spiced-academy.com",
        });
    });
});
