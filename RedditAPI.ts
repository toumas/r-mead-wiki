import { RequestInit } from "next/dist/server/web/spec-extension/request";

export class API {
  private token: string | undefined;

  private async authenticate() {
    const headers = { Authorization: `Basic ${process.env.base64Credentials}` };

    const res = await fetch(
      "https://www.reddit.com/api/v1/access_token?grant_type=client_credentials",
      { headers, method: "POST" }
    );

    const data = await res.json();
    this.token = data.access_token;
    console.log(this.token);
  }

  private async request(url: string, options?: RequestInit | undefined) {
    if (!this.token) {
      await this.authenticate();
    }

    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    const res = await fetch(url, {
      ...options,
      headers: { ...headers, ...options?.headers },
    });

    return res.json();
  }

  public async fetchWikiPages() {
    return this.request(`https://oauth.reddit.com/r/mead/wiki/pages`);
  }

  public async fetchPage(title: string) {
    const url = new URL("https://oauth.reddit.com/r/mead/wiki/page");
    url.searchParams.set("page", title);
    return this.request(url.toString());
  }
}

export const RedditAPI = new API();
