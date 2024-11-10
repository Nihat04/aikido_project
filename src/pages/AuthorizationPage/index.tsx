import { RoleSelector, AuthForm, RegForm } from './ui';
import { useSearchParams } from 'react-router-dom';

const AuthorizationPage = () => {
    const [searchParams] = useSearchParams();

    const renderForm = () => {
        const formType = searchParams.get('form');

        switch (formType) {
            case 'auth':
                return <AuthForm />;
            case 'reg':
                return <RegForm />;
            case 'authStudent':
                return <AuthForm />;
            default:
                return <RoleSelector />;
        }
    };

    return <div>{renderForm()}</div>;
};

export default AuthorizationPage;
