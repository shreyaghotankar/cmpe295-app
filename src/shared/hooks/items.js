const getItems = function() {
    return new Promise(function(resolve) {
      setTimeout(function(){
          console.log("Items read from DB")
          // returning empty list of items
        resolve(["h"])
      }, 1000);
    });
  }

export default getItems;