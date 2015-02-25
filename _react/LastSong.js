define(['react', 'jquery'], function (React) {

  var LastSong = React.createClass({
    getInitialState: function () {
      return null;
    },

    getLastSong: function () {
      $.get('http://ws.audioscrobbler.com/2.0/', {
          method: 'user.getrecenttracks',
          user: this.props.username,
          api_key: this.props.apiKey,
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
        return (<span>Loading...</span>);
      }

      return (
        <div className="last-song-container">
          <img src={this.state.image} className="last-song-image" />
          <div className="last-song-name">{this.state.name}</div>
          <div className="last-song-album">{this.state.album}</div>
        </div>
        );
    }
  });

  return LastSong;

});