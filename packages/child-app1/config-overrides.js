const {override} = require("customize-cra");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = override((config)=>{
    const currentPlugins = [
        new ModuleFederationPlugin({
            name: "child-app1",
            remotes: {
                // app2: "app2@[app2Url]/remoteEntry.js",
                app2: "app2@http://localhost:3202/remoteEntry.js",
                app3: "app3@http://localhost:3203/remoteEntry.js",
            },
            shared: {react: {singleton: true, eager: true}, "react-dom": {singleton: true, eager: true}},
        }),
        new ExternalTemplateRemotesPlugin(),
    ]
    config.plugins  = currentPlugins.concat(config.plugins)
    return config
});
