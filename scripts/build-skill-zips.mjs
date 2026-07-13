import archiver from "archiver";
import { createHash } from "node:crypto";
import { copyFileSync, createWriteStream, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const skillsRoot = join(root, "skills");
const outDir = join(root, "public", "downloads");
const agentSkillsDir = join(root, "public", ".well-known", "agent-skills");

const skillDirs = [
	"clean-architecture-planner",
	"post-change-design-reflection",
];

function parseSkillMetadata(skillDir) {
	const skillMd = readFileSync(join(skillsRoot, skillDir, "SKILL.md"), "utf8");
	const name = skillMd.match(/^name:\s*(.+)$/m)?.[1]?.trim();
	const description = skillMd.match(/^description:\s*(.+)$/m)?.[1]?.trim();
	if (!name || !description) {
		throw new Error(`Could not parse skill metadata from ${skillDir}/SKILL.md`);
	}
	if (name !== skillDir) {
		throw new Error(
			`Skill name mismatch: ${skillDir}/SKILL.md declares "${name}"; the folder and frontmatter name must match`,
		);
	}
	return { name, description };
}

function zipSkill(skillDir, zipPath, archiveRoot) {
	return new Promise((resolve, reject) => {
		const sourceDir = join(skillsRoot, skillDir);
		const output = createWriteStream(zipPath);
		const archive = archiver("zip", { zlib: { level: 9 } });

		output.on("close", () => {
			resolve(archive.pointer());
		});

		archive.on("error", reject);
		output.on("error", reject);

		archive.pipe(output);
		archive.directory(sourceDir, archiveRoot);
		archive.finalize();
	});
}

function sha256File(path) {
	return createHash("sha256").update(readFileSync(path)).digest("hex");
}

mkdirSync(outDir, { recursive: true });
mkdirSync(agentSkillsDir, { recursive: true });
copyFileSync(join(root, "CITATION.cff"), join(root, "public", "CITATION.cff"));

console.log("Building skill zip archives…");

const discoverySkills = [];

for (const skillDir of skillDirs) {
	const { name, description } = parseSkillMetadata(skillDir);
	const downloadPath = join(outDir, `${name}.zip`);
	const discoveryPath = join(agentSkillsDir, `${name}.zip`);
	const bytes = await zipSkill(skillDir, downloadPath, name);
	await zipSkill(skillDir, discoveryPath, false);

	console.log(`  ${name}.zip (${bytes} bytes)`);
	discoverySkills.push({
		name,
		type: "archive",
		description,
		url: `/.well-known/agent-skills/${name}.zip`,
		digest: `sha256:${sha256File(discoveryPath)}`,
	});
}

writeFileSync(
	join(agentSkillsDir, "index.json"),
	`${JSON.stringify(
		{
			$schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
			skills: discoverySkills,
		},
		null,
		2,
	)}\n`,
);

console.log("Done.");
