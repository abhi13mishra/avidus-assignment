const ActivityLog = require("../models/ActivityLog");

const logActivity = async (userId, action) => {
    try {
        await ActivityLog.create({
            user: userId,
            action,
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = logActivity;