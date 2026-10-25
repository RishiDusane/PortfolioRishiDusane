import { Router } from 'express';
import { portfolioController } from '../controllers/portfolioController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const portfolioRoutes = Router();

portfolioRoutes.get('/health', asyncHandler(portfolioController.health));
portfolioRoutes.get('/profile', asyncHandler(portfolioController.profile));
portfolioRoutes.get('/skills', asyncHandler(portfolioController.skills));
portfolioRoutes.get('/projects', asyncHandler(portfolioController.projects));
portfolioRoutes.get('/education', asyncHandler(portfolioController.education));
portfolioRoutes.get('/achievements', asyncHandler(portfolioController.achievements));
portfolioRoutes.get('/portfolio', asyncHandler(portfolioController.portfolio));
