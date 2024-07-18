"use client";
import useAuth from "../../Authentication/useAuth";
import Link from "next/link";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
     <link
        href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
        rel="stylesheet"
      />
      <link
        href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        rel="stylesheet"
      />
      <nav className="navbar">
        <div>
          <h3 className="h3">Conduit</h3>
        </div>
        <div>
          <ul>
            <li>
              <Link className="link" href="/">
                Home
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link className="link" href="/Signin">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link className="link" href="/Signup">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/newArticle" className="link">
                    New Post
                  </Link>
                </li>
                <li>
                  <Link href="/Logout" className="link">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link href="/" className="link">
                    {`Hello, ${user?.username || "User"}`}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
