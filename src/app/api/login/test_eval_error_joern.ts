import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * VULNERABLE ENDPOINT
 * Cho phép người dùng truyền code vào và
 * đánh giá trực tiếp bằng eval — RẤT NGUY HIỂM
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Lấy param `code` từ query string
  const userCode = String(req.query.code || '');

  // <-- VULN: dùng eval trên input của user
  let result: any;
  try {
    result = eval(userCode);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  return res.status(200).json({ result });
}
