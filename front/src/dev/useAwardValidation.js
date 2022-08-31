import Validation from '../util/validation/validation';

const useAwardValidation = () => {
    const checkValidationTitle = (title) => {
        return Validation.validateAwardTitle(title);
    };

    const checkValidationDetail = (detail) => {
        return Validation.validateAwardDetail(detail);
    };

    const checkValidationAll = (title, detail) => {
        return [title, detail].every((v) => v === true);
    };

    return [checkValidationTitle, checkValidationDetail, checkValidationAll];
};

export default useAwardValidation;
