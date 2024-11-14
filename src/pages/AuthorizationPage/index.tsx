import { RoleSelector, AuthForm, RegForm } from './ui';
import { useSearchParams } from 'react-router-dom';

const AuthorizationPage = () => {
    const [searchParams] = useSearchParams();

    const renderForm = () => {
        const formType = searchParams.get('form');

        switch (formType) {
            case 'authStudent':
                return <AuthForm />;
            case 'regStudent':
                return <RegForm />;
            case 'authCoach':
                return <AuthForm />;
            default:
                return <RoleSelector />;
        }
    };

    return <div>{renderForm()}</div>;
};

export default AuthorizationPage;
