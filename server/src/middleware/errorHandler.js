export function notFoundHandler(request, response) {
  response.status(404).json({
    error: {
      message: `Route not found: ${request.method} ${request.originalUrl}`,
    },
  });
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) return next(error);

  const status = Number.isInteger(error.status) ? error.status : 500;
  if (status >= 500) console.error(error);

  response.status(status).json({
    error: {
      message: status >= 500 ? 'An unexpected server error occurred.' : error.message,
    },
  });
}
