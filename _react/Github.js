define(['react'], function (React) {

  var Github = React.createClass({
    
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
          <div className="text-center">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h1>Nothing to see here...</h1>
            </div>
          </div>
          );
      }

      var repositories = [];

      this.state.repos.forEach(function (repository) {
        repositories.push(
          <a href={repository.url}>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <h2>{repository.name}</h2>
              <p>{repository.description}</p>
              <h3>{repository.language}</h3>
            </div>
          </a>
          );
      });

      return (
        <div className="text-center">
          {repositories}
        </div>
        );
    }
  });

  React.render(
    <Github username="jhenriquez" repositories="4" />,
    document.getElementById('github-content')
    );
});