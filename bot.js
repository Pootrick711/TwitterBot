//Tells our console that the bot is starting
console.log("The Bot is starting now!");

//Require the twit package
var Twit = require('twit');

//We need to authenticate our twitter
var T = new Twit({
    consumer_key: 'NDKxK8Rf6yERtq67IgVLSSph3',
    consumer_secret: '9cGRgUsTLvnV276yTEyoJ7MNDpefp4vNBRWoKXx301g4AdFhRk',
    access_token: '847899116386500608-qcly7YgxkfOdDzyJKcyOCVNshh1P31P',
    access_token_secret: 'MJg6LNOwcoFj8xO15ttUNhSGycn4O7ooXxgvAMTZFvIVu',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})

//GET -> search by hashtag, location, user, etc
//POST -> Post tweets
//STREAM -> follows, you can @ them, mentions, you can @ them

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
//var parameters = { 
//    q: 'banana since:2011-07-11', 
//    count: 2,
//    lang: 'en'
//    
//}
//
//T.get('search/tweets', parameters, gotData);
//
//function gotData(err, data, response){
//    
//    var tweets = data.statuses;
//    
//    for(var i = 0; i < tweets.length; i++){
//        
//       console.log(tweets[i].text); 
//    }
//   
//}


//var tweet = { status: 'hello world!' }
//
//T.post('statuses/update', tweet , gotData);


//POST TWEET
tweetIt();

//setInterval(tweetIt, 1000*45);

function tweetIt() {
    //Find a random real number from 0 to 1 and multiply by 100, and then round down
    var r = Math.floor(Math.random() * 100);

    var tweet = {
        status: 'Here is the current random number ' + r + ' #providencehigh #phs #ecs #2017'
    }

    T.post('statuses/update', tweet, gotData);

    function gotData(err, data, response) {
        if (err) {
            console.log("Something went wrong!");

        } else {
            console.log("It posted!");
        }
    }
}

//STREAM FUNCTION 

followTweet();

function followTweet() {

    var stream = T.stream('user');
    //Anything someone follows me
    stream.on('follow', followed);

    function followed(eventMsg) {
        var name = eventMsg.source.name;
        var screenName = eventMsg.source.screen_name;
        tweetIt2('@' + screenName + ' how do you do?');
        
        
        
        var fs = require('fs');
        console.log('finished tweet json');
    var json = JSON.stringify(eventMsg, null, 2);
    fs.writeFile("tweet.json", json);
    }
}

function tweetIt2(txt) {
    var tweet = {
        status: txt

    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("You were followed");
        }

    }

}

//var exec = require('child_process').exec;
//var cmd = '"C:\Users\juan.lopez\Downloads\processing-3.3\processing-java.exe" --sketch="H:\P5ECS\Lesson 20\circlesketch" --run';
//exec(cmd, processing);



var fs = require('fs');
processing();
function processing(){
    console.log("uploaded image");
    var filename = 'pictures/IMAGE.png';
    
    var parameters = {
        encoding: 'base64'
    }
    
    var b64 = fs.readFileSync(filename, parameters);
    
    //i have to upload before i can tweet it
    T.post('media/upload', {media_data: b64}, uploaded);
    
    function uploaded(err, data, response){
        //This is where I will tweet! 
        //My picture has a unique ID
        var id = data.media_id_string;
        var tweet = {
            
            status: '#ECS2017 live from node.js',
            media_ids: [id]
        }
        
        
        T.post('statuses/update', tweet, tweeted);
        
        function tweeted(err, data, response){
            
            if (err){
                console.log("Something went wrong!");
            }else{
                console.log("It posted!");
            }
            
            
        }
        
    }

}
