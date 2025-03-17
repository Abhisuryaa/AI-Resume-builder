# AI Resume Builder

An AI-powered resume builder that helps users create professional resumes tailored to specific job descriptions. The application uses AI to analyze job descriptions and optimize resumes to highlight relevant skills and experience.

## Features

- User-friendly form for entering resume information
- AI-powered resume generation using OpenAI and HuggingFace
- Responsive design that works on desktop and mobile
- Fallback to template-based generation when AI services are unavailable
- Preview and download options for generated resumes

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- HuggingFace Inference API

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AI-Resume-builder.git
   cd AI-Resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

### Deploying to Vercel

The easiest way to deploy this application is using Vercel:

1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Run the following command in the project directory:
   ```bash
   vercel
   ```

4. Follow the prompts to deploy your application
5. Add your API keys as environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" tab
   - Add `OPENAI_API_KEY` and `HUGGINGFACE_API_KEY` with your API keys

### Alternative Deployment Options

You can also deploy this application to other platforms like:

- Netlify
- AWS Amplify
- GitHub Pages (with some additional configuration)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
