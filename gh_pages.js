var ghpages = require("gh-pages");
ghpages.publish(
  "build",
  {
    branch: "master",
    repo: "https://maiway-web.github.io/maiway-web/maiway-dev",
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("success");
    }
  }
);
