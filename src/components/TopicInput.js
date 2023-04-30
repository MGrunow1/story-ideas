import LoadingSpinner from "./LoadingSpinner";

export default function TopicInput() {
    const isLoading = true;//TODO: delete and replace with props
    return (
        <>
        <input type="text" aria-label="Enter topic here" placeholder="Enter topic here" />
        {isLoading ? (
            <div>
                <LoadingSpinner />
            </div>
        ) : (
            <button>Submit</button>
        )}
        </>
    )
}
