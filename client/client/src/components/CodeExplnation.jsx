import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeExplnation = ({ explanation }) => {

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(explanation); // copy the explanation to the clipboard
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    }

    return (
        <div className="bg-gray-50 p-6 rounded-lg mt-6 border border-gray-200">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Explanation</h2>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    title="Copy explanation to clipboard"
                >
                    {copied ? (
                        <>
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-600">Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="prose prose-sm max-w-none text-gray-800">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900" {...props} />,
                        h4: ({ node, ...props }) => <h4 className="text-base font-semibold mt-3 mb-2 text-gray-900" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1 ml-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal mb-3 space-y-2 ml-6" style={{ listStylePosition: 'outside' }} {...props} />,
                        li: ({ node, ...props }) => <li className="mb-1 leading-relaxed pl-2" style={{ display: 'list-item' }} {...props} />,
                        code: ({ node, inline, ...props }) =>
                            inline
                                ? <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                                : <code className="block bg-gray-100 p-3 rounded mb-3 overflow-x-auto text-sm font-mono" {...props} />,
                        pre: ({ node, ...props }) => <pre className="bg-gray-100 p-3 rounded mb-3 overflow-x-auto" {...props} />,
                    }}
                >
                    {explanation}
                </Markdown>
            </div>
        </div>
    )
}

export default CodeExplnation;