import profileStyles from "./profilePage.module.css";
import {Outlet} from "react-router-dom";

export default function ProfilePage() {

    return (
        <div className={`mt-30 ${profileStyles.profile}`}>
            <section className={profileStyles.static}>
                <ul className={profileStyles.menu}>
                    <li className={profileStyles.menu_item}>
                        <h2 className='text text_type_main-medium'>Профиль</h2>
                    </li>
                    <li className={profileStyles.menu_item}>
                        <h2 className='text text_type_main-medium'>История заказов</h2>
                    </li>
                    <li className={profileStyles.menu_item}>
                        <h2 className='text text_type_main-medium'>Выход</h2>
                    </li>
                </ul>
                <div className={profileStyles.page_description}>
                    <p className='text text_type_main-small text_color_inactive'>В этом разделе вы можете<br/>
                        изменить свои персональные данные</p>
                </div>
            </section>
            <section className={profileStyles.dynamic_page}>
                <Outlet />
            </section>
        </div>
    )
}