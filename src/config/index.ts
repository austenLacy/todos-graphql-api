export default {
  HTTP_PORT: process.env.HTTP_PORT || '8080',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  METRICS_ENABLED: process.env.METRICS_ENABLED === 'true' || process.env.METRICS_ENABLED === 'TRUE' || process.env.METRICS_ENABLED === 'True' || process.env.METRICS_ENABLED === '1',
  METRICS_RETAIN_WINDOW: parseInt(process.env.METRICS_RETAIN_WINDOW, 10) || 100
}
