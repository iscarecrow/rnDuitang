
// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some)
{
   Array.prototype.some = function(fun /*, thisp*/)
   {
      var len = this.length;
      if (typeof fun != "function")
      throw new TypeError();
      
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
      {
         if (i in this && fun.call(thisp, this[i], i, this))
         return true;
      }
      return false;
   };
}