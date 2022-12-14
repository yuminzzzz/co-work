const api = {
  hostname: "https://api.appworks-school.tw/api/1.0",
  coworkname: "https://claudia-teng.com/api/1.0",
  async getProducts(category, paging) {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`
    );
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword, paging) {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`
    );
    return await response.json();
  },
  async getProduct(id) {
    const response = await fetch(`${this.hostname}/products/details?id=${id}`);
    return await response.json();
  },
  async checkout(data, jwtToken) {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async signin(data) {
    const response = await fetch(`${this.hostname}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
    });
    return await response.json();
  },
  async getProfile(jwtToken) {
    const response = await fetch(`${this.hostname}/user/profile`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    return await response.json();
  },
  async getAuctionsList() {
    const response = await fetch(`${this.coworkname}/auction`);
    return await response.json();
  },
  async getSecondHandProductList() {
    const response = await fetch(`${this.coworkname}/second-hand`);
    return await response.json();
  },
  async getAuctionProduct(id) {
    const response = await fetch(`${this.coworkname}/auction/${id}`);
    return await response.json();
  },
  async getSecondHandProduct(id) {
    const response = await fetch(`${this.coworkname}/second-hand/${id}`);
    return await response.json();
  },
  async addNewItemsInCart(data, token) {
    const response = await fetch(`${this.coworkname}/shopping-cart`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async getUserCartItem(token) {
    const response = await fetch(`${this.coworkname}/shopping-cart`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });
    return await response.json();
  },
};

export default api;
