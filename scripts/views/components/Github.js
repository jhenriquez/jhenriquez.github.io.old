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
            id: rep.id,
            name: rep.name,
            description: rep.description,
            language: rep.language,
            url: rep.html_url,
            lastUpdate: moment ? new moment(rep.updated_at).fromNow() : rep.updated_at
          };
        });

        self.setState({ repos: reps });

      }, 'json');

    },
    render: function () {
      if (this.state.repos.length === 0) {
        return (
          React.createElement("div", {className: "loading-icon rotate"}
          )
          );
      }

      var repositories = [];

      this.state.repos.forEach(function (repository) {
        repositories.push(
            React.createElement("div", {key: repository.id, className: "repository"}, 
              React.createElement("img", {className: "repository-icon", src: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"}), 
              React.createElement("div", {className: "repository-name"}, 
                React.createElement("a", {href: repository.url}, repository.name)
              ), 
              React.createElement("p", {className: "repository-description"}, 
                repository.description
              ), 
              React.createElement("p", {className: "repository-last-update"}, 
                "Last Updated: ", repository.lastUpdate
              )
            )
          );
      });

      return (
        React.createElement("div", null, 
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