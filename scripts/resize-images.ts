import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

async function resizeImages(inputFolder, outputFolder, targetSize, outputJson) {
  await fs.ensureDir(outputFolder);

  const files = await fs.readdir(inputFolder);
  const imageData: { src: string; width: number; height: number }[] = [];

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
      const inputPath = path.join(inputFolder, file);
      const outputPath = path.join(outputFolder, file);

      try {
        const image = sharp(inputPath);

        const resizedImage = await image
          .resize({
            width: targetSize.width,
            height: targetSize.height,
            fit: "inside",
            withoutEnlargement: true,
          })
          .toBuffer();

        await fs.writeFile(outputPath, resizedImage);

        const { width, height } = await sharp(resizedImage).metadata();

        imageData.push({
          src: file,
          width: width ?? 0,
          height: height ?? 0,
        });

        console.log(`Resized: ${file}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }

  await fs.writeJson(outputJson, imageData, { spaces: 2 });

  console.log(`Resized images saved to: ${outputFolder}`);
  console.log(`Image data saved to: ${outputJson}`);
}

// Example usage
const inputFolder = "/Users/urs/Downloads/gogo-resized";
const outputFolder = "/Users/urs/Downloads/gogo-resized-2";
const targetSize = { width: 1600, height: 1200 };
const outputJson = "src/pages/gallery.json";

resizeImages(inputFolder, outputFolder, targetSize, outputJson).catch((error) => console.error("Error:", error));
