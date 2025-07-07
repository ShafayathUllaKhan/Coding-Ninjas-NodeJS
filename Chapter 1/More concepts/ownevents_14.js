import { UserEvents } from "./ownevents_13.js";

const userEvent = new UserEvents();




function saveToDatabase(){
    console.log('Saving post to database');
}

function sendNotifications(){
    console.log('Sending Notifications');
}

function updateTimeline(){
    console.log('Updating timeline');
}

userEvent.addListener('postCreated', saveToDatabase);
userEvent.addListener('postCreated', sendNotifications);
userEvent.addListener('postCreated', updateTimeline);


userEvent.createPost('This is my first post');

