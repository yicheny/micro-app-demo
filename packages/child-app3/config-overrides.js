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
                './components/Test': './src/share/components/Test.tsx',
                './components/Counter': './src/share/components/Counter.js',
                './utils/add':'./src/share/utils/add.js'
            },
            shared: {react: {singleton: true, eager: true}, "react-dom": {singleton: true, eager: true}},
        }),
        new ExternalTemplateRemotesPlugin(),
    ]
    config.plugins  = currentPlugins.concat(config.plugins)
    return config
});
