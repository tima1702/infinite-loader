const version = "v2";

class NetService {
  async get(url, params, headers) {
    return this.call("GET", url, params, headers);
  }

  async put(url, params, headers) {
    return this.call("PUT", url, params, headers);
  }

  async post(url, params, headers, oauth = false) {
    return this.call("POST", url, params, headers, oauth);
  }

  async delete(url, params, headers) {
    return this.call("DELETE", url, params, headers);
  }

  async call(method, url, params, headers, oauth = false) {
    if (!oauth) {
      url = window.location.origin + "/api/" + version + url;
    }
    let options = {};
    if (method === "GET" || method === "HEAD") {
      options = {
        url,
        method,
        headers
      };

      url = new URL(url);
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      );
    } else {
      options = {
        url,
        method,
        headers,
        body: JSON.stringify(params)
      };
    }

    const response = await fetch(url, options);
    const data = await response.text();

    return new Promise((resolve, reject) => {
      if (response.status === 200) {
        resolve(data);
      }
      if (response.status === 400) {
        reject({
          message: "BAD_REQUEST",
          status: response.status
        });
      }
      if (response.status === 401) {
        reject({
          message: "UNAUTHORIZED",
          status: response.status
        });
      }
      if (response.status === 404) {
        reject({
          message: "NOT_FOUND",
          status: response.status
        });
      }
      if (response.status === 500) {
        reject({
          message: "INTERNAL_SERVER_ERROR",
          status: response.status
        });
      }
    });
  }
}

export default new NetService();
