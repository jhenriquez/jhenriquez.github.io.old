define(['react', 'jquery'], function (React) {

  var LastSong = React.createClass({displayName: "LastSong",
    getInitialState: function () {
      return null;
    },

    HandleResult: function (data) {
      var self = this;
      var state = { };

      (function (tr) {
        state = {
          name: tr.name,
          artist: tr.artist["#text"],
          album: tr.album['#text'] || 'N/A',
          image: tr.image[tr.image.length-1]['#text'] || self.props.defaultImage || '',
          url: tr.url
        };

        self.setState(state);

        if (state.image) return;

        $.get('http://ws.audioscrobbler.com/2.0/', { 
            method: 'artist.getInfo',
            artist: state.artist,
            api_key: self.props.apiKey,
            format: 'json'
            },
            function (data) {
              (function (a) {
                state.image = a.image[a.image.length-1]['#text'];
                self.setState(state);
              })(data.artist);
            }
        );
        
      })(data.recenttracks.track[0]);
    },

    getLastSong: function () {
      $.get('http://ws.audioscrobbler.com/2.0/', {
          method: 'user.getrecenttracks',
          user: this.props.username,
          api_key: this.props.apiKey,
          nowplaying: false,
          format: 'json'
        }, this.HandleResult);
    },

    componentDidMount: function () {
      this.getLastSong();
      setInterval(this.getLastSong, 30000);
    },
 
    render: function () {
      if (!this.state) {
        return (React.createElement("span", null, "Loading..."));
      }

      return (
        React.createElement("div", {className: "last-song-container"}, 
          React.createElement("div", {className: "last-song-img-container"}, 
            React.createElement("img", {src: this.state.image, className: "last-song-image"})
          ), 
          React.createElement("div", {className: "last-song-content"}, 
            React.createElement("div", {className: "last-song-name"}, 
              this.state.name
            ), 
            React.createElement("div", {className: "last-song-album"}, 
              this.state.album
            ), 
            React.createElement("div", {className: "last-song-artist"}, 
              this.state.artist
            ), 
            React.createElement("div", {className: "last-song-powerby"}, 
              React.createElement("a", {href: this.state.url}, 
                React.createElement("i", {className: "fa fa-lastfm-square", title: "Powered By Last.fm"})
              )
            )
          )
        )
        );
    }
  });

  return LastSong;
});