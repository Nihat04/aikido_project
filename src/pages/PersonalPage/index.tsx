import { useSelector } from 'react-redux';
import Header from '../../widgets/Header/Header';
import { RootState } from '../../features/store/store';

const PersonalPage = () => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <>
            <Header />
            <main>
                <h2>{user?.userName}</h2>
                <h2>{user?.email}</h2>
            </main>
        </>
    );
};

export default PersonalPage;
