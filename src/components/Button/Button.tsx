import styles from './Button.module.css'

type ButtonProps = {
    type: "image" | "text"
    value: string,
    className: string,
    onClick: () => void,
}

function Button({ type, value, onClick, className }: ButtonProps) {
    if (type == "text") {
        return (
            <button className={`${styles.button} ${className}`} onClick={onClick}>{value}</button>
        )
    } else if (type == "image") {
        return (<button className={`${styles.button} ${className}`} onClick={onClick}><img src={value} /> </button>)
    }
}

export {
    Button
}