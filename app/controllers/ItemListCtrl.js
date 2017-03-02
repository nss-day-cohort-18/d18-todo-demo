"use strict";

app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData, AuthFactory){
	 
     $scope.searchText = SearchTermData;
      let user = AuthFactory.getUser();
      
     ItemStorage.getItemList(user)
     .then(function(itemCollection){
        $scope.items = itemCollection;
     });


	$scope.itemDelete = function(itemId){
	    console.log("delete this item", itemId);
	    ItemStorage.deleteItem(itemId)
        .then(function(response){
            ItemStorage.getItemList(user).then(function(itemCollection){
                $scope.items = itemCollection;
            });
        });
	    
	};
});