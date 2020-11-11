// tslint:disable: jsx-no-lambda
import * as React from 'react'
import LoginForm from './login';
import SignupForm from './signup';
import './styles.scss';

const Auth: React.FC = () => {
    const [showSignup, setShowSignup] = React.useState(0);

    return (
        <>
            {showSignup ? (
                <SignupForm onLogin={() => setShowSignup(0)} />
            ) : (
                    
                    <LoginForm onSignup={() => setShowSignup(1)} />
                )}
        </>
    );
};


export default Auth;