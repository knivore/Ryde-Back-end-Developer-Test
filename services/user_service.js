const User = require('../models').User

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
    updateUserProfile
};
