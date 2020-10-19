var ghpages = require("gh-pages");
ghpages.publish(
  "build",
  {
    // branch: "master",
    // repo: "https://github.com/maiway-web/maiway-web.github.io.git",
    branch: "master",
    repo: "https://github.com/maiway-web/maiway-web.github.io.git",
  },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("success");
    }
  }
);
