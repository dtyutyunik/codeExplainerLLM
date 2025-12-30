const Error = ({ error }) => {
    if (!error) return null;
    
    return (
        <div className="bg-red-100 p-4 rounded-lg mt-4">
            <p className="text-red-900">{error}</p>
        </div>
    )
}

export default Error;