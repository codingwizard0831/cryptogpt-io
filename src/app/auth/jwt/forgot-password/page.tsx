import { JwtForgotPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Authentication: Forgot Password',
};

export default function ForgotPasswordPage() {
  return <JwtForgotPasswordView />;
}
