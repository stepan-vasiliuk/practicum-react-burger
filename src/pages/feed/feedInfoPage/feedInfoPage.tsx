import styles from "./feedInfoPage.module.css";
import OrderInfo from "../../../components/orderInfo/orderInfo";

export default function FeedInfoPage() {

    return (
        <div className={styles.page_root}>
            <OrderInfo />
        </div>
    );
}