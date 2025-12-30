# Code Explainer LLM

A web application that uses OpenAI's GPT models to explain code snippets. Users can paste code, select a programming language, and receive detailed explanations with usage examples.

## Features

- 🤖 **AI-Powered Explanations**: Uses OpenAI GPT-4o-mini to provide comprehensive code explanations
- 📝 **Multiple Languages**: Support for JavaScript, Python, Java, and more
- 📋 **Usage Examples**: Automatically includes practical usage examples
- 📄 **Markdown Support**: Formatted explanations with code blocks, headings, and lists
- 📋 **Copy to Clipboard**: Easy copy functionality for explanations
- 🎨 **Modern UI**: Clean, responsive design built with React and Tailwind CSS
- ⚡ **Fast & Efficient**: Optimized with React Server Actions

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Markdown** - Markdown rendering
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **OpenAI API** - AI explanations
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dtyutyunik/codeExplainerLLM.git
   cd codeExplainerLLM
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client/client
   npm install
   cd ../..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3002
   FRONTEND_URL=http://localhost:5173
   ```

   Create a `.env` file in `client/client/`:
   ```bash
   cd client/client
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:3002
   ```

## Running the Application

### Development Mode

1. **Start the server** (from root directory)
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:3002`

2. **Start the client** (in a new terminal, from `client/client/`)
   ```bash
   cd client/client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

1. Select a programming language from the dropdown
2. Paste your code into the text area
3. Click "Explain Code"
4. View the detailed explanation with:
   - Code breakdown
   - Component/function analysis
   - Usage examples
   - Best practices and notes
5. Use the "Copy" button to copy the explanation
6. Use "Clear" to reset the form

## Project Structure

```
codeExplainerLLM/
├── server/
│   └── server.js          # Express server and API endpoints
├── client/
│   └── client/
│       ├── src/
│       │   ├── components/    # React components
│       │   ├── actions/       # Server actions
│       │   └── App.jsx        # Main app component
│       └── package.json
├── .env.example            # Server environment template
└── README.md
```

## API Endpoints

### POST `/api/explainCode`

Explains code using OpenAI.

**Request Body:**
```json
{
  "code": "function add(a, b) { return a + b; }",
  "language": "javascript",
  "question": "What does this function do?" // optional
}
```

**Response:**
```json
{
  "response": "## Explanation\n\nThis function..."
}
```

## Environment Variables

### Server (.env)
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3002)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

### Client (.env)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3002)

## Security

- API keys are stored in `.env` files (never commit these!)
- Rate limiting enabled (100 requests per 15 minutes)
- Helmet.js for security headers
- CORS configured for specific origins
- Input validation on server side

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Author

dtyutyunik

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/dtyutyunik/codeExplainerLLM/issues).
