const express = require('express')

const app = express()

app.set('secret', 'ijdovnjvnurgjdnv')

app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))


app.listen(3000, () => {
    console.log('http://localhost:3000')
})