import { pool } from '../config/database.js';
import { portfolioService } from '../services/portfolioService.js';

function sendData(action) {
  return async (request, response) => {
    const data = await action();
    if (data === null) {
      const error = new Error('Portfolio profile has not been configured.');
      error.status = 404;
      throw error;
    }
    response.json({ data });
  };
}

export const portfolioController = {
  health: async (request, response) => {
    await pool.query('SELECT 1');
    response.json({ data: { status: 'ok', database: 'connected' } });
  },
  profile: sendData(portfolioService.getProfile),
  skills: sendData(portfolioService.getSkills),
  projects: sendData(portfolioService.getProjects),
  education: sendData(portfolioService.getEducation),
  achievements: sendData(portfolioService.getAchievements),
  portfolio: sendData(portfolioService.getPortfolio),
};
