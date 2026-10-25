import type { ArticleHeading } from "./markdown";

// Skipped Markdown levels nest under the nearest preceding parent without
// inventing empty sections (e.g. 02.0.1).
export function numberHeadings(headings: ArticleHeading[]) {
  const stack = [{ level: 0, children: 0, path: [] as number[] }];
  return headings.map(heading => {
    while (stack.length > 1 && stack[stack.length - 1].level >= heading.level) stack.pop();
    const parent = stack[stack.length - 1];
    const path = [...parent.path, ++parent.children];
    stack.push({ level: heading.level, children: 0, path });
    return {
      ...heading,
      number: path.join("."),
      depth: path.length - 1,
    };
  });
}
