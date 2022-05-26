// login page
// register page
// password remind page
// reset-password page
export default {
  bktohome: {
    home: 'Back to Home page',
    login: 'Back to Login page'
  },
  login: {
    heading: 'Sign In',
    subtext1: '',
    subtext2: 'Please create a new account',
    save: 'Keep me signed in',
    button: 'Sign In',
    resetting: 'Forgot Password?',
    withEmail: 'Or login with your email address',
    sns: {
      withSNS: 'Sign in with your social account',
      withFacebook: 'Sign in with Facebook',
      withGoogle: 'Sign in with Google'
    }
  },
  signup: {
    pageTitle: 'Sign Up',
    heading: 'Sign Up',
    headingModalText1: 'Free registration is </br>required to enjoy this space.',
    confirmHeading: 'Confirmation',
    note1: 'already have an account?',
    note2: 'Sign In',
    accept1: 'I agree to the',
    accept2: 'terms of service',
    accept3: '',
    confirmButton: 'Confirm',
    backButton: 'Return to Input Page',
    submitButton: 'Register',
    confirm: {
      pageTitle: 'Confirmation of registration details'
    },
    withEmail: 'Or sign up with your email address',
    sns: {
      withSNS: 'Sign up with your social account',
      withFacebook: 'Sign up with Facebook',
      withGoogle: 'Sign up with Google'
    }
  },
  temporary: {
    heading: 'Completed your temporary registration',
    text1: '',
    text2: 'An authentication email has been sent to your registered email.',
    text3: 'Click on the verification URL in the email to complete your new account registration.',
    text4: "If you don't receive the mail",
    text5: "If you don't receive the mail",
    text6:
      'If your e-mail address is incorrect, please register again from the account registration form.',
    link: 'Return to top page'
  },
  completeSignup: {
    heading: 'Completed registration',
    text1: 'Your account has been successfully registered.',
    text2: 'Please try to login and enjoy comony.',
    link: 'Sign in',
    headingError: 'Error',
    text1Error: 'The registration process has failed.',
    text2Error: "I'm sorry. Please try to register again",
    linkError: 'Sign up'
  },
  reminds: {
    pageTitle: 'Reset Password',
    heading: 'Reset Password',
    leadtext1: 'We will send you an email to reissue your password.',
    leadtext2: 'Please enter the email address you have registered.',
    button: 'Reset Password',
    link: 'Returns to sign-in page',
    successed: {
      heading: 'Email has been sent',
      leadtext1: 'We have sent you an email to reset your password.',
      leadtext2: 'Please re-register from the URL in the email you sent.'
    }
  },
  resetpw: {
    heading: 'Set your new password',
    button: 'Submit',
    completeText: 'The password reset for this email address has been completed.',
    successed: {
      heading: 'Password reset complete',
      leadtext1: 'Password resetting has been completed.',
      leadtext2: 'Please login again with your new password.'
    }
  },
  forcePwReset: {
    heading: 'Password has expired',
    text: 'Your password has expired. <br/>Please reset your password and log in again.',
    button: 'Reset password',
    backLink: 'Back To Top Page'
  },
  authenticationCode: {
    successed: {
      heading: 'Sended authentication code',
      text1: 'You have received an email with an authentication code.',
      text2: 'The authentication code is valid for one hour.',
      text3: 'Please click the URL in the email to reset your password.'
    },
    failed: {
      heading1: 'The authentication code has expired.',
      heading2: 'Confirmation email has been resent.',
      text1: 'The authentication code expires in one hour.',
      text2: 'Please click on the URL in the resent email and click on ',
      text3: 'Please reset your password.'
    }
  },
  cautionNotMainSended: {
    heading: 'If you do not receive the email',
    text1: 'Please check your spam folder.',
    text2:
      'If your email address is incorrect, please complete the account registration form again.'
  }
}
