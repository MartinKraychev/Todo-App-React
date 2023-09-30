export const Spinner = (props) => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <span className="loading-spinner-text">{props.spinnerText}</span>
            </div>
        </div>
    )
}