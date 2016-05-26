#Xylophonica

[Xylophonica Live App] [heroku]

[heroku]: http://xylophone.herokuapp.com/

Xylophonica is a full-stack web application for playing, recording, and re-playing stored music. The back end was built with Ruby and Rails, with a PostgreSQL database. The front end was built with Javascript, React.js, and Flux.

![xylophonica](https://github.com/sarasharif/xylophone/blob/master/docs/xylophonica.png)

## Single Page App powered by React and Flux

##Database, Schema, & API
The database was built-up using PostgreSQL. The schema was architected around the idea of saving as little data to the database as possible. In this case, tracks are saved. The notes associated with each song or "track" are saved in a JSON object called "roll." The simple but effective API is built-out through a model and controller, as shown below:

Model level validations are simple for this particular database:

```ruby
class Track < ActiveRecord::Base
  validates :name, :roll, presence: true
end
```

Within the Controllers, the API allows for track creation, indexing, and deletion. Incoming data is restricted using "strong parameters".

```ruby
class Api::TracksController < ApplicationController

  def create
    @track = Track.new(track_params)
    if @track.save
      render json: @track
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def index
    @tracks = Track.all
    render json: @tracks
  end

  def delete
    @track = Track.find(params[:id])
    @track.destroy
    render json: @track
  end

  private
  def track_params
    params.require(:track).permit(:name, :roll)
  end

```


##Flux Loop
The front end and back end data sharing is handled through Flux, which plays extra nice with React. Implementing the Flux loop includes building and maintaining a Store for each unique database table, as well as API Utilities, and Actions (can be broken down to Client/Server as data requires) for each distinct database table. A Dispatcher is used to interface between React components that take in user input/data and the Flux Stores that then route that data.

Code Sample from they Flux loop Key Store:

```javascript

KeyStore.all = function(){
  return _currentKeys.slice(0);
};

KeyStore.addKey = function(note){
  if (!this.playing(note)){
    _currentKeys.push(note);
  }
};

KeyStore.removeKey = function(note){
  var index = _currentKeys.indexOf(note);
  _currentKeys.splice(index, 1);
};

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

  this.__emitChange();
};

```

A code snippet from the Flux loop Key Actions:
```javascript
removeKey: function(note) {
//all content inside curly brackets is the PAYLOAD
  Dispatcher.dispatch({
    actionType: 'REMOVEKEY',
    note: note
  });
},

addKey: function(note) {

  Dispatcher.dispatch({
    actionType: 'ADDKEY',
    note: note
  });
},
```


##React components
Xylophonica utilizes React.js components to immediately render and re-render this single-page web app in response to user input. React is a very intuitive framework and enabled us to keep the code base organized, clean, and concise. The primary page for the app is stored in a .jsx file and all other components are stored in separate .jsx files. Being able to keep the components separate and being able to ensure each component owned only its own functionality was a huge advantage of using React.

A code sample from one React component for Xylophonica:
```javascript
getInitialState: function(){
  return {
    playing: false
  };
},

componentDidMount: function(){
  KeyStore.addListener(this.handleChange);
},

componentWillUnmount: function(){
  this.currentNote.stop();
},

handleChange: function(){
  this.setState({
    playing: KeyStore.playing(this.props.note)
  });
```
