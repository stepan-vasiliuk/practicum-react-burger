import styles from './profileOrderInfoPage.module.css';
import OrderInfo from "../../../components/orderInfo/orderInfo";
export default function ProfileOrderInfoPage() {

    return (
        <div className={styles.page}>
            <OrderInfo />
        </div>
    );
}