const pino = require('pino');

/**
 * Logger configuration using pino.
 * Logs messages with timestamps in ISO format.
 * Log level can be set via the LOG_LEVEL environment variable.
 * Defaults to 'info' level if not specified.
 * Does not include process id or hostname in log entries.
 */
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime,
});

module.exports = logger;