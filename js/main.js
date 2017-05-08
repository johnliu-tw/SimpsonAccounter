// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLJl3kDjpnnO8F41n9j9rG_gdOjY_Abi8",
  authDomain: "simpsonaccounter.firebaseapp.com",
  databaseURL: "https://simpsonaccounter.firebaseio.com",
  projectId: "simpsonaccounter",
  storageBucket: "simpsonaccounter.appspot.com",
  messagingSenderId: "472259175988"
};
firebase.initializeApp(config);


var fdb = new ForerunnerDB();
var db = fdb.db("資料庫");
MoneyCollection = db.collection('moneys');
MoneyCollection.load()


var firebaseAuth = firebase.auth();

