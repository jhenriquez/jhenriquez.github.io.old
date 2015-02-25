define(['react', 'jquery'], function (React) {

  var LastSong = React.createClass({displayName: "LastSong",
    getInitialState: function () {
      return undefined;
    },

    getLastSong: function () {
      $.get('http://ws.audioscrobbler.com/2.0/', {
          method: 'user.getrecenttracks',
          user: this.props.username,
          api_key: this.props.key,
          format: 'json'
        },
        function (data, status) {
          (function (tr) {
            this.setState({
              name: tr.name,
              album: tr.album['#text'] || 'N/A',
              image: tr.image[tr.image.length-1]['#text'] || this.props.defaultImage,
              url: tr.url
            });
          })(data.recenttracks.track[1]);
        });
    },

    componentDidMount: function () {
      this.getLastSong();
      setInterval(this.getLastSong, 60000);
    },
 
    render: function () {
      if (!this.state) {
        return (
          React.createElement("div", {className: "last-song-container"}, 
            React.createElement("img", {src: this.state.image, className: "last-song-image"}), 
            React.createElement("div", {className: "last-song-name"}, this.state.name), 
            React.createElement("div", {className: "last-song-name"}, this.state.album)
          )
          );
      }
    }
  });

  return LastSong;

});