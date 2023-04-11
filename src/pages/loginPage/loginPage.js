import loginStyles from '../formStyles.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [passWord, setPassword] = useState('');

    const location = useLocation();
    const someState = useSelector(state => state.dataReducer.data);

    // const [searchEmail, setSearchEmail] = useSearchParams();
    const onEmailChange = (e) => {
        // let filter = e.target.value;
        // if (filter) {
        //     setSearchEmail({filter});
        // } else {
        //     setSearchEmail({});
        // }
        setEmail(e.target.value);
    }

    useEffect(() => {
        console.log('Location>>>', JSON.stringify(location));
        // console.log('Stringify test>>> ', JSON.stringify(someState));
    }, [])


    const onPasswordChange = e => {
        setPassword(e.target.value);
    }



    const onFormSubmit = useCallback((event) => {
        event.preventDefault();
    }, []);

    return (
        <div className={loginStyles.wrapper}>
            <form className={loginStyles.form_flexbox} onSubmit={onFormSubmit}>
                <h1 className='text text_type_main-medium'>Вход</h1>
                <EmailInput value={email} onChange={e => onEmailChange(e)}/>
                <PasswordInput value={passWord} onChange={e => onPasswordChange(e)}/>
                <Button htmlType="submit" type='primary' size='medium'>Войти</Button>
            </form>
            <section className={loginStyles.bottom_section}>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</p>
                    <Link to='/register' >
                        <p className='text text_type_main-small text_color_accent'>Зарегистрироваться</p>
                    </Link>
                </div>
                <div className={loginStyles.bottom_text}>
                    <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
                    <Link to='/forgot-password'>
                        <p className='text text_type_main-small text_color_accent'>Восстановить пароль</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}