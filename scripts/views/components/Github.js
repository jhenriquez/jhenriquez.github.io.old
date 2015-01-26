define(['react', 'momentjs'], function (React, moment) {

  var Github = React.createClass({displayName: "Github",
    
    getInitialState: function () {
      return { repos: [] };
    },
    updateRepositories: function () {
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
            languages_url: rep.languages_url,
            lastUpdate: moment ? new moment(rep.updated_at).fromNow() : rep.updated_at
          };
        });

        var shallow_reps = reps.slice(0);

        function getRepositoryLanguages () {
          
          var rep = shallow_reps.shift();

          $.get(rep.languages_url, function (langs, status) {

            if (status === 'success') {
              for(var i = 0; i <= reps.length; i ++) {
                if (reps[i].name === rep.name) {
                  reps[i].languages = Object.keys(langs);
                  break;
                }
              }
            }

            if (shallow_reps.length > 0) {
              getRepositoryLanguages();
            } else {
              self.setState({ repos: reps });
            }
          }, 'json');
        }

        getRepositoryLanguages();

      }, 'json');
    },
    componentDidMount: function () {
      this.updateRepositories();
      setInterval(this.updateRepositories, 60000);
    },
    render: function () {
      if (this.state.repos.length === 0) {
        return (
          React.createElement("div", {className: "loading-icon rotate"})
          );
      }

      var repositoryIcon = this.props.useLanguageIcons ?
          (React.createElement("i", {className: "fa fa-github fa-2x repository-icon"}))
          : (React.createElement("img", {className: "repository-icon", src: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"}));

      var repositories = [];
      

      this.state.repos.forEach(function (repository, rep_index) {
        var langs = repository.languages.map(function (lang, lang_index) {
            return(
              React.createElement("li", {key: lang_index}, lang)
              );
        });

        repositories.push(
            React.createElement("div", {key: rep_index, className: "repository"}, 
              repositoryIcon, 
              React.createElement("div", {className: "repository-name"}, 
                React.createElement("a", {href: repository.url}, repository.name)
              ), 
              React.createElement("p", {className: "repository-description"}, 
                repository.description
              ), 
              React.createElement("div", null, 
                React.createElement("div", {className: "repository-languages"}, 
                "Languages:"
                ), 
                React.createElement("ul", {className: "repository-languages"}, 
                  langs
                )
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
    React.createElement(Github, {username: "jhenriquez", repositories: "4", useLanguageIcons: true}),
    document.getElementById('github-content')
    );
});