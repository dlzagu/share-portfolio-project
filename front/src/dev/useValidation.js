import Validation from '../util/validation/validation';

const useValidation = () => {
    const checkValidationTitle = (title) => {
        return Validation.validateAwardTitle(title);
    };

    const checkValidationDescription = (description) => {
        return Validation.validateAwardDescription(description);
    };

    const checkValidationDate = (date) => {
        return Validation.validateDateInput(date);
    };

    const checkValidationAll = (...validations) => {
        return validations.every((v) => v === true);
    };

    return [
        checkValidationTitle,
        checkValidationDescription,
        checkValidationDate,
        checkValidationAll,
    ];
};

export default useValidation;
