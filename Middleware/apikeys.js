
const  MY_API_KEY = "a9bd5a93-2668-4d1a-bdd5-804294dbbe9f";

const validateKey =  (req, res, next) => {

    //const apiKey = req.header['x-api-key'];

    const apiKey = req.query.key;
    //console.log(req.query.key);
    if (!apiKey) {
        return res.status(401).send('Unauthorized: API key is missing');
    }

    if (apiKey !== MY_API_KEY) {
    
        res.status(403).send('You not allowed');

    } else{
        console.log('Good API call');
        next();
    }
  };

  module.exports = {validateKey};
