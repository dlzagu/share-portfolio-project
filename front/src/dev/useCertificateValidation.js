import Validation from "../util/validation/validation";

const useCertificateValidation = () => {
  const checkValidateCertificateTitle = (title) => {
    return Validation.validateCertificateTitle(title);
  };

  const checkValidateCertificateDetail = (detail) => {
    return Validation.validateCertificateDetail(detail);
  };

  return {
    checkValidateCertificateTitle,
    checkValidateCertificateDetail,
  };
};

export default useCertificateValidation;
