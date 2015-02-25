define(['react', 'momentjs', 'jquery'], function (React, moment) {

  var languageClassMap = {
    'C#': 'icon-csharp',
    'JavaScript': 'icon-javascript',
    'CSS': 'icon-css',
    'Ruby': 'icon-ruby'
  };

  var Github = React.createClass({
    
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
          <div className="loading-icon rotate"></div>
          );
      }

      var repositories = [];
      

      this.state.repos.forEach(function (repository, rep_index) {
        var langs = repository.languages.map(function (lang, lang_index) {
            return (<i key={lang_index} className={languageClassMap[lang]} title={lang}></i>);
        });

        repositories.push(
            <div key={rep_index} className="repository">
              <i className="fa fa-github fa-2x repository-icon"></i>
              <div className="repository-name">
                <a href={repository.url}>{repository.name}</a>
              </div>
              <p className="repository-last-update">
                Last Updated: {repository.lastUpdate}
              </p>
              <p className="repository-description">
                {repository.description}
              </p>
              <ul className="repository-languages">
                {langs}
              </ul>
            </div>
          );
      });

      return (
        <div className="repositories-container">
          {repositories}
        </div>
        );
    }
  });

  /* Exports the component as CommonJS module. For testing. */
  if (typeof(module) == 'object' && module.exports) {
    module.exports = Github;
  }

  return Github;
});