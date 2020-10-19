var ghpages = require("gh-pages");
ghpages.publish(
  "build",
  {
    branch: "masterr",
    repo: "https://github.com/maiway-web/maiway-dev.github.io",
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("success");
    }
  }
);
