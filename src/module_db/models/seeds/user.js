const { User } = require('../');

const users = [
    {
        id: "a49594e5-dfec-46e6-84f2-979f8b8a7b37",
        login: "Userec6b09ee",
        password: "k178FLbPl3Y8",
        age: 29,
        isDeleted: false
    },
    {
        id: "3cd83e1b-becd-4ed4-8a9b-70d2a80243bc",
        login: "User4a4d24b3",
        password: "xCgjar2R007U",
        age: 56,
        isDeleted: false
    },
    {
        id: "3faf376b-ab6d-4291-9f79-b4875b951e41",
        login: "Patricia",
        password: "KXRaezLL58uR",
        age: 28,
        isDeleted: false
    },
    {
        id: "55bafe22-37c0-496b-87d6-18d4b97a4ffc",
        login: "James",
        password: "xdjmdZd2NIO0",
        age: 19,
        isDeleted: false
    },
    {
        id: "aabae4be-5eeb-4f78-8f1a-f9a9ac6ec1db",
        login: "Robert",
        password: "FAWxK5eViOk9",
        age: 18,
        isDeleted: false
    },
    {
        id: "ae9d999d-e960-465b-ad48-464f568b724f",
        login: "Mary",
        password: "SvZp8D0q1Z4G",
        age: 33,
        isDeleted: false
    },
    {
        id: "c1ae2cc2-238f-4d3a-b821-ad52cd453145",
        login: "John",
        password: "Wnb20vSOr7nG",
        age: 48,
        isDeleted: false
    },
    {
        id: "39c2058a-951f-4642-af31-1a7b5ca88ee6",
        login: "User35869",
        password: "asdasdsadRTY6464",
        age: 75,
        isDeleted: false
    },
    {
        id: "929fc3e8-ea3a-4505-a7fb-001f5a922689",
        login: "Marat",
        password: "TFTRggsg354",
        age: 49,
        isDeleted: false
    },
    {
        id: "8276f0aa-bbe0-46cf-b4cd-e561893aab37",
        login: "User904f8c14",
        password: "6vCDGM6TZqlK",
        age: 25,
        isDeleted: false
    },
    {
        id: "b0128a3a-3b4e-448f-a0f3-0b381e48b07e",
        login: "User8276f0aa",
        password: "dfsf776wrwrK",
        age: 37,
        isDeleted: false
    },
    {
        id: "dcb1a934-07ff-40c8-b3ec-12f8e13dd204",
        login: "Javdet",
        password: "sdjffjkdjkRTY",
        age: 120,
        isDeleted: false
    }
];
  
async function createUsers() {
    await User.sync({ force: true });
    await User.bulkCreate(users);
}

module.exports = createUsers;