const User = require('../models').User
const db = require('../models/index');

async function findUserById(userId) {
    if (!userId) throw new Error('Invalid argument: User Id')

    const userAcct = await User.findOne({
        where: {user_id: userId},
        raw: true
    });

    if (userAcct) return userAcct;

    return null;
}

async function findUserCredentialsByEmail(email) {
    if (!email) throw new Error('Invalid argument: email')

    const user = await User.findOne({
        attributes: ['email', 'password'],
        where: {email: email},
        raw: true
    });

    if (user) return user;

    return null;
}

async function findUserByEmail(email) {
    if (!email) throw new Error('Invalid argument: email')

    const user = await User.findOne({
        attributes: [['user_id', 'id'], 'email', 'description', 'first_name', 'last_name', 'gender', 'date_of_birth'],
        where: {email: email},
        raw: true
    });

    if (user) return user;

    return null;
}

async function createUserAccount(email, password) {
    if (!email) throw new Error('Invalid argument: email')
    if (!password) throw new Error('Invalid argument: password')

    try {
        const userAcct = await User.create({
            email: email,
            description: "",
            password: password,
            created_by: email,
            updated_by: email
        });
        if (userAcct) return userAcct;
    } catch (error) {
        // TODO: Catch error and log it
        //logger.debug(error);
        console.log(error);
    }

    return null;
}

/**
 * Find nearby 'X' miles places by latitude and longitude. Code taken from :
 * http://stackoverflow.com/questions/2234204/latitude-longitude-find-nearest-latitude-longitude-complex-sql-or-complex-calc
 *
 * @param   latitude
 * @param   longitude
 *
 * @return  Place
 */

// TODO: Can also change this sql to stored procedure for faster query speed
// Taken from -> https://www.scribd.com/presentation/2569355/Geo-Distance-Search-with-MySQL
async function findNearbyUsers(user, lat, long) {
    const MAXIMUM_DISTANCE_AWAY = 10; // This is the max distance (in miles) away from latlong in which to search

    const sql = "SELECT u.*, 3956 * 2 * ASIN(SQRT(POWER(SIN((:latitude" +
        " - g.latitude) * PI() / 180 / 2), 2) + COS(:latitude" +
        " * PI() / 180) * COS(g.latitude * PI() / 180) * POWER(SIN((:longitude" +
        " - g.longitude) * PI() / 180 / 2), 2))) as distance " +
        "FROM User u, UserAddresses ua, GeoLocation g " +
        "WHERE u.user_id = ua.user_id " +
        "AND ua.geo_id = g.geo_id " +
        "AND g.longitude between (:longitude - " + MAXIMUM_DISTANCE_AWAY + "/abs(cos(radians(:latitude)) * 69)) and (:longitude + " + MAXIMUM_DISTANCE_AWAY + "/abs(cos(radians(:latitude)) * 69)) " +
        "AND g.latitude between (:latitude - (" + MAXIMUM_DISTANCE_AWAY + " / 69)) and (:latitude + (" + MAXIMUM_DISTANCE_AWAY + " / 69)) " +
        "having distance < " + MAXIMUM_DISTANCE_AWAY + " ORDER BY distance limit 100";

    const records = await db.sequelize.query(sql,
        { replacements: {latitude: lat, longitude: long} });

    if (records) return records;

    return null;
}

async function findNearbyFriends(user, lat, long) {
    const MAXIMUM_DISTANCE_AWAY = 10; // This is the max distance (in miles) away from latlong in which to search

    const sql = "SELECT u.*, 3956 * 2 * ASIN(SQRT(POWER(SIN((:latitude" +
        " - g.latitude) * PI() / 180 / 2), 2) + COS(:latitude" +
        " * PI() / 180) * COS(g.latitude * PI() / 180) * POWER(SIN((:longitude" +
        " - g.longitude) * PI() / 180 / 2), 2))) as distance " +
        "FROM User u, Friend f, UserAddresses ua, GeoLocation g " +
        "WHERE u.user_id = ua.user_id " +
        "AND ua.geo_id = g.geo_id " +
        "AND g.longitude between (:longitude - " + MAXIMUM_DISTANCE_AWAY + "/abs(cos(radians(:latitude)) * 69)) and (:longitude + " + MAXIMUM_DISTANCE_AWAY + "/abs(cos(radians(:latitude)) * 69)) " +
        "AND g.latitude between (:latitude - (" + MAXIMUM_DISTANCE_AWAY + " / 69)) and (:latitude + (" + MAXIMUM_DISTANCE_AWAY + " / 69)) " +
        "having distance < " + MAXIMUM_DISTANCE_AWAY + " ORDER BY distance limit 100";

    const records = await db.sequelize.query(sql,
        { replacements: {latitude: lat, longitude: long} });

    if (records) return records;

    return null;
}

async function updateUserProfile(user, description, firstName, lastName, gender, date_of_birth) {

    console.error(user);
    console.error(user.id);
    try {
        const promise = await User.update({
            description: description,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            date_of_birth: date_of_birth
        }, {where: {user_id: user.id}});

        if (promise) return promise[0];

    } catch (error) {
        // TODO: Catch error and log it
        //logger.error(error);
        console.error(error);
    }

    return null;
}

async function changePassword(user, password) {

    try {
        const promise = await User.update({
            password: password
        }, {where: {user_id: user.id}});

        if (promise) return promise[0];

    } catch (error) {
        // TODO: Catch error and log it
        //logger.error(error);
        console.error(error);
    }

    return null;
}

module.exports = {
    findUserById,
    findUserCredentialsByEmail,
    findUserByEmail,
    createUserAccount,
    updateUserProfile,
    findNearbyUsers,
    findNearbyFriends
};
