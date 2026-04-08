const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export type KanaItem = {
  id: string;
  kana: string;
  romanization: string;
  script_type: string;
};

export type DashboardStats = {
  current_level: string;
  completed_lessons: number;
  quiz_attempts: number;
};

export type QuizResultInput = {
  user_id: string;
  quiz_type: string;
  score: number;
  total: number;
};

export type ProgressInput = {
  user_id: string;
  lesson_id: string;
  status: string;
  score: number;
};

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(payload.error ?? 'Request failed');
  }
  return response.json() as Promise<T>;
}

export async function fetchKana(scriptType: string): Promise<KanaItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/kana/${scriptType}`, {
    cache: 'no-store',
  });
  return readJson<KanaItem[]>(response);
}

export async function fetchDashboard(userId: string): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE_URL}/api/dashboard?user_id=${encodeURIComponent(userId)}`, {
    cache: 'no-store',
  });
  return readJson<DashboardStats>(response);
}

export async function saveQuizResult(input: QuizResultInput): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/quiz-results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return readJson<{ message: string }>(response);
}

export async function saveProgress(input: ProgressInput): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return readJson<{ message: string }>(response);
}
