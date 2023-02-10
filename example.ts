const src = "example.ts";
const link = "link-made-by-deno.ts";

try {
  Deno.removeSync(link, { recursive: true });
} catch (error) {
  /* ignored */
}

Deno.linkSync(src, link);

const fileInfoStat = Deno.statSync(link);
const fileInfoLStat = Deno.lstatSync(link);

console.log(fileInfoStat.isSymlink, fileInfoLStat.isSymlink);

if (!(fileInfoLStat.isSymlink || fileInfoStat.isSymlink))
  throw `${link} should be a symlink...weird`;
