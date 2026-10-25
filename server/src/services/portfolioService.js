import { pool } from '../config/database.js';

async function getProfile() {
  const [rows] = await pool.execute(
    `SELECT id, full_name, tagline, intro, about, email, phone, location,
            github_url, linkedin_url, leetcode_url, resume_path
     FROM profile ORDER BY id LIMIT 1`,
  );
  return rows[0] ?? null;
}

async function getSkills() {
  const [rows] = await pool.execute(
    `SELECT categories.name AS category, skills.name AS skill
     FROM skill_categories AS categories
     LEFT JOIN skills ON skills.category_id = categories.id
     ORDER BY categories.sort_order, skills.sort_order`,
  );
  const groups = new Map();
  for (const row of rows) {
    if (!groups.has(row.category)) groups.set(row.category, []);
    if (row.skill) groups.get(row.category).push(row.skill);
  }
  return Array.from(groups, ([category, skills]) => ({ category, skills }));
}

async function getProjects() {
  const [projects] = await pool.execute(
    `SELECT id, title, badge, description, github_url, live_url
     FROM projects ORDER BY sort_order, id`,
  );
  if (projects.length === 0) return [];

  const ids = projects.map((project) => project.id);
  const placeholders = ids.map(() => '?').join(', ');
  const [[techRows], [highlightRows]] = await Promise.all([
    pool.execute(
      `SELECT project_id, tech FROM project_tech
       WHERE project_id IN (${placeholders}) ORDER BY project_id, sort_order, id`,
      ids,
    ),
    pool.execute(
      `SELECT project_id, text FROM project_highlights
       WHERE project_id IN (${placeholders}) ORDER BY project_id, sort_order, id`,
      ids,
    ),
  ]);

  const techByProject = new Map();
  const highlightsByProject = new Map();
  for (const row of techRows) {
    const list = techByProject.get(row.project_id) ?? [];
    list.push(row.tech);
    techByProject.set(row.project_id, list);
  }
  for (const row of highlightRows) {
    const list = highlightsByProject.get(row.project_id) ?? [];
    list.push(row.text);
    highlightsByProject.set(row.project_id, list);
  }

  return projects.map((project) => ({
    ...project,
    tech: techByProject.get(project.id) ?? [],
    highlights: highlightsByProject.get(project.id) ?? [],
  }));
}

async function getEducation() {
  const [rows] = await pool.execute(
    `SELECT id, institution, degree, score, location, start_label, end_label
     FROM education ORDER BY sort_order, id`,
  );
  return rows;
}

async function getAchievements() {
  const [rows] = await pool.execute(
    `SELECT id, title, description FROM achievements ORDER BY sort_order, id`,
  );
  return rows;
}

export const portfolioService = {
  getProfile,
  getSkills,
  getProjects,
  getEducation,
  getAchievements,
  async getPortfolio() {
    const [profile, skills, projects, education, achievements] = await Promise.all([
      getProfile(),
      getSkills(),
      getProjects(),
      getEducation(),
      getAchievements(),
    ]);
    return { profile, skills, projects, education, achievements };
  },
};
