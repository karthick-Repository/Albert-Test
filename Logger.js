const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const os = require('os')
const path = require('path')

const environment = process.env.EXECUTION_ENVIRONMENT

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(info => {
    const { timestamp, level, message, ...meta } = info
    let metaString = ''
    if (Object.keys(meta).length) {
      metaString = JSON.stringify(meta)
    }
    return `${timestamp} [${level.toUpperCase()}] ${message} ${metaString}`
  })
)

const logsDir = path.resolve(__dirname, '../../out/logs')

const Logger = winston.createLogger({
  level: environment === 'production' ? 'info' : 'debug',
  format: customFormat,
  defaultMeta: { hostname: os.hostname(), pid: process.pid },
  transports: [
    new winston.transports.Console({ format: customFormat }),
    new DailyRotateFile({
      filename: path.join(logsDir, 'test-log-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logsDir, 'rejections.log') })
  ]
})

module.exports = Logger
