const { Group } = require('../');

const groups = [
    {
        id: "09625bc9-fe4d-41c8-9762-86a855e7e47d",
        name: "Guest",
        permissions: [
            "READ"
        ]
    },
    {
        id: "89aaf353-26d2-400a-81cf-4e7e73f8b8e8",
        name: "User",
        permissions: [
            "READ",
            "WRITE"
        ]
    },
    {
        id: "da26d4fd-d314-4ccc-9c21-1c8900fe43d4",
        name: "Author",
        permissions: [
            "READ",
            "WRITE",
            "SHARE",
            "UPLOAD_FILES"
        ]
    },
    {
        id: "1449dc53-6dac-42fa-a967-e47d7f778430",
        name: "Super User",
        permissions: [
            "READ",
            "WRITE",
            "UPLOAD_FILES"
        ]
    },
    {
        id: "a9588fff-378d-4a15-95e3-2d9ae66b0a14",
        name: "File Manager",
        permissions: [
            "SHARE",
            "UPLOAD_FILES"
        ]
    },
    {
        id: "7cb9d26d-0413-4b6f-8a6b-8af9d737850b",
        name: "Admin",
        permissions: [
            "READ",
            "WRITE",
            "DELETE",
            "SHARE",
            "UPLOAD_FILES"
        ]
    }
];
  
async function createGroups() {
    await Group.sync({ force: true });
    await Group.bulkCreate(groups);
}

module.exports = createGroups;