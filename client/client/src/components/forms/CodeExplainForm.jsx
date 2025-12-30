import { useActionState, useState } from 'react';
import { explainCode } from '../../actions';
import CodeExplnation from '../CodeExplnation';
import Error from '../Error';



const CodeExplainForm = () => {

    const [state, formAction, isPending] = useActionState(explainCode, null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');

    const clearForm =()=>{
        setCode('');
        setLanguage('javascript');
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm">

            <form className="space-y-6" action={formAction}>
                <div>
                    <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        Language:
                    </label>
                    <select
                        name="language"
                        className='w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                   appearance-none cursor-pointer'
                        defaultValue="javascript"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                <div>
                    <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        Your Code:
                    </label>
                    <textarea
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className='w-full px-4 py-3 rounded-lg border border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                   resize-none text-gray-900 placeholder-gray-400'
                        rows={12}
                        placeholder='Paste your code here...'
                        required
                    />
                </div>

                <div className="flex justify-between pt-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className='px-8 py-3 bg-blue-600 text-white font-medium rounded-lg
                                   hover:bg-blue-700 focus:outline-none 
                                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                   transition-colors duration-200
                                   disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isPending ? 'Explaining...' : 'Explain Code'}
                    </button>
                    <button
                        type="button"
                        onClick={clearForm}
                        className='px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300'>
                        Clear
                    </button>
                </div>
            </form>

            {
                isPending ? (
                    <div className="bg-gray-50 p-6 rounded-lg mt-6 border border-gray-200 animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
                        <div className="space-y-3 mt-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                ) : state?.success ? (
                    <CodeExplnation explanation={state?.data.explanation} />
                ) : (
                    <Error error={state?.error} />
                )
            }


        </div>
    )
}

export default CodeExplainForm;