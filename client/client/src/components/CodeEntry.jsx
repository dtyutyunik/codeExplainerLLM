import Header from './Header'
import CodeExplainForm from './forms/CodeExplainForm'


const CodeEntry = () => {


    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="py-8">
                <CodeExplainForm />
            </div>
        </div>
    )
}

export default CodeEntry;