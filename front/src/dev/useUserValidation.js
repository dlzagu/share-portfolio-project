import Validation from "../util/validation/validation";

const useUserValidation = () => {
    const checkValidationEmail = (email) => {
        return Validation.validateUserEmail(email);
    };

    const checkValidationPassword = (password) => {
        return Validation.validateUserPassword(password);
    };

    const checkValidationDescription = (description) => {
        return Validation.validateUserDescription(description);
    };

    return [
        checkValidationEmail,
        checkValidationPassword,
        checkValidationDescription,
    ];
};

export default useUserValidation;
