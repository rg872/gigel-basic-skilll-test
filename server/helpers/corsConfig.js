const corsDefault = require('cors')

const corsOptions = {
  // whitelist so only the origin is allowed to access server
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export const cors = corsDefault(corsOptions)

