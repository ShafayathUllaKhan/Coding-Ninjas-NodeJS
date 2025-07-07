import * as Events from 'events';

export class UserEvents extends Events.EventEmitter{
    // event
    createPost(content){
        console.log('post is created');
        //console.log(this);
        this.emit("postCreated")
    }
}