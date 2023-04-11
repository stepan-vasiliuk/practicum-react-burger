import formStyles from '../../formStyles.module.css';
import editStyles from './editPage.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

export default function EditPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }


    return (
        <div className={editStyles.wrapper}>
            <form className={editStyles.form_flexbox}>
                <Input value={name} onChange={e => onNameChange(e)}/>
                <EmailInput value={email} onChange={e => onEmailChange(e)}/>
                <PasswordInput value={password} onChange={e => onPasswordChange(e)}/>
                <div className={editStyles.bottom_menu}>
                    <p className='text text_type_main-small text_color_accent'>Отмена</p>
                    <Button htmlType={"submit"}>Сохранить</Button>
                </div>
            </form>
        </div>
    )
}