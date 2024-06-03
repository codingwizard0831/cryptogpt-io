import { JwtEmailVerifyView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
    title: 'Auth: Email Verify',
};

export default function EmailVerifyPage() {
    return <JwtEmailVerifyView />;
}
