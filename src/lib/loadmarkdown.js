import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function loadMarkdown(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const { content } = matter(fileContent);

  const processed = await remark().use(html).process(content);
  return processed.toString();
}