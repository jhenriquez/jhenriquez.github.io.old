require(['main'], function () {
  require(['views/components/LastSong', 'react'], function (LastSong, React) {

    React.render(
        React.createElement(LastSong, {username: "jmhenriquez", apiKey: '0375e24f6d5fbc5f46edeee6a8d52b21'}),
        document.getElementById('LastSong')
      );

  });
});