#Xylophonica

[Xylophonica Live App] [heroku]

[heroku]: http://xylophone.herokuapp.com/

Xylophonica is a full-stack web application for playing, recording, and re-playing stored music. The back end was built with Ruby and Rails, with a PostgreSQL database. The front end was built with Javascript, React.js, and Flux.

![xylophonica](https://github.com/sarasharif/xylophone/blob/master/docs/xylophonica.png)

## Single Page App powered by React and Flux

##Database, Schema, & API
The database was built-up using PostgreSQL. The schema was architected around the idea of saving as little data to the database as possible. In this case, only songs and notes. The only data attached to songs is an id, while keys only capture id, song_id, and key_info. The simple but effective API is built-out through models and controllers for each Song and Key.

Model level validations ensuring that each note has a song_id. The ActiveRecord associations on the models include the following:

For Key
```ruby
class Key < ActiveRecord::Base
  belongs_to :song
end
```

For Song
```ruby
class Song < ActiveRecord::Base
  has_many :keys, dependent: :destroy
end
```

Within the Controllers, the API allows for key and song creation, and deletion. Incoming data is restricted using "strong parameters", as follows:

```ruby
def key_params
  params.require(:key).permit(:song_id, :key_info)
end
```


##Flux Loop
The front end and back end data sharing is handled through Flux, which plays extra nice with React. Implementing the Flux loop includes building and maintaining a Store for each unique database table, as well as API Utilities, and Actions (can be broken down to Client/Server as data requires) for each distinct database table. A Dispatcher is used to interface between React components that take in user input/data and the Flux Stores that then route that data.

Code Sample from they Flux loop Key Store:

```javascript
KeyStore.currentKeys = function(){
  return _currentKeys.slice();
};

KeyStore.playing = function(currentKey){
  return _currentKeys.includes(currentKey);
};

KeyStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case 'ADDKEY':

    KeyStore.addKey(payload.note);
    break;
    case 'REMOVEKEY':
    KeyStore.removeKey(payload.note);
    break;
  }
};

```

A code snippet from the Flux loop Key Actions:
```javascript
addKey: function(note) {

  Dispatcher.dispatch({
    actionType: 'ADDKEY',
    note: note
  });
}
```


##React components
Xylophonica utilizes React.js components to render and re-render this single-page web app immediately in response to user input. React is a very intuitive framework and enabled us to keep the code base organized, clean, and concise. The primary page for the app is stored in a .jsx file and all other components are stored in separate .jsx files. Being able to keep the components separate and being able to ensure each component owned only its own functionality was a huge advantage of using React.

A code sample from one React component for Xylophonica:
```javascript
sound: function(){
  this.currentNote = this.currentNote || new Note(Tones[this.props.note]);

  if (this.state.playing) {
    this.currentNote.start();
  } else {
    this.currentNote.stop();
  }
}
```
