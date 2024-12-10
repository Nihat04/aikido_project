import { useNavigate } from 'react-router-dom';

import { DecisionModal } from './DecisionModal';

export const UnauthorizedModal = () => {
    const navigate = useNavigate();
    return (
        <DecisionModal
            btns={[
                {
                    text: 'Войти',
                    action: () =>
                        (location.href = `./login?next=${location.href}`),
                },
                {
                    text: 'Отмена',
                    action: () => navigate(-1),
                },
            ]}
        >
            <div>
                <p>Нужно войти, чтобы получить доступ к этой странице</p>
                <p style={{ textAlign: 'center' }}>Войти?</p>
            </div>
        </DecisionModal>
    );
};
