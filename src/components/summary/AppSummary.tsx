interface AppsProps {
    usageTime: number
    limit: number
}

interface AppSummaryProps {
    data: {
        [appName: string]: AppsProps
    }
}

export default function AppSummary({ data }: AppSummaryProps) {
    return (
        <ul>
            {Object.entries(data).map(([appName, appDetails]) => (
                <li key={appName}>
                    <strong>{appName}: </strong>
                    <ul>
                        <li>Usage time: {appDetails.usageTime}</li>
                        <li>Limit: {appDetails.limit === Infinity ? 0 : appDetails.limit}</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}