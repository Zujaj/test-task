import * as Yup from 'yup';
import { Person } from "../interfaces/person"; // Importing the Person interface
import { formSchema } from '../schema'; // Import the Yup schema

// Async function to validate the personData using Yup schema
const validateForm = async (personData: Person) => {
  try {
    // Validate form data against the Yup schema
    await formSchema.validate(personData, { abortEarly: false });
    return {}; // Return an empty error object if no errors
  } catch (err) {
    const errorObject: { [key: string]: string } = {};

    // If the error is a Yup validation error
    if (err instanceof Yup.ValidationError) {
      // Loop through the validation errors and map them to errorObject
      err.inner.forEach((error) => {
        if (error.path) {
          errorObject[error.path] = error.message;
        }
      });
    }

    return errorObject; // Return the error object with field-specific error messages
  }
};

export { validateForm };
