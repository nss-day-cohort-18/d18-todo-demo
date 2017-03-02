"use strict";

app.factory("ItemStorage", ($q, $http, FBCreds) => {

	let getItemList = (user) => {
		let items = [];
		return $q((resolve, reject) => {
			console.log("list url", `${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`);
			$http.get(`${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
			.then((itemObject) => {
				let itemCollection = itemObject.data;
				console.log("itemCollection", itemCollection);
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					items.push(itemCollection[key]);
				});
				resolve(items);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	let postNewItem = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/items.json`,
				JSON.stringify(newItem))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let deleteItem = (itemId) => {
		console.log("delete in factory", itemId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/items/${itemId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			});
		});
	};

	let getSingleItem = (itemId) => {
		return $q(function(resolve, reject){
			$http.get(`${FBCreds.databaseURL}/items/${itemId}.json`)
			.then(function(itemObject){
				resolve(itemObject.data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let updateItem = (itemId, editedItem) => {
		//Properties with leading $$ characters will be stripped since AngularJS uses this notation internally.
  	console.log("angularJSON", angular.toJson(editedItem));
  	console.log("JSON.stringify", JSON.stringify(editedItem));
  	
		return $q(function(resolve, reject){
			$http.patch(`${FBCreds.databaseURL}/items/${itemId}.json`,
				angular.toJson(editedItem))
			.then(function(ObjectFromFirebase){
				resolve(ObjectFromFirebase);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};
















	return {getItemList, postNewItem, deleteItem, getSingleItem, updateItem};

});