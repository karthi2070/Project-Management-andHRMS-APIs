
const router = express().Router;
const { handleRewrite } = require('./controller');

router.post('/api/rewrite', handleRewrite);

module.exports=handleRewrite;