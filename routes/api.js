const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      
      // Handle invalid inputs
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.json('invalid number and unit');
      }
      
      if (initNum === 'invalid number') {
        return res.json('invalid number');
      }
      
      if (initUnit === 'invalid unit') {
        return res.json('invalid unit');
      }
      
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};