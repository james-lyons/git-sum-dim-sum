module.exports = (
    {
        name,
        email,
        password,
        password2
    }) => {

    let errors = [];

    if (!name) {
        errors.push({ message: 'Please enter your name' });
    };

    if (!email) {
        errors.push({ message: 'Please enter your email' });
    };

    if (!password) {
        errors.push({ message: 'Please enter your password' });
    };

    if (!password2) {
        errors.push({ message: 'Please enter your password' });
    };

    if (password !== password2) {
        errors.push({ message: 'Passwords must match' });
    };

    return {
        errors,
        notValid: Boolean(errors.length)
    };
};