import { getCategorySummary } from "../../utils/categorySummary";
import { Apps } from "../../types/types";
import AppSummary from "./AppSummary";

interface CategorySummaryProps {
    data: Apps
}

export default function CategorySummary({ data }: CategorySummaryProps) {
    const categorySummary = getCategorySummary(data)
    return (
        <div>
            <ul>
                {Object.entries(categorySummary).map(([category, totalUsage]) => (
                    <li key={category}>
                        <span><strong>{category}: </strong></span>
                        <ul>
                            <li>Total usage time: {totalUsage} </li>
                            <li>Limit: {data[category].categoryLimit === Infinity ? 0 : data[category].categoryLimit}</li>
                            <li><strong>Apps: </strong></li>
                        </ul>
                        <ul>
                            <AppSummary data={data[category].apps}/>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}