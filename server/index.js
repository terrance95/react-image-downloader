const httpPort = 3000;
const chalk = require("chalk");
const bodyParser = require("body-parser");
const Bundler = require("parcel-bundler");
const express = require("express");
const cheerio = require("cheerio");
const sharp = require("sharp");
const path = require("path");
const request = require("request-promise-native");
const rimraf = require("rimraf");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// POST method route
app.post("/data", async (request, response) => {
  const postBody = request.body;
  try {
    await processFormInputs(postBody);
    response.redirect(302, "/data");
  } catch (err) {
    console.error(err);
    response.status(500);
  }
});

//App Logic
const processFormInputs = async input => {
  let inputData = input.data;
  let FormData = inputData.split(" ");
  console.log(FormData);
  return resizeImages(FormData);
};

const fetchUrl = async (url, encoding = "utf8") =>
  await request(url, { encoding });

const loadUrlsFromInput = async Array => {
  let results = [];

  try {
    console.log(chalk.green(`Unsplash: ${Array}`));
    for await (const item of Array) {
      results.push(`https://unsplash.com/s/photos/${item}/`);
      console.log(results);
    }
  } catch (err) {
    console.error(chalk.red("loadUrlsFromInput: ", err));
  }
  return results;
};

const scrapeImageFromUrl = async url => {
  try {
    const response = await fetchUrl(url);
    const $ = cheerio.load(response);
    const img = $(".IEpfq")
      .find("img")
      .attr("src");

    if (false === img) {
      throw new Error("unable to find an image for url " + url);
    }
    return img;
  } catch (err) {
    console.error("Could not find an image", err);
  }
};

const getImageUrls = async Array => {
  let imageUrlArray = await loadUrlsFromInput(Array);

  let allImagesUrl = [];

  for (let imageUrl of imageUrlArray) {
    allImagesUrl.push(await scrapeImageFromUrl(imageUrl));
  }

  return allImagesUrl;
};

const resizeImages = async Array => {
  const imagesPng = await getImageUrls(Array);
  const outputDirectory = path.join(__dirname, "output");

  console.log("The output directory: ", outputDirectory);
  for (let image of imagesPng) {
    try {
      let imageName = image.substring(50, 60);
      // TODO: you might want to tweak this, originally you were saving
      // just the part after the doi, this regexp keeps the doi
      // note that some encoding is happening for special characters
      // that's why you see %2F '/' and %3A ':'
      let imageNameMatch = image.match(".+image/(.+?)/.+");

      //   if (null === imageNameMatch) {
      //     // in case we could not match a same name
      //     console.log("Could not find image from article.", image);
      //     continue;
      //   }

      let outputImageName = path.join(outputDirectory, imageName + ".jpg");

      // null encoding triggers buffer creation (binary instead of utf8)
      let content = await fetchUrl(image, null);
      // just to have some output
      console.log("Output file:", outputImageName, "Size:", content.length);

      await sharp(content)
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4"
        })

        .toFile(outputImageName);
    } catch (err) {
      console.error(
        chalk.white.bgRed.bold(
          "Output file: Image was not available for processing",
          chalk.white(err)
        )
      );
    }
  }
};

const file = "./src/index.html"; // Pass an absolute path to the entrypoint here
const options = {}; // See options section of api docs, for the possibilities

// Initialize a new bundler using a file and options
const bundler = new Bundler(file, options);

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.use(bundler.middleware());

// Listen on port
app.listen(httpPort, () =>
  console.log(
    chalk.white.bold(
      `Thumbnail Generator: ` +
        chalk.white.underline(`http://localhost:${httpPort}`)
    )
  )
);
