export default function userMiddleware(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token || token.length < 10 || !token.startsWith("user")) {
    return false;
  }
  return true;
}
