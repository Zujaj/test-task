import { Person } from "../interfaces/person";

const validateForm = (personData:Person) => {
  const errorObject: { [key: string]: string } = {};
  const nameRegEx = /^[a-zA-Z ]+$/;
  const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  if (!personData.fullName) {
    errorObject.fullName = 'Full name is required';
  } else if (!nameRegEx.test(personData.fullName)) {
    errorObject.fullName = 'Full name cannot contain special characters';
  }
  if (!personData.emailAddress) {
    errorObject.emailAddress = 'Email address is required';
  } else if (!emailRegEx.test(personData.emailAddress)) {
    errorObject.emailAddress = 'Invalid email address format';
  }
  if (!personData.password) {
    errorObject.password = 'Password is required';
  } else if (personData.password.length < 8) {
    errorObject.password = 'Password must be at least 8 characters';
  }
  if (!personData.confirmPassword) {
    errorObject.confirmPassword = 'Confirm password is required';
  } else if (personData.confirmPassword !== personData.password) {
    errorObject.confirmPassword = 'Passwords must match';
  }
  if (!personData.dateOfBirth) {
    errorObject.dateOfBirth = 'Date of birth is required';
  }
  return errorObject;
};

export { validateForm };