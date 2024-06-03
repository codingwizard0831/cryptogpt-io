import { JwtResetPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Authentication: Reset Password',
};

export default function ForgotPasswordPage() {
  return <JwtResetPasswordView />;
}
