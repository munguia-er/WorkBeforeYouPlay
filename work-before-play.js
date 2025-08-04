require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");

const PROJECT_DIR = process.argv[2];
const CONFIG_PATH = path.join(PROJECT_DIR, "config.json");

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`⚠️ No se encontró config.json en la ruta: ${CONFIG_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

const config = loadConfig();
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const TODAY = dayjs().format("YYYY-MM-DD");

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  "User-Agent": GITHUB_USERNAME,
};

async function getRepos() {
  try {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    console.error("Error al obtener repositorios. Revisa tu token y usuario.");
    return [];
  }
}

async function getCommitsToday(repo) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?author=${GITHUB_USERNAME}`;
    const res = await axios.get(url, { headers });
    const todayCommits = res.data.filter(c =>
      c.commit.committer.date.startsWith(TODAY)
    );
    let totalAdditions = 0;
    for (const commit of todayCommits) {
      const commitDetails = await axios.get(commit.url, { headers });
      totalAdditions += commitDetails.data.stats?.additions || 0;
    }
    return totalAdditions;
  } catch (error) {
    console.error(`Error al obtener commits para ${repo.name}.`);
    return 0;
  }
}

async function getTotalAdditionsToday() {
  const repos = await getRepos();
  let total = 0;
  for (const repo of repos) {
    total += await getCommitsToday(repo);
  }
  return total;
}

(async () => {
  console.log("Verificando productividad en GitHub...");
  const total = await getTotalAdditionsToday();
  console.log(`Líneas añadidas hoy: ${total}`);
  const gameConfig = config.games.find(g => g.name === "League of Legends");

  if (!gameConfig) {
    console.error("No se encontró la configuración para League of Legends en config.json.");
    process.exit(1);
  }

  const minLines = Number(gameConfig.minLines);
  console.log(`Meta de líneas requeridas: ${minLines}`);

  if (total >= minLines) {
    console.log(`Meta de productividad cumplida. Ruta del juego: ${gameConfig.path}`);
    console.log(`PATH_TO_GAME=${gameConfig.path}`); // <-- NUEVA LÍNEA
    process.exit(0);
  } else {
    console.log("Meta de productividad NO cumplida.");
    process.exit(1);
  }
})();