const Auth = ({authRoute}) => {
	return (
        <>
            LearnIt
            {authRoute === 'login' && <LoginForm />}
        </>
    )
}

export default Login