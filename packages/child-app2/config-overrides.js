const {override} = require("customize-cra");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = override((config)=>{
    const currentPlugins = [
        new ModuleFederationPlugin({
            name: "child-app2",
            remotes: {
                // app2: "app2@http://localhost:3202/remoteEntry.js",
                childApp3: 'childApp3@http://localhost:3123/remoteEntry.js',
            },
            shared: {react: {singleton: true, eager: true}, "react-dom": {singleton: true, eager: true}},
        }),
        new ExternalTemplateRemotesPlugin(),
    ]
    config.plugins  = currentPlugins.concat(config.plugins)
    return config
});
