// controllers/convertHandler.js
function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    // Remove unit to get number part
    let numString = input.match(/^[^a-zA-Z]*/)[0];
    
    if (!numString) {
      return 1; // Default to 1 when no number provided
    }
    
    // Check for double fraction
    let fractionParts = numString.split('/');
    if (fractionParts.length > 2) {
      return 'invalid number';
    }
    
    try {
      if (fractionParts.length === 2) {
        // Handle fraction
        let numerator = parseFloat(fractionParts[0]);
        let denominator = parseFloat(fractionParts[1]);
        
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
          return 'invalid number';
        }
        
        result = numerator / denominator;
      } else {
        // Handle whole or decimal number
        result = parseFloat(numString);
        
        if (isNaN(result)) {
          return 'invalid number';
        }
      }
    } catch (e) {
      return 'invalid number';
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    
    // Extract unit (letters at the end)
    let unitMatch = input.match(/[a-zA-Z]+$/);
    
    if (!unitMatch) {
      return 'invalid unit';
    }
    
    let unit = unitMatch[0].toLowerCase();
    
    // Valid units
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      // Return proper case for Liter
      result = unit === 'l' ? 'L' : unit;
    } else {
      result = 'invalid unit';
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }
    
    return Math.round(result * 100000) / 100000; // Round to 5 decimal places
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;