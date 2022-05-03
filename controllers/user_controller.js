const { validationResult } = require('express-validator');
const userService = require('../services/user_service');

function updateUserProfile(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({status: 'error', errors: errors.array()});
    }

    userService.updateUserProfile(req.user, req.body.profile.description, req.body.profile.first_name, req.body.profile.last_name, req.body.profile.gender, req.body.profile.date_of_birth).then(result => {
        if (result > 0)
            return res.status(200).json({status: 'success'})
        else
            return res.status(200).json({status: 'error', message: 'Error updating profile'});
    });
}

function findNearbyUsers(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({status: 'error', errors: errors.array()});
    }

    userService.findNearbyUsers(req.user, req.body.lat, req.body.long).then(result => {
        if (result > 0)
            return res.status(200).json({status: 'success'})
        else
            return res.status(200).json({status: 'error', message: 'Unable to obtain any nearby friends'});
    });
}

module.exports = {
    updateUserProfile,
    findNearbyUsers
};
