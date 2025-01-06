import { getCategorySummary } from "../../utils/categorySummary";
import { Apps } from "../../types/types";

interface CategorySummaryProps {
    data: Apps
}

export default function CategorySummary({ data }: CategorySummaryProps) {
    const categorySummary = getCategorySummary(data)
    return (
        <div>
            {Object.entries(categorySummary).map(([key, value]: [string, number]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))}
        </div>
    )
}