import CategorySummary from "../summary/CategorySummary"
import SelectCategory from "../select/SelectCategory"
import Alert from "../common/alert/Alert"
import { useLimit } from "../../hooks/useLimit"
import { useData } from "../../hooks/useData"
import styles from "./Dashboard.module.css"


export default function Dashboard() {
    const { data } = useData()
    const { isAlertVisible, statusMessage, setIsAlertVisible } = useLimit()

    return (
        <>
            <div className={styles.container}>
                <CategorySummary data={data} />
                <SelectCategory/>
            </div>
            {isAlertVisible &&
                <Alert
                    type={statusMessage.status.toLowerCase() === "success" ? "success" : "error"}
                    message={statusMessage.reason}
                    onClose={() => setIsAlertVisible(false)}
                />
            }
        </>
    )
}