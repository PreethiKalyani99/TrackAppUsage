import React from "react"
import success from "../../../assets/icons/check.png"
import error from "../../../assets/icons/mark.png"
import warning from "../../../assets/icons/warning.png"
import info from "../../../assets/icons/information.png"
import styles from "./Alert.module.css"

interface AlertProps {
    type: string
    message: string
    onClose: () => void
}

export default function Alert({ type, message, onClose }: AlertProps) {

    switch (type) {
        case "success":
            return (
                <DesignAlert
                    message={message}
                    onClose={onClose}
                    icon={success}
                    customStyle={{
                        color: "#4CAF50",
                        backgroundColor: "#ddffdd",
                        border: "1px solid #4CAF50"
                    }}
                />
            )
        case "error":
            return (
                <DesignAlert
                    message={message}
                    onClose={onClose}
                    icon={error}
                    customStyle={{
                        color: "#f44336",
                        backgroundColor: "#ffdddd",
                        border: "1px solid #f44336"
                    }}
                />
            )
            case "warning":
                return (
                    <DesignAlert
                        message={message}
                        onClose={onClose}
                        icon={warning}
                        customStyle={{
                            color: "black",
                            backgroundColor: "#ffffcc",
                            border: "1px solid #ffeb3b"
                        }}
                    />
                )
                case "info":
                    return (
                        <DesignAlert
                            message={message}
                            onClose={onClose}
                            icon={info}
                            customStyle={{
                                color: "#2196F3",
                                backgroundColor: "#ddffff",
                                border: "1px solid #2196F3"
                            }}
                        />
                    )
        default:
            return null
    }
}

interface DesignAlertProps {
    message: string
    onClose: () => void
    customStyle: React.CSSProperties
    icon: string
}

function DesignAlert({ message, onClose, customStyle, icon }: DesignAlertProps) {
    return (
        <div className={styles.alert_container} style={customStyle}>
            <div className={styles.message_container}>
                <img
                    src={icon}
                    alt={message}
                    className={styles.icon}
                />
                <span className={styles.message}>{message}</span>
            </div>
            { onClose &&
                <button
                    className={styles.close_btn}
                    onClick={onClose}
                    style={{ color: customStyle.color }}
                > 
                    &times;
                </button>
            }
        </div>
    )
}