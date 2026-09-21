export const config = {
  runtime: "nodejs",
};

export default function handler(req: any, res: any) {
  res.status(200).json({
    status: "ok",
    app: "SafeDrill",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    platform: "vercel-serverless",
    timestamp: new Date().toISOString(),
  });
}
