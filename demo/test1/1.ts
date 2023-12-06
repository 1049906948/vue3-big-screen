type Method = "get" | "post";

/**
 * 发起网络请求
 * @param url 请求的URL
 * @param method 请求的方法（"get"或"post”）
 */
function request(url: string, method: Method) {
  if (method === "get") {
    method;
  } else if (method === "post") {
    method;
  } else {
    const n: never = method;
  }
}

