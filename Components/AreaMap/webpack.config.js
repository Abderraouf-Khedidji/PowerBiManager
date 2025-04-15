const path = require("path");

module.exports = {
    // Configuración de salida
    output: {
        path: path.resolve(__dirname, "dist"), // En producción, tus assets se guardan en dist
        filename: "bundle.js",
    },
    // Configuración de webpack-dev-server para desarrollo
    devServer: {
        contentBase: [
            path.join(__dirname, "public"), // Carpeta para archivos estáticos (si tienes otra carpeta)
            path.join(__dirname, "assets"), // Agrega 'assets' para que Webpack sirva esos archivos también
        ],
        compress: true,
        port: 8080,
        watchContentBase: true, // Hace que el servidor recargue cuando cambian los archivos de la base de contenido
        publicPath: "/", // Asegura que Webpack sirva la aplicación desde la raíz
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "assets/", // Asegura que los archivos se coloquen dentro de la carpeta 'assets'
                        },
                    },
                ],
            },
        ],
    },
};
