import Validation from "../util/validation/validation";

const useEducationValidation = () => {
  const checkValidationUniversity = (university) => {
    return Validation.validateEducatuinUniversity(university);
  };

  const checkValidationMajor = (major) => {
    return Validation.validateEducatuinMajor(major);
  };

  const checkValidationStatus = (status) => {
    return Validation.validateEducatuinStatus(status);
  };
  const checkValidationEducationAll = (university, major, status) => {
    return [university, major, status].every((v) => v === true);
  };

  return {
    checkValidationUniversity,
    checkValidationMajor,
    checkValidationEducationAll,
    checkValidationStatus,
  };
};

export default useEducationValidation;
