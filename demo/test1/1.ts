type Method = "get" | "post";

function request(url: string, method: Method) {
  if (method === "get") {
    method;
  } else if (method === "post") {
    method;
  } else {
    const n: never = method;
  }
}
