import { NextResponse } from "next/server";
import notesMiddleware from "./middleware/notesMiddleware";
import userMiddleware from "./middleware/userMiddleware";
export const config = {
  matcher: "/api/(.*)", // this will match all the routes that start with /api/
};
export default function middleware(req: Request) {
  if (req.url.includes("/api/notes")) {
    const auth = notesMiddleware(req);
    if (!auth) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  } else {
    const auth = userMiddleware(req);
    if (!auth) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
  }
  //    Two Middleware are used here one for notes and one for user
  
  // as the Work of Middleware is to intercept the request and do some work the final return should be NextResponse.next()
  return NextResponse.next();
}
