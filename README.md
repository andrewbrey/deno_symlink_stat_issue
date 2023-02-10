# Reproduction of issue with `Deno.stat[Sync]` and `Deno.lstat[Sync]` on symlinks

Deno Repository Issue: https://github.com/denoland/deno/issues/17723

To reproduce the issue, run `deno task run` (or execute `deno run --allow-read --allow-write example.ts`)

This code directly creates a (hard) link pointing to `example.ts` and then immediately tests if that file is a symlink, and reports that it is not. You can do the same with a manually created symlink (since Deno.link[Sync] creates hard links):

```sh
# assuming you test from a not-Windows machine
ln -sf $PWD/example.ts $PWD/symlink.ts
deno eval "console.log(Deno.statSync('symlink.ts').isSymlink)"
deno eval "console.log(Deno.lstatSync('symlink.ts').isSymlink)" # <-- this one *does* produce the correct result
```

and observe that, again, `isSymlink` on the resulting `FileInfo` object is `false`.

## Notes / Environment

```
deno --version
deno 1.30.3 (release, x86_64-unknown-linux-gnu)
v8 10.9.194.5
typescript 4.9.4

OS: Pop!_OS 22.04 LTS x86_64 (Linux)

VS Code Version: 1.75.1
```
