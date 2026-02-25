export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiKey = body.apiKey;

    if (!apiKey) {
      return Response.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Request failed' },
      { status: 500 }
    );
  }
}
