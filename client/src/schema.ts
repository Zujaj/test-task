import * as Yup from 'yup';

// Regular expression to detect emojis
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

// Regular expression for valid full name (letters, spaces, hyphens, apostrophes, and accents)
const fullNameRegex = /^[a-zA-Zà-žÀ-Ž\s'-]+$/;

export const formSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required')
        .matches(fullNameRegex, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
        .test(
            'no-emojis',
            'Full name cannot contain emojis',
            (value) => !emojiRegex.test(value || '')
        ),

    emailAddress: Yup.string()
        .required('Email address is required')
        .email('Invalid email address format')
        .test(
            'no-emojis',
            'Email address cannot contain emojis',
            (value) => !emojiRegex.test(value || '')
        ),

    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .test(
            'no-emojis',
            'Password cannot contain emojis',
            (value) => !emojiRegex.test(value || '')
        ),

    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .test(
            'no-emojis',
            'Confirm password cannot contain emojis',
            (value) => !emojiRegex.test(value || '')
        ),

    dateOfBirth: Yup.string()
        .required('Date of birth is required'),

    gender: Yup.string().required('Gender is required'),
});
