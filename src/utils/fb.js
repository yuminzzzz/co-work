const fb = {
  loadScript() {
    return new Promise((resolve) => {
      window.fbAsyncInit = () => {
        resolve();
      };
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/zh_TW/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    });
  },
  init() {
    window.FB.init({
      appId: "1029060851144824",
      cookie: true,
      xfbml: true,
      version: "v14.0",
    });
  },
  getLoginStatus() {
    return new Promise((resolve) => {
      window.FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  },
  login() {
    return new Promise((resolve) => {
      window.FB.login(
        (response) => {
          resolve(response);
        },
        { scope: "public_profile,email" }
      );
    });
  },
  logout() {
    return new Promise((resolve) => {
      window.FB.logout(() => {
        resolve();
      });
    });
  },
};

export default fb;
