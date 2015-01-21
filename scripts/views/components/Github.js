define(['react'], function (React) {

  var Github = React.createClass({displayName: "Github",
    
    getInitialState: function () {
      return { repos: [] };
    },
    componentDidMount: function () {
      var self = this;
      var url = "https://api.github.com/users/" + this.props.username + "/repos";

      $.get(url, {sort: 'updated'}, function (repos, status) {

        var reps = repos.slice(0, self.props.repositories || 4).map(function (rep) {
          return {
            name: rep.name,
            description: rep.description,
            language: rep.language,
            url: rep.html_url
          };
        });

        self.setState({ repos: reps });

      }, 'json');

    },
    render: function () {
      if (this.state.repos.length === 0) {
        return (
          React.createElement("div", {className: "text-center"}, 
            React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-12 col-lg-12"}, 
              React.createElement("h1", null, "Nothing to see here...")
            )
          )
          );
      }

      var repositories = [];

      this.state.repos.forEach(function (repository) {
        repositories.push(
          React.createElement("a", {href: repository.url}, 
            React.createElement("div", {className: "col-xs-12 col-sm-12 col-md-3 col-lg-3"}, 
              React.createElement("h2", null, repository.name), 
              React.createElement("p", null, repository.description), 
              React.createElement("h3", null, repository.language)
            )
          )
          );
      });

      return (
        React.createElement("div", {className: "text-center"}, 
          repositories
        )
        );
    }
  });

  React.render(
    React.createElement(Github, {username: "jhenriquez", repositories: "4"}),
    document.getElementById('github-content')
    );
});