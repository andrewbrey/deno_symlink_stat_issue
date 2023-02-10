const src = "example.ts";
const link = "link-made-by-deno.ts";

try {
  Deno.removeSync(link, { recursive: true });
} catch (error) {
  /* ignored */
}

Deno.linkSync(src, link);

const fileInfo = Deno.statSync(link);

console.log(fileInfo);

if (!fileInfo.isSymlink) throw `${link} should be a symlink...weird`;
