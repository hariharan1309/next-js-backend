export default function notesMiddleware(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token || token.length < 10 || !token.startsWith("notes")) {
    return false;
  }
  return true;
}
