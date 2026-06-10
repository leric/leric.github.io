import archiver from "archiver";
import { createWriteStream, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const skillsRoot = join(root, "skills");
const outDir = join(root, "public", "downloads");

const skillDirs = [
	"clean-architecture-planner",
	"post-task-reflection",
];

function parseSkillName(skillDir) {
	const skillMd = readFileSync(join(skillsRoot, skillDir, "SKILL.md"), "utf8");
	const match = skillMd.match(/^name:\s*(.+)$/m);
	if (!match) {
		throw new Error(`Could not parse skill name from ${skillDir}/SKILL.md`);
	}
	return match[1].trim();
}

function zipSkill(skillDir, archiveName) {
	return new Promise((resolve, reject) => {
		const sourceDir = join(skillsRoot, skillDir);
		const zipPath = join(outDir, `${archiveName}.zip`);
		const output = createWriteStream(zipPath);
		const archive = archiver("zip", { zlib: { level: 9 } });

		output.on("close", () => {
			console.log(`  ${archiveName}.zip (${archive.pointer()} bytes)`);
			resolve();
		});

		archive.on("error", reject);
		output.on("error", reject);

		archive.pipe(output);
		archive.directory(sourceDir, archiveName);
		archive.finalize();
	});
}

mkdirSync(outDir, { recursive: true });

console.log("Building skill zip archives…");

for (const skillDir of skillDirs) {
	const archiveName = parseSkillName(skillDir);
	await zipSkill(skillDir, archiveName);
}

console.log("Done.");
