export const explainCode = async (prevState, formData) => {

    const code = formData.get('code');
    const language = formData.get('language');

    try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';
        const response = await fetch(`${apiUrl}/explainCode`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, language }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to explain code' }));
            return {
                success: false,
                error: errorData.error || 'Failed to explain code',
            }
        }

        const data = await response.json();
        return {
            success: true,
            data: {
                explanation: data.response
            }
        };


    } catch (error) {
        return {
            success: false,
            error: error.message || 'Network error occurred'
        };
    }

}