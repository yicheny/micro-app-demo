const {override} = require("customize-cra");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

module.exports = override((config)=>{
    config.output.publicPath = 'auto';
    const currentPlugins = [
        new ModuleFederationPlugin({
            name: "childApp3",
            filename: 'remoteEntry.js',
            exposes: {
                './Test': './src/share/components/Test.tsx',
            },
            shared: {react: {singleton: true, eager: true}, "react-dom": {singleton: true, eager: true}},
        }),
        new ExternalTemplateRemotesPlugin(),
    ]
    config.plugins  = currentPlugins.concat(config.plugins)
    return config
});
