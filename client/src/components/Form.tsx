import React, { useState } from 'react';
import '../styles/form.css';
import { validateForm } from '../utils/validateForm';
import { toast } from "react-toastify";
import { Person } from '../interfaces/person';

interface FormProps {
  onSubmit: (personData: Person) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [personData, setpersonData] = useState<Person>({
    fullName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: 'Other',
    newsletterSubscription: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setpersonData((prevpersonData) => ({ ...prevpersonData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorObject = validateForm(personData);
    if (Object.keys(errorObject).length > 0) {
      setErrors(errorObject);
      toast.error('Please fix the errors in the form!', { className: "errorToast" })
    } else {
      setIsSubmitted(true);
      onSubmit(personData);
      toast.success('Form submitted successfully!', { className: "succcessToast" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" data-cy="nameField" name="fullName" value={personData.fullName} onChange={handleChange} />
        {errors.fullName && !isSubmitted && <div className="error">{errors.fullName}</div>}
      </label>
      <br />
      <label>
        Email Address:
        <input type="email" data-cy="emailAddressField" name="emailAddress" value={personData.emailAddress} onChange={handleChange} />
        {errors.emailAddress && !isSubmitted && <div className="error">{errors.emailAddress}</div>}
      </label>
      <br />
      <label>
        Password:
        <input type="password" data-cy="passwordField" name="password" value={personData.password} autoComplete='true' onChange={handleChange} />
        {errors.password && !isSubmitted && <div className="error">{errors.password}</div>}
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" data-cy="confirmPasswordField" name="confirmPassword" value={personData.confirmPassword} autoComplete='true' onChange={handleChange} />
        {errors.confirmPassword && !isSubmitted && <div className="error">{errors.confirmPassword}</div>}
      </label>
      <br />
      <label>
        Date of Birth:
        <input type="date" data-cy="birthDayField" name="dateOfBirth" value={personData.dateOfBirth} onChange={handleChange} />
        {errors.dateOfBirth && !isSubmitted && <div className="error">{errors.dateOfBirth}</div>}
      </label>
      <br />
      <label>
        Gender:
        <select data-cy="genderField" name="gender" value={personData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && !isSubmitted && <div className="error">{errors.gender}</div>}
      </label>
      <br />
      <label>
        Newsletter Subscription:
        <input type="checkbox" data-cy="newsLetterField" name="newsletterSubscription" checked={personData.newsletterSubscription} onChange={handleChange} />
      </label>
      <br />
      <button data-cy="submitButton" type="submit">Submit</button>
    </form>
  );
};

export default Form;