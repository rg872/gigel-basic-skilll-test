const corsOptions = {
  // whitelist so only the origin is allowed to access server
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports =  corsOptions

