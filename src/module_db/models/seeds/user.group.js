const { UserGroup } = require('../');

const userGroups = [
    {
        id: "3fb2ddb4-5c3a-4c79-8068-b74808e863ac",
        userId: "dcb1a934-07ff-40c8-b3ec-12f8e13dd204",
        groupId: "7cb9d26d-0413-4b6f-8a6b-8af9d737850b"
    },
    {
        id: "50f9c05c-913a-4214-80bc-54fbca9d0216",
        userId: "a49594e5-dfec-46e6-84f2-979f8b8a7b37",
        groupId: "89aaf353-26d2-400a-81cf-4e7e73f8b8e8"
    },
    {
        id: "37f2208e-6aca-4559-98fd-eb1eb66cd341",
        userId: "3cd83e1b-becd-4ed4-8a9b-70d2a80243bc",
        groupId: "89aaf353-26d2-400a-81cf-4e7e73f8b8e8"
    },
    {
        id: "223cfd9c-7385-49f1-b7dc-6178d17e8405",
        userId: "39c2058a-951f-4642-af31-1a7b5ca88ee6",
        groupId: "89aaf353-26d2-400a-81cf-4e7e73f8b8e8"
    },
    {
        id: "1b9f2be6-9cf4-40ec-896f-238eb3f3a2dd",
        userId: "b0128a3a-3b4e-448f-a0f3-0b381e48b07e",
        groupId: "1449dc53-6dac-42fa-a967-e47d7f778430"
    },
    {
        id: "01c82f8c-4322-4786-8ff2-3d074af1d191",
        userId: "8276f0aa-bbe0-46cf-b4cd-e561893aab37",
        groupId: "1449dc53-6dac-42fa-a967-e47d7f778430"
    },
    {
        id: "8057513f-be58-4de1-b3db-74590e0eceb8",
        userId: "3faf376b-ab6d-4291-9f79-b4875b951e41",
        groupId: "09625bc9-fe4d-41c8-9762-86a855e7e47d"
    },
    {
        id: "4c85771d-0edb-4eb8-952d-cf5c0c30f0d8",
        userId: "55bafe22-37c0-496b-87d6-18d4b97a4ffc",
        groupId: "da26d4fd-d314-4ccc-9c21-1c8900fe43d4"
    },
    {
        id: "6d9e7907-9d39-468e-ae1a-1d37d43b0457",
        userId: "aabae4be-5eeb-4f78-8f1a-f9a9ac6ec1db",
        groupId: "a9588fff-378d-4a15-95e3-2d9ae66b0a14"
    },
    {
        id: "01991192-b04f-48dd-b8fe-b385f08616ab",
        userId: "ae9d999d-e960-465b-ad48-464f568b724f",
        groupId: "09625bc9-fe4d-41c8-9762-86a855e7e47d"
    },
    {
        id: "3feea44c-646d-4f2b-8596-070ea3eedb4e",
        userId: "c1ae2cc2-238f-4d3a-b821-ad52cd453145",
        groupId: "09625bc9-fe4d-41c8-9762-86a855e7e47d"
    },
    {
        id: "aae55c64-a80a-41ed-9bb3-eb6d7ba89825",
        userId: "929fc3e8-ea3a-4505-a7fb-001f5a922689",
        groupId: "09625bc9-fe4d-41c8-9762-86a855e7e47d"
    }
];
  
async function createUserGroups() {
    await UserGroup.sync({ force: true });
    await UserGroup.bulkCreate(userGroups);
}

module.exports = createUserGroups;