export interface Person {
    fullName: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    newsletterSubscription: boolean;
  }