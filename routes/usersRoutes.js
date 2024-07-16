const express = require('express');
const UserController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const router = express.Router();

router.post('/', UserController.createUser); // POST request to create a new user
router.get('/check/:username', UserController.checkUsernameExists); // GET request to check if a username exists
router.get('/picture/:username', UserController.getPictureByUsername); // GET request to fetch user's profile picture by username
router.put('/:username', UserController.updateUser); // PUT request to update user information by username
router.delete('/:username', UserController.deleteUser); // DELETE request to delete user by username
router.get('/:username', UserController.getUserByUsername); // GET request to fetch user information by username
router.post('/password', UserController.updatePassword); // POST request to update user password
router.get('/:id/videos', UserController.getVideosByUploader); // GET request to fetch videos uploaded by a user

// Video routes nested under user
router.route('/:username/videos/:id')
    .get(videoController.getVideo) // GET request to fetch a specific video by its ID uploaded by a user
    .patch(videoController.updateVideo) // PATCH request to update a specific video by its ID uploaded by a user
    .delete(videoController.deleteVideo); // DELETE request to delete a specific video by its ID uploaded by a user

module.exports = router;
