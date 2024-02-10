const router = require("express").Router();
const Users = require("../controller/users/users.controller");

router.get("/get-user-profile", Users.getUserProfile);
router.patch("/update-user-profile", Users.updateProfile);
router.get("/show-user-profile", Users.showUserProfile);
router.get("/get-all-users", Users.getAllUsers);
router.delete("/delete-users", Users.deleteUser);

router.post("/follow-user", Users.followUser);
router.get("/get-follow-requests", Users.getFollowRequests);
router.post("/accept-follow-requests", Users.acceptFollowRequest);
router.post("/unfollow-user", Users.unfollowUser);

module.exports = router;
