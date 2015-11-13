# corpus
An app built with Jinaga and Knockout. A personal Body of Knowledge.

## Jinaga and Knockout

[Jinaga](http://jinaga.com) is a universal web back-end offering a secure API, real-time collaboration, and conflict
resolution. [Knockout](http://knockoutjs.com) is an MVVM library offering data binding and dependency tracking. The two
together make for rapid application development focusing exclusively on the client side.

To get started with a new app, use Bower to install both Jinaga and Knockout.

```
bower install --save jinaga
bower install --save knockoutjs
```

Then include the JavaScript libraries into your HTML page, just before the closing body tag.

```HTML
<script language="JavaScript" src="bower_components/jinaga/jinaga.js"></script>
<script language="JavaScript" src="bower_components/knockout/dist/knockout.js"></script>
<script language="JavaScript" src="index.js"></script>
```

Finally, set up a Jinaga repository and distributor, and a Knockout view model.

```JavaScript
var j = new Jinaga();
j.sync(new JinagaDistributor("ws://jinaga.cloudapp.net"));

var user = ko.observable();
j.login(function (u) {
    if (!u)
        window.location = "http://jinaga.cloudapp.net/login";
    else
        user(u);
});

var viewModel = function() {
    function userIdentity() {
        if (!user())
            return "";
        return user().publicKey;
    }
    return {
        name: "Corpus",
        identity: ko.computed(userIdentity)
    };
}();

ko.applyBindings(viewModel);
```

Test the view model with a couple of bindings.

```HTML
<h1 data-bind="text: name"></h1>
<p data-bind="text: identity"></p>
```

## Current Status

The above code uses a back-end hosted on Azure. You can host your own back end by following the instructions in
the [Jinaga](http://jinaga.com) repository. The back-end above does not use TLS. Nor does it redirect back to your
application after the user logs in. Both of these will be corrected shortly.

The Corpus application will grow organically as I collect new writings, podcasts, videos, events, etc. All of these will be
collected in the Corpus and shared back in a way that is indexed, linked, and searchable. Ultimately, Corpus will be the
store for all of my web properties. You will be able to use Corpus for your own private or public body of knowledge.
