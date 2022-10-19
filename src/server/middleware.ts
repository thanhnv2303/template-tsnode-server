import fs from 'fs';

import StatsD from 'node-statsd';

const stats = new StatsD();

const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const API_LOGGER_SHOW = process.env.API_LOGGER_SHOW || true;

const API_LOGGER_FILE = process.env.API_LOGGER_FILE || null;

function getCurrentDateTime() {
  const current_datetime = new Date();
  return (
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds()
  );
}

function showLog(log) {
  if (API_LOGGER_SHOW) {
    console.log(log);
  }

  if (API_LOGGER_FILE) {
    fs.appendFile(API_LOGGER_FILE, log + '\n', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

export const APILogger = (req, res, next) => {
  // middleware function
  const formatted_date = getCurrentDateTime();
  const method = req.method;
  const url = req.url;
  const start = process.hrtime();

  next();
  const status = res.statusCode;
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  showLog(log);
};

export function responseTimeStat(req, res, time) {
  const stat = (req.method + req.url)
    .toLowerCase()
    .replace(/[:.]/g, '')
    .replace(/\//g, '_');
  stats.timing(stat, time);
  const formatted_date = getCurrentDateTime();
  const method = req.method;
  const url = req.originalUrl || req.baseURL || req.url;
  const status = res.statusCode;

  const log = `[${formatted_date}] ${method}:${url} ${status} ${Math.round(
    time
  )} ms`;
  showLog(log);
}

// export default { APILogger, responseTimeStat };
