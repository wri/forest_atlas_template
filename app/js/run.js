(function () {

  window.app = {};

  require(["root/template"],function(Template){

    //- Function to run after template has retrieved AGOL Info
    function launch (hasAGOLConfig) {
      // This is necessary due to the way the original developer set up the project
      // We need to inject some config options in Main and app.config needs
      // to be available before Main is required
      require(["root/main", "res/Resources", "dojo/_base/lang"], function (Main, Resource, lang) {
        // Merge Resources in here and then remove all references of resources from the application
        // Only merge in options that are undefined
        var languages,
            lang,
            key;

        if (hasAGOLConfig) {
          // Merge in the basics first
          for (key in app.config) {
            if (app.config[key] === undefined || app.config[key] === '') {
              app.config[key] = Resource[key];
            }
          }

        } else {
          app.config = Resource;
        }

        if (app.config.useAdditionalLanguage === false) {
          document.body.className += ' one-language';
        }

        // If app.config.defaultLanguage for some reason is not defined, default to english
        if (app.config.defaultLanguage === undefined) { app.config.defaultLanguage = 'en'; }
        var main = new Main(app.config.defaultLanguage);
      });
    }

    //- Get Application Info
    Template.getApplicationInformation().then(function (commonConfig) {
      // If Config Options are Found, make them into the main config object
      if (commonConfig) {
        app.config = commonConfig;
      }

      launch(true);
    }, function (error) {
      launch(false);
    });


  });

}())
