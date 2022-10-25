import * as jose from "jose";

const users = [
  {
    id: 1,
    name: "Rishabh",
    email: "test@gmail.com",
    password: "test123",
  },
];

async function readRequestBody(request) {
  const { headers } = request;
  const contentType = headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await request.json();
  } else if (contentType.includes("application/text")) {
    return request.text();
  } else if (contentType.includes("text/html")) {
    return request.text();
  } else if (contentType.includes("form")) {
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return body;
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return "a file";
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetch(req) {
    console.log(req.headers);

    const { searchParams, pathname } = new URL(req.url);
    // Search
    if (pathname === "/search") {
      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchParams.get("q")}`
      );
      return new Response(res.body, {
        headers: {
          "content-type": "application/json;charset=UTF-8;",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        },
      });

      // Login
    } else if (pathname === "/login") {
      const body = await readRequestBody(req);

      const user = users.find((item) => item.email === body.email);

      if (!user) {
        return new Response(JSON.stringify({ msg: "User not found" }), {
          headers: {
            "content-type": "application/json;charset=UTF-8;",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          },
        });
      }

      if (user.password === body.password) {
        // const token = jwt.sign({ id: user.id }, "hello");
        const secret = new TextEncoder().encode(
          "Swe4g7c?UBm5Nrd96vhsVDtkyJFbqKMTm!TMw5BDRLtaCFAXNvbq?s4rGKQSZnUP"
        );

        const token = await new jose.SignJWT({ foo: "bar" })
          .setProtectedHeader({ alg: "HS256" })
          .sign(secret);
        console.log(token);
        return new Response(
          JSON.stringify({
            token,
            msg: "Success",
            user: {
              ...user,
              password: undefined,
            },
          }),
          {
            headers: {
              "content-type": "application/json;charset=UTF-8;",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            },
          }
        );
      } else {
        return new Response(JSON.stringify({ msg: "Incorrect Password" }), {
          headers: {
            "content-type": "application/json;charset=UTF-8;",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          },
        });
      }
    }
  },
};
