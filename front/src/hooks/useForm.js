import { useCallback, useEffect, useState } from "react";
import validation from "../util/validation/validation";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [isValid, setIsValid] = useState({ all: false });

  const handleChange = useCallback(
    (e, date) => {
      if (date) {
        const name = "certificationDate";
        setValues({ ...values, [name]: date });
        return;
      }
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    },
    [values]
  );

  useEffect(() => {
    setIsValid(validation(values));
  }, [values]);

  return [values, isValid, handleChange];
};
