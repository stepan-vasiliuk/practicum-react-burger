import profileStyles from "./profilePage.module.css";
import {NavLink, Outlet, useMatch, useResolvedPath} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useFormCustom} from "../../utils/form";
import {userLogOut} from "../../services/actions";
import headerStyles from "../../components/header/header.module.css";
import {element} from "prop-types";

export default function ProfilePage() {

    const dispatch = useDispatch();

    const onExitClick = () => {
        console.log('Выход>>> ')
        dispatch(userLogOut());
    }

    const matchPattern = useResolvedPath('').pathname;
    const isProfile = ['/profile', '/profile/orders'].find(
        (route) => route === matchPattern);


    const profilePattern = useMatch('/profile');
    const historyPattern = useMatch('/profile/orders');

    return (
        <div className={`mt-30 ${profileStyles.profile}`}>
            <section className={profileStyles.static}>
                <ul className={profileStyles.menu}>
                    <li className={profileStyles.menu_item}>
                        <NavLink to='/profile'
                                 className={profileStyles.element_text + (profilePattern ?
                                     ` ${profileStyles.active_text}` : ``)}
                        >
                            <p>Профиль</p>
                        </NavLink>
                    </li>
                    <li className={profileStyles.menu_item}>
                        <NavLink to='/profile/orders'
                                 className={profileStyles.element_text + (historyPattern ?
                                     ` ${profileStyles.active_text}` : ``)}
                        >
                            <p>История заказов</p>
                        </NavLink>
                    </li>
                    <li className={profileStyles.menu_item} onClick={onExitClick}>
                        <a className={profileStyles.element_text}>
                            <p>Выход</p>
                        </a>
                    </li>
                </ul>
                <div className={profileStyles.page_description}>
                    <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете<br/>
                        изменить свои персональные данные</p>
                </div>
            </section>
            <section className={profileStyles.dynamic_page}>
                <Outlet/>
            </section>
        </div>
    )
}