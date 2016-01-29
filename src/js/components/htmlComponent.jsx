'use strict';
var React         = require('react');
var FluxibleMixin = require('fluxible').Mixin;

var Html = React.createClass({

    mixins: [ FluxibleMixin ],

    render: function () {
        console.log("Html component loaded - read call\n");

        return (
            <html>
                <head>
                    <meta charSet="UTF-8" />
                    <title>Search</title>
                    <link rel="shortcut icon" href="//cdn.porch.com/bootstrap/favicon.ico"/>
                    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
                    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
                    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'/>
                    <link rel="stylesheet" href="/v2/assets/style.css"/>
                </head>

                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                </body>
                <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                <script src="/v2/assets/main.js"></script>
                <script src="/v2/assets/salvatore.js"></script>
            </html>
        );
    }
});

module.exports = Html;
