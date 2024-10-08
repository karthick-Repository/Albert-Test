const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const os = require('os')

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

const Logger = winston.createLogger({
  level: environment === ('dev' || 'staging') ? 'debug' : 'info',
  format: customFormat,
  defaultMeta: { hostname: os.hostname(), pid: process.pid },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        customFormat
      )
    }),
    new DailyRotateFile({
      filename: 'logs/test-log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
})

if (environment !== 'production') {
  Logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      customFormat
    )
  }))
}

module.exports = Logger
