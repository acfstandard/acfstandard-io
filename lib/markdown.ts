import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

export async function renderMarkdown(input: string): Promise<{ html: string; meta: Record<string, unknown> }> {
  const { content, data } = matter(input);
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  return { html: String(file), meta: data as Record<string, unknown> };
}
