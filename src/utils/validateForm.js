export const checkValidData = (email, password) => {
    const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password);

    if (!emailValid || !passwordValid) {
        return {
            emailValid,
            passwordValid,
            message: 'Invalid email or password entered.'
        };
    }
    return emailValid && passwordValid;
}